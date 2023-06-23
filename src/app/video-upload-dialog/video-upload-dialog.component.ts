import {Component, ViewChild} from '@angular/core';
import {FormBuilder, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatStepperModule} from '@angular/material/stepper';
import {MatButtonModule} from '@angular/material/button';
import {MatDialog, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {MatSelectModule} from '@angular/material/select';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatStepper } from '@angular/material/stepper';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { PlayListDialogComponent } from '../studio/play-list-dialog/play-list-dialog.component';
import { MyapiService } from '../services/myapi.service';
import { UserCookiesService } from '../services/user-cookies.service';


@Component({
  selector: 'app-video-upload-dialog',
  templateUrl: './video-upload-dialog.component.html',
  styleUrls: ['./video-upload-dialog.component.css'],
  standalone: true,
  imports: [
    MatButtonModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatSelectModule,
    CommonModule,
    HttpClientModule,
    MatCardModule
  ],
})
export class VideoUploadDialogComponent{

  @ViewChild('stepper') stepper!: MatStepper;


  categoryOptions: any[]=[];
  scopeOptions: string[] =['Public', 'Private'];
  videoFileName!:string;

  firstFormGroup = this._formBuilder.group({
    videoFile: ['', Validators.required],
  });

  secondFormGroup = this._formBuilder.group({
    titleTextArea: ['', Validators.required],
    descriptionTextArea: ['', Validators.required],
    playlistFormControl: [[], Validators.required],
    categoryFormControl: ['', Validators.required],
    scopeInputArea: ['', Validators.required],
  });
 


  isEditable = true;
  selectedValue!: string;
  videoSrcc!:string;
  imgSrcc!:string;
  videoID_FK!:number;

  
  ngOnInit(){
    this.adjustTtileTextareaHeight();
    this.adjustDescriptionTextareaHeight();
  }

  constructor(private _formBuilder: FormBuilder, 
    private http: HttpClient,
    private dialogRef: MatDialogRef<VideoUploadDialogComponent>,
    private playListDialog:MatDialog,
    private _api:MyapiService,
    private userCookies:UserCookiesService
    ) {
      this._api.getCategoryNames().subscribe((res)=>{
        this.categoryOptions= res;
      })
      this.getPlaylistName();
  }

  playlistOptions: any[] = [];

  getPlaylistName() {
    const info = this.userCookies.getCookieValues();
    const uid = parseInt(info.id);
    this._api.getPlayListNames(uid).subscribe((res) => {
      console.log(res);
      if (Array.isArray(res)) {
        this.playlistOptions = res;
      } else {
        this.playlistOptions = [];
      }
    });
  }
  
  
  title: string = '';
  description: string = '';
  


  adjustTtileTextareaHeight(): void {
    const textarea = document.querySelector('.titleTextarea') as HTMLTextAreaElement;
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
  }

  adjustDescriptionTextareaHeight(): void {
    const textarea = document.querySelector('.descriptionTextarea') as HTMLTextAreaElement;
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
  }


  
  onTextareaTitleInput(event: Event): void {
    this.title = (event.target as HTMLTextAreaElement).value;
    this.adjustTtileTextareaHeight();
  }
   
  onTextareaDescriptionInput(event: Event): void {
    this.description = (event.target as HTMLTextAreaElement).value;
    this.adjustDescriptionTextareaHeight();
  }


  fileInput: any; 
 
  onFileSelected(event: any) {
    this.fileInput = event.target.files[0];
    console.log(this.fileInput.name);
    this.uploadVideoFile();
    this.stepper.next();
    this.videoFileName=this.fileInput.name;
  }

  thumbnail:any | null = null;
  thumbnailSrc!:string;

  onThumbnailSelected(event:Event){
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length) {
      this.thumbnail = inputElement.files[0];
      this.uploadVideoThumbnail();
    } else {
      this.thumbnail = null;
    }
  }

  uploadVideoFile() {
    const formData = new FormData();
    formData.append('file', this.fileInput);
    const uid = parseInt(this.userCookies.getCookieValues().id);
    console.log(formData);
    this._api.uploadVideoFile(uid,formData).subscribe(
      (response: any) => {
        this.videoID_FK = response.id;
        this.videoSrcc = response.newFileName;
      },
      error => {
        console.error('An error occurred while uploading the file:', error);
      }
    );
  }
  
  uploadVideoThumbnail() {
    const formData = new FormData();
    formData.append('file', this.thumbnail);
    const uid = parseInt(this.userCookies.getCookieValues().id);

    this._api.uploadVideoThumbnail(this.videoID_FK,formData).subscribe(
      (response: any) => {
        this.imgSrcc = response.newFileName;
      },
      error => {
        console.error('An error occurred while uploading the video thumbnail:', error);
      }
    );
  }
  
  onSave(): void {
    console.log('Form values:', this.firstFormGroup.value);
    console.log('Form values:', this.secondFormGroup.value);
    
    const selectedPlaylistName = this.secondFormGroup.controls['playlistFormControl'].value;
    const selectedCategoryName = this.secondFormGroup.controls['categoryFormControl'].value;
    const videoTitle = this.secondFormGroup.controls['titleTextArea'].value;
    const videoDescription = this.secondFormGroup.controls['descriptionTextArea'].value;
    const videoScope = this.secondFormGroup.controls['scopeInputArea'].value;
  
   // Find playlist ID based on name
    const selectedPlaylist = this.playlistOptions.find(
      (playlist) => playlist.playList_Name === selectedPlaylistName
    );
    const playlistID_FK = selectedPlaylist ? selectedPlaylist.id : null;

    // Find category ID based on name
    const selectedCategory = this.categoryOptions.find(
      (category) => category.category_name === selectedCategoryName
    );
    const categoryID_FK = selectedCategory ? selectedCategory.id : null;

  
    const data = {
      VideoID_FK: this.videoID_FK,
      PlayListID_FK: playlistID_FK,
      CategoryID_FK: categoryID_FK,
      Video_Title: videoTitle,
      Video_Description: videoDescription,
      Video_Scope: videoScope
    };
    this._api.addVideoDescription(data).subscribe((res)=>{
        alert("Saved Successfully");
    })
    this.dialogRef.close();
  }
  
  

  openPlayListDialog(){
      const dialogReff= this.playListDialog.open(PlayListDialogComponent,{
      })
      dialogReff.afterClosed().subscribe(() => {
        this.getPlaylistName();
      });
  }

}