import { Inject, PLATFORM_ID, Input, Component, OnInit, OnChanges } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-level-progress',
  templateUrl: './level-progress.component.html',
  styleUrls: ['./level-progress.component.scss']
})
export class LevelProgressComponent implements OnInit, OnChanges {

  @Input() level;
  @Input() currVal;
  @Input() maxVal;

  first = true;

  displayXpGain = false;
  xpGain = '';

  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  ngOnInit() {
  }

  isVisible() {
    if(isPlatformBrowser(this.platformId)) {
      const canvas = document.getElementById('myCanvas');
      if (canvas != null) {
        const bar = document.getElementById('levelProgressBar');
        try {
          bar.setAttribute('data-progress', '' + this.getProgress());
        } catch {}
      }
      return canvas != null;
    } else {
      return false;
    }
  }

  ngOnChanges(changes) {
    let xpGain = changes.currVal.currentValue - changes.currVal.previousValue;
    let levelup = false;
    if (xpGain < 0) {
      levelup = true;
      xpGain = xpGain + UserService.xpPerLevel;
    }

    if ('' + xpGain !== 'NaN' && !this.first) {
      if (!levelup) {
        this.xpGain = '+ ' + xpGain;
      } else {
        this.xpGain = 'Level up!';
      }
      this.displayXpGain = true;
      const that = this;
      setTimeout(function() { that.displayXpGain = false; } , 1500);
    } else if ('' + xpGain !== 'NaN') {
      this.first = false;
    }

    if(isPlatformBrowser(this.platformId)) {
      const bar = document.getElementById('levelProgressBar');
      try {
        bar.setAttribute('data-progress', '' + this.getProgress());
      } catch {
      }
    }
  }

  getProgress() {
    return Math.floor((this.currVal / this.maxVal) * 100);
  }

}
