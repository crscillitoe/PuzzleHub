import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IconService {
  private static iconColors = [
    ['#f24b3e', '#fbc9c5'],
    ['#ffba53', '#ffe3b9'],
    ['#4bb5ac', '#b6e0dd'],
    ['#4ab93b', '#bee8b7'],
    ['#f24b3e', '#fbc9c5'],
    ['#ffba53', '#ffe3b9'],
    ['#4bb5ac', '#b6e0dd'],
    ['#4ab93b', '#bee8b7']
  ];

  private static styleElement = document.createElement('style');
  private static profileStyleElement = document.createElement('style');

  public static configureProfileBarColors(iconNum: number) {
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

  public static configureHeaderBarColors(iconNum: number) {
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

  constructor() { }
}
