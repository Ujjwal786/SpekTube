import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { error } from 'jquery';
import { MyapiService } from 'src/app/services/myapi.service';
import { UserCookiesService } from 'src/app/services/user-cookies.service';

@Component({
  selector: 'app-play-list-dialog',
  templateUrl: './play-list-dialog.component.html',
  styleUrls: ['./play-list-dialog.component.css']
})
export class PlayListDialogComponent {
  playListForm:FormGroup;

  constructor(private _formBuilder:FormBuilder,private dialogRef: MatDialogRef<PlayListDialogComponent>,
    private userCookies: UserCookiesService,
    private _myapi:MyapiService){
    this.playListForm = this._formBuilder.group({
      playListFormControl: ['', Validators.required],
    });
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  savePlayList(){

    const userID_FK = parseInt(this.userCookies.getCookieValues().id);
    const data={
      userID_FK: userID_FK,
      playlist_name: this.playListForm.value.playListFormControl
    }
    this._myapi.addPlaylistName(data).subscribe((res)=>{
      this.dialogRef.close();
    },
      error=>console.log(error)
    )
  }
}
