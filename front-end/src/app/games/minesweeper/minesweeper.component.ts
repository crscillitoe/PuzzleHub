import { Inject, PLATFORM_ID, HostListener, Component, OnInit } from '@angular/core';
import { LoaderService } from '../../services/loading-service/loader.service';
import { TimerService } from '../../services/timer/timer.service';
import { TunnelService } from '../../services/tunnel/tunnel.service';
import { UserService } from '../../services/user/user.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { GameID } from '../../enums/game-id.enum';
import { Board } from '../../services/boards/minesweeper/board.service';
import { ColorService } from '../../services/colors/color.service';
import { GameStarterService } from '../../services/generators/game-starter.service';
import { GameBoard } from '../../classes/game-board';
import { OptionsService } from '../../services/games/options.service';
import { Title } from '@angular/platform-browser';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-minesweeper',
  templateUrl: '../game-board/game-board.component.html',
  styleUrls: ['../game-board/game-board.component.css']
})
export class MinesweeperComponent extends GameBoard {
  public firstPress = true;
  public isPressed = false;

  public lose = false;

  public board: Board;

  private imgBomb: any;
  private imgFlag: any;
  private imgTile: any;

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
    private titleService: Title
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
      optionsService
    );

    if(Number(this.route.snapshot.paramMap.get('diff')) === 0) {
      titleService.setTitle('Play Minesweeper - Puzzle Hub');
    }

    this.gameID = GameID.MINESWEEPER;
    this.gridBoxSize = 20; // needs to be dynamically adjusted by fixed sizes
    this.gridOffsetY = 56;

    if(isPlatformBrowser(platform)) {
      this.imgBomb = new Image();
      this.imgFlag = new Image();
      this.imgTile = new Image();
      this.imgBomb.src = '/assets/images/minesweeper/bomb.svg';
      this.imgFlag.src = '/assets/images/minesweeper/flag.svg';
      this.imgTile.src = '/assets/images/minesweeper/minesweeper_tile.svg';
    }
  }

  public setupBoard() {
    super.setupBoard();

    let width;
    let height;
    let bombCount;

    switch (this.difficulty) {
      // Easy or default
      case 1:
      default: {
        width = 6;
        height = 6;
        bombCount = 8; // ratio of 8
        break;
      }
      // Medium
      case 2: {
        width = 8;
        height = 8;
        bombCount = 10; // ratio of 8
        break;
      }
      // Hard
      case 3: {
        width = 16;
        height = 13;
        bombCount = 40;
        break;
      }
      // Extreme
      case 4: {
        width = 30;
        height = 16;
        bombCount = 99;
        break;
      }
    }

    this.board = new Board(width, height, bombCount, 0);
  }

  public newGame(difficulty = this.difficulty) {
    this.difficulty = difficulty;
    this.setupBoard();
    this.loader.startLoadingAnimation();
    this.lose = false;

    var that = this;
    GameStarterService.loadBestTimes(that);

    if (this.userService.isLoggedIn( )) {
      this.timer.startTimer(GameID.MINESWEEPER, this.difficulty)
        .subscribe( (data) => {
          // Generate board with given seed
          this.seed = data['seed'];

          this.board.seed = this.seed;
          this.board.generateBoard();
          this.firstPress = true;

          if (this.solved) {
            this.solved = false;

            this.startDate = new Date();
            this.displayTimer();
          } else {
            this.startDate = new Date();
          }

          this.loader.stopLoadingAnimation();
          this.fixSizes();
          this.draw();
        });
    } else {
      // Generate board with random seed
      this.seed = Math.floor(Math.random() * (2000000000));
      this.board.seed = this.seed;
      this.board.generateBoard();
      this.firstPress = true;

      if (this.solved) {
        this.solved = false;

        this.startDate = new Date();
        this.displayTimer();
      } else {
        this.startDate = new Date();
      }

      this.loader.stopLoadingAnimation();
      this.fixSizes();
      this.draw();
    }
  }

  public draw() {
    super.draw();

    this.drawGrid();
    this.drawTiles();

    if (!this.lose) {
      this.highlightTile();
    } else {
      this.drawBombs();
    }
  }

  drawGrid() {
    this.context.strokeStyle = '#606060';
    this.context.lineWidth = 1;

    for (let i = 0; i <= this.board.width; i++) {
      this.context.moveTo(this.gridOffsetX + (i * this.gridBoxSize), this.gridOffsetY);
      this.context.lineTo(this.gridOffsetX + (i * this.gridBoxSize), this.gridOffsetY +
        (this.board.height * this.gridBoxSize));
      this.context.stroke();
    }

    for (let j = 0; j <= this.board.height; j++) {
      this.context.moveTo(this.gridOffsetX, this.gridOffsetY + (j * this.gridBoxSize));
      this.context.lineTo(this.gridOffsetX + (this.board.width * this.gridBoxSize), this.gridOffsetY + (j * this.gridBoxSize));
      this.context.stroke();
    }
  }

  drawBombs() {
    for (let j = 0; j < this.board.height; j++) {
      for (let i = 0; i < this.board.width; i++) {
        if (this.board.mineField[j][i] === -1) {
          this.drawBomb(i, j);
        }
      }
    }
  }

  drawBomb(x, y) {
    const startX = (this.gridOffsetX) + ( x * this.gridBoxSize );
    const startY = (this.gridOffsetY) + ( y * this.gridBoxSize );
    const width = this.gridBoxSize;
    const height = this.gridBoxSize;

    this.context.fillStyle = '#FF0000';
    this.context.fillRect(startX, startY, width, height);

    this.context.drawImage(this.imgBomb, startX, startY, width, height);
  }

  drawVisibleTile(x, y) {
    const boardValue = this.board.mineField[y][x];
    let tileString;

    if (boardValue === 0) {
      tileString = '';
    } else if (boardValue === -1) {
      tileString = 'B';
    } else {
      tileString = '' + boardValue;
    }

    this.context.font = 'Bold ' + Math.floor(this.gridBoxSize / 1.6) + 'px Poppins';
    this.context.textAlign = 'center';
    this.context.fillStyle = this.colors.COLOR_1;

    if (tileString === '1') { this.context.fillStyle = this.colors.COLOR_2; }
    if (tileString === '2') { this.context.fillStyle = this.colors.COLOR_1; }
    if (tileString === '3') { this.context.fillStyle = this.colors.COLOR_3; }
    if (tileString === '4') { this.context.fillStyle = this.colors.COLOR_4; }
    if (tileString === '5') { this.context.fillStyle = this.colors.COLOR_5; }
    if (tileString === '6') { this.context.fillStyle = this.colors.COLOR_6; }
    if (tileString === '7') { this.context.fillStyle = this.colors.COLOR_7; }
    if (tileString === '8') { this.context.fillStyle = this.colors.COLOR_8; }

    this.context.fillText(
      tileString,
      (this.gridOffsetX) + ( x * this.gridBoxSize ) + (this.gridBoxSize / 2),
      (this.gridOffsetY) + ( (y + 1) * this.gridBoxSize ) - (this.gridBoxSize / 4));
  }

  drawPressedTile(x, y) {
    const startX = (this.gridOffsetX) + ( x * this.gridBoxSize );
    const startY = (this.gridOffsetY) + ( y * this.gridBoxSize );
    const width = this.gridBoxSize;
    const height = this.gridBoxSize;

    this.context.fillStyle = '#A0A0A0';
    this.context.fillRect(startX, startY, width, height);
  }

  drawHiddenTile (x, y, color) {
    const startX = (this.gridOffsetX) + ( x * this.gridBoxSize );
    const startY = (this.gridOffsetY) + ( y * this.gridBoxSize );
    const width = this.gridBoxSize;
    const height = this.gridBoxSize;

    this.context.drawImage(this.imgTile, startX, startY, width, height);
  }

  drawFlaggedTile (x, y) {
    this.drawHiddenTile(x, y, this.colors.COLOR_2);
    const startX = (this.gridOffsetX) + ( x * this.gridBoxSize ) + (this.gridBoxSize / 4);
    const startY = (this.gridOffsetY) + ( y * this.gridBoxSize ) + (this.gridBoxSize / 4);
    const width = this.gridBoxSize - (this.gridBoxSize / 2);
    const height = this.gridBoxSize - (this.gridBoxSize / 2);

    this.context.drawImage(this.imgFlag, startX, startY, width, height);
  }

  drawTiles() {
    for (let j = 0; j < this.board.height; j++) {
      for (let i = 0; i < this.board.width; i++) {
        if (this.board.visible[j][i] === 2) {
          this.drawFlaggedTile(i, j);
        } else if (this.board.visible[j][i] !== 0) {
          this.drawVisibleTile(i, j);
        } else {
          this.drawHiddenTile(i, j, this.colors.COLOR_5_ALT);
        }
      }
    }
  }

  highlightTile() {
    if (
      this.selectedX < 0 ||
      this.selectedX >= this.board.width ||
      this.selectedY < 0 ||
      this.selectedY >= this.board.height) {
      return;
    }

    if (!this.isPressed && (!this.mb1Pressed || !this.mb2Pressed)) {
      return;
    }

    if (this.mb1Pressed && this.mb2Pressed) {
      const x = this.selectedX;
      const y = this.selectedY;

      if (this.board.visible[y][x] === 0) {
        this.drawPressedTile(x, y);
      }

      if (x + 1 < this.board.width) {
        if (this.board.visible[y][x + 1] === 0) {
          this.drawPressedTile(x + 1, y);
        }

        if (y + 1 < this.board.height) {
          if (this.board.visible[y + 1][x + 1] === 0) {
            this.drawPressedTile(x + 1, y + 1);
          }
        }

        if (y - 1 >= 0) {
          if (this.board.visible[y - 1][x + 1] === 0) {
            this.drawPressedTile(x + 1, y - 1);
          }
        }
      }

      if (x - 1 >= 0) {
        if (this.board.visible[y][x - 1] === 0) {
          this.drawPressedTile(x - 1, y);
        }

        if (y + 1 < this.board.height) {
          if (this.board.visible[y + 1][x - 1] === 0) {
            this.drawPressedTile(x - 1, y + 1);
          }
        }

        if (y - 1 >= 0) {
          if (this.board.visible[y - 1][x - 1] === 0) {
            this.drawPressedTile(x - 1, y - 1);
          }
        }
      }

      if (y + 1 < this.board.height) {
        if (this.board.visible[y + 1][x] === 0) {
          this.drawPressedTile(x, y + 1);
        }
      }

      if (y - 1 >= 0) {
        if (this.board.visible[y - 1][x] === 0) {
          this.drawPressedTile(x, y - 1);
        }
      }
    } else {
      if (this.board.visible[this.selectedY][this.selectedX] === 0) {
        this.drawPressedTile(this.selectedX, this.selectedY);
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

    let boardLength = 16;
    if (this.difficulty !== 4) {
      boardLength = Math.max(this.board.width, this.board.height);
    }
    const size = Math.min(this.canvas.offsetWidth - (this.gridOffsetX),
                        this.canvas.offsetHeight - (this.gridOffsetY));

    const w = this.canvas.offsetWidth;
    const h = this.canvas.offsetHeight;
    if (this.difficulty !== 4) {
      if (w > h) {
        this.gridOffsetX = Math.round( (w - h) / 2 ) + this.gridOffsetX;
      } else {
        this.gridOffsetY = Math.round( (h - w) / 2 ) + this.gridOffsetY;
      }
    }

    this.gridBoxSize = Math.round((size / boardLength));

    this.draw();
  }

  /* EVENT LISTENERS */
  @HostListener('document:mousedown', ['$event'])
  mousePressed(mouseEvent) {
    let x = mouseEvent.clientX - this.canvasOffsetX;
    let y = mouseEvent.clientY - this.canvasOffsetY;
    if (!this.solved) {
      x = Math.floor((x - this.gridOffsetX) / this.gridBoxSize);
      y = Math.floor((y - this.gridOffsetY) / this.gridBoxSize);

      if (mouseEvent.button === 2 && !this.mb1Pressed) {
        this.mb2Pressed = true;
        this.board.flagTile(x, y);
        this.draw();
      } else if (mouseEvent.button === 0 && !this.mb2Pressed) {
        this.isPressed = true;
        this.mb1Pressed = true;
        this.selectedX = x;
        this.selectedY = y;
        this.draw();
      } else {
        this.mb1Pressed = true;
        this.mb2Pressed = true;
        this.selectedX = x;
        this.selectedY = y;
        this.draw();
      }
    }
  }

  @HostListener('document:mouseup', ['$event'])
  mouseReleased(mouseEvent) {
    if (!this.solved) {
      if (mouseEvent.button === 2) {
        this.mb2Pressed = false;
        this.draw();
      }

      if (mouseEvent.button === 0) {
        this.isPressed = false;
        this.mb1Pressed = false;
        this.draw();
      }
      let x = mouseEvent.clientX - this.canvasOffsetX;
      let y = mouseEvent.clientY - this.canvasOffsetY;

      x = Math.floor((x - this.gridOffsetX) / this.gridBoxSize);
      y = Math.floor((y - this.gridOffsetY) / this.gridBoxSize);

      if (x < 0 || x >= this.board.width || y < 0 || y >= this.board.height) {
        return;
      }

      if (mouseEvent.button === 2 && !this.mb1Pressed) {
        this.mb2Pressed = false;
      } else if (mouseEvent.button === 0 && this.firstPress && !this.mb2Pressed) {
        if (this.board.visible[y][x] !== 2) {
          this.board.firstClick(x, y);
          this.firstPress = false;
        }
        this.draw();
      } else if (mouseEvent.button === 0 && !this.mb2Pressed) {
        const goodPress = this.board.click(x, y);
        if (!goodPress) {
          this.lose = true;
          this.solved = true;
        }
        this.draw();
      } else {
        const goodPress = this.board.doubleClick(x, y);
        if (!goodPress) {
          this.lose = true;
          this.solved = true;
        }
        this.draw();
      }

      if (this.board.isSolved()) {
        this.draw();
        this.done();
      }
    }
  }

  @HostListener('document:mousemove', ['$event'])
  mouseMove(mouseEvent) {
    let x = mouseEvent.clientX - this.canvasOffsetX;
    let y = mouseEvent.clientY - this.canvasOffsetY;

    if (!this.solved) {
      x = Math.floor((x - this.gridOffsetX) / this.gridBoxSize);
      y = Math.floor((y - this.gridOffsetY) / this.gridBoxSize);

      if (this.isPressed || (this.mb1Pressed && this.mb2Pressed)) {
        this.selectedX = x;
        this.selectedY = y;
        this.draw();
      }
    }
  }
}
