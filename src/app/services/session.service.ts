import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private readonly SESSION_KEY = 'userSession';

  setSessionData(id: number, name:string, picture:string): void {
    const sessionData = {id, name, picture};
    sessionStorage.setItem(this.SESSION_KEY, JSON.stringify(sessionData));
  }

  getSessionData(): {id: number, name:string, picture:string } | null {
    const sessionData = sessionStorage.getItem(this.SESSION_KEY);
    return sessionData ? JSON.parse(sessionData) : null;
  }

  clearSessionData(): void {
    sessionStorage.removeItem(this.SESSION_KEY);
  }

  isLoggedIn(): boolean {
    return !!this.getSessionData();
  }
}
