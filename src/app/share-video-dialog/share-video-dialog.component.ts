import { Component,Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-share-video-dialog',
  templateUrl: './share-video-dialog.component.html',
  styleUrls: ['./share-video-dialog.component.css']
})
export class ShareVideoDialogComponent {
  
  constructor(@Inject(MAT_DIALOG_DATA) public videoUrl: string){

  }

  copyLink(): void {
    navigator.clipboard.writeText(this.videoUrl)
      .then(() => {
        console.log('Link copied to clipboard');
      })
  }
  
}
