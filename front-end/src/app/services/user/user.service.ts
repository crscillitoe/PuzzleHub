import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }
  private static xp = 0;

  public static xpPerLevel = 2000;
  public username: any = new Subject();
  private loggedIn = false;
  public user: string;

  static setXp(xp) {
    this.xp = xp;
  }

  static addXp(xp) {
    this.xp += xp;
  }

  static calculateLevel() {
    return Math.floor(this.xp / this.xpPerLevel) + 1;
  }

  static calculateLevelFromXp(xp) {
    return Math.floor(xp / this.xpPerLevel) + 1;
  }

  static nextLevelThreshold() {
    return this.xpPerLevel;
  }

  static xpToNextLevel() {
    return this.xp % this.xpPerLevel;
  }

  setUserName(name) {
    if (name != '') {
      this.loggedIn = true;
    } else {
      this.loggedIn = false;
    }

    this.user = name;
    this.username.next(name);
  }

  isLoggedIn() {
    return this.getCookie('PuzzleHubToken') != '';
  }

  getCookie(cookieName) {
    let name = cookieName + '=';
    let cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      let cookie = cookies[i];
      while (cookie.charAt(0) === ' ') {
        cookie = cookie.substring(1);
      }

      if (cookie.indexOf(cookieName) === 0) {
        return cookie.substring(cookieName.length + 1, cookie.length);
      }
    }

    return '';
  }
}
