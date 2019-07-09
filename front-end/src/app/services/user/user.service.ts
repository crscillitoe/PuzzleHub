import { PLATFORM_ID, Injectable, Inject } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { TunnelService } from '../tunnel/tunnel.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public xpPerLevel = 2000;

  private loggedIn = false;
  private xp = 0;
  private _level = 0;
  public user: string;

  private _accountData: BehaviorSubject<AccountData> = new BehaviorSubject<AccountData>(null);
  public accountData = this._accountData.asObservable();

  logOut() {
    this._accountData.next(null);
  }

  reloadAccountData() {
    if (this.isLoggedIn()) {
      this.tunnelService.getUserData()
        .subscribe((data: AccountData) => {
          data.level = this.calculateLevelFromXp(data.xp);
          data.xpToNextLevel = data.xp % this.xpPerLevel;

          if (data.username.toLowerCase() == 'arco') {
            let audio = new Audio();
            audio.src = '../../../assets/arco/jam.mp3';
            audio.loop = true;
            audio.load();
            audio.play();
            console.log(audio);
          }

          this._accountData.next(data);
        });
    }
  }

  constructor(@Inject(PLATFORM_ID) private platformId: Object, private tunnelService: TunnelService) { 
    this.reloadAccountData();
  }


  isLoggedIn() {
    if(isPlatformBrowser(this.platformId)) {
      return this.getCookie('PuzzleHubToken') !== '';
    } else {
      return false;
    }
  }

  calculateLevelFromXp(xp) {
    return Math.floor(xp / this.xpPerLevel) + 1;
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

export class AccountData {
  public userId: number;
  public puzzlerIcon: number;
  public role: string;
  public username: string;
  public xp: number;
  public level: number;
  public xpToNextLevel: number;
}
