import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public username: any = new Subject();

  constructor() { }

  setUserName(name) {
    this.username.next(name);
  }
}
