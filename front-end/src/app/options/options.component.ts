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

  @Input() gameID: number;
  @Input() seed: number;
  @Input() difficulty: number;

  public rules: string;
  public controls: string;

  @Input() hotkeys: any;
  @Input() options: any;

  @Input() takingNotesMode: boolean;
  public takingNotes = false;

  @Input() personalBestMonthly: string;
  @Input() personalBestWeekly: string;
  @Input() personalBestDaily: string;

  @Output() optionSelected = new EventEmitter();
  @Output() notesEvent = new EventEmitter();

  public game: Game;

  public selectedDifficulty: number;
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

    this.game = GameListAllService.getGameById(this.gameID);
    this.rules = this.game.rules;
    this.controls = this.game.controls;
    this.populateDifficulties();

    this.selectedDifficulty = this.difficulty;
  }

  populateDifficulties() {
    this.diffs = this.game.diffs.filter(
      d => (
        d.minLevel === 0 ||
        (this.user.isLoggedIn && this.getLevel() >= d.minLevel)
      ) &&
      (
        ! d.requiresLogin || this.isLoggedIn()
      )
    );
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
    const numPressed = keyEvent.keyCode;
    if (numPressed === 84) {
      this.onNotesChange();
      return;
    }
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
    return this.user.calculateLevel();
  }

  playGame(route, diff) {
    const m = {
      diff: diff
    };
    this.optionSelected.emit('this.newGame(' + diff + ')');
  }

  onNotesChange() {
    this.takingNotes = ! this.takingNotes;
    this.notesEvent.emit(this.takingNotes);
  }

  public difficultyChangeHandler(newDiff: any) {
    const m = {
      diff: newDiff
    };
    const route = this.game.name;

    this.router.navigate([route, m]);
    this.optionSelected.emit('this.newGame(' + newDiff + ')');
  }

  public ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
