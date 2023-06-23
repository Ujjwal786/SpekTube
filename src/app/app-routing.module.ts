import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { WatchComponent } from './watch/watch.component';
import { VideoUploadDialogComponent } from './video-upload-dialog/video-upload-dialog.component';
import { SigninComponent } from './signin/signin.component';
import { ShortsComponent } from './shorts/shorts.component';
import { TestComponent } from './test/test.component';
import { DashboardComponent } from './studio/dashboard/dashboard.component';
import { AnalyticsComponent } from './studio/analytics/analytics.component';
import { ContentComponent } from './studio/content/content.component';
import { ChartComponent } from './admin/chart-component/chart-component.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { AdminContentComponent } from './admin/admin-content/admin-content.component';
import { AdminSigninComponent } from './admin/admin-signin/admin-signin.component';

const routes: Routes = [
  { path:"", redirectTo: "home",pathMatch:'full' },
  { path:'home', component: IndexComponent },
  { path: 'watch', component: WatchComponent },
  { path:'upload', component:VideoUploadDialogComponent },
  { path:'signin', component:SigninComponent },  
  { path:'shorts', component:ShortsComponent },
  { path:'test', component:TestComponent },
  { path:'dashboard',component:DashboardComponent },
  { path:'studio/dashboard', component:DashboardComponent},
  { path:'studio/content', component:ContentComponent},
  { path:'studio/analytics', component:AnalyticsComponent},
  { path:'admin', redirectTo:'admin/signin'},
  { path:'admin/signin', component:AdminSigninComponent},
  { path:'admin/dashboard', component: AdminDashboardComponent},
  { path:'admin/content', component: AdminContentComponent},
  { path:'admin/analytics', component:ChartComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule] 
})
export class AppRoutingModule { }
