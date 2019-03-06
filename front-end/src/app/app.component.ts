import { Component } from '@angular/core';
import { UserService } from './services/user/user.service';
import { Router, Event as RouterEvent,
    NavigationStart,
    NavigationEnd,
    NavigationCancel,
    NavigationError
} from '@angular/router';
import {NgZone, Renderer, ElementRef, ViewChild} from '@angular/core'
import { LoaderService } from './services/loading-service/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  @ViewChild('spinnerElement')
  spinnerElement: ElementRef;

  constructor(
    private loader: LoaderService,
    private router: Router,
    private ngZone: NgZone,
    private renderer: Renderer,
    private user: UserService
  ) {
    loader.loading
     .subscribe( (data) => {
        if(data) {
          // loading
          this.ngZone.runOutsideAngular( () => {
            this.renderer.setElementStyle(
              this.spinnerElement.nativeElement,
              'display',
              'inline'
            )
          });
        } else {
          // stop loading
          this.ngZone.runOutsideAngular( () => {
            this.renderer.setElementStyle(
              this.spinnerElement.nativeElement,
              'display',
              'none'
            )
          });
        }
      });

    /*router.events.subscribe( (event) => {
        this.navigationInterceptor(event)
      });*/
  }

  isLoggedIn() {
    return this.user.isLoggedIn();
  }

    navigationInterceptor(event) {
      if (event instanceof NavigationStart) {
        this.loader.startLoadingAnimation();
      }
        /*if (event instanceof NavigationEnd) {
        this.loader.stopLoadingAnimation();
      }

      if (event instanceof NavigationCancel) {
        this.loader.stopLoadingAnimation();
      }
      if (event instanceof NavigationError) {
        this.loader.stopLoadingAnimation();
      }*/
    }

  getLevel() {
    return UserService.calculateLevel();
  }

  xpToNextLevel() {
    return UserService.xpToNextLevel();
  }

  nextLevelThreshold() {
    return UserService.nextLevelThreshold();
  }

}
