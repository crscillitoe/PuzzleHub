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

  public static xpPerLevel: number = 2000;

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
    return Math.floor(this.xp / this.xpPerLevel) + 1;
  }

  static nextLevelThreshold() {
    return this.xpPerLevel;
  }

  static xpToNextLevel() {
    return this.xp % this.xpPerLevel;
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
