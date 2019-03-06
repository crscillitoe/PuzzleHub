import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public username: any = new Subject();
  private loggedIn: boolean = false;
  private static xp: number = 0;
  public user: string;

  constructor() { }

  setUserName(name) {
    if(name != "") {
      this.loggedIn = true;
    } else {
      this.loggedIn = false;
    }
    
    this.user = name;
    this.username.next(name);
  }

  static setXp(xp) {
    this.xp = xp;
  }

  static addXp(xp) {
    this.xp += xp;
  }

  isLoggedIn() {
    return this.getCookie('PuzzleHubToken') != "";
  }

  static calculateLevel() {
    return Math.floor(this.xp / 1000) + 1;
  }

  static nextLevelThreshold() {
    return 1000;
  }

  static xpToNextLevel() {
    return this.xp % 1000;
  }

  getCookie(cookieName) {
    var name = cookieName + '=';
    var cookies = document.cookie.split(';');
    for(var i = 0; i < cookies.length; i++) {
      var cookie = cookies[i];
      while(cookie.charAt(0) === ' ') {
        cookie = cookie.substring(1);
      }

      if(cookie.indexOf(cookieName) === 0) {
        return cookie.substring(cookieName.length + 1, cookie.length);
      }
    }

    return "";
  }
}
