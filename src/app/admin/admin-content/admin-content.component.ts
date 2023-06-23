import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MyapiService } from 'src/app/services/myapi.service';
import { SessionService } from 'src/app/services/session.service';
import { UserCookiesService } from 'src/app/services/user-cookies.service';
import { Router } from '@angular/router';
import { AdminSigninComponent } from '../admin-signin/admin-signin.component';


export interface VideoData {
  id: number;
  video_url: string;
  video_title: string;
  video_description: string;
  thumbnail_url: string;
  visibility: string;
  restriction: string;
  created_at: string;
  views: number;
  comments: number;
  likes: number;
  dislikes: number;
}
export interface PlayListVideoData {
  id: number;
  video_url: string;
  video_title: string;
  video_description: string;
  thumbnail_url: string;
  visibility: string;
  restriction: string;
  created_at: string;
  views: number;
  comments: number;
  likes: number;
  dislikes: number;
}
@Component({
  selector: 'app-admin-content',
  templateUrl: './admin-content.component.html',
  styleUrls: ['./admin-content.component.css']
})
export class AdminContentComponent implements AfterViewInit {
  videoDisplayedColumns: string[] = [
    'id',
    'video',
    'visibility',
    'views',
    'likes',
    'dislikes',
    'date',
    'action',
  ];
  playListDisplayedColumns: string[] = [
    'playlist',
    'last_updated',
    'videos_count'
  ];
  videoDataSource!: MatTableDataSource<VideoData>;
  playListDataSource!: MatTableDataSource<PlayListVideoData>;

  @ViewChild(MatPaginator) videoPaginator!: MatPaginator;
  @ViewChild(MatSort) videoSort!: MatSort;

  @ViewChild(MatPaginator) playListPaginator!: MatPaginator;
  @ViewChild(MatSort) playListSort!: MatSort;

  constructor(private userCookies: UserCookiesService, private _myapi: MyapiService, private _session: SessionService, private dialog:MatDialog, private router:Router) {
    const sessionData = this._session.getSessionData();
    if (!sessionData) {
      
      this.router.navigate(['/home']); 
      this.dialog.open(AdminSigninComponent,{
        width:'200px;'
      });
  }
    if (sessionData !== null) {
      this._myapi.getUploadedVidoes().subscribe(data => {
        const videoData: VideoData[] = data;
        this.videoDataSource = new MatTableDataSource(videoData);
      });
    }
    else{
      this._myapi.getUploadedVidoes().subscribe(data => {
        const videoData: VideoData[] = data;
        this.videoDataSource = new MatTableDataSource(videoData);
      });
    }
  }
  

  ngAfterViewInit() {
    this.videoDataSource.paginator = this.videoPaginator;
    this.videoDataSource.sort = this.videoSort;

    this.playListDataSource.paginator = this.playListPaginator;
    this.playListDataSource.sort = this.playListSort;
  }


  applyVideoFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.videoDataSource.filter = filterValue.trim().toLowerCase();

    if (this.videoDataSource.paginator) {
      this.videoDataSource.paginator.firstPage();
    }
  }

  applyPlayListFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.playListDataSource.filter = filterValue.trim().toLowerCase();

    if (this.playListDataSource.paginator) {
      this.playListDataSource.paginator.firstPage();
    }
  }


  updateScope(scope:string){
    alert(scope);
  }

  
}