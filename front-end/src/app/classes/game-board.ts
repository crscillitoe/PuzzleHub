import { HostListener, Component, OnInit } from '@angular/core';
import { LoaderService } from '../services/loading-service/loader.service';
import { TimerService } from '../services/timer/timer.service';
import { TunnelService } from '../services/tunnel/tunnel.service';
import { UserService } from '../services/user/user.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { GameID } from '../enums/game-id.enum';
import { ColorService } from '../services/colors/color.service';
import { GameStarterService } from '../services/generators/game-starter.service';
import { Options } from '../interfaces/options';
import { OptionsService } from '../services/games/options.service';

export class GameBoard implements OnInit {
  public gameID: number;
  public difficulty: number;
  public seed: number;

  public rules: string;
  public controls: any;
  public hotkeys: any;
  public options: any;

  public personalBestDaily: string;
  public personalBestWeekly: string;
  public personalBestMonthly: string;

  public canvas: any;
  public context: any;

  public canvasOffsetX = 225;
  public canvasOffsetY = 56;

  public gridBoxSize: number;
  public gridOffsetX: number;
  public gridOffsetY: number;

  public selectedX: number;
  public selectedY: number;

  public colors: any;

  public mb1Pressed = false;
  public mb2Pressed = false;

  public startDate: any;
  public t: any;
  public solved: boolean;

  public optionsData: Options;

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
          hours + ':' +
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

  protected initializeOptions() {
    this.optionsData = {
      gameID: this.gameID,
      seed: this.seed,
      difficulty: this.difficulty,
      rules: this.rules,
      controls: this.controls,
      hotkeys: this.hotkeys,
      options: this.options,
      personalBestMonthly: this.personalBestMonthly,
      personalBestWeekly: this.personalBestWeekly,
      personalBestDaily: this.personalBestDaily
    };
    this.optionsService.setOptions(this.optionsData);
    console.log(this.optionsData);
  }

  public handleOption(callback) {
    eval(callback);
  }
}
