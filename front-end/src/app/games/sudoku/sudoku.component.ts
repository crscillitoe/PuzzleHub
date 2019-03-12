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
import { GameStarterService } from '../../services/generators/game-starter.service';

@Component({
  selector: 'app-sudoku',
  templateUrl: './sudoku.component.html',
  styleUrls: ['./sudoku.component.css']
})
export class SudokuComponent implements OnInit {

  controls = 'Hover over a box and input 1-9 on the keyboard, input a 0 to clear a box';
  rules = 'Each of the nine blocks must contain the numbers 1-9 in its squares. ' +
          'Each number can only appear once in a row, column, or box.';

  // Used for drawing to the screen
  canvas: any;
  context: any;

  colors: any;

  canvasOffsetX = 500;
  canvasOffsetY = 56;

  gridOffsetX = 100;
  gridOffsetY = 100;

  gridBoxSize: number;

  numCarved: number;
  board: any;

  difficulty: number;
  seed: number;

  gameID = GameID.SUDOKU;

  takingNotes = false;
  notes: any = {};
  solved = false;
  personalBestDaily: string;
  personalBestWeekly: string;
  personalBestMonthly: string;

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
    private loader: LoaderService
  ) {
    this.colors = colorService.getColorScheme();
  }

  ngOnInit() {
    // Read difficulty from URL param
    this.difficulty = Number(this.route.snapshot.paramMap.get('diff'));
    this.setupBoard();
    let that = this;
    GameStarterService.startGame(that);
  }

  setupBoard() {
    this.canvas = document.getElementById('myCanvas');
    this.context = this.canvas.getContext('2d');

    switch (this.difficulty) {
      // Easy
      case 1: {
        this.numCarved = 38;
        break;
      }
      // Medium
      case 2: {
        this.numCarved = 44;
        break;
      }
      // Hard
      case 3: {
        this.numCarved = 50;
        break;
      }
      // Extreme
      case 4: {
        this.numCarved = 55;
        break;
      }
      // Easy as default
      default: {
        this.numCarved = 38;
        break;
      }
    }

    this.board = new Board(this.numCarved);
  }

  newGame(difficulty = this.difficulty) {
    this.difficulty = difficulty;
    this.setupBoard();
    let that = this;
    GameStarterService.newGame(that);
  }

  add(that) {
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

  displayTimer() {
    if (!this.solved) {
      let _this = this;
      this.t = setTimeout(function() { _this.add(_this); }, 50);
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
    if (this.selectedX <= 8 && this.selectedX >= 0 &&
        this.selectedY <= 8 && this.selectedY >= 0) {
      this.context.fillStyle = '#3D3D3D';
      this.context.fillRect(this.gridOffsetX + (this.selectedX * this.gridBoxSize),
                            this.gridOffsetY + (this.selectedY * this.gridBoxSize),
                            this.gridBoxSize, this.gridBoxSize);
    }
  }

  drawBadBoxes() {
    for (let i = 0 ; i < 9 ; i++) {
      for (let j = 0 ; j < 9 ; j++) {
        const tileValue = this.board.sudokuPuzzle[i][j];
        if (this.board.isInvalidTile(i, j, tileValue)) {
          this.context.fillStyle = this.colors.COLOR_7;
          this.context.fillRect(this.gridOffsetX + (i * this.gridBoxSize),
                                this.gridOffsetY + (j * this.gridBoxSize),
                                this.gridBoxSize, this.gridBoxSize);
        }
      }
    }
  }

  drawNotes() {
    for (let key of Object.keys(this.notes)) {
      const x = Math.trunc(Number(key) / 10);
      const y = Number(key) - (x * 10);

      if (this.board.sudokuPuzzle[x][y] === 0 && this.board.originalPuzzle[x][y] === 0) {
        this.context.font = 'Bold ' + Math.floor(this.gridBoxSize / 5) + 'px Poppins';
        this.context.textAlign = 'center';
        this.context.fillStyle = this.colors.COLOR_3_ALT;

        for (let num of this.notes[key]) {
          if (num !== 0) {
            const row = Math.trunc(num / 3.1);
            const col = (num + 2) % 3;

            /*
              if (this.board.isInvalidTile(x, y, num) {
                this.context.fillStyle = this.colors.COLOR_7_ALT;
              } else {
                this.context.fillStyle = this.colors.COLOR_3_ALT;
              }
             */

            this.context.fillText('' + num,
              (this.gridOffsetX) + (x * this.gridBoxSize) + (col * (this.gridBoxSize / 3)) + (this.gridBoxSize / 6),
              (this.gridOffsetY) + (y * this.gridBoxSize) + (row * (this.gridBoxSize / 3)) + (this.gridBoxSize / 4)
            );
          }
        }
      }
    }
  }

  drawBoard() {
    for (let i = 0 ; i < 9 ; i++) {
      for (let j = 0 ; j < 9 ; j++) {
        const boardValue = this.board.sudokuPuzzle[i][j];
        const startValue = this.board.originalPuzzle[i][j];

        this.context.font = 'Bold ' + Math.floor(this.gridBoxSize / 1.4) + 'px Poppins';
        this.context.textAlign = 'center';

        if (startValue !== 0) {
          this.context.fillStyle = '#e8d9be';
          this.context.fillText('' + startValue, (this.gridOffsetX) + ( i * this.gridBoxSize ) + (this.gridBoxSize / 2),
                                            (this.gridOffsetY) + ( (j + 1) * this.gridBoxSize ) - (this.gridBoxSize / 4));
        } else if (boardValue !== 0) {
          this.context.fillStyle = this.colors.COLOR_3_ALT;
          this.context.fillText('' + boardValue, (this.gridOffsetX) + ( i * this.gridBoxSize ) + (this.gridBoxSize / 2),
                                            (this.gridOffsetY) + ( (j + 1) * this.gridBoxSize ) - (this.gridBoxSize / 4));
        }
      }
    }
  }

  drawGrid() {
    for (let i = 0 ; i <= 9 ; i++) {
      this.context.lineWidth = 1;
      this.context.strokeStyle = '#e8d9be';
      this.context.moveTo(this.gridOffsetX + (i * this.gridBoxSize), this.gridOffsetY);
      this.context.lineTo(this.gridOffsetX + (i * this.gridBoxSize), this.gridOffsetY + (9 * this.gridBoxSize));
      this.context.stroke();
    }

    for (let j = 0 ; j <= 9 ; j++) {
      this.context.lineWidth = 1;
      this.context.strokeStyle = '#e8d9be';
      this.context.moveTo(this.gridOffsetX, this.gridOffsetY + (j * this.gridBoxSize));
      this.context.lineTo(this.gridOffsetX + (9 * this.gridBoxSize), this.gridOffsetY + (j * this.gridBoxSize));
      this.context.stroke();
    }

    for (let i = 1 ; i <= 2; i++) {
      this.context.fillStyle = '#e8d9be';
      this.context.fillRect(this.gridOffsetX + ((i * 3) * this.gridBoxSize) - 5, this.gridOffsetY, 10, (9 * this.gridBoxSize));
    }

    for (let j = 1 ; j <= 2 ; j++) {
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

    const boardLength = 9;
    const size = Math.min(this.canvas.offsetWidth - (this.gridOffsetX * 2),
                          this.canvas.offsetHeight - (this.gridOffsetY * 2));

    const w = this.canvas.offsetWidth;
    const h = this.canvas.offsetHeight;
    if (w > h) {
      this.gridOffsetX = Math.round( (w - h) / 2 ) + this.gridOffsetX;
    } else {
      this.gridOffsetY = Math.round( (h - w) / 2 ) + this.gridOffsetY;
    }

    this.gridBoxSize = Math.round((size / boardLength));

    this.draw();
  }

  done() {
    let that = this;
    GameStarterService.done(that);
  }

  /* EVENT LISTENERS */
  mousePressed(mouseEvent) {
    const x = mouseEvent.clientX - this.canvasOffsetX;
    const y = mouseEvent.clientY - this.canvasOffsetY;
    console.log({'mousePressedX': x, 'mousePressedY': y});
  }

  mouseReleased(mouseEvent) {
    const x = mouseEvent.clientX - this.canvasOffsetX;
    const y = mouseEvent.clientY - this.canvasOffsetY;
    console.log({'mouseReleasedX': x, 'mouseReleasedY': y});
  }

  @HostListener('document:mousemove', ['$event'])
  mouseMove(mouseEvent) {
    let x = mouseEvent.clientX - this.canvasOffsetX;
    let y = mouseEvent.clientY - this.canvasOffsetY;

    if (!this.solved) {
      x = Math.floor((x - this.gridOffsetX) / this.gridBoxSize);
      y = Math.floor((y - this.gridOffsetY) / this.gridBoxSize);

      this.selectedX = x;
      this.selectedY = y;
      this.draw();
    }
  }

  @HostListener('document:keydown', ['$event'])
  keyPressed(keyEvent) {
    if (!this.solved) {
      const numPressed = keyEvent.keyCode;
      if (numPressed === 32) {
        this.newGame();
        return;
      }

      let pressed = -1;
      if (numPressed >= 48 && numPressed <= 57) {
        pressed = numPressed - 48;
      } else if (numPressed >= 96 && numPressed <= 105) {
        pressed = numPressed - 96;
      }

      if (pressed >= 0) {
        if (this.selectedX <= 8 && this.selectedX >= 0 &&
           this.selectedY <= 8 && this.selectedY >= 0) {
          if (!this.takingNotes) {
            if (this.board.originalPuzzle[this.selectedX][this.selectedY] === 0) {

              if (this.board.sudokuPuzzle[this.selectedX][this.selectedY] === pressed) {
                this.board.sudokuPuzzle[this.selectedX][this.selectedY] = 0;
              } else {
                this.board.sudokuPuzzle[this.selectedX][this.selectedY] = pressed;
              }

              if (this.board.isSolved()) {
                this.done();
              }
            }
          } else {
            if (this.notes['' + this.selectedX + '' + this.selectedY + ''] === undefined) {
              this.notes['' + this.selectedX + '' + this.selectedY + ''] = [pressed];
            } else {
              if (this.notes['' + this.selectedX + '' + this.selectedY + ''].includes(pressed)) {
                const index = this.notes['' + this.selectedX + '' + this.selectedY + ''].indexOf(pressed);

                if (index > -1) {
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
    console.log({'keyReleased': keyEvent.keyCode});
  }

  handleOption(callback) {
    eval(callback);
  }
}
