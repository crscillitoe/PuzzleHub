import { Inject, PLATFORM_ID, HostListener, Component } from '@angular/core';
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
import { GameBoard } from '../../classes/game-board';
import { OptionsService } from '../../services/games/options.service';
import { MetaService } from '../../services/meta/meta.service';

@Component({
  selector: 'app-sudoku',
  templateUrl: '../game-board/game-board.component.html',
  styleUrls: ['../game-board/game-board.component.css']
})
export class SudokuComponent extends GameBoard {

  numCarved: number;
  board: any;

  notes: any = {};

  constructor(
    @Inject(PLATFORM_ID) private platform: Object,
    route: ActivatedRoute,
    colorService: ColorService,
    router: Router,
    tunnel: TunnelService,
    userService: UserService,
    timer: TimerService,
    loader: LoaderService,
    optionsService: OptionsService,
    meta: MetaService
  ) {
    super(
      platform,
      route,
      colorService,
      router,
      tunnel,
      userService,
      timer,
      loader,
      optionsService,
      meta
    );

    this.gameID = GameID.SUDOKU;

    this.takingNotesMode = true;
  }

  setupBoard() {
    super.setupBoard();

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

  draw() {
    super.draw();
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
    for (const key of Object.keys(this.notes)) {
      const x = Math.trunc(Number(key) / 10);
      const y = Number(key) - (x * 10);

      if (this.board.sudokuPuzzle[x][y] === 0 && this.board.originalPuzzle[x][y] === 0) {
        this.context.font = 'Bold ' + Math.floor(this.gridBoxSize / 5) + 'px Poppins';
        this.context.textAlign = 'center';
        this.context.fillStyle = this.colors.COLOR_3_ALT;

        for (const num of this.notes[key]) {
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
    const numPressed = keyEvent.keyCode;
    super.keyPressed(keyEvent);

    if (!this.solved) {
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

              this.checkIsSolved(this.board);
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

  public notesHandler($event: any) {
    this.takingNotes = $event;
  }
}
