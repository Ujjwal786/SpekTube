import { Component, AfterViewInit, ViewChild, ElementRef} from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { MyapiService } from '../services/myapi.service';
import { UserCookiesService } from '../services/user-cookies.service';
import { MatDialog } from '@angular/material/dialog';
import { VideoReportDialogComponent } from '../video-report-dialog/video-report-dialog.component';
import { ShareVideoDialogComponent } from '../share-video-dialog/share-video-dialog.component';

interface Category {
  id: number;
  category_name: string;
  selected: boolean;
}

@Component({
  selector: 'app-watch',
  templateUrl: './watch.component.html',
  styleUrls: ['./watch.component.css']
})
export class WatchComponent implements AfterViewInit {
  @ViewChild('buttonRef') buttonRef!: ElementRef<HTMLButtonElement>;
  @ViewChild('videoPlayer') videoPlayer!: ElementRef;


  videoSrc!: string;
  src!:string;
  
  ngOnInit(): void {
    this._myapi.getCategoryNames().subscribe((res: any[]) => {
      const otherCategories = res.map(category => ({ id: category.id, name: category.category_name, selected: false }));
      this.categoriess = [
        { id: 101, name: 'All', selected: true },
        ...otherCategories
      ];
    });
  }
 

  
  
  
  

  categoryOptions: OwlOptions = {
    loop: false,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    margin:10,
  };

  allVideos: OwlOptions = {
    loop: false,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    margin:20,
    
  };

  shorts: OwlOptions = {
    loop: false,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    margin:20,
    responsive: {
      0: {
        items: 2
      }
    },
    
  };

 

  videos=[
    { id:1, thumbnail:'one.jpg', video:'one.mp4' },
    { id:2, thumbnail:'two.jpg', video:'two.mp4' },
    { id:3, thumbnail:'three.jpg', video:'three.mp4' },
    { id:4, thumbnail:'four.jpg', video:'four.mp4' },
    { id:5, thumbnail:'five.jpg', video:'five.mp4' }
  ]

  allCategoryVideos:any[]=[];


  categoriess:any[]=[];

videoLink!:string;

userPictureUrl:string;

  constructor(
    private route:ActivatedRoute, 
    private _myapi:MyapiService, 
    private userCookies:UserCookiesService, 
    private dialog:MatDialog) { 
     
      
  
  
  
    this._myapi.getAllCategoryVideos().subscribe((res)=>{
        this.allCategoryVideos=res;
        console.log(this.allCategoryVideos);
      })
    this._myapi.getCategoryNames().subscribe((res) => {
     
    });
  

    this.route.queryParams.subscribe(params => {
      const vParam = params['v'];
      this.videoLink=vParam;
      this.videoSrc = "assets/videos/"+vParam;
      this.src = this.videoSrc;
      this.changeVideo(this.videoPlayer.nativeElement, this.videoSrc); 
    });

    this.getVideoDetails();

    const p = this.userCookies.getCookieValues().picture
    this.userPictureUrl=p;
   

  }

  videoDataByUrl:any = {}

  getVideoDetails(){
    this._myapi.GetVideoDataByUrl(this.videoLink).subscribe((resp)=>{
      this.videoDataByUrl = resp;
      console.log(this.videoDataByUrl)
      this.getSubscribersAndLikes();
    })
  }
  
  
  changeVideo(videoPlayer: HTMLVideoElement, src: string) {
    videoPlayer.src = src;
    videoPlayer.load();
    videoPlayer.play();
    this.isLiked=false;
    this.isDisliked=false;
    this.getVideoDetails();
  }

  ngAfterViewInit(){
    const categories = document.querySelectorAll('.owl-carousel .owl-item');
    categories.forEach((slide: Element) => {
      const slideElement = slide as HTMLElement;
      const button = slideElement.querySelector('button');
      if (button) {
        const buttonWidth = button.offsetWidth;
        slideElement.style.width = `${buttonWidth}px`;
      }
    });

    this.adjustTextareaHeight();

  }
  

  
  changeButtonColor(id: number) {
    this.categoriess.forEach(slide => {
      slide.selected = slide.id === id;
    });
  }
 
