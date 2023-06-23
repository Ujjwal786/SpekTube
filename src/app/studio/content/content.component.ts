import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Route, Router } from '@angular/router';
import { MyapiService } from 'src/app/services/myapi.service';
import { UserCookiesService } from 'src/app/services/user-cookies.service';


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
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements AfterViewInit {
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


  constructor(private userCookies:UserCookiesService, private _myapi:MyapiService, private router:Router) {

    const data = this.userCookies.getCookieValues();
    if (!data || !data.id || !data.name || !data.picture) {
      this.router.navigate(['/home']);
    }
        
    this._myapi.getUploadedVidoesOfUser(parseInt(this.userCookies.getCookieValues().id)).subscribe(data => {
      const videoData: VideoData[] = data;
      this.videoDataSource = new MatTableDataSource(videoData);
    });

    this._myapi.getPlaylistInfo(parseInt(this.userCookies.getCookieValues().id)).subscribe(data => {
      const playListData: PlayListVideoData[] =data;
      console.log(data);
      this.playListDataSource = new MatTableDataSource(playListData);
    })
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