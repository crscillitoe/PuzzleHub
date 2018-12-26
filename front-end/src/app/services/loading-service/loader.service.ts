import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  public loading: any = new Subject();

  constructor() { }

  startLoadingAnimation() {
    this.loading.next(true);
  }

  stopLoadingAnimation() {
    this.loading.next(false);
  }
}
