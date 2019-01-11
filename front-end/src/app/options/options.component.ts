import { Input, Output, Component, OnInit, EventEmitter } from '@angular/core';
import { SettingsService } from '../services/persistence/settings.service';

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.css']
})
export class OptionsComponent implements OnInit {

  @Input() personalBestMonthly: string;
  @Input() personalBestWeekly: string;
  @Input() personalBestDaily: string;

  @Input() controls: string;
  @Input() rules: string;

  @Input() options: any;

  @Output() optionSelected = new EventEmitter();

  highscoresMinimized: boolean;
  rulesMinimized: boolean;
  optionsMinimized: boolean;
  controlsMinimized: boolean;
  timerMinimized: boolean;

  optionVals: any = [];

  constructor() { }

  ngOnInit() {
    if(this.options != undefined) {
      for(let option of this.options) {
        if(option['type'] == 'checkbox') {
          this.optionVals.push(SettingsService.getDataBool(option['storedName']));
        }
      }
    }

    this.highscoresMinimized = SettingsService.getDataBool('highscoresMinimized');
    this.rulesMinimized = SettingsService.getDataBool('rulesMinimized');
    this.optionsMinimized = SettingsService.getDataBool('optionsMinimized');
    this.controlsMinimized = SettingsService.getDataBool('controlsMinimized');
    this.timerMinimized = SettingsService.getDataBool('timerMinimized');
  }

  minimize(name, val) {
    SettingsService.storeData(name, val);
  }

  callback(func) {
    this.optionSelected.emit(func);
  }
}
