import { HostListener, Input, Output, Component, OnInit, EventEmitter } from '@angular/core';
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
  @Input() hotkeys: any;

  @Output() optionSelected = new EventEmitter();

  highscoresMinimized: boolean;
  rulesMinimized: boolean;
  optionsMinimized: boolean;
  controlsMinimized: boolean;
  timerMinimized: boolean;
  hotkeysMinimized: boolean;

  editingHotkey: boolean;
  editIndex: number;

  optionVals: any = [];
  hotkeyVals: any = [];

  constructor() { }

  ngOnInit() {
    if(this.options != undefined) {
      for(let option of this.options) {
        if(option['type'] == 'checkbox') {
          this.optionVals.push(SettingsService.getDataBool(option['storedName']));
        }
      }
    }

    if(this.hotkeys != undefined) {
      for(let hotkey of this.hotkeys) {
        this.hotkeyVals.push(SettingsService.getDataNum(hotkey['bindTo']));
      }
    }

    this.editingHotkey = false;
    this.editIndex = -1;
    this.highscoresMinimized = SettingsService.getDataBool('highscoresMinimized');
    this.rulesMinimized = SettingsService.getDataBool('rulesMinimized');
    this.optionsMinimized = SettingsService.getDataBool('optionsMinimized');
    this.controlsMinimized = SettingsService.getDataBool('controlsMinimized');
    this.timerMinimized = SettingsService.getDataBool('timerMinimized');
    this.hotkeysMinimized = SettingsService.getDataBool('hotkeysMinimized');
  }

  minimize(name, val) {
    SettingsService.storeData(name, val);
  }

  callback(func) {
    this.optionSelected.emit(func);
  }

  editHotkey(index) {
    this.editIndex = index;
    this.editingHotkey = true;
  }

  convertCodeToStr(code) {
    return String.fromCharCode(code);
  }

  @HostListener('document:keydown', ['$event'])
  keyPressed(keyEvent) {
    if(this.editingHotkey) {
      SettingsService.storeData( (this.hotkeys[this.editIndex])['bindTo'], keyEvent.keyCode );
      this.hotkeyVals[this.editIndex] = keyEvent.keyCode;
      this.callback( (this.hotkeys[this.editIndex])['callback'] );

      this.editingHotkey = false;
      this.editIndex = -1;
    }
  }
}
