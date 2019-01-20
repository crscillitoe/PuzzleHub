import { HostListener, Component, OnInit } from '@angular/core';
import { LoaderService } from '../../services/loading-service/loader.service';
import { TimerService } from '../../services/timer/timer.service';
import { TunnelService } from '../../services/tunnel/tunnel.service';
import { UserService } from '../../services/user/user.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { GameID } from '../../enums/game-id.enum';
import { ColorService } from '../../services/colors/color.service';

// TODO - CHANGE BOAD IMPORT TO TEMPLATE GAME
import { Board } from '../../services/boards/tile-game/board.service';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})
export class TemplateComponent implements OnInit {

  // TODO - enter game ID here
  gameID: number = GameID.TILE_GAME;

  // TODO - enter control scheme here
  controls: string = "Description of game controls goes here";

  // TODO - enter game rules here
  rules: string = "Rules of the game goes here";

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

    // Easy
    if(this.difficulty == 1) {
      console.log('Easy difficulty');
    } 
    
    // Medium
    else if (this.difficulty == 2) {
      console.log('Medium difficulty');
    } 
    
    // Hard
    else if (this.difficulty == 3) {
      console.log('Hard difficulty');
    } 
    
    // Extreme
    else if (this.difficulty == 4) {
      console.log('Extreme difficulty');
    }

    // Start timer if we are logged in
    if(this.userService.isLoggedIn()) {
      // Get personal high scores
      let m = {
        GameID: this.gameID,
        Difficulty: this.difficulty
      }
      this.tunnel.getPersonalBest(m)
        .subscribe( (data) => {
          this.personalBestDaily = data['daily'];
          this.personalBestWeekly = data['weekly'];
          this.personalBestMonthly = data['monthly'];
        });

      this.timer.startTimer(this.gameID, this.difficulty)
        .subscribe( (data) => {
          this.seed = data['seed'];

          // TODO - generate board with seed


          this.startDate = new Date();
          this.displayTimer();

          this.fixSizes();
          this.draw();
        });
    } else {
      this.seed = Math.floor(Math.random() * (2000000000));

      // TODO - generate board with seed

      this.startDate = new Date();
      this.displayTimer();

      this.fixSizes();
      this.draw();
    }
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
    this.solved = true;
    if(this.userService.isLoggedIn()) {
      this.timer.stopTimer(this.seed, this.gameID, this.difficulty, 'TODO - Board Solution String')
        .subscribe( (data) => {});
    } else {
      // Do nothing - we're not logged in
    }
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
    this.loader.startLoadingAnimation();
    if(this.userService.isLoggedIn()) {
      this.timer.startTimer(GameID.TILE_GAME, this.difficulty)
        .subscribe( (data) => {
          this.seed = data['seed'];

          // TODO - generate board with seed

          if(this.solved) {
            this.solved = false;

            this.startDate = new Date();
            this.displayTimer();
          } else {
            this.startDate = new Date();
          }

          this.fixSizes();

          this.loader.stopLoadingAnimation();
          this.draw();
        });
    } else {
      // Generate board with random seed
      this.seed = Math.floor(Math.random() * (2000000000));

      // TODO - generate board with seed

      if(this.solved) {
        this.solved = false;

        this.startDate = new Date();
        this.displayTimer();
      } else {
        this.startDate = new Date();
      }

      this.fixSizes();

      this.loader.stopLoadingAnimation();
      this.draw();
    }
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
  //@HostListener('document:keydown', ['$event'])
  keyPressed(keyEvent) {
    console.log({'keyPressed':keyEvent.keyCode});
  }

  // UNCOMMENT HostListener to track given event
  //@HostListener('document:keyup', ['$event'])
  keyReleased(keyEvent) {
    console.log({'keyReleased':keyEvent.keyCode});
  }
}
