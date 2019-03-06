import { Input, Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-level-progress',
  templateUrl: './level-progress.component.html',
  styleUrls: ['./level-progress.component.scss']
})
export class LevelProgressComponent implements OnInit {

  @Input() level;
  @Input() currVal;
  @Input() maxVal;

  first: boolean = true;

  displayXpGain: boolean = false;
  xpGain: string = '';

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes) {
    var xpGain = changes.currVal.currentValue - changes.currVal.previousValue;
    var levelup = false;
    if(xpGain < 0) {
      levelup = true;
      xpGain = xpGain + UserService.xpPerLevel;
    }

    if('' + xpGain != 'NaN' && !this.first) {
      if(!levelup) {
        this.xpGain = '+ ' + xpGain;
      } else {
        this.xpGain = 'Level up!';
      }
      this.displayXpGain = true;
      var that = this;
      setTimeout(function() { that.displayXpGain = false; } , 1500);
    } else if('' + xpGain != 'NaN') {
      this.first = false;
    }

    var bar = document.getElementById('levelProgressBar');
    bar.setAttribute('data-progress', '' + this.getProgress());
  }

  getProgress() {
    console.log(Math.floor((this.currVal / this.maxVal) * 100));
    return Math.floor((this.currVal / this.maxVal) * 100);
  }

}
