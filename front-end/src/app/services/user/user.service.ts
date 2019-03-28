import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public static xpPerLevel = 2000;

  private loggedIn = false;
  private xp = 0;
  private _level = 0;
  public user: string;
  public username: any = new Subject();
  public level: any = new Subject();

  static nextLevelThreshold() {
    return UserService.xpPerLevel;
  }

  constructor() { }

  setUserName(name) {
    if (name !== '') {
      this.loggedIn = true;
    } else {
      this.loggedIn = false;
    }

    this.user = name;
    this.username.next(name);
  }

  setXp(xp) {
    this.xp = xp;
    this.setLevel();
  }

  addXp(xp) {
    this.xp += xp;
    this.setLevel();
  }

  setLevel() {
    this._level = this.calculateLevel();
    this.level.next(this._level);
  }

  isLoggedIn() {
    return this.getCookie('PuzzleHubToken') !== '';
  }

  calculateLevel() {
    return Math.floor(this.xp / UserService.xpPerLevel) + 1;
  }

  calculateLevelFromXp(xp) {
    return Math.floor(xp / UserService.xpPerLevel) + 1;
  }

  xpToNextLevel() {
    return this.xp % UserService.xpPerLevel;
  }

  getCookie(cookieName) {
    const name = cookieName + '=';
    const cookies = document.cookie.split(';');
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
