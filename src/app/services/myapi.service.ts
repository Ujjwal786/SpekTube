import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MyapiService {
  constructor(private http: HttpClient){}
  

    myUrl = "https://localhost:7065/api";

    UserSignUp(userData:any):Observable<any>{
        return this.http.post<any>(this.myUrl+"/Users/addSpekUser", userData);
    }

    UserLogin(userData:any):Observable<any>{
     
        return this.http.post<any>(this.myUrl+"/Users/signInSpekUser", userData);
    }

    GoogleUserLogin(userData:any):Observable<any>{
      return this.http.post<any>(this.myUrl+"/Users/signInGoogleUser", userData);
    }

    getUserChannelDetails(user_id:number):Observable<any>{
      return this.http.get<any>(this.myUrl+"/Channels/getChannelById/"+user_id);
    }
    addChannel(cdetails:FormData):Observable<any>{
      return this.http.post<any>(this.myUrl+"/Channels/addChannel", cdetails);
    }

    getCategoryNames():Observable<any>{
      return this.http.get<any>(this.myUrl+"/Categories");
    }
    addPlaylistName(pdata:any):Observable<any>{
        return this.http.post<any>(this.myUrl+"/Playlists/addPlayList",pdata);
    }
    getPlayListNames(id:number):Observable<any>{
      return this.http.get<any>(this.myUrl+"/PlayLists/playListNames/"+id);
    }


    uploadVideoFile(id:number, formData:any):Observable<any>{

      return this.http.post(this.myUrl + '/Videos/uploadVideo?id='+id, formData);
    }
    
    uploadVideoThumbnail(id:number, formData:any):Observable<any>{
      return this.http.post(this.myUrl + '/Videos/uploadVideoThumbnail?id='+id, formData);
    }

    uploadChannelImg(id:number, formData:any):Observable<any>{
      return this.http.post(this.myUrl+ '/Channels/uploadChannelImg?id='+id, formData);
    }

    addVideoDescription(data:any):Observable<any>{
      return this.http.post(this.myUrl+'/VideosDescription', data);
    }


    getAllCategoryVideos():Observable<any>{
      return this.http.get<any>(this.myUrl+"/Videos/getVideoDataByAllCategories");
    }


    likeDisLikeVideo(data:any):Observable<any>{
      return this.http.put<any>(this.myUrl+"/VideoLikesDisLike", data);
    }

    reportVideo(data:any):Observable<any>{
      return this.http.put<any>(this.myUrl+"/VideosReport",data);
    }

    subscribeVideo(data:any):Observable<any>{
      return this.http.put<any>(this.myUrl+'/Subscribers',data);
    }

    videoComponent(data:any):Observable<any>{
      return this.http.put<any>(this.myUrl+'/VideoComments', data);
    }
    GetVideoDataByUrl(data:string):Observable<any>{
      return this.http.get<any>(`${this.myUrl}/Videos/getVideoDataUrl?videoUrl=${data}`);

    }

    getSubscribersAndLikes(channelID: number, videoID: number): Observable<any> {
      const url = `${this.myUrl}/Videos/getSubscribersAndLikes?channelID=${channelID}&videoID=${videoID}`;
      return this.http.get<any>(url);
    }
   
    isSubscribedAndLiked(channelID:number, videoID:number, userID:number):Observable<any>{
        return this.http.get<any>(`${this.myUrl}/Videos/checkSubscriberAndIsLikeDislike?channelID=${channelID}&videID=${videoID}&userID=${userID}`);
    }
    
    getUploadedVidoesOfUser(userID: number): Observable<any>{
      return this.http.get<any>(`${this.myUrl}/Videos/getUserUploadedVideos?userID_FK=${userID}`);
    }
    getUploadedVidoes(): Observable<any>{
      return this.http.get<any>(`${this.myUrl}/Videos/getAllUserUploadedVideos`);
    }

    getPlaylistInfo(userID:number): Observable<any>{
      return this.http.get<any>(`${this.myUrl}/Videos/getPlaylistInfo?userID_FK=${userID}`);
    }


    getVideoComments(id:number): Observable<any>{
      return this.http.get<any>(`${this.myUrl}/VideoComments/getVideoComments/${id}`);
    }




    getUserGraphData(userID:number): Observable<any>{
      return this.http.get<any>(`${this.myUrl}/GraphData/For User/${userID}`);
    }


   

}
