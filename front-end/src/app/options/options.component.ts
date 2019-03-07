import { HostListener, Input, Output, Component, OnInit, EventEmitter } from '@angular/core';
import { SettingsService } from '../services/persistence/settings.service';
import { GameDataService } from '../services/games/game-data.service';

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

  @Input() gameID: number;
  @Input() seed: number;
  @Input() difficulty: number;

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
        } else if(option['type'] == 'dropdown') {
          this.optionVals.push(SettingsService.getDataStr(option['storedName']));
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

  updateAndCallback(func, name, newVal) {
    SettingsService.storeData(name, newVal);
    this.callback(func);
  }

  setCopyButtonText(text) {
    var button = document.getElementById('shareButtonText');
    button.textContent = text;
  }

  copyGameLink() {
    this.setCopyButtonText('Copied!');
    var that = this;
    setTimeout(function() { that.setCopyButtonText('SHARE GAME') }, 1500);

    this.copyMessage(this.generatePuzzleLink());
  }

  generatePuzzleLink() {
    var gameData = this.getGameData();

    var link = "https://puzzle-hub.com/" +
                gameData.Name + ";diff=" +
                this.difficulty + ";seed=" +
                this.seed;

    return link.replace(/ /g, "%20");
  }

  getGameData() {
    for(var i = 0 ; i < GameDataService.games.length ; i++) {
      if(GameDataService.games[i].GameID == this.gameID) {
        return GameDataService.games[i];
      }
    }
  }

  copyMessage(val: string){
    let selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = val;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }

  callback(func) {
    document.getElementById('focusMe').focus();
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
