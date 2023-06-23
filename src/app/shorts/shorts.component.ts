import { Component, ViewChild } from '@angular/core';

@Component({
  selector: 'app-shorts',
  templateUrl: './shorts.component.html',
  styleUrls: ['./shorts.component.css']
})
export class ShortsComponent {
  isPaused: boolean = false;
  isMuted: boolean = false;

  togglePlayPause() {
    this.isPaused = !this.isPaused;
    const videoElement = document.getElementById('myVideo') as HTMLVideoElement;
    if (videoElement.paused) {
      videoElement.play();
    } else {
      videoElement.pause();
    }
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    const videoElement = document.getElementById('myVideo') as HTMLVideoElement;
    videoElement.muted = this.isMuted;
  }

  
}
