import { Component, OnInit } from '@angular/core';
import { LoaderService } from '../../services/loading-service/loader.service';
import { TimerService } from '../../services/timer/timer.service';
import { TunnelService } from '../../services/tunnel/tunnel.service';
import { UserService } from '../../services/user/user.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { GameID } from '../../enums/game-id.enum';
import { Board } from '../../services/boards/tile-game/board.service';
import { ColorService } from '../../services/colors/color.service';

@Component({
  selector: 'app-tile-game',
  templateUrl: './tile-game.component.html',
  styleUrls: ['./tile-game.component.css']
})
export class TileGameComponent implements OnInit {

  // Used for drawing to the screen
  canvas: any;
  context: any;

  solved: boolean = false;

  personalBest: string;

  gridBoxSize: number;
  colors: any;
  
  canvasOffsetX: number = 225;
  canvasOffsetY: number = 56;

  gridOffsetX: number = 100;
  gridOffsetY: number = 100;

  difficulty: number;
  seed: number;

  startDate: any;
  t: any;

  board: Board;

  constructor(
    private route: ActivatedRoute, 
    private colorService: ColorService,
    private router: Router,
    private tunnel: TunnelService,
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
      width = 3;
      height = 3;
    } 
    
    // Medium
    else if (this.difficulty == 2) {
      width = 4;
      height = 4;
    } 
    
    // Hard
    else if (this.difficulty == 3) {
      width = 5;
      height = 5;
    } 
    
    // Extreme
    else if (this.difficulty == 4) {
      width = 6;
      height= 6;
    }

    // Uncomment these to add event listeners
    //this.canvas.addEventListener('mouseup',   (e) => this.mouseReleased(e), false);
    //this.canvas.addEventListener('mousemove', (e) => this.mouseMove(e),     false);

    //window.addEventListener('keyup',   (e) => this.keyReleased(e), false);


