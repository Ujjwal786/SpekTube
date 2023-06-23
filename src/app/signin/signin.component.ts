import { Component } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { MyapiService } from '../services/myapi.service';
import { SessionService } from '../services/session.service';
import { Router } from '@angular/router';
import { GoogleApiService } from '../google-api.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SignupComponent } from '../signup/signup.component';
import { UserCookiesService } from '../services/user-cookies.service';
import { AdminSigninComponent } from '../admin/admin-signin/admin-signin.component';
import { Dialog } from '@angular/cdk/dialog';
import { AnalyticsComponent } from '../studio/analytics/analytics.component';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {

  myForm !: FormGroup;
  usersDetails : any[]= [];
  hidepsd=true;
  submitted=false;
  invalid=false;
  
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  passwordFormControl = new FormControl('', Validators.required);

  constructor(private _api: MyapiService, 
    private dialog:MatDialog,
    private sessionService:SessionService, 
    private router: Router,
    private googleApi:GoogleApiService,
    private diaglogRef:MatDialogRef<SigninComponent>,
    private signupDialog:MatDialog,
    private userCookie:UserCookiesService)
  {
      this.myForm = new FormGroup({
        email: this.emailFormControl,
        password: this.passwordFormControl
      });
  }



  
  submitForm() {
    this.submitted = true;
  
    if (this.isFormValid()) {
    
      const userData = {
        Email: this.emailFormControl.value || "",
        Password: this.passwordFormControl.value,
      };

      this._api.UserLogin(userData).subscribe(
        (response) => {
          const data={
            id: response.id,
            name: response.first_Name+" "+ response.last_Name,
            picture:'https://img.freepik.com/free-icon/user_318-563642.jpg'
          }
          this.userCookie.setCookie(data); 
          this.diaglogRef.close();
        },
        (error) => {
          alert("Login failed");
        }
      );
     
    }
  }
  


  isFormValid(): boolean {
    const isValid = this.myForm.valid; // Check if the form is valid

    if (!isValid) {
      // Mark all form controls as touched to display validation errors
      Object.keys(this.myForm.controls).forEach(key => {
        this.myForm.controls[key].markAsTouched();
      });
    }

    return isValid;
  }
 
  login(){
    this.googleApi.getOAuthService().initLoginFlow();  
  }
   
  signUpDialog(){
    this.diaglogRef.close();
    this.signupDialog.open(SignupComponent)
  }
  
  adminSignin(){
    this.diaglogRef.close();
    const dialogRef = this.dialog.open(AdminSigninComponent, {
      width: '350px',
    });
   
    
  }

}
