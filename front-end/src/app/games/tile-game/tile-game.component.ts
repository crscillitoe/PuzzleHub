import { HostListener, Component, OnInit } from '@angular/core';
import { LoaderService } from '../../services/loading-service/loader.service';
import { TimerService } from '../../services/timer/timer.service';
import { TunnelService } from '../../services/tunnel/tunnel.service';
import { UserService } from '../../services/user/user.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { GameID } from '../../enums/game-id.enum';
import { Board } from '../../services/boards/tile-game/board.service';
import { ColorService } from '../../services/colors/color.service';
import { SettingsService } from '../../services/persistence/settings.service';

@Component({
  selector: 'app-tile-game',
  templateUrl: './tile-game.component.html',
  styleUrls: ['./tile-game.component.css']
})
export class TileGameComponent implements OnInit {

  controls: string = "Arrow Keys or WASD";
  options = [
    {
      'type':'checkbox',
      'bindTo':'showAnimations',
      'name':'Show Animations',
      'callback':'this.toggleAnimations()',
      'storedName':'tileAnimations'
    },
    {
      'type':'checkbox',
      'bindTo':'mouseHover',
      'name':'Mouse Hover',
      'callback':'this.toggleMouseHover()',
      'storedName':'HoverTileGame'
    }
  ];

  hotkeys = [
    {
      'name':'UP',
      'bindTo':'TileGameDOWN',
      'callback':'this.configureHotkeys()'
    },
    {
      'name':'DOWN',
      'bindTo':'TileGameUP',
      'callback':'this.configureHotkeys()'
    },
    {
      'name':'LEFT',
      'bindTo':'TileGameRIGHT',
      'callback':'this.configureHotkeys()'
    },
    {
      'name':'RIGHT',
      'bindTo':'TileGameLEFT',
      'callback':'this.configureHotkeys()'
    }
  ];

  initialDelay: number = 200;
  continuedDelay: number = 16;

  shift: boolean;

  xAxis: boolean;
  yAxis: boolean;

  shiftKey: number = 16;
  upKey:    number = 83;
  downKey:  number = 87;
  leftKey:  number = 68;
  rightKey: number = 65;

  rules: string = "Order the numbers in sequential order from left to right, top to bottom";

  // Used for drawing to the screen
  canvas: any;
  context: any;

  solved: boolean = false;

  personalBestDaily: string;
  personalBestWeekly: string;
  personalBestMonthly: string;

  gridBoxSize: number;
  colors: any;
  
  canvasOffsetX: number = 225;
  canvasOffsetY: number = 56;

  gridOffsetX: number = 100;
  gridOffsetY: number = 100;

  difficulty: number;
  seed: number;

  animatingX: number;
  animatingY: number;

  startDate: any;
  t: any;

  showAnimations: boolean;
  mouseHover: boolean;

  animationDelta: number = 10;
  animationSpeed: number = 10;

  up: boolean;
  down: boolean;
  left: boolean;
  right: boolean;

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

  toggleMouseHover() {
    this.mouseHover= !this.mouseHover;
    SettingsService.storeData('HoverTileGame', this.mouseHover);
  }

  toggleAnimations() {
    this.showAnimations = !this.showAnimations;
    this.animatingX = -1;
    this.animatingY = -1;
    SettingsService.storeData('tileAnimations', this.showAnimations);
    this.draw();
  }

  ngOnInit() {
    // Read difficulty from URL param
    this.difficulty = Number(this.route.snapshot.paramMap.get('diff'));
    this.canvas = document.getElementById('myCanvas');
    this.context = this.canvas.getContext('2d');

    this.shift = false;
    this.xAxis = false;
    this.yAxis = false;
    this.up = false;
    this.down = false;
    this.left = false;
    this.right = false;

    this.showAnimations = SettingsService.getDataBool('tileAnimations');
    this.mouseHover = SettingsService.getDataBool('HoverTileGame');

    this.configureHotkeys();

    var width;
    var height;

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
      width = 7;
      height = 7;
    } 
    
