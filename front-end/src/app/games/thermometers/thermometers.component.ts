import { HostListener, Component, OnInit } from '@angular/core';
import { LoaderService } from '../../services/loading-service/loader.service';
import { TimerService } from '../../services/timer/timer.service';
import { TunnelService } from '../../services/tunnel/tunnel.service';
import { UserService } from '../../services/user/user.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { GameID } from '../../enums/game-id.enum';
import { ColorService } from '../../services/colors/color.service';
import { Board } from '../../services/boards/thermometers/board.service';

@Component({
  selector: 'app-thermometers',
  templateUrl: './thermometers.component.html',
  styleUrls: ['./thermometers.component.css']
})
export class ThermometersComponent implements OnInit {

  gameID: number = GameID.THERMOMETERS;

  controls: string = "Click anywhere on the thermometer to insert fluid.";

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

  selectedX: number = -1;
  selectedY: number = -1;

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

    var width = 0;
    var height = 0;

    // Easy
    if(this.difficulty == 1) {
      width = 4;
      height = 4;
    } 
    
    // Medium
    else if (this.difficulty == 2) {
      width = 5;
      height = 5;
    } 
    
    // Hard
    else if (this.difficulty == 3) {
      width = 6;
      height = 6;
    } 
    
    // Extreme
    else if (this.difficulty == 4) {
      width = 7;
      height = 7;
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

          this.board = new Board(width, height, this.seed);
          this.board.generateBoard();


          this.startDate = new Date();
          this.displayTimer();

          this.fixSizes();
          this.draw();
        });
    } else {
      this.seed = Math.floor(Math.random() * (2000000000));

      this.board = new Board(width, height, this.seed);
      this.board.generateBoard();

      this.startDate = new Date();
      this.displayTimer();

      this.fixSizes();
      this.draw();
    }
  }

  draw() {
    this.context.beginPath();
    this.drawBackground();
    this.drawGrid();
    this.drawSelectedBox();
    this.drawThermometers();
    this.drawLegends();
  }

  drawSelectedBox() {
    if(this.selectedX <= this.board.width - 2 && this.selectedX >= 0 &&
       this.selectedY <= this.board.height - 2 && this.selectedY >= 0) {
      this.context.fillStyle = "#3D3D3D";
      this.context.fillRect(this.gridOffsetX + (this.selectedX * this.gridBoxSize),
                            this.gridOffsetY + (this.selectedY * this.gridBoxSize),
                              this.gridBoxSize, this.gridBoxSize);
    }
  }

  drawGrid() {
    this.context.strokeStyle = this.colors.FOREGROUND;
    this.context.lineWidth = 1;
    for(var i = 0; i <= this.board.width - 1; i++) {
      this.context.moveTo(this.gridOffsetX + (i * this.gridBoxSize), this.gridOffsetY);
      this.context.lineTo(this.gridOffsetX + (i* this.gridBoxSize), this.gridOffsetY + ((this.board.height - 1) * this.gridBoxSize));
      this.context.stroke();
    }

    for(var j = 0; j <= this.board.height - 1; j++) {
      this.context.moveTo(this.gridOffsetX, this.gridOffsetY + (j * this.gridBoxSize));
      this.context.lineTo(this.gridOffsetX + ((this.board.width - 1) * this.gridBoxSize), this.gridOffsetY + (j * this.gridBoxSize));
      this.context.stroke();
    }
  }

  drawLegends() {
    this.context.font = 'Bold ' + Math.floor(this.gridBoxSize / 1.4) + 'px Poppins';
    this.context.textAlign = "center";
    this.context.fillStyle = '#e8d9be';

    for(var i = 0 ; i < this.board.width - 1; i++) {
      this.context.fillText('' + this.board.bottomLegends[i],
                            this.gridOffsetX + (i * this.gridBoxSize) + (this.gridBoxSize/2),
                            this.gridOffsetY + ((this.board.height - 1) * this.gridBoxSize) + (this.gridBoxSize/1.3));
    }

    for(var j = 0 ; j < this.board.height - 1; j++) {
      this.context.fillText('' + this.board.sideLegends[j],
                            this.gridOffsetX + ((this.board.width - 1) * this.gridBoxSize) + (this.gridBoxSize/2),
        this.gridOffsetY + (j * this.gridBoxSize) + (this.gridBoxSize/1.3));
    }
  }

  drawBackground() {
    this.context.fillStyle = this.colors.BACKGROUND; // Background color
    this.context.fillRect(0, 0, this.canvas.offsetWidth * 2, this.canvas.offsetHeight * 2);
  }

  drawThermometers() {
    for(let thermometer of this.board.thermometers) {
      this.drawThermometerHead(thermometer.x, thermometer.y, thermometer.direction);
      this.drawThermometerBody(thermometer.x, thermometer.y, thermometer.direction, thermometer.length);
      this.drawThermometerTail(thermometer.x, thermometer.y, thermometer.direction, thermometer.length);
    }
  }

  drawThermometerHead(x, y, dir) {
    this.context.strokeStyle = this.colors.color_1;
    this.context.fillStyle = this.colors.BACKGROUND;
    this.context.lineWidth = 3;
    this.context.beginPath();
    var drawX = this.gridOffsetX + (x * this.gridBoxSize) - this.gridBoxSize/2;
    var drawY = this.gridOffsetY + (y * this.gridBoxSize) - this.gridBoxSize/2;

    var radius = this.gridBoxSize/2.5;
    var thermometerOpenAmount = 0.15 * Math.PI;
    var startPoint;

    if(dir == 0) {
      // DOWN
      startPoint = 0.5 * Math.PI;
    } else if(dir == 1) {
      // UP
      startPoint = 1.5 * Math.PI;
    } else if(dir == 2) {
      // LEFT
      startPoint = 1 * Math.PI;
    } else if(dir == 3) {
      // RIGHT
      startPoint = 0 * Math.PI;
    }

    this.context.arc(drawX, drawY, radius, startPoint + thermometerOpenAmount
                                         , startPoint - thermometerOpenAmount);
    this.context.fill();
    this.context.stroke();
  }

  drawThermometerTail(x, y, dir, length) {
    this.context.strokeStyle = this.colors.color_1;
    this.context.fillStyle = this.colors.BACKGROUND;
    this.context.lineWidth = 3;
    this.context.beginPath();

    var newX = x;
    var newY = y;
    if(dir == 0) {
      newY = y + length - 1;
    } else if(dir == 1) {
      newY = y - length + 1;
    } else if(dir == 2) {
      newX = x - length + 1;
    } else if(dir == 3) {
      newX = x + length - 1;
    }

    var drawX = this.gridOffsetX + (newX * this.gridBoxSize) - this.gridBoxSize/2;
    var drawY = this.gridOffsetY + (newY * this.gridBoxSize) - this.gridBoxSize/2;

    var radius = this.gridBoxSize/5.8;
    var thermometerOpenAmount = 0.5 * Math.PI;
    var startPoint;
    if(dir == 0) {
      startPoint = 1.5 * Math.PI;
    } else if(dir == 1) {
      startPoint = 0.5 * Math.PI;
    } else if(dir == 2) {
      startPoint = 0 * Math.PI;
    } else if(dir == 3) {
      startPoint = 1 * Math.PI;
    }

    this.context.arc(drawX, drawY, radius, startPoint + thermometerOpenAmount
                                         , startPoint - thermometerOpenAmount);
    this.context.fill();
    this.context.stroke();
  }

  drawThermometerBody(x, y, dir, length) {
    var i;
    var width;
    var height;
    var drawX;
    var drawY;

    if(dir == 0) {
      width = this.gridBoxSize / 2.9;
      height = (this.gridBoxSize * (length - 2)) + ((this.gridBoxSize/2) - width) + (width * 1.5);

      drawX = (this.gridOffsetX + (x * this.gridBoxSize) - this.gridBoxSize/2) - width/2;
      drawY = (this.gridOffsetY + (y * this.gridBoxSize) - this.gridBoxSize/2) + width;
    } else if(dir == 1) {
      width = this.gridBoxSize / 2.9;
      height = (this.gridBoxSize * (length - 2)) + ((this.gridBoxSize/2) - width) + (width * 1.5);

      drawX = (this.gridOffsetX + (x * this.gridBoxSize) - this.gridBoxSize/2) - width/2;
      drawY = (this.gridOffsetY + ((y - length + 1) * this.gridBoxSize)) - (width * 1.5);
    } else if(dir == 2) {
      height = this.gridBoxSize / 2.9;
      width = (this.gridBoxSize * (length - 2)) + ((this.gridBoxSize/2) - height) + (height * 1.5);

      drawX = (this.gridOffsetX + ((x - length + 1) * this.gridBoxSize)) - (height * 1.5);
      drawY = (this.gridOffsetY + (y * this.gridBoxSize) - this.gridBoxSize/2) - height/2;
    } else if(dir == 3) {
      // RIGHT
      height = this.gridBoxSize / 2.9;
      width = (this.gridBoxSize * (length - 2)) + ((this.gridBoxSize/2) - height) + (height * 1.5);

      drawX = (this.gridOffsetX + (x * this.gridBoxSize) - this.gridBoxSize/2) + height;
      drawY = (this.gridOffsetY + (y * this.gridBoxSize) - this.gridBoxSize/2) - height/2;
    }

    if(dir == 0 || dir == 1) {
      this.context.moveTo(drawX, drawY);
      this.context.lineTo(drawX, drawY + height);
      this.context.stroke();

      this.context.moveTo(drawX + width, drawY);
      this.context.lineTo(drawX + width, drawY + height);
      this.context.stroke();
    } else {
      this.context.moveTo(drawX, drawY);
      this.context.lineTo(drawX + width, drawY);
      this.context.stroke();

      this.context.moveTo(drawX, drawY + height);
      this.context.lineTo(drawX + width, drawY + height);
      this.context.stroke();
    }

    this.context.strokeStyle = this.colors.color_1;
    this.context.fillStyle = this.colors.BACKGROUND;
    this.context.lineWidth = 3;
    this.context.fillRect(drawX, drawY, width, height);
    this.context.stroke();
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

          this.board.seed = this.seed;
          this.board.generateBoard();

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

      this.board.seed = this.seed;
      this.board.generateBoard();

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
  @HostListener('document:mousemove', ['$event'])
  mouseMove(mouseEvent) {
    let x = mouseEvent.clientX - this.canvasOffsetX;
    let y = mouseEvent.clientY - this.canvasOffsetY;

    if(!this.solved) {
      x = Math.floor((x - this.gridOffsetX) / this.gridBoxSize);
      y = Math.floor((y - this.gridOffsetY) / this.gridBoxSize);

      this.selectedX = x;
      this.selectedY = y;
      this.draw();
    }
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
