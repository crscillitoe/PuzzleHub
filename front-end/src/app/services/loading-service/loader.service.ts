import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  public loading: any = new Subject();

  constructor() { }

  startLoadingAnimation() {
    console.log('load on');
    this.loading.next(true);
  }

  stopLoadingAnimation() {
    console.log('load off');
    this.loading.next(false);
  }
}
