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

  gameID = GameID.NONOGRAMS;

  selectedX = -1;
  selectedY = -1;

  controls = 'Left click on a tile to mark it.';
  rules = 'Google it you goof.';

  // Used for drawing to the screen
  canvas: any;
  context: any;

  // Used to display previous best times
  personalBestDaily: string;
  personalBestWeekly: string;
  personalBestMonthly: string;

  colors: any;

  canvasOffsetX = 225;
  canvasOffsetY = 56;

  // Most games utilize a grid
  gridOffsetX = 100;
  gridOffsetY = 100;

  gridBoxSize: number;

  difficulty: number;
  seed: number;

  solved = false;

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

    let width;
    let height;

    switch (this.difficulty) {
      // Easy or default
      case 1:
      default: {
        width = 5;
        height = 5;
        break;
      }
      // Medium
      case 2: {
        width = 10;
        height = 10;
        break;
      }
      // Hard
      case 3: {
        width = 15;
        height = 15;
        break;
      }
      // Extreme
      case 4: {
        width = 20;
        height = 20;
        break;
      }
    }

    this.board = new Board(width, height, 0);
  }

  newGame(difficulty = this.difficulty) {
    this.difficulty = difficulty;
    this.setupBoard();
    let that = this;
    GameStarterService.newGame(that);
  }

  draw() {
    this.context.beginPath();
    this.drawBackground();
    if (!this.solved) {
      this.drawSelectedBox();
    }
    this.drawLegends();
    this.drawBoard();
    this.drawGrid();
  }

  drawBoard() {
    const tileSize = 1;
    for (let i = 0 ; i < this.board.width ; i++) {
      for (let j = 0 ; j < this.board.height ; j++) {
        if (this.board.boardVals[i][j] === 1) {
          if (this.solved) {
            this.context.fillStyle = this.colors.COLOR_1;
          } else {
            this.context.fillStyle = this.colors.COLOR_3;
          }
          const x = this.gridOffsetX + (this.gridBoxSize * (i + (this.board.maxWidth - this.board.width)));
          const y = this.gridOffsetY + (this.gridBoxSize * (j + (this.board.maxHeight - this.board.height)));
          this.context.fillRect(x + tileSize, y + tileSize,
            this.gridBoxSize - (2 * tileSize),
            this.gridBoxSize - (2 * tileSize));
        } else if (this.board.markedVals[i][j] === 1) {
          this.context.fillStyle = this.colors.COLOR_8;
          const x = this.gridOffsetX + (this.gridBoxSize * (i + (this.board.maxWidth - this.board.width)));
          const y = this.gridOffsetY + (this.gridBoxSize * (j + (this.board.maxHeight - this.board.height)));
          this.context.fillRect(x + tileSize, y + tileSize,
            this.gridBoxSize - (2 * tileSize),
            this.gridBoxSize - (2 * tileSize));
        }
      }
    }
  }

  drawSelectedBox() {
    const tileSize = 1;
    if (this.selectedX <= this.board.maxWidth - 1 && this.selectedX >= this.board.maxWidth - this.board.width &&
       this.selectedY <= this.board.maxHeight - 1 && this.selectedY >= this.board.maxHeight - this.board.height) {
      this.context.fillStyle = '#3D3D3D';
      this.context.fillRect(this.gridOffsetX + (this.selectedX * this.gridBoxSize) + tileSize,
                            this.gridOffsetY + (this.selectedY * this.gridBoxSize) + tileSize,
                              this.gridBoxSize - (2 * tileSize), this.gridBoxSize - (2 * tileSize));
    }
  }

  drawBackground() {
    this.context.fillStyle = this.colors.BACKGROUND; // Background color
    this.context.fillRect(0, 0, this.canvas.offsetWidth * 2, this.canvas.offsetHeight * 2);
  }

  drawGrid() {
    this.context.strokeStyle = '#d8c9ae';
    this.context.fillStyle = '#d8c9ae';
    this.context.lineWidth = 1;

    const bigSize = 3;

    for (let i = this.board.maxWidth - this.board.width; i < this.board.maxWidth + 1; i++) {
      if (((i - this.board.getLegendLength()) % 5) === 0) {
        this.context.fillRect( (this.gridOffsetX + (i * this.gridBoxSize)) - bigSize, this.gridOffsetY,
                               2 * bigSize, ((this.board.maxHeight) * this.gridBoxSize)) + bigSize;
      } else {
        this.context.moveTo(this.gridOffsetX + (i * this.gridBoxSize), this.gridOffsetY);
        this.context.lineTo(this.gridOffsetX + (i * this.gridBoxSize), this.gridOffsetY + ((this.board.maxHeight) * this.gridBoxSize));
        this.context.stroke();
      }
    }

    for (let j = this.board.maxHeight - this.board.height; j < this.board.maxHeight + 1; j++) {
      if ((j - this.board.getLegendLength()) % 5 === 0) {
        this.context.fillRect( this.gridOffsetX, (this.gridOffsetY + (j * this.gridBoxSize)) - bigSize,
                               ((this.board.maxWidth) * this.gridBoxSize) + bigSize, 2 * bigSize);
      } else {
        this.context.moveTo(this.gridOffsetX, this.gridOffsetY + (j * this.gridBoxSize));
        this.context.lineTo(this.gridOffsetX + ((this.board.maxWidth) * this.gridBoxSize), this.gridOffsetY + (j * this.gridBoxSize));
        this.context.stroke();
      }
    }

    this.context.lineWidth = 1;
    this.context.moveTo(this.gridOffsetX, this.gridOffsetY);
    this.context.lineTo(this.gridOffsetX + ((this.board.maxWidth) * this.gridBoxSize), this.gridOffsetY);
    this.context.stroke();

    this.context.moveTo(this.gridOffsetX, this.gridOffsetY);
    this.context.lineTo(this.gridOffsetX, this.gridOffsetY + ((this.board.maxHeight) * this.gridBoxSize));
    this.context.stroke();
  }

  drawLegends() {
    this.context.font = 'Bold ' + Math.floor(this.gridBoxSize / 1.4) + 'px Poppins';
    this.context.textAlign = 'center';

    for (let i = 0 ; i < this.board.rowLabels.length ; i++) {
      for (let labI = 0 ; labI < this.board.rowLabels[i].length ; labI++) {
        const valid = this.board.isRowLabelValid(i, labI);
        if (valid === 0) {
          this.context.fillStyle = '#e8d9be';
        } else if (valid === -1) {
          this.context.fillStyle = this.colors.COLOR_8;
        } else if (valid === 1) {
          this.context.fillStyle = this.colors.COLOR_1;
        }
        const toDraw = '' + this.board.rowLabels[i][labI];

        const index = labI + ((this.board.maxWidth - this.board.width) - this.board.rowLabels[i].length);
        this.context.fillText(
          toDraw,
          this.gridOffsetX +
            ((i + (this.board.maxWidth - this.board.width)) *
            this.gridBoxSize) +
            (this.gridBoxSize / 2),
          this.gridOffsetY + (index * this.gridBoxSize) + (this.gridBoxSize / 1.3)
        );
      }
    }

    for (let j = 0 ; j < this.board.colLabels.length ; j++) {
      for (let labJ = 0 ; labJ < this.board.colLabels[j].length ; labJ++) {
        const valid = this.board.isColLabelValid(j, labJ);
        if (valid === 0) {
          this.context.fillStyle = '#e8d9be';
        } else if (valid === -1) {
          this.context.fillStyle = this.colors.COLOR_8;
        } else if (valid === 1) {
          this.context.fillStyle = this.colors.COLOR_1;
        }
        const toDraw = '' + this.board.colLabels[j][labJ];

        const index = labJ + ((this.board.maxHeight - this.board.height) - this.board.colLabels[j].length);
        this.context.fillText(
          toDraw,
          this.gridOffsetX + (index * this.gridBoxSize) + (this.gridBoxSize / 2),
          this.gridOffsetY + ((j + (this.board.maxHeight - this.board.height)) * this.gridBoxSize) + (this.gridBoxSize / 1.3));
      }
    }
  }

  done() {
    let that = this;
    GameStarterService.done(that);
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
      display.textContent =
        hours + ':' +
        (minutes ? (minutes > 9 ? minutes : '0' + minutes) : '00') + ':' +
        (seconds ? (seconds > 9 ? seconds : '0' + seconds) : '00') + '.' +
        (millis  ? (millis > 99 ? millis : millis > 9 ? '0' + millis : '00' + millis) : '000');

      that.displayTimer();
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

  fixSizes() {
    this.context.beginPath();
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.canvas.width = window.innerWidth - this.canvasOffsetX;
    this.canvas.height = window.innerHeight - (this.canvasOffsetY * 2);
    this.context.translate(0.5, 0.5);

    this.gridOffsetX = this.canvas.width / 20;
    this.gridOffsetY = this.canvas.height / 20;

    const boardLength = Math.max(this.board.maxWidth, this.board.maxHeight);
    const size = Math.min(this.canvas.offsetWidth - (this.gridOffsetX * 2), 
                        this.canvas.offsetHeight - (this.gridOffsetY * 2));

    const w = this.canvas.offsetWidth;
    const h = this.canvas.offsetHeight;
    if (w > h) {
      this.gridOffsetX = Math.round( ( w - h) / 2 ) + this.gridOffsetX;
    } else {
      this.gridOffsetY = Math.round( (h - w) / 2 ) + this.gridOffsetY;
    }

    this.gridBoxSize = Math.round((size / boardLength));
    this.draw();
  }

  handleOption(callback) {
    eval(callback);
  }

  /* EVENT LISTENERS */

  // UNCOMMENT HostListener to track given event
  @HostListener('document:mousedown', ['$event'])
  mousePressed(mouseEvent) {
    let x = mouseEvent.clientX - this.canvasOffsetX;
    let y = mouseEvent.clientY - this.canvasOffsetY;
    if (!this.solved) {
      x = Math.floor((x - this.gridOffsetX) / this.gridBoxSize);
      y = Math.floor((y - this.gridOffsetY) / this.gridBoxSize);

      const diff = this.board.maxWidth - this.board.width;

      if (mouseEvent.button === 0) {
        this.board.click(x - diff, y - diff);
      } else if (mouseEvent.button === 2) {
        this.board.mark(x - diff, y - diff);
      }
      if (this.board.isSolved()) {
        this.done();
      }
      this.draw();
    }
  }

  // UNCOMMENT HostListener to track given event
  // @HostListener('document:mouseup', ['$event'])
  mouseReleased(mouseEvent) {
    const x = mouseEvent.clientX - this.canvasOffsetX;
    const y = mouseEvent.clientY - this.canvasOffsetY;
    console.log({'mouseReleasedX': x, 'mouseReleasedY': y});
  }

  // UNCOMMENT HostListener to track given event
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

  // UNCOMMENT HostListener to track given event
  @HostListener('document:keydown', ['$event'])
  keyPressed(keyEvent) {
    const code = keyEvent.keyCode;
    if (code === 32) {
      this.newGame();
      return;
    }
  }

  // UNCOMMENT HostListener to track given event
  // @HostListener('document:keyup', ['$event'])
  keyReleased(keyEvent) {
    console.log({'keyReleased': keyEvent.keyCode});
  }
}
