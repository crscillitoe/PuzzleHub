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
    this.loggedIn = name != "";
    this.username.next(name);
  }

  isLoggedIn() {
    return this.loggedIn;
  }
}
