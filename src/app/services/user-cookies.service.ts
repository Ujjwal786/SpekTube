import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class UserCookiesService {
  constructor(private cookieService: CookieService) {}

  setCookie(userInfo: any) {
    const expirationDate = new Date();
    expirationDate.setFullYear(expirationDate.getFullYear() + 1);
    this.cookieService.set('id', userInfo.id, expirationDate);
    this.cookieService.set('name', userInfo.name, expirationDate);
    this.cookieService.set('picture', userInfo.picture, expirationDate);
  }

  getCookieValues() {
    const id = this.cookieService.get('id');
    const name = this.cookieService.get('name');
    const picture = this.cookieService.get('picture');
    return { id, name, picture };
  }

  removeCookie() {
    this.cookieService.delete('id');
    this.cookieService.delete('name');
    this.cookieService.delete('picture');
  }
}
