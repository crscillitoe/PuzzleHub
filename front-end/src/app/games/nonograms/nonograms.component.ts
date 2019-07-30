import { Inject, PLATFORM_ID, HostListener, Component } from '@angular/core';
import { LoaderService } from '../../services/loading-service/loader.service';
import { TimerService } from '../../services/timer/timer.service';
import { TunnelService } from '../../services/tunnel/tunnel.service';
import { UserService } from '../../services/user/user.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { GameID } from '../../enums/game-id.enum';
import { Board } from '../../services/boards/nonograms/board.service';
import { ColorService } from '../../services/colors/color.service';
import { GameStarterService } from '../../services/generators/game-starter.service';
import { GameBoard } from '../../classes/game-board';
import { OptionsService } from '../../services/games/options.service';
import { MetaService } from '../../services/meta/meta.service';

@Component({
  selector: 'app-nonograms',
  templateUrl: '../game-board/game-board.component.html',
  styleUrls: ['../game-board/game-board.component.css']
})
export class NonogramsComponent extends GameBoard {

  board: any;

  mouseDown: number;
  addingMode: boolean;

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

    this.gameID = GameID.NONOGRAMS;

    this.selectedX = -1;
    this.selectedY = -1;
  }

  setupBoard() {
    super.setupBoard();

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

    let predefinedRandom = 0;
    if (this.route.snapshot.paramMap.get('nonogramsCustom')) {
      predefinedRandom = Number(this.route.snapshot.paramMap.get('nonogramsCustom'));
    }
    this.board = new Board(width, height, 0, predefinedRandom);
  }

  draw() {
    super.draw();
    if (!this.solved && this.mouseDown === -1) {
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

      this.mouseDown = mouseEvent.button;

      if (mouseEvent.button === 0) {
        this.board.click(x - diff, y - diff);
        this.checkIsSolved(this.board);
      } else if (mouseEvent.button === 2) {
        this.board.mark(x - diff, y - diff);
        this.checkIsSolved(this.board);
      }

      this.addingMode = (this.board.isLabeled(x - diff, y - diff));
      this.draw();
    }
  }

  // UNCOMMENT HostListener to track given event
  @HostListener('document:mouseup', ['$event'])
  mouseReleased(mouseEvent) {
    const x = mouseEvent.clientX - this.canvasOffsetX;
    const y = mouseEvent.clientY - this.canvasOffsetY;

    this.mouseDown = -1;
  }

  // UNCOMMENT HostListener to track given event
  @HostListener('document:mousemove', ['$event'])
  mouseMove(mouseEvent) {
    let x = mouseEvent.clientX - this.canvasOffsetX;
    let y = mouseEvent.clientY - this.canvasOffsetY;

    x = Math.floor((x - this.gridOffsetX) / this.gridBoxSize);
    y = Math.floor((y - this.gridOffsetY) / this.gridBoxSize);

    if (!this.solved) {
      if(this.mouseDown === -1) {
        this.selectedX = x;
        this.selectedY = y;
        this.draw();
      } else {
        const diff = this.board.maxWidth - this.board.width;

        if (this.mouseDown === 0) {
          if ((this.addingMode && !this.board.isClicked(x - diff, y - diff)) ||
              (!this.addingMode && this.board.isClicked(x - diff, y - diff))) {
            this.board.click(x - diff, y - diff);
            this.checkIsSolved(this.board);
          }
        } else if (this.mouseDown === 2) {
          if ((this.addingMode && !this.board.isMarked(x - diff, y - diff)) ||
              (!this.addingMode && this.board.isMarked(x - diff, y - diff))) {
            this.board.mark(x - diff, y - diff);
          }
        }

        this.draw();
      }
    }
  }
}
