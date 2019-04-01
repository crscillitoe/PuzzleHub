import { HostListener, Component, OnInit, OnDestroy } from '@angular/core';
import { LoaderService } from '../services/loading-service/loader.service';
import { TimerService } from '../services/timer/timer.service';
import { TunnelService } from '../services/tunnel/tunnel.service';
import { UserService } from '../services/user/user.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { GameID } from '../enums/game-id.enum';
import { Game } from './game';
import { ColorService } from '../services/colors/color.service';
import { GameStarterService } from '../services/generators/game-starter.service';
import { GameListAllService } from '../services/games/game-list-all.service';
import { Options } from '../interfaces/options';
import { OptionsService } from '../services/games/options.service';
import { Subscription } from 'rxjs/Subscription';

export class GameBoard implements OnInit, OnDestroy {
  private _gameID: number;
  get gameID(): number {
    return this._gameID;
  }
  set gameID(gameID: number) {
    this._gameID = gameID;
    this.game = GameListAllService.getGameById(gameID);
    this.optionsService.setGameID(gameID);
  }

  private game: Game;

  private _seed: number;
  get seed(): number {
    return this._seed;
  }
  set seed(seed: number) {
    this._seed = seed;
    this.optionsService.setSeed(seed);
  }

  private _difficulty: number;
  get difficulty(): number {
    return this._difficulty;
  }
  set difficulty(difficulty: number) {
    this._difficulty = difficulty;
    this.optionsService.setDifficulty(difficulty);
  }

  private _hotkeys: any;
  get hotkeys(): any {
    return this._hotkeys;
  }
  set hotkeys(hotkeys: any) {
    this._hotkeys = hotkeys;
    this.optionsService.setHotkeys(hotkeys);
  }

  private _takingNotesMode = false;
  get takingNotesMode(): boolean {
    return this._takingNotesMode;
  }
  set takingNotesMode(takingNotesMode: boolean) {
    this._takingNotesMode = takingNotesMode;
    this.optionsService.setTakingNotesMode(takingNotesMode);
  }

  public takingNotes = false;

  private _options: any;
  get options(): any {
    return this._options;
  }
  set options(options: any) {
    this._options = options;
    this.optionsService.setOptions(options);
  }

  private _personalBestMonthly: string;
  get personalBestMonthly(): any {
    return this._personalBestMonthly;
  }
  set personalBestMonthly(personalBestMonthly: any) {
    this._personalBestMonthly = personalBestMonthly;
    this.optionsService.setPersonalBestMonthly(personalBestMonthly);
  }

  private _personalBestWeekly: string;
  get personalBestWeekly(): any {
    return this._personalBestWeekly;
  }
  set personalBestWeekly(personalBestWeekly: any) {
    this._personalBestWeekly = personalBestWeekly;
    this.optionsService.setPersonalBestWeekly(personalBestWeekly);
  }

  private _personalBestDaily: string;
  get personalBestDaily(): any {
    return this._personalBestDaily;
  }
  set personalBestDaily(personalBestDaily: any) {
    this._personalBestDaily = personalBestDaily;
    this.optionsService.setPersonalBestDaily(personalBestDaily);
  }

  public canvas: any;
  public context: any;

  public canvasOffsetX = 225;
  public canvasOffsetY = 56;

  public gridBoxSize: number;
  public gridOffsetX = 100;
  public gridOffsetY = 100;

  public selectedX: number;
  public selectedY: number;

  public colors: any;

  public mb1Pressed = false;
  public mb2Pressed = false;

  public startDate: any;
  public t: any;
  public solved = false;

  private subscription = new Subscription();

  constructor(
    protected route: ActivatedRoute,
    protected colorService: ColorService,
    protected router: Router,
    protected tunnel: TunnelService,
    protected userService: UserService,
    protected timer: TimerService,
    protected loader: LoaderService,
    protected optionsService: OptionsService
  ) {
    this.colors = colorService.getColorScheme();
  }

  public ngOnInit() {
    this.difficulty = Number(this.route.snapshot.paramMap.get('diff'));

    this.setupBoard();
    const that = this;
    GameStarterService.startGame(that);
    this.initializeOptions();
  }

  public setupBoard() {
    this.canvas = document.getElementById('myCanvas');
    this.context = this.canvas.getContext('2d');
  }

  public newGame(difficulty = this.difficulty) {
    this.difficulty = difficulty;
    this.setupBoard();
    const that = this;
    GameStarterService.loadBestTimes(that);
    GameStarterService.newGame(that);
  }

  public add(that) {
    const display = document.getElementById('timer');
    const now = +new Date();

    const diff = ((now - that.startDate));

    const hours   = Math.trunc(diff / (60 * 60 * 1000));
    const minutes = Math.trunc(diff / (60 * 1000)) % 60;
    const seconds = Math.trunc(diff / (1000)) % 60;
    const millis  = diff % 1000;

    try {
      if (!that.solved) {
        display.textContent =
          (minutes ? (minutes > 9 ? minutes : '0' + minutes) : '00') + ':' +
          (seconds ? (seconds > 9 ? seconds : '0' + seconds) : '00') + '.' +
          (millis  ? (millis > 99 ? millis : millis > 9 ? '0' + millis : '00' + millis) : '000');

        that.displayTimer();
      }
    } catch {
      // Do nothing - page probably re-routed
    }
  }

  public displayTimer() {
    if (!this.solved) {
      const _this = this;
      this.t = setTimeout(function() { _this.add(_this); }, 50);
    }
  }

  public done() {
    const that = this;
    GameStarterService.done(that);
  }

  public draw() {
    this.context.beginPath();
    this.drawBackground();
  }

  public drawBackground() {
    this.context.fillStyle = this.colors.BACKGROUND; // Background color
    this.context.fillRect(0, 0, this.canvas.offsetWidth * 2, this.canvas.offsetHeight * 2);
  }

  @HostListener('document:keydown', ['$event'])
  public keyPressed(keyEvent) {
    if (keyEvent.keyCode === 32) {
      this.newGame();
      return;
    }
  }

  public keyReleased(keyEvent) {
    console.log({'keyReleased': keyEvent.keyCode});
  }

  protected initializeOptions() {
    let subscription: Subscription;
    subscription = this.optionsService.takingNotes.subscribe(takingNotes => this.takingNotes = takingNotes);
    this.subscription.add(subscription);
  }

  public handleOption(callback) {
    eval(callback);
  }

  public notesHandler($event: any) { }

  public ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
