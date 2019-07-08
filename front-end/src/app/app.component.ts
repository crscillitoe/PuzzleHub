import { Component } from '@angular/core';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { UserService } from './services/user/user.service';
import { Router, Event as RouterEvent,
    NavigationStart,
    NavigationEnd,
    NavigationCancel,
    NavigationError
} from '@angular/router';
import { NgZone, Renderer, ElementRef, ViewChild } from '@angular/core';
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
    private user: UserService,
    private domSanitizer: DomSanitizer,
    public matIconRegistry: MatIconRegistry
  ) {
    loader.loading
     .subscribe( (data) => {
        if (data) {
          // loading
          this.ngZone.runOutsideAngular( () => {
            this.renderer.setElementStyle(
              this.spinnerElement.nativeElement,
              'display',
              'inline'
            );
          });
        } else {
          // stop loading
          this.ngZone.runOutsideAngular( () => {
            this.renderer.setElementStyle(
              this.spinnerElement.nativeElement,
              'display',
              'none'
            );
          });
        }
      });

    /*router.events.subscribe( (event) => {
        this.navigationInterceptor(event)
      });*/
    matIconRegistry.addSvgIcon(
      'sudokuIcon',
      domSanitizer.bypassSecurityTrustResourceUrl('assets/images/game-splashes/sudoku.svg'));
    matIconRegistry.addSvgIcon(
      'takuzuIcon',
      domSanitizer.bypassSecurityTrustResourceUrl('assets/images/game-splashes/takuzu.svg'));
    matIconRegistry.addSvgIcon(
      'nonogramsIcon',
      domSanitizer.bypassSecurityTrustResourceUrl('assets/images/game-splashes/nonograms.svg'));
    matIconRegistry.addSvgIcon(
      'thermometersIcon',
      domSanitizer.bypassSecurityTrustResourceUrl('assets/images/game-splashes/thermometers.svg'));
    matIconRegistry.addSvgIcon(
      'hashiIcon',
      domSanitizer.bypassSecurityTrustResourceUrl('assets/images/game-splashes/hashi.svg'));
    matIconRegistry.addSvgIcon(
      'tilegameIcon',
      domSanitizer.bypassSecurityTrustResourceUrl('assets/images/game-splashes/tilegame.svg'));
    matIconRegistry.addSvgIcon(
      'minesweeperIcon',
      domSanitizer.bypassSecurityTrustResourceUrl('assets/images/game-splashes/minesweeper.svg'));
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
}
