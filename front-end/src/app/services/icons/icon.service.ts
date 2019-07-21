import { Injectable, PLATFORM_ID, Inject, Component, OnInit, HostListener } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class IconService {
  private iconColors = [
    ['#f24b3e', '#fbc9c5'],
    ['#ffba53', '#ffe3b9'],
    ['#4bb5ac', '#b6e0dd'],
    ['#4ab93b', '#bee8b7'],
    ['#f24b3e', '#fbc9c5'],
    ['#ffba53', '#ffe3b9'],
    ['#4bb5ac', '#b6e0dd'],
    ['#4ab93b', '#bee8b7']
  ];

  private styleElement: HTMLStyleElement = null;
  private profileStyleElement: HTMLStyleElement = null;

  /**
   * Updates the selected profile level up bar color based on the color of the profile icon
   * @param iconNum The icon number to grab the main color from
   */
  public configureProfileBarColors(iconNum: number) {
    // This is because SSR can't access the document object
    if (!isPlatformBrowser(this.platformId)) return;

    const head = document.getElementsByTagName('head')[0];
    const css = `
      #profile-progress .mat-progress-bar-fill::after {
        background-color: ${this.iconColors[iconNum][0]} !important;
      }

      #profile-progress .mat-progress-bar-buffer {
        background-color: ${this.iconColors[iconNum][1]} !important;
      }
    `;

    this.profileStyleElement.innerHTML = '';
    this.profileStyleElement.type = 'text/css';
    this.profileStyleElement.appendChild(document.createTextNode(css));
    head.appendChild(this.profileStyleElement);
  }

  /**
   * Updates the header level up bar color based on the color of the profile icon
   * @param iconNum The icon number to grab the main color from
   */
  public configureHeaderBarColors(iconNum: number) {
    // This is because SSR can't access the document object
    if (!isPlatformBrowser(this.platformId)) return;

    const head = document.getElementsByTagName('head')[0];
    const css = `
      #header-progress .mat-progress-bar-fill::after {
        background-color: ${this.iconColors[iconNum][0]} !important;
      }

      #header-progress .mat-progress-bar-buffer {
        background-color: ${this.iconColors[iconNum][1]} !important;
      }
    `;

    this.styleElement.innerHTML = '';
    this.styleElement.type = 'text/css';
    this.styleElement.appendChild(document.createTextNode(css));
    head.appendChild(this.styleElement);
  }

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object
  ) { 
    if (isPlatformBrowser(this.platformId)) {
      this.styleElement = document.createElement('style');
      this.profileStyleElement = document.createElement('style');
    }
  }
}
