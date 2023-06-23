import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { VideoUploadDialogComponent } from './video-upload-dialog/video-upload-dialog.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SigninComponent } from './signin/signin.component';
import { GoogleApiService, UserInfo } from './google-api.service';
import { CreateChannelComponent } from './studio/create-channel/create-channel.component';
import { NavigationEnd, Router } from '@angular/router';
import { UserCookiesService } from './services/user-cookies.service';
import { MyapiService } from './services/myapi.service';
import { SessionService } from './services/session.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isSidebarToggled = false;
  userInfo?: any;
  isLoggedIn?: boolean;
  isStudio?: boolean;
  isAdmin?:boolean=false;
  sessionData:any={};
  loggedInUserInfo!: { id: number; name: string; picture: string };

  constructor(
    private dialog: MatDialog,
    private readonly googleApi: GoogleApiService,
    private router: Router,
    private userCookies: UserCookiesService,
    private _myapiService:MyapiService,
    private cdr: ChangeDetectorRef,
    private session:SessionService
  ) {
    this.getUserChannlDetails();
    
    this.sessionData = this.session.getSessionData();

    if(this.sessionData){

      this.userInfo={
        id: this.sessionData.id,
        name: this.sessionData.name,
        picture: this.sessionData.picture
      }
      this.isLoggedIn=true;
      this.isAdmin=true;

    }
  
  }
  ngOnInit() {
    this.userInfo = this.userCookies.getCookieValues();
    const userCookieValues = this.userCookies.getCookieValues();

    this.sessionData = this.session.getSessionData();

    if(this.sessionData){

      this.userInfo={
        id: this.sessionData.id,
        name: this.sessionData.name,
        picture: this.sessionData.picture
      }
      this.isLoggedIn=true;
      this.isAdmin=true;

    }else if (userCookieValues.id && userCookieValues.name && userCookieValues.picture) {
      this.userInfo = {
        id: parseInt(userCookieValues.id),
        name: userCookieValues.name,
        picture: userCookieValues.picture
      };
      this.isLoggedIn = true;
    } else {
    
      this.googleApi
        .getOAuthService()
        .loadDiscoveryDocumentAndTryLogin()
        .then(() => {
          this.isLoggedIn = this.googleApi.isLoggedIn();
          if (this.isLoggedIn) {
            this.googleApi.userProfileSubject.subscribe((info) => {
              this.userInfo = info;

              const userData={
                oauth_provider:'google',
                oauth_id:this.userInfo?.info?.sub,
                first_name:this.userInfo?.info?.given_name,
                last_name:this.userInfo?.info?.family_name,
                email:this.userInfo?.info?.email,
                picture:this.userInfo?.info?.picture,
              }


              this._myapiService.GoogleUserLogin(userData).subscribe((response)=>{
                console.log(response);
                const Name=response.first_Name+' '+response.last_Name;
               
                const data = {
                  id:response.id,
                  name:Name,
                  picture:response.picture
                }

                this.userCookies.setCookie(data);
                this.userInfo=this.userCookies.getCookieValues();

              })
            });
          }
        });

        
    }
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const currentUrl = event.url;
        const allowedUrls = ['studio/dashboard', 'studio/content', 'studio/analytics'];
        if (allowedUrls.some((url) => currentUrl.includes(url))) {
          this.isStudio = true;
        }
      }
    });
  }

  login(): void {
    this.googleApi.getOAuthService().initLoginFlow();
  }

  logout(): void {
    this.googleApi.logOutFromCurrentURL();
    this.isLoggedIn = false;
    this.userInfo = undefined;
    this.userCookies.removeCookie();
    this.session.clearSessionData();
  }

  openDialog() {
    this.dialog.open(VideoUploadDialogComponent, {
      width: '1000px',
      height: '300px'
    });
  }

  openSignInDialog() {
    const dialogRef: MatDialogRef<SigninComponent> = this.dialog.open(SigninComponent);
    dialogRef.afterClosed().subscribe(result => {
      this.userInfo=this.userCookies.getCookieValues();
      this.cdr.detectChanges(); // Trigger change detection
    });
    dialogRef.afterClosed().subscribe(result => {
      this.userInfo = this.userCookies.getCookieValues();
      const userCookieValues = this.userCookies.getCookieValues();

      if (userCookieValues.id && userCookieValues.name && userCookieValues.picture) {
        this.userInfo = {
          id: parseInt(userCookieValues.id),
          name: userCookieValues.name,
          picture: userCookieValues.picture
        };
        console.log(this.userInfo);
        this.isLoggedIn = true;
      }
    })
    
  }
  userChannelDetails:any={};

  getUserChannlDetails(){
    this._myapiService.getUserChannelDetails(parseInt(this.userCookies.getCookieValues().id)).subscribe((res)=>{
        this.userChannelDetails=res;
        console.log(this.userChannelDetails)
    })
     
  }

  openVideoUploadDialog() {
    const info=this.userCookies.getCookieValues();
    console.log(info);
    const uid=parseInt(info.id);
    this._myapiService.getUserChannelDetails(uid).subscribe((res)=>{
      this.router.navigate(['/studio/content'])
      this.dialog.open(VideoUploadDialogComponent, {
        width: '70%'
      });
    },(error) => {
      this.dialog.open(CreateChannelComponent, {
        width: '60%',
        disableClose: true
      });
    })
   
  }



  


}
