
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MyapiService } from 'src/app/services/myapi.service';
import { UserCookiesService } from 'src/app/services/user-cookies.service';
import { VideoUploadDialogComponent } from 'src/app/video-upload-dialog/video-upload-dialog.component';

@Component({
  selector: 'app-create-channel',
  templateUrl: './create-channel.component.html',
  styleUrls: ['./create-channel.component.css']
})
export class CreateChannelComponent {
  myForm: FormGroup;
  fileInput: any; 
  channelName = new FormControl('', Validators.required);
  channelDescription = new FormControl('', Validators.required);

  constructor(
    private dialogRef: MatDialogRef<CreateChannelComponent>,
    private videoDialog: MatDialog,
    private _api: MyapiService,
    private userCookies:UserCookiesService
  ) {
    this.myForm =new FormGroup({
      channelName: this.channelName,
      channelDescription: this.channelDescription
    });
  }

 
  // onLogoSelected(event: any) {
  //   this.fileInput = event.target.files[0];
  //   this.logoSrc="../assets/thumbnails/"+this.fileInput.name;
  // }

  channelImg:any | null = null;
  
  onLogoSelected(event:any){
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length) {
      this.channelImg = inputElement.files[0];
      this.logoSrc="../assets/thumbnails/"+this.channelImg.name;
    } else {
      this.channelImg = null;
    }
  }



  createChannel() {
    if (this.myForm.valid) {
      const cookieValue = this.userCookies.getCookieValues();
      const userID_FK = cookieValue.id;
      const channelName = this.myForm.value.channelName;
      const channelDescription = this.myForm.value.channelDescription;
      
      const formData = new FormData();
      formData.append('file', this.channelImg);
      formData.append('userID', userID_FK);
      formData.append('channelName', channelName);
      formData.append('channelDescription', channelDescription);

      this._api.addChannel(formData).subscribe((response) => {
        this.dialogRef.close();
        this.videoDialog.open(VideoUploadDialogComponent);
      });
    }
  }
  

  logoSrc:string="https://img.freepik.com/free-psd/engraved-black-logo-mockup_125540-223.jpg?w=2000";
  
  

  // uploadVideoThumbnail() {
  //   const formData = new FormData();
  //   formData.append('file', this.channelImg);
  //   const uid = parseInt(this.userCookies.getCookieValues().id);

  //   this._api.uploadChannelImg(uid,formData).subscribe(
  //     (response: any) => {
  //       this.logoSrc = response.newFileName;
  //     },
  //     error => {
  //       console.error('An error occurred while uploading the video thumbnail:', error);
  //     }
  //   );
  // }


}
