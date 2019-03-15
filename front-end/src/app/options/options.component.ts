import { HostListener, Input, Output, Component, OnInit, OnDestroy, EventEmitter } from '@angular/core';
import { SettingsService } from '../services/persistence/settings.service';
import { UserService } from '../services/user/user.service';
import { Router } from '@angular/router';
import { Difficulty } from '../interfaces/difficulty';
import { Game } from '../classes/game';
import { GameListAllService } from '../services/games/game-list-all.service';
import { OptionsService } from '../services/games/options.service';
import { Subscription } from 'rxjs/Subscription';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.css']
})
export class OptionsComponent implements OnInit, OnDestroy {

  private _gameID: number;
  get gameID(): number {
    return this._gameID;
  }
  set gameID(gameID: number) {
    this._gameID = gameID;
    this.game = GameListAllService.getGameById(this.gameID);
    this.diffs = this.game.diffs;
    this.rules = this.game.rules;
    this.controls = this.game.controls;
  }

  public seed: number;
  public difficulty: number;
  private _newDifficulty: number;
  get newDifficulty(): number {
    return this._newDifficulty;
  }
  set newDifficulty(newDifficulty: number) {
    this._newDifficulty = newDifficulty;
    this.optionsService.setNewDifficulty(newDifficulty);
  }

  public rules: string;
  public controls: string;
  public hotkeys: any;
  public options: any;
  public takingNotesMode: boolean;

  private _takingNotes = false;
  get takingNotes(): boolean {
    return this._takingNotes;
  }
  set takingNotes(takingNotes: boolean) {
    this._takingNotes = takingNotes;
    this.optionsService.setTakingNotes(takingNotes);
  }

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

  private subscription = new Subscription();

  constructor(
    private user: UserService,
    private router: Router,
    private optionsService: OptionsService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    if (this.options !== undefined) {
      for (const option of this.options) {
        if (option['type'] === 'checkbox') {
          this.optionVals.push(SettingsService.getDataBool(option['storedName']));
        } else if (option['type'] === 'dropdown') {
          this.optionVals.push(SettingsService.getDataStr(option['storedName']));
        }
      }
    }

    if (this.hotkeys !== undefined) {
      for (const hotkey of this.hotkeys) {
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

    let subscription: Subscription;
    subscription = this.optionsService.gameID.subscribe(gameID => this.gameID = gameID);
    this.subscription.add(subscription);
    subscription = this.optionsService.seed.subscribe(seed => this.seed = seed);
    this.subscription.add(subscription);
    subscription = this.optionsService.difficulty.subscribe(difficulty => this.difficulty = difficulty);
    this.subscription.add(subscription);

    subscription = this.optionsService.hotkeys.subscribe(hotkeys => this.hotkeys = hotkeys);
    this.subscription.add(subscription);
    subscription = this.optionsService.options.subscribe(options => this.options = options);
    this.subscription.add(subscription);
    subscription = this.optionsService.takingNotesMode.subscribe(takingNotesMode => this.takingNotesMode = takingNotesMode);
    this.subscription.add(subscription);

    subscription = this.optionsService.personalBestMonthly.subscribe(personalBestMonthly => this.personalBestMonthly = personalBestMonthly);
    this.subscription.add(subscription);
    subscription = this.optionsService.personalBestWeekly.subscribe(personalBestWeekly => this.personalBestWeekly = personalBestWeekly);
    this.subscription.add(subscription);
    subscription = this.optionsService.personalBestDaily.subscribe(personalBestDaily => this.personalBestDaily = personalBestDaily);
    this.subscription.add(subscription);
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
    this.snackBar.open('Copied!', '', {
      duration: 1500,
    });

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

  callback(func: string) {
    document.getElementById('focusMe').focus();
    this.optionsService.setOptionEvent(func);
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
    this.optionSelected.emit('this.newGame(' + diff + ')');
  }

  public difficultyChangeHandler(newDiff: any) {
    this.newDifficulty = newDiff;
    this.callback('this.newGame()');
  }

  public ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