  comment: string = '';
  


  adjustTextareaHeight(): void {
    const textarea = document.querySelector('.watchBox textarea') as HTMLTextAreaElement;
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
  }

  
  onTextareaInput(event: Event): void {
    this.comment = (event.target as HTMLTextAreaElement).value;
    this.adjustTextareaHeight();
  }
  

isLiked: boolean = false;
likeData: number = 0;
isDisliked: boolean = false;
dislikeData: number = 0;


toggleLike(): void {
  if (this.isLiked) {
    this.likeData = 0;
  } else {
    this.likeData = 1;
  }

  const data = {
    UserID_FK: this.userCookies.getCookieValues().id,
    VideoID_FK: this.videoDataByUrl['videoID'],
    IsLikeDislike: this.likeData
  };

  this._myapi.likeDisLikeVideo(data).subscribe(() => {
    this.isLiked = !this.isLiked;
    this.isDisliked = false;
  });
}



toggleDislike(): void {
  if (this.isDisliked) {
    this.dislikeData = 0;
  } else {
    this.dislikeData = 2;
  }

  const data = {
    UserID_FK: this.userCookies.getCookieValues().id,
    VideoID_FK: this.videoDataByUrl['videoID'],
    IsLikeDislike: this.dislikeData
  };

  this._myapi.likeDisLikeVideo(data).subscribe(() => {
    this.isDisliked = !this.isDisliked;
    this.isLiked = false;
  });
}
  
reportVideo(){
  this.dialog.open(VideoReportDialogComponent,{
    width:'400px',
    data:this.videoDataByUrl['videoID'],
  })
}
shareVideo(){
  this.dialog.open(ShareVideoDialogComponent,{
    width:'350px',
    data:'localhost:4200/watch?v='+this.videoLink
  })
}

isSubscribed: boolean = false;

  toggleSubscription(): void {
    const data={
      userID_FK: (this.userCookies.getCookieValues().id),
      channelID_FK: this.videoDataByUrl['channelID']
    }

    this._myapi.subscribeVideo(data).subscribe(()=>{
      this.isSubscribed = !this.isSubscribed;

    })
  }

  commentOnVideo(){
    if (this.comment!='') {

        const data={
          userID_FK: this.userCookies.getCookieValues().id,
          videoID_FK: this.videoDataByUrl['videoID'],
          comment:this.comment,
          isReply:false
        }
        
        this._myapi.videoComponent(data).subscribe(()=>{
          alert("Commented");
        })
    }else{
      alert(this.comment);
    }
  }

  subscriberAndLikes:any={};

  getSubscribersAndLikes(){
    this._myapi.getSubscribersAndLikes(this.videoDataByUrl['channelID'],this.videoDataByUrl['videoID']).subscribe((res)=>{
     this.subscriberAndLikes=res;
    });

    this._myapi.isSubscribedAndLiked(this.videoDataByUrl['channelID'],this.videoDataByUrl['videoID'],this.videoDataByUrl['userID']).subscribe((resp)=>{
      console.log(resp);
     if(resp['isSubscribed'])
        this.isSubscribed=true;
      else
        this.isSubscribed=false;

      if(resp['isLikeDislike']==1){
        this.isLiked=true;
        this.isDisliked=false;
      }else if(resp['isLikeDislike']==2){
        this.isLiked=false;
        this.isDisliked=true;
      }
    })
    this.getVideoComments();

   
  }
  videoComments:any[]=[];

  getVideoComments(){
    this._myapi.getVideoComments(this.videoDataByUrl['videoID']).subscribe(res=>{
        this.videoComments=res;
        console.log(this.videoComments);
    })
  }
  
}

