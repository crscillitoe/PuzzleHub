import { PLATFORM_ID, Inject, Input, Component, OnInit, OnChanges } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-xp-bar',
  templateUrl: './xp-bar.component.html',
  styleUrls: ['./xp-bar.component.scss']
})
export class XpBarComponent implements OnInit, OnChanges {

  @Input() progress: number;
  @Input() color: string;
  @Input() accentColor: string;
  @Input() className: string;

  private styleElement: HTMLStyleElement = null;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
  }

  ngOnInit() {
    if(isPlatformBrowser(this.platformId))
      this.styleElement = document.createElement('style');
    this.updateColors();
  }

  ngOnChanges() {
    this.updateColors();
  }

  updateColors() {
    if (isPlatformBrowser(this.platformId)) {
      try {
        const head = document.getElementsByTagName('head')[0];
        const css = `
          #${this.className} .mat-progress-bar-fill::after {
            background-color: ${this.color} !important;
          }
          #${this.className} .mat-progress-bar-buffer {
            background-color: ${this.accentColor} !important;
          }
        `

        this.styleElement.innerHTML = '';
        this.styleElement.type = 'text/css';
        this.styleElement.appendChild(document.createTextNode(css));
        head.appendChild(this.styleElement);
      } catch (e) {

      }
    }
  }

}
