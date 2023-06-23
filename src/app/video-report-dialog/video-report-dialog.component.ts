import { Component, Inject} from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserCookiesService } from '../services/user-cookies.service';
import { MyapiService } from '../services/myapi.service';

@Component({
  selector: 'app-video-report-dialog',
  templateUrl: './video-report-dialog.component.html',
  styleUrls: ['./video-report-dialog.component.css']
})
export class VideoReportDialogComponent {
  reportValue!: string;
  reportIssue: string[] = [
    'Sexual content', 
    'Violent or repulsive content', 
    'Hateful or abusive content', 
    'Harassment or bullying',
    'Harmful or dangerous acts',
    'Misinformation',
    'Child abuse',
    'Promotes terrorism',
    'Spam or misleading',
    'Infringes my rights',
    'Captions issue'
    
  ];
  constructor(@Inject(MAT_DIALOG_DATA) public videoID: number,
  private userCookies:UserCookiesService,
  private _myapi:MyapiService) {}

  report(){
    const data={
      userID_FK:(this.userCookies.getCookieValues().id),
      videoID_FK:this.videoID,
      problem:this.reportValue
    }
    this._myapi.reportVideo(data).subscribe(()=>{
      alert("Report successfully");
    })
  }


}
