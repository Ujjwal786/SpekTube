import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MyapiService } from 'src/app/services/myapi.service';
import { UserCookiesService } from 'src/app/services/user-cookies.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  constructor(private userCookies:UserCookiesService, private _myapi:MyapiService, private router:Router) {

    const data = this.userCookies.getCookieValues();
    if (!data || !data.id || !data.name || !data.picture) {
      this.router.navigate(['/home']);
    }
  }
}
