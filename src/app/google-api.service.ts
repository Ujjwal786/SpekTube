
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';
import { Subject } from 'rxjs';

const oAuthconfig: AuthConfig = {
  issuer: 'https://accounts.google.com',
  strictDiscoveryDocumentValidation: false,
  redirectUri: window.location.origin,
  clientId: '729136383764-5juum9rrqoia9kj0rs1d709judsrn63m.apps.googleusercontent.com',
  scope: 'openid profile email'
};

export interface UserInfo {
  info: {
    oauthId: string,
    fistName:string,
    lastname:string,
    email: string,
    picture: string
  };
}

@Injectable({
  providedIn: 'root'
})
export class GoogleApiService {
  userProfileSubject = new Subject<UserInfo>();

  constructor(private readonly oAuthService: OAuthService, private readonly httpClient: HttpClient) {
    oAuthService.configure(oAuthconfig);
    oAuthService.setStorage(localStorage); // Use local storage for token storage

    oAuthService.loadDiscoveryDocumentAndTryLogin().then(() => {
      if (oAuthService.hasValidAccessToken()) {
        oAuthService.loadUserProfile().then((userProfile) => {
          console.log('User Profile:', userProfile); // Log the userProfile object
          this.userProfileSubject.next(userProfile as UserInfo);
        });
      }
    });
  }

  isLoggedIn(): boolean {
    return this.oAuthService.hasValidAccessToken();
  }

  logOutFromCurrentURL(): void {
    this.oAuthService.logOut(true);
  }

  getOAuthService(): OAuthService {
    return this.oAuthService;
  }
}
