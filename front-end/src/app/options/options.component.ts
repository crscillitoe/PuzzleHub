import { HostListener, Input, Output, Component, OnInit, EventEmitter } from '@angular/core';
import { SettingsService } from '../services/persistence/settings.service';
import { UserService } from '../services/user/user.service';
import { Router } from '@angular/router';
import { Difficulty } from '../interfaces/difficulty';
import { Game } from '../classes/game';
import { GameListAllService } from '../services/games/game-list-all.service';
import { Options } from '../interfaces/options';
import { OptionsService } from '../services/games/options.service';

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.css']
})
export class OptionsComponent implements OnInit {

  public gameID: number;
  public seed: number;
  public difficulty: number;

  public rules: string;
  public controls: string;
  public hotkeys: any;
  public options: any;

  public personalBestMonthly: string;
  public personalBestWeekly: string;
  public personalBestDaily: string;

  @Output() optionSelected = new EventEmitter();

  public game: Game;
  public diffs: Difficulty[];

  public highscoresMinimized: boolean;
  public rulesMinimized: boolean;
  public optionsMinimized: boolean;
  public controlsMinimized: boolean;
  public timerMinimized: boolean;
  public hotkeysMinimized: boolean;

  public editingHotkey: boolean;
  public editIndex: number;

  public optionVals: any = [];
  public hotkeyVals: any = [];

  private optionsData: Options;

  constructor(
    private user: UserService,
    private router: Router,
    private optionsService: OptionsService
  ) { }

  ngOnInit() {
    if (this.options !== undefined) {
      for (let option of this.options) {
        if (option['type'] === 'checkbox') {
          this.optionVals.push(SettingsService.getDataBool(option['storedName']));
        } else if (option['type'] === 'dropdown') {
          this.optionVals.push(SettingsService.getDataStr(option['storedName']));
        }
      }
    }

    if (this.hotkeys !== undefined) {
      for (let hotkey of this.hotkeys) {
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
    const button = document.getElementById('shareButtonText');
    button.textContent = text;
  }

  copyGameLink() {
    this.setCopyButtonText('Copied!');
    var that = this;
    setTimeout(function() { that.setCopyButtonText('SHARE GAME') }, 1500);

    this.copyMessage(this.generatePuzzleLink());
  }

  generatePuzzleLink() {
    const link = 'https://puzzle-hub.com/' +
                this.game.name + ';diff=' +
                this.difficulty + ';seed=' +
                this.seed;

    return link.replace(/ /g, '%20');
  }

  copyMessage(val: string) {
    const selBox = document.createElement('textarea');
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
    if (this.editingHotkey) {
      SettingsService.storeData( (this.hotkeys[this.editIndex])['bindTo'], keyEvent.keyCode );
      this.hotkeyVals[this.editIndex] = keyEvent.keyCode;
      this.callback( (this.hotkeys[this.editIndex])['callback'] );

      this.editingHotkey = false;
      this.editIndex = -1;
    }
  }

  isLoggedIn() {
    return this.user.isLoggedIn();
  }

  getLevel() {
    return UserService.calculateLevel();
  }

  playGame(route, diff) {
    const m = {
      diff: diff
    };

    this.router.navigate([route, m]);
    this.optionSelected.emit('this.newGame(' + diff + ')');
  }

  public initializeOptionsFromService() {
    this.optionsData = this.optionsService.getOptions();

    this.gameID = this.optionsData.gameID;
    this.seed = this.optionsData.seed;
    this.difficulty = this.optionsData.difficulty;
    this.rules = this.optionsData.rules;
    this.controls = this.optionsData.controls;
    this.hotkeys = this.optionsData.hotkeys;
    this.options = this.optionsData.options;
    this.personalBestMonthly = this.optionsData.personalBestMonthly;
    this.personalBestWeekly = this.optionsData.personalBestWeekly;
    this.personalBestDaily = this.optionsData.personalBestDaily;

    this.game = GameListAllService.getGameById(this.gameID);
    this.diffs = this.game.diffs;
  }
}