    // Extreme
    else if (this.difficulty == 4) {
      width = 10;
      height= 10;
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
          this.personalBestDaily = data['daily'];
          this.personalBestWeekly = data['weekly'];
          this.personalBestMonthly = data['monthly'];
        });

      this.timer.startTimer(GameID.TILE_GAME, this.difficulty)
        .subscribe( (data) => {
          // Generate board with given seed
          this.seed = data['seed'];

          this.board = new Board(width, height, this.seed); 
          this.board.generateBoard();

          //this.canvas.addEventListener('mousedown', (e) => this.mousePressed(e),  false);
          //window.addEventListener('keydown', (e) => this.keyPressed(e),  false);

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

      //this.canvas.addEventListener('mousedown', (e) => this.mousePressed(e),  false);
      //window.addEventListener('keydown', (e) => this.keyPressed(e),  false);

      this.startDate = new Date();
      this.displayTimer();

      this.fixSizes();
      this.draw();
    }
  }

  configureHotkeys() {
    this.upKey    = SettingsService.getDataNum('TileGameUP');
    this.downKey  = SettingsService.getDataNum('TileGameDOWN');
    this.leftKey  = SettingsService.getDataNum('TileGameLEFT');
    this.rightKey = SettingsService.getDataNum('TileGameRIGHT');
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

  newGame() {
    this.loader.startLoadingAnimation();
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
      this.showAnimations = !this.showAnimations;
      SettingsService.storeData('tileAnimations', this.showAnimations);
      this.draw();
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

        if((i != this.animatingX || j != this.animatingY) || !this.showAnimations) {
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
  }

  done() {
    this.solved = true;
    if(this.userService.isLoggedIn()) {
      this.timer.stopTimer(this.seed, GameID.TILE_GAME, this.difficulty, 'TODO - Board Solution String')
        .subscribe( (data) => {
          if(data['Daily']) {
            this.personalBestDaily = data['TimeElapsed'];
          }

          if(data['Weekly']) {
            this.personalBestWeekly = data['TimeElapsed'];
          }

          if(data['Monthly']) {
            this.personalBestMonthly = data['TimeElapsed'];
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
    this.animationDelta = this.gridBoxSize/5;

    this.draw();
  }

  animateTileUp(animx, animy, y, x, destY, destX) {
    if(this.animatingX != animx || this.animatingY != animy) {
      return;
    } else if(y > destY) {
      this.animatingX = -1;
      this.animatingY = -1;
      this.draw();
      return;
    } else {

      var dist = this.animationDelta;
      var boardValue = this.board.tilePuzzle[animy][animx];
      this.drawBlankTile(animx, animy - 1);
      this.drawTile(x, y, boardValue);

      var that = this;
      setTimeout(
        function() {
          that.animateTileUp(animx, animy, y + dist, x, destY, destX);
        }, that.animationSpeed);
    }
  }

  animateTileDown(animx, animy, y, x, destY, destX) {
    if(this.animatingX != animx || this.animatingY != animy) {
      return;
    } else if(y < destY) {
      this.animatingX = -1;
      this.animatingY = -1;
      this.draw();
      return;
    } else {

      var dist = this.animationDelta;
      var boardValue = this.board.tilePuzzle[animy][animx];
      this.drawBlankTile(animx, animy + 1);
      this.drawTile(x, y, boardValue);

      var that = this;
      setTimeout(
        function() {
          that.animateTileDown(animx, animy, y - dist, x, destY, destX);
        }, that.animationSpeed);
    }
  }

  animateTileLeft(animx, animy, y, x, destY, destX) {
    if(this.animatingX != animx || this.animatingY != animy) {
      return;
    } else if(x > destX) {
      this.animatingX = -1;
      this.animatingY = -1;
      this.draw();
      return;
    } else {

      var dist = this.animationDelta;
      var boardValue = this.board.tilePuzzle[animy][animx];
      this.drawBlankTile(animx - 1, animy);
      this.drawTile(x, y, boardValue);

      var that = this;
      setTimeout(
        function() {
          that.animateTileLeft(animx, animy, y, x + dist, destY, destX);
        }, that.animationSpeed);
    }
  }

  animateTileRight(animx, animy, y, x, destY, destX) {
    if(this.animatingX != animx || this.animatingY != animy) {
      return;
    } else if(x < destX) {
      this.animatingX = -1;
      this.animatingY = -1;
      this.draw();
      return;
    } else {

      var dist = this.animationDelta;
      var boardValue = this.board.tilePuzzle[animy][animx];
      this.drawBlankTile(animx + 1, animy);
      this.drawTile(x, y, boardValue);

      var that = this;
      setTimeout(
        function() {
          that.animateTileRight(animx, animy, y, x - dist, destY, destX);
        }, that.animationSpeed);
    }
  }

  drawBlankTile(x, y) {
    var spacing = 0;
    this.context.fillStyle = this.colors.BACKGROUND;
    this.context.fillRect(
      (this.gridOffsetX + (x * this.gridBoxSize)) + spacing,
      (this.gridOffsetY + (y * this.gridBoxSize)) + spacing,
                          this.gridBoxSize - (spacing * 2), 
                          this.gridBoxSize - (spacing * 2))
  }

  drawTile(x, y, boardValue) {
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

    var tileString = "" + boardValue;
    var spacing = this.gridBoxSize/40;
    this.roundRect(this.context, x, y,
                          this.gridBoxSize - (spacing * 2), 
                          this.gridBoxSize - (spacing * 2), 
                          (this.gridBoxSize/20), 
                          true, 
                          false);

    this.context.fillStyle = this.colors.BACKGROUND;
    var textX = (x + (this.gridBoxSize/2) - spacing);
    var j  = (y - spacing - this.gridOffsetY)/this.gridBoxSize;
    var textY = (this.gridOffsetY + ( (j + 1) * this.gridBoxSize) - (this.gridBoxSize / 4));
    this.context.fillText(tileString, textX, textY);
  }

  moveUp(repeat, click) {
    var directions = this.board.getValidDirections();

    if(directions.includes(0) && (this.up || click)) {
      this.board.tilePuzzle[this.board.emptyY][this.board.emptyX] = this.board.tilePuzzle[this.board.emptyY - 1][this.board.emptyX];
      this.board.tilePuzzle[this.board.emptyY - 1][this.board.emptyX] = 0;
      this.board.emptyY--;

      this.animatingX = this.board.emptyX;
      this.animatingY = this.board.emptyY + 1;

      this.draw();

      if(this.showAnimations) {
        var spacing = this.gridBoxSize/40;
        let y1 = this.board.emptyY + 1;
        let x1 = this.board.emptyX;
        let y2 = this.board.emptyY;
        let x2 = this.board.emptyX;
        this.animateTileUp(
          this.animatingX, this.animatingY,
          (this.gridOffsetY + (y2 * this.gridBoxSize)) + spacing,
          (this.gridOffsetX + (x2 * this.gridBoxSize)) + spacing,
          (this.gridOffsetY + (y1 * this.gridBoxSize)) + spacing,
          (this.gridOffsetX + (x1 * this.gridBoxSize)) + spacing
        );
      }

      if(this.board.isSolved()) {
        this.done();
      }

      if(this.up && repeat && !this.solved) {
        var that = this;
        setTimeout( 
          function() {
            that.moveUp(true, false)
          }, 
          this.continuedDelay );
      }
    }
  }

  moveUpFirst() {
    this.moveUp(false, false);
    var that = this;

    if(this.shift && !this.yAxis) {
      this.xAxis = true;
      setTimeout( 
        function() {
          that.moveUp(true, false)
        }, 
        this.continuedDelay );
    } else {
      setTimeout( 
        function() {
          that.moveUp(true, false)
        }, 
        this.initialDelay );
    }
  }
  moveDownFirst() {
    this.moveDown(false, false);
    var that = this;

    if(this.shift && !this.yAxis) {
      this.xAxis = true;
      setTimeout( 
        function() {
          that.moveDown(true, false)
        }, 
        this.continuedDelay );
    } else {
      setTimeout( 
        function() {
          that.moveDown(true, false)
        }, 
        this.initialDelay );
    }
  }
  moveRightFirst() {
    this.moveRight(false, false);
    var that = this;

    if(this.shift && !this.xAxis) {
      this.yAxis = true;
      setTimeout( 
        function() {
          that.moveRight(true, false)
        }, 
        this.continuedDelay );
    } else {
      setTimeout( 
        function() {
          that.moveRight(true, false)
        }, 
        this.initialDelay );
    }
  }
  moveLeftFirst() {
    this.moveLeft(false, false);
    var that = this;

    if(this.shift && !this.xAxis) {
      this.yAxis = true;
      setTimeout( 
        function() {
          that.moveLeft(true, false)
        }, 
        this.continuedDelay );
    } else {
      setTimeout( 
        function() {
          that.moveLeft(true, false)
        }, 
        this.initialDelay );
    }
  }

  moveDown(repeat, click) {
    var directions = this.board.getValidDirections();

    if(directions.includes(1) && (this.down || click)) {
      this.board.tilePuzzle[this.board.emptyY][this.board.emptyX] = this.board.tilePuzzle[this.board.emptyY + 1][this.board.emptyX];
      this.board.tilePuzzle[this.board.emptyY + 1][this.board.emptyX] = 0;
      this.board.emptyY++;

      this.animatingX = this.board.emptyX;
      this.animatingY = this.board.emptyY - 1;

      this.draw();

      if(this.showAnimations) {
        var spacing = this.gridBoxSize/40;
        let y1 = this.board.emptyY - 1;
        let x1 = this.board.emptyX;
        let y2 = this.board.emptyY;
        let x2 = this.board.emptyX;
        this.animateTileDown(
          this.animatingX, this.animatingY,
          (this.gridOffsetY + (y2 * this.gridBoxSize)) + spacing,
          (this.gridOffsetX + (x2 * this.gridBoxSize)) + spacing,
          (this.gridOffsetY + (y1 * this.gridBoxSize)) + spacing,
          (this.gridOffsetX + (x1 * this.gridBoxSize)) + spacing
        );
      }

      if(this.board.isSolved()) {
        this.done();
      }

      if(this.down && repeat && !this.solved) {
        var that = this;
        setTimeout( 
          function() {
            that.moveDown(true, false)
          }, 
          this.continuedDelay );
      }
    }
  }

  moveLeft(repeat, click) {
    var directions = this.board.getValidDirections();

    if(directions.includes(2) && (this.left || click)) {
      this.board.tilePuzzle[this.board.emptyY][this.board.emptyX] = this.board.tilePuzzle[this.board.emptyY][this.board.emptyX - 1];
      this.board.tilePuzzle[this.board.emptyY][this.board.emptyX - 1] = 0;
      this.board.emptyX--;

      this.animatingX = this.board.emptyX + 1;
      this.animatingY = this.board.emptyY;

      this.draw();

      if(this.showAnimations) {
        var spacing = this.gridBoxSize/40;
        let y1 = this.board.emptyY;
        let x1 = this.board.emptyX + 1;
        let y2 = this.board.emptyY;
        let x2 = this.board.emptyX;
        this.animateTileLeft(
          this.animatingX, this.animatingY,
          (this.gridOffsetY + (y2 * this.gridBoxSize)) + spacing,
          (this.gridOffsetX + (x2 * this.gridBoxSize)) + spacing,
          (this.gridOffsetY + (y1 * this.gridBoxSize)) + spacing,
          (this.gridOffsetX + (x1 * this.gridBoxSize)) + spacing
        );
      }

      if(this.board.isSolved()) {
        this.done();
      }

      if(this.left && repeat && !this.solved) {
        var that = this;
        setTimeout( 
          function() {
            that.moveLeft(true, false);
          }, 
          this.continuedDelay );
      }
    }
  }

  moveRight(repeat, click) {
    var directions = this.board.getValidDirections();

    if(directions.includes(3) && (this.right || click)) {
      this.board.tilePuzzle[this.board.emptyY][this.board.emptyX] = this.board.tilePuzzle[this.board.emptyY][this.board.emptyX + 1];
      this.board.tilePuzzle[this.board.emptyY][this.board.emptyX + 1] = 0;
      this.board.emptyX++;

      this.animatingX = this.board.emptyX - 1;
      this.animatingY = this.board.emptyY;

      this.draw();

      if(this.showAnimations) {
        var spacing = this.gridBoxSize/40;
        let y1 = this.board.emptyY;
        let x1 = this.board.emptyX - 1;
        let y2 = this.board.emptyY;
        let x2 = this.board.emptyX;
        this.animateTileRight(
          this.animatingX, this.animatingY,
          (this.gridOffsetY + (y2 * this.gridBoxSize)) + spacing,
          (this.gridOffsetX + (x2 * this.gridBoxSize)) + spacing,
          (this.gridOffsetY + (y1 * this.gridBoxSize)) + spacing,
          (this.gridOffsetX + (x1 * this.gridBoxSize)) + spacing
        );
      }

      if(this.board.isSolved()) {
        this.done();
      }

      if(this.right && repeat && !this.solved) {
        var that = this;
        setTimeout( 
          function() {
            that.moveRight(true, false);
          }, 
          this.continuedDelay );
      }
    }
  }

  moveTile(x, y) {
    if(x - 1 >= this.board.emptyX && y == this.board.emptyY) {
      for(var i = 0 ; i < (x - this.board.emptyX) ; i++) {
        this.moveRight(false, true);
      }
    } else if(x + 1 <= this.board.emptyX && y == this.board.emptyY) {
      for(var i = 0 ; i < (this.board.emptyX - x) ; i++) {
        this.moveLeft(false, true);
      }
    } else if(x == this.board.emptyX && y + 1 <= this.board.emptyY) {
      for(var i = 0 ; i < (this.board.emptyY - y) ; i++) {
        this.moveUp(false, true);
      }
    } else if(x == this.board.emptyX && y - 1 >= this.board.emptyY) {
      for(var i = 0 ; i < (y - this.board.emptyY) ; i++) {
        this.moveDown(false, true);
      }
    }
  }

  /* EVENT LISTENERS */
  @HostListener('document:mousedown', ['$event'])
  mousePressed(mouseEvent) { 
    let x = mouseEvent.clientX - this.canvasOffsetX;
    let y = mouseEvent.clientY - this.canvasOffsetY;

    if(!this.solved) {
      x = Math.floor((x - this.gridOffsetX) / this.gridBoxSize);
      y = Math.floor((y - this.gridOffsetY) / this.gridBoxSize);

      if(x > -1 
      && x <  this.board.width
      && y > -1
      && y < this.board.height) {
        this.moveTile(x, y);
        if(this.board.isSolved()) {
          this.done();
        }
      }
    }
  }
  mouseReleased(mouseEvent) { 
    let x = mouseEvent.clientX - this.canvasOffsetX;
    let y = mouseEvent.clientY - this.canvasOffsetY;
    console.log({'mouseReleasedX':x, 'mouseReleasedY':y});
  }

  @HostListener('document:mousemove', ['$event'])
  mouseMove(mouseEvent) {
    if(this.mouseHover) {
      let x = mouseEvent.clientX - this.canvasOffsetX;
      let y = mouseEvent.clientY - this.canvasOffsetY;

      if(!this.solved) {
        x = Math.floor((x - this.gridOffsetX) / this.gridBoxSize);
        y = Math.floor((y - this.gridOffsetY) / this.gridBoxSize);

        if(x > -1 
        && x <  this.board.width
        && y > -1
        && y < this.board.height) {
          this.moveTile(x, y);
          if(this.board.isSolved()) {
            this.done();
          }
        }
      }
    }
  }

  @HostListener('document:keydown', ['$event'])
  keyPressed(keyEvent) {
    let code = keyEvent.keyCode;
    if(code == 32) {
      this.newGame();
      return;
    }

    if(!this.solved) {
      switch(code) {
        // UP
        case(40):
        case(this.upKey):
            this.up = true;
            this.moveUpFirst();
          break;

        // DOWN
        case(38):
        case(this.downKey):
            this.down = true;
            this.moveDownFirst();
          break;

        // LEFT
        case(39):
        case(this.leftKey):
            this.left = true;
            this.moveLeftFirst();
          break;

        // RIGHT
        case(37):
        case(this.rightKey):
            this.right = true;
            this.moveRightFirst();
          break;

        case(this.shiftKey):
            this.shift = true;
          break;
      }
    }
  }

  handleOption(callback) {
    eval(callback);
  }

  @HostListener('document:keyup', ['$event'])
  keyReleased(keyEvent) {
    let code = keyEvent.keyCode;
    switch(code) {
      // UP
      case(40):
      case(this.upKey):
          this.up = false;
        break;

      // DOWN
      case(38):
      case(this.downKey):
          this.down = false;
        break;

      // LEFT
      case(39):
      case(this.leftKey):
          this.left = false;
        break;

      // RIGHT
      case(37):
      case(this.rightKey):
          this.right = false;
        break;

      case(this.shiftKey):
          this.shift = false;
          this.xAxis = false;
          this.yAxis = false;
        break;
    }
  }
}
