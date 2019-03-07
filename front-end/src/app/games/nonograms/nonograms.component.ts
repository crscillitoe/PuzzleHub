import { HostListener, Component, OnInit } from '@angular/core';
import { LoaderService } from '../../services/loading-service/loader.service';
import { TimerService } from '../../services/timer/timer.service';
import { TunnelService } from '../../services/tunnel/tunnel.service';
import { UserService } from '../../services/user/user.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { GameID } from '../../enums/game-id.enum';
import { ColorService } from '../../services/colors/color.service';

import { Board } from '../../services/boards/nonograms/board.service';
import { GameStarterService } from '../../services/generators/game-starter.service';

@Component({
  selector: 'app-nonograms',
  templateUrl: './nonograms.component.html',
  styleUrls: ['./nonograms.component.css']
})
export class NonogramsComponent implements OnInit {

  gameID: number = GameID.NONOGRAMS;

  controls: string = "Left click on a tile to mark it.";
  rules: string = "Google it you goof.";

  // Used for drawing to the screen
  canvas: any;
  context: any;

  // Used to display previous best times
  personalBestDaily: string;
  personalBestWeekly: string;
  personalBestMonthly: string;

  colors: any;
  
  canvasOffsetX: number = 225;
  canvasOffsetY: number = 56;

  // Most games utilize a grid
  gridOffsetX: number = 100;
  gridOffsetY: number = 100;

  gridBoxSize: number;

  difficulty: number;
  seed: number;

  solved: boolean = false;

  board: any;

  // Used by the timer
  startDate: any;
  t: any;

  constructor(
    private route: ActivatedRoute, 
    private tunnel: TunnelService,
    private colorService: ColorService,
    private router: Router,
    private userService: UserService,
    private timer: TimerService,
    private loader: LoaderService) { 
    this.colors = colorService.getColorScheme();
  }

  ngOnInit() {
    // Read difficulty from URL param
    this.difficulty = Number(this.route.snapshot.paramMap.get('diff'));
    this.canvas = document.getElementById('myCanvas');
    this.context = this.canvas.getContext('2d');

    var width;
    var height;

    // Easy
    if(this.difficulty == 1) {
      width = 5;
      height = 5;
    } 
    
    // Medium
    else if (this.difficulty == 2) {
      width = 10;
      height = 10;
    } 
    
    // Hard
    else if (this.difficulty == 3) {
      width = 15;
      height = 15;
    } 
    
    // Extreme
    else if (this.difficulty == 4) {
      width = 20;
      height = 20;
    }

    this.board = new Board(width, height, 0); 

    var that = this;
    GameStarterService.startGame(that);
  }

  draw() {
    this.context.beginPath();
    this.drawBackground();
  }

  drawBackground() {
    this.context.fillStyle = this.colors.BACKGROUND; // Background color
    this.context.fillRect(0, 0, this.canvas.offsetWidth * 2, this.canvas.offsetHeight * 2);
  }

  done() {
    var that = this;
    GameStarterService.done(that);
  }

  add(that) {
    var display = document.getElementById("timer");
    var now = +new Date();

    var diff = ((now - that.startDate));

    var hours   = Math.trunc(diff / (60 * 60 * 1000));
    var minutes = Math.trunc(diff / (60 * 1000)) % 60;
    var seconds = Math.trunc(diff / (1000)) % 60;
    var millis  = diff % 1000;

    try {
      display.textContent = 
        hours + ":" + 
        (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" +
        (seconds ? (seconds > 9 ? seconds : "0" + seconds) : "00") + "." +
        (millis  ? (millis > 99 ? millis : millis > 9 ? "0" + millis : "00" + millis) : "000")

      that.displayTimer();
    } catch {
      // Do nothing - page probably re-routed
    }
  }

  displayTimer() {
    if(!this.solved) {
      var _this = this;
      this.t = setTimeout(function() {_this.add(_this)}, 50);
    }
  }

  fixSizes() {
    this.context.beginPath();
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.canvas.width = window.innerWidth - this.canvasOffsetX;
    this.canvas.height = window.innerHeight - (this.canvasOffsetY * 2);
    this.context.translate(0.5, 0.5);

    this.gridOffsetX = this.canvas.width / 20;
    this.gridOffsetY = this.canvas.height / 20;

    var boardLength = Math.max(this.board.width, this.board.height);
    var size = Math.min(this.canvas.offsetWidth - (this.gridOffsetX * 2), 
                        this.canvas.offsetHeight - (this.gridOffsetY * 2));

    let w = this.canvas.offsetWidth;
    let h = this.canvas.offsetHeight;
    if(w > h) {
      this.gridOffsetX = Math.round( ( w - h) / 2 ) + this.gridOffsetX;
    } else {
      this.gridOffsetY = Math.round( (h - w) / 2 ) + this.gridOffsetY;
    }

    this.gridBoxSize = Math.round((size / boardLength));
    this.draw();
  }

  newGame() {
    var that = this;
    GameStarterService.newGame(that);
  }

  handleOption(callback) {
    eval(callback);
  }

  /* EVENT LISTENERS */

  // UNCOMMENT HostListener to track given event
  //@HostListener('document:mousedown', ['$event'])
  mousePressed(mouseEvent) { 
    let x = mouseEvent.clientX - this.canvasOffsetX;
    let y = mouseEvent.clientY - this.canvasOffsetY;
    console.log({'mousePressedX':x, 'mousePressedY':y});
  }

  // UNCOMMENT HostListener to track given event
  //@HostListener('document:mouseup', ['$event'])
  mouseReleased(mouseEvent) { 
    let x = mouseEvent.clientX - this.canvasOffsetX;
    let y = mouseEvent.clientY - this.canvasOffsetY;
    console.log({'mouseReleasedX':x, 'mouseReleasedY':y});
  }

  // UNCOMMENT HostListener to track given event
  //@HostListener('document:mousemove', ['$event'])
  mouseMove(mouseEvent) {
    let x = mouseEvent.clientX - this.canvasOffsetX;
    let y = mouseEvent.clientY - this.canvasOffsetY;
    console.log({'mouseMoveX':x, 'mouseMoveY':y});
  }

  // UNCOMMENT HostListener to track given event
  @HostListener('document:keydown', ['$event'])
  keyPressed(keyEvent) {
    let code = keyEvent.keyCode;
    if(code == 32) {
      this.newGame();
      return;
    }
  }

  // UNCOMMENT HostListener to track given event
  //@HostListener('document:keyup', ['$event'])
  keyReleased(keyEvent) {
    console.log({'keyReleased':keyEvent.keyCode});
  }
}
