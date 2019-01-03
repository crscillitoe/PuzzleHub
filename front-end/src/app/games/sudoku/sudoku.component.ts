import { HostListener, Component, OnInit } from '@angular/core';
import { TunnelService } from '../../services/tunnel/tunnel.service';
import { LoaderService } from '../../services/loading-service/loader.service';
import { TimerService } from '../../services/timer/timer.service';
import { UserService } from '../../services/user/user.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { GameID } from '../../enums/game-id.enum';
import { Board } from '../../services/boards/sudoku/board.service';
import { ColorService } from '../../services/colors/color.service';

@Component({
  selector: 'app-sudoku',
  templateUrl: './sudoku.component.html',
  styleUrls: ['./sudoku.component.css']
})
export class SudokuComponent implements OnInit {

  // Used for drawing to the screen
  canvas: any;
  context: any;

  colors: any;
  
  canvasOffsetX: number = 500;
  canvasOffsetY: number = 56;

  gridOffsetX: number = 100;
  gridOffsetY: number = 100;

  gridBoxSize: number;

  numCarved: number;
  board: any;

  difficulty: number;
  seed: number;

  takingNotes: boolean = false;
  notes: any = {};
  solved: boolean = false;
  personalBest: string;

  startDate: any;
  t: any;

  selectedX: number;
  selectedY: number;

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
      this.numCarved = 38;
    } 
    
    // Medium
    else if (this.difficulty == 2) {
      this.numCarved = 44;
    } 
    
    // Hard
    else if (this.difficulty == 3) {
      this.numCarved = 50;
    } 
    
    // Extreme
    else if (this.difficulty == 4) {
      this.numCarved = 55;
    }

    // Uncomment these to add event listeners
    //this.canvas.addEventListener('mousedown', (e) => this.mousePressed(e),  false);
    //this.canvas.addEventListener('mouseup',   (e) => this.mouseReleased(e), false);
    //this.canvas.addEventListener('mousemove', (e) => this.mouseMove(e),     false);

    //window.addEventListener('keydown', (e) => this.keyPressed(e),  false);
    //window.addEventListener('keyup',   (e) => this.keyReleased(e), false);


    this.loader.startLoadingAnimation();
    // Start timer if we are logged in
    if(this.userService.isLoggedIn()) {
      let m = {
        GameID: GameID.SUDOKU,
        Difficulty: this.difficulty
      }
      this.tunnel.getPersonalBest(m)
        .subscribe( (data) => {
          this.personalBest = data['time'];
        });

      this.timer.startTimer(GameID.SUDOKU, this.difficulty)
        .subscribe( (data) => {
          // Generate board with given seed
          this.seed = data['seed'];

          this.board = new Board(this.numCarved);

          this.board.generateBoard();

          this.fixSizes();
          this.loader.stopLoadingAnimation();

          this.startDate = new Date();
          this.displayTimer();

          this.draw();
        });
    } else {
      // Generate board with random seed
      this.seed = Math.floor(Math.random() * (2000000000));

      this.board = new Board(this.numCarved);
      this.board.generateBoard();

      this.fixSizes();
      this.loader.stopLoadingAnimation();

      this.startDate = new Date();
      this.displayTimer();

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
      this.t = setTimeout(function() {_this.add(_this)}, 50);
    }
  }

  draw() {
    this.context.beginPath();
    this.drawBackground();
    this.drawSelectedBox();
    this.drawBadBoxes();
    this.drawGrid();
    this.drawBoard();
    this.drawNotes();
  }

  drawBackground() {
    this.context.fillStyle = this.colors.BACKGROUND; // Background color
    this.context.fillRect(0, 0, this.canvas.offsetWidth * 2, this.canvas.offsetHeight * 2);
  }

  drawSelectedBox() {
    if(this.selectedX <= 8 && this.selectedX >= 0 &&
       this.selectedY <= 8 && this.selectedY >= 0) {
      this.context.fillStyle = "#3D3D3D";
      this.context.fillRect(this.gridOffsetX + (this.selectedX * this.gridBoxSize),
                            this.gridOffsetY + (this.selectedY * this.gridBoxSize),
                              this.gridBoxSize, this.gridBoxSize);
    }
  }

  drawBadBoxes() {
    for(var i = 0 ; i < 9 ; i++) {
      for(var j = 0 ; j < 9 ; j++) {
        var tileValue = this.board.sudokuPuzzle[i][j];
        if(this.board.isInvalidTile(i, j, tileValue)) {
          this.context.fillStyle = this.colors.COLOR_7;
          this.context.fillRect(this.gridOffsetX + (i * this.gridBoxSize),
                                this.gridOffsetY + (j * this.gridBoxSize),
                                  this.gridBoxSize, this.gridBoxSize);
        }
      }
    }
  }

  drawNotes() {
    for(let key of Object.keys(this.notes)) {
      var x = Math.trunc(Number(key)/10);
      var y = Number(key) - (x * 10);

      if(this.board.sudokuPuzzle[x][y] == 0 && this.board.originalPuzzle[x][y] == 0) {
        this.context.font = 'Bold ' + Math.floor(this.gridBoxSize / 5) + 'px Poppins';
        this.context.textAlign = "center";
        this.context.fillStyle = this.colors.COLOR_3_ALT;

        for(let num of this.notes[key]) {
          if(num != 0) {
            var row = Math.trunc(num / 3.1);
            var col = (num + 2) % 3;

            /*
              if(this.board.isInvalidTile(x, y, num) {
                this.context.fillStyle = this.colors.COLOR_7_ALT;
              } else {
                this.context.fillStyle = this.colors.COLOR_3_ALT;
              }
             */

            this.context.fillText('' + num, 
              (this.gridOffsetX) + (x * this.gridBoxSize) + (col * (this.gridBoxSize/3)) + (this.gridBoxSize/6),
              (this.gridOffsetY) + (y * this.gridBoxSize) + (row * (this.gridBoxSize/3)) + (this.gridBoxSize/4)
            );
          }
        }
      }
    }
  }

  drawBoard() {
    for(var i = 0 ; i < 9 ; i++) {
      for(var j = 0 ; j < 9 ; j++) {
        var boardValue = this.board.sudokuPuzzle[i][j];
        var startValue = this.board.originalPuzzle[i][j];

        this.context.font = 'Bold ' + Math.floor(this.gridBoxSize / 1.4) + 'px Poppins';
        this.context.textAlign = "center";

        if(startValue != 0) {
          this.context.fillStyle = '#e8d9be';
          this.context.fillText('' + startValue, (this.gridOffsetX) + ( i * this.gridBoxSize ) + (this.gridBoxSize / 2),
                                            (this.gridOffsetY) + ( (j + 1) * this.gridBoxSize ) - (this.gridBoxSize / 4));
        } else if(boardValue != 0) {
          this.context.fillStyle = this.colors.COLOR_3_ALT;
          this.context.fillText('' + boardValue, (this.gridOffsetX) + ( i * this.gridBoxSize ) + (this.gridBoxSize / 2),
                                            (this.gridOffsetY) + ( (j + 1) * this.gridBoxSize ) - (this.gridBoxSize / 4));
        }
      }
    }
  }

  drawGrid() {
    for(var i = 0 ; i <= 9 ; i++) {
      this.context.lineWidth = 1;
      this.context.strokeStyle = '#e8d9be';
      this.context.moveTo(this.gridOffsetX + (i * this.gridBoxSize), this.gridOffsetY);
      this.context.lineTo(this.gridOffsetX + (i * this.gridBoxSize), this.gridOffsetY + (9 * this.gridBoxSize));
      this.context.stroke();
    }

    for(var j = 0 ; j <= 9 ; j++) {
      this.context.lineWidth = 1;
      this.context.strokeStyle = '#e8d9be';
      this.context.moveTo(this.gridOffsetX, this.gridOffsetY + (j * this.gridBoxSize));
      this.context.lineTo(this.gridOffsetX + (9 * this.gridBoxSize), this.gridOffsetY + (j * this.gridBoxSize));
      this.context.stroke();
    }

    for(var i = 1 ; i <= 2; i++) {
      this.context.fillStyle = '#e8d9be';
      this.context.fillRect(this.gridOffsetX + ((i * 3) * this.gridBoxSize) - 5, this.gridOffsetY, 10, (9 * this.gridBoxSize));
    }

    for(var j = 1 ; j <= 2 ; j++) {
      this.context.fillStyle = '#e8d9be';
      this.context.fillRect(this.gridOffsetX, this.gridOffsetY + ((j * 3) * this.gridBoxSize) - 5, (9 * this.gridBoxSize), 10);
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

    var boardLength = 9;
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
    if(this.userService.isLoggedIn()) {
      this.timer.startTimer(GameID.SUDOKU, this.difficulty)
        .subscribe( (data) => {
          // Generate board with given seed
          this.seed = data['seed'];

          this.board = new Board(this.numCarved);

          this.board.generateBoard();
          this.notes = {};

          this.fixSizes();
          this.loader.stopLoadingAnimation();

          if(this.solved) {
            this.solved = false;

            this.startDate = new Date();
            this.displayTimer();
          } else {
            this.startDate = new Date();
          }

          this.draw();
        });
    } else {
      // Generate board with random seed
      this.seed = Math.floor(Math.random() * (2000000000));

      this.board = new Board(this.numCarved);
      this.board.generateBoard();
      this.notes = {};

      this.fixSizes();
      this.loader.stopLoadingAnimation();

      if(this.solved) {
        this.solved = false;

        this.startDate = new Date();
        this.displayTimer();
      } else {
        this.startDate = new Date();
      }

      this.draw();
    }
  }

  done() {
    this.solved = true;
    if(this.userService.isLoggedIn()) {
      this.timer.stopTimer(GameID.SUDOKU, this.difficulty, 'TODO - Board Solution String')
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

  /* EVENT LISTENERS */
  mousePressed(mouseEvent) { 
    let x = mouseEvent.clientX - this.canvasOffsetX;
    let y = mouseEvent.clientY - this.canvasOffsetY;
    console.log({'mousePressedX':x, 'mousePressedY':y});
  }
  mouseReleased(mouseEvent) { 
    let x = mouseEvent.clientX - this.canvasOffsetX;
    let y = mouseEvent.clientY - this.canvasOffsetY;
    console.log({'mouseReleasedX':x, 'mouseReleasedY':y});
  }

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

  @HostListener('document:keydown', ['$event'])
  keyPressed(keyEvent) {
    if(!this.solved) {
      var numPressed = keyEvent.keyCode;
      if(numPressed == 32) {
        this.newGame();
        return;
      }

      var pressed = -1;
      if(numPressed >= 48 && numPressed <= 57) {
        pressed = numPressed - 48;
      } else if(numPressed >= 96 && numPressed <= 105) {
        pressed = numPressed - 96;
      }

      if(pressed >= 0) {
        if(this.selectedX <= 8 && this.selectedX >= 0 &&
           this.selectedY <= 8 && this.selectedY >= 0) {
          if(!this.takingNotes) {
            if(this.board.originalPuzzle[this.selectedX][this.selectedY] == 0) {

              if(this.board.sudokuPuzzle[this.selectedX][this.selectedY] == pressed) {
                this.board.sudokuPuzzle[this.selectedX][this.selectedY] = 0;
              } else {
                this.board.sudokuPuzzle[this.selectedX][this.selectedY] = pressed;
              }

              if(this.board.isSolved()) {
                this.done();
              }
            }
          } else {
            if(this.notes['' + this.selectedX + '' + this.selectedY + ''] == undefined) {
              this.notes['' + this.selectedX + '' + this.selectedY + ''] = [pressed];
            } else {
              if(this.notes['' + this.selectedX + '' + this.selectedY + ''].includes(pressed)) {
                var index = this.notes['' + this.selectedX + '' + this.selectedY + ''].indexOf(pressed);

                if(index > -1) {
                  this.notes['' + this.selectedX + '' + this.selectedY + ''].splice(index, 1);
                }
              } else {
                this.notes['' + this.selectedX + '' + this.selectedY + ''].push(pressed);
              }
            }
          }
        }

        this.draw();
      }
    }
  }
  keyReleased(keyEvent) {
    console.log({'keyReleased':keyEvent.keyCode});
  }
}
