import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public username: any = new Subject();
  private loggedIn: boolean = false;

  constructor() { }

  setUserName(name) {
    if(name != "") {
      this.loggedIn = true;
    } else {
      this.loggedIn = false;
    }

    this.username.next(name);
  }

  isLoggedIn() {
    return this.getCookie('PuzzleHubToken') != "";
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