    // Start timer if we are logged in
    if(this.userService.isLoggedIn()) {
      let m = {
        GameID: GameID.TILE_GAME,
        Difficulty: this.difficulty
      }
      this.tunnel.getPersonalBest(m)
        .subscribe( (data) => {
          this.personalBest = data['time'];
        });

      this.timer.startTimer(GameID.TILE_GAME, this.difficulty)
        .subscribe( (data) => {
          // Generate board with given seed
          this.seed = data['seed'];

          this.board = new Board(width, height, this.seed); 
          this.board.generateBoard();

          this.canvas.addEventListener('mousedown', (e) => this.mousePressed(e),  false);
          window.addEventListener('keydown', (e) => this.keyPressed(e),  false);

          this.startDate = new Date();
          this.displayTimer();

          this.fixSizes();
          this.draw();
        });
    } else {
      // Generate board with random seed
      this.seed = Math.floor(Math.random() * (2000000000));

      this.board = new Board(width, height, this.seed); 
      this.board.generateBoard();

      this.canvas.addEventListener('mousedown', (e) => this.mousePressed(e),  false);
      window.addEventListener('keydown', (e) => this.keyPressed(e),  false);

      this.startDate = new Date();
      this.displayTimer();

      this.fixSizes();
      this.draw();
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
      this.t = setTimeout(function() {_this.add(_this)}, 10);
    }
  }

  newGame() {
    if(this.userService.isLoggedIn()) {
      this.timer.startTimer(GameID.TILE_GAME, this.difficulty)
        .subscribe( (data) => {
          // Generate board with given seed
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
      this.draw();
    }
  }

  draw() {
    this.context.beginPath();
    this.drawBackground();
    //this.drawGrid();
    this.drawTiles();
  }

  drawBackground() {
    this.context.fillStyle = this.colors.BACKGROUND; // Background color
    this.context.fillRect(0, 0, this.canvas.offsetWidth * 2, this.canvas.offsetHeight * 2);
  }

  drawGrid() {
    for(var i = 0 ; i <= this.board.width ; i++) {
      this.context.lineWidth = 1;
      this.context.strokeStyle = this.colors.COLOR_1;
      this.context.moveTo(this.gridOffsetX + (i * this.gridBoxSize), this.gridOffsetY);
      this.context.lineTo(this.gridOffsetX + (i * this.gridBoxSize), this.gridOffsetY + (this.board.height * this.gridBoxSize));
      this.context.stroke();
    }

    for(var j = 0 ; j <= this.board.height ; j++) {
      this.context.lineWidth = 1;
      this.context.strokeStyle = this.colors.FOREGROUND;
      this.context.moveTo(this.gridOffsetX,                                         this.gridOffsetY + (j * this.gridBoxSize));
      this.context.lineTo(this.gridOffsetX + (this.board.width * this.gridBoxSize), this.gridOffsetY + (j * this.gridBoxSize));
      this.context.stroke();
    }
  }

  roundRect(ctx, x, y, width, height, radius, fill, stroke) {
      radius = {tl: radius, tr: radius, br: radius, bl: radius};
      ctx.beginPath();
      ctx.moveTo(x + radius.tl, y);
      ctx.lineTo(x + width - radius.tr, y);
      ctx.quadraticCurveTo(x + width, y, x + width, y + radius.tr);
      ctx.lineTo(x + width, y + height - radius.br);
      ctx.quadraticCurveTo(x + width, y + height, x + width - radius.br, y + height);
      ctx.lineTo(x + radius.bl, y + height);
      ctx.quadraticCurveTo(x, y + height, x, y + height - radius.bl);
      ctx.lineTo(x, y + radius.tl);
      ctx.quadraticCurveTo(x, y, x + radius.tl, y);
      ctx.closePath();
      if (fill) {
        ctx.fill();
      }
      if (stroke) {
        ctx.stroke();
      }

  }

  drawTiles() {
    for(var j = 0 ; j < this.board.height ; j++) {
      for(var i = 0 ; i < this.board.width; i++) {

        var boardValue = this.board.tilePuzzle[j][i];
        var tileString = "" + boardValue;
        if(tileString == '0') tileString = '';

        this.context.font = 'Bold ' + Math.floor(this.gridBoxSize / 1.4) + 'px Poppins';
        this.context.textAlign = "center";

        if(boardValue <= this.board.width ||
           (boardValue % this.board.width) == 1) {
          this.context.fillStyle = this.colors.COLOR_6_ALT;
        } else if(boardValue <= (this.board.width * 2) ||
                  (boardValue % this.board.width) == 2) {
          this.context.fillStyle = this.colors.COLOR_4_ALT;
        } else if(boardValue <= (this.board.width * 3) ||
                  (boardValue % this.board.width) == 3) {
          this.context.fillStyle = this.colors.COLOR_3_ALT;
        } else if(boardValue <= (this.board.width * 4) ||
                  (boardValue % this.board.width) == 4) {
          this.context.fillStyle = this.colors.COLOR_5_ALT;
        } else if(boardValue <= (this.board.width * 5) ||
                  (boardValue % this.board.width) == 5) {
          this.context.fillStyle = this.colors.COLOR_2;
        } else if(boardValue <= (this.board.width * 6) ||
                  (boardValue % this.board.width) == 6) {
          this.context.fillStyle = this.colors.COLOR_1;
        } else if(boardValue <= (this.board.width * 7) ||
                  (boardValue % this.board.width) == 7) {
          this.context.fillStyle = this.colors.COLOR_4;
        } else if(boardValue <= (this.board.width * 8) ||
                  (boardValue % this.board.width) == 8) {
          this.context.fillStyle = this.colors.COLOR_2_ALT;
        } else if(boardValue <= (this.board.width * 9) ||
                  (boardValue % this.board.width) == 9) {
          this.context.fillStyle = this.colors.COLOR_4;
        } else if(boardValue <= (this.board.width * 10) ||
                  (boardValue % this.board.width) == 10) {
          this.context.fillStyle = this.colors.COLOR_1_ALT;
        } else {
          this.context.fillStyle = this.colors.COLOR_1_ALT;
        }


        var spacing = this.gridBoxSize/40;

        if(boardValue != 0) {
          this.roundRect(this.context, (this.gridOffsetX + (i * this.gridBoxSize )) + spacing, 
                                (this.gridOffsetY + (j * this.gridBoxSize )) + spacing,
                                this.gridBoxSize - (spacing * 2), 
                                this.gridBoxSize - (spacing * 2), 
                                (this.gridBoxSize/20), 
                                true, 
                                false);
        }

        this.context.fillStyle = this.colors.BACKGROUND;
        this.context.fillText(tileString, (this.gridOffsetX) + ( i * this.gridBoxSize ) + (this.gridBoxSize / 2),
                                          (this.gridOffsetY) + ( (j + 1) * this.gridBoxSize ) - (this.gridBoxSize / 4));
      }
    }
  }

  done() {
    this.solved = true;
    if(this.userService.isLoggedIn()) {
      this.timer.stopTimer(GameID.TILE_GAME, this.difficulty, 'TODO - Board Solution String')
        .subscribe( (data) => {
          if(data['NewRecord']) {
            this.personalBest = data['TimeElapsed'];
          }
          var display = document.getElementById("timer");
          display.textContent = data['TimeElapsed'];
        });
    } else {
      console.log('done - not logged in');
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

  /* EVENT LISTENERS */
  mousePressed(mouseEvent) { 
    let x = mouseEvent.clientX - this.canvasOffsetX;
    let y = mouseEvent.clientY - this.canvasOffsetY;

    if(!this.solved) {
      x = Math.floor((x - this.gridOffsetX) / this.gridBoxSize);
      y = Math.floor((y - this.gridOffsetY) / this.gridBoxSize);

      this.board.moveTile(x, y);
      if(this.board.isSolved()) {
        this.done();
      }
      this.draw();
    }
  }
  mouseReleased(mouseEvent) { 
    let x = mouseEvent.clientX - this.canvasOffsetX;
    let y = mouseEvent.clientY - this.canvasOffsetY;
    console.log({'mouseReleasedX':x, 'mouseReleasedY':y});
  }
  mouseMove(mouseEvent) {
    let x = mouseEvent.clientX - this.canvasOffsetX;
    let y = mouseEvent.clientY - this.canvasOffsetY;
    console.log({'mouseMoveX':x, 'mouseMoveY':y});
  }

  keyPressed(keyEvent) {
    let code = keyEvent.keyCode;
    if(!this.solved) {
      var directions = this.board.getValidDirections();
      switch(code) {
        // UP
        case(40):
        case(83):
            if(directions.includes(0)) {
              this.board.moveUp();
              this.draw();
              if(this.board.isSolved()) {
                this.done();
              }
            }
          break;

        // DOWN
        case(38):
        case(87):
            if(directions.includes(1)) {
              this.board.moveDown();
              this.draw();
              if(this.board.isSolved()) {
                this.done();
              }
            }
          break;

        // LEFT
        case(39):
        case(68):
            if(directions.includes(2)) {
              this.board.moveLeft();
              this.draw();
              if(this.board.isSolved()) {
                this.done();
              }
            }
          break;

        // RIGHT
        case(37):
        case(65):
            if(directions.includes(3)) {
              this.board.moveRight();
              this.draw();
              if(this.board.isSolved()) {
                this.done();
              }
            }
          break;
      }
    }
  }
  keyReleased(keyEvent) {
    //console.log({'keyReleased':keyEvent.keyCode});
  }
}
