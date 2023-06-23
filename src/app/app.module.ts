import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OAuthModule } from 'angular-oauth2-oidc';
import { IndexComponent } from './index/index.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { WatchComponent } from './watch/watch.component';
import {MatButtonModule} from '@angular/material/button';
import { MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {NgSwitch, NgSwitchCase} from '@angular/common';
import { MatDialogModule} from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { SigninComponent } from './signin/signin.component';
import { ShortsComponent } from './shorts/shorts.component';
import { TestComponent } from './test/test.component';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule  } from '@angular/material/core'; 
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { SignupComponent } from './signup/signup.component';
import { DashboardComponent } from './studio/dashboard/dashboard.component';
import { ContentComponent } from './studio/content/content.component';
import { CreateChannelComponent } from './studio/create-channel/create-channel.component';
import { MatStepperModule } from '@angular/material/stepper';
import { PlayListDialogComponent } from './studio/play-list-dialog/play-list-dialog.component';
import { RouterModule } from '@angular/router';
import {MatTabsModule} from '@angular/material/tabs';
import { VideoReportDialogComponent } from './video-report-dialog/video-report-dialog.component';
import {MatRadioModule} from '@angular/material/radio';
import { ShareVideoDialogComponent } from './share-video-dialog/share-video-dialog.component';
import { ChartComponent } from './admin/chart-component/chart-component.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { AdminContentComponent } from './admin/admin-content/admin-content.component';
import { AdminSigninComponent } from './admin/admin-signin/admin-signin.component';

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    WatchComponent,
    SigninComponent,
    ShortsComponent,
    TestComponent,
    SignupComponent,
    DashboardComponent,
    ContentComponent,
    CreateChannelComponent,
    PlayListDialogComponent,
    VideoReportDialogComponent,
    ShareVideoDialogComponent,
    ChartComponent,
    AdminDashboardComponent,
    AdminContentComponent,
    AdminSigninComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule,
    OAuthModule.forRoot(),
    CarouselModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    NgSwitch,
    NgSwitchCase,
    MatDialogModule,
    MatIconModule,
    MatCardModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatStepperModule,
    MatTabsModule,
    MatRadioModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
