import { Inject, PLATFORM_ID, HostListener, Component, OnInit } from '@angular/core';
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
import { GameStarterService } from '../../services/generators/game-starter.service';
import { GameBoard } from '../../classes/game-board';
import { OptionsService } from '../../services/games/options.service';

@Component({
  selector: 'app-tile-game',
  templateUrl: '../game-board/game-board.component.html',
  styleUrls: ['../game-board/game-board.component.css']
})
export class TileGameComponent extends GameBoard implements OnInit {

  initialDelay = 200;
  continuedDelay = 16;

  upTimeout: any;
  downTimeout: any;
  leftTimeout: any;
  rightTimeout: any;

  staticTileSize: boolean;

  shift: boolean;

  xAxis: boolean;
  yAxis: boolean;

  shiftKey = 16;
  upKey = 83;
  downKey = 87;
  leftKey = 68;
  rightKey = 65;

  colorScheme: string;

  animatingX: number;
  animatingY: number;

  showAnimations: boolean;
  mouseHover: boolean;

  animationDelta = 10;
  animationSpeed = 10;

  up: boolean;
  down: boolean;
  left: boolean;
  right: boolean;

  board: Board;

  constructor(
    @Inject(PLATFORM_ID) private platform: Object,
    route: ActivatedRoute,
    colorService: ColorService,
    router: Router,
    tunnel: TunnelService,
    userService: UserService,
    timer: TimerService,
    loader: LoaderService,
    optionsService: OptionsService
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

    this.gameID = GameID.TILE_GAME;
    this.options = [
      {
        'type': 'checkbox',
        'bindTo': 'showAnimations',
        'name': 'Show Animations',
        'callback': 'this.toggleAnimations()',
        'storedName': 'tileAnimations'
      },
      {
        'type': 'checkbox',
        'bindTo': 'mouseHover',
        'name': 'Mouse Hover',
        'callback': 'this.toggleMouseHover()',
        'storedName': 'HoverTileGame'
      },
      {
        'type': 'checkbox',
        'bindTo': 'staticTileSize',
        'name': 'Fixed Tile Size',
        'callback': 'this.toggleStaticSizes()',
        'storedName': 'StaticTileSize',
      },
      {
        'type': 'dropdown',
        'bindTo': 'colorScheme',
        'name': 'Color Scheme',
        'callback': 'this.updateColorScheme()',
        'storedName': 'TileGameColorScheme',
        'options': [
          'Fringe',
          'Rows',
          'Rows & Cols',
          'Quadrants'
        ]
      }
    ];

    this.hotkeys = [
      {
        'name': 'UP',
        'bindTo': 'TileGameDOWN',
        'callback': 'this.configureHotkeys()'
      },
      {
        'name': 'DOWN',
        'bindTo': 'TileGameUP',
        'callback': 'this.configureHotkeys()'
      },
      {
        'name': 'LEFT',
        'bindTo': 'TileGameRIGHT',
        'callback': 'this.configureHotkeys()'
      },
      {
        'name': 'RIGHT',
        'bindTo': 'TileGameLEFT',
        'callback': 'this.configureHotkeys()'
      }
    ];
  }

  ngOnInit() {
    this.shift = false;
    this.xAxis = false;
    this.yAxis = false;
    this.up = false;
    this.down = false;
    this.left = false;
    this.right = false;

    this.showAnimations = SettingsService.getDataBool('tileAnimations');
    this.mouseHover = SettingsService.getDataBool('HoverTileGame');
    this.staticTileSize = SettingsService.getDataBool('StaticTileSize');
    this.colorScheme = SettingsService.getDataStr('TileGameColorScheme');

    this.configureHotkeys();

    super.ngOnInit();
  }

  setupBoard() {
    super.setupBoard();

    let width;
    let height;

    switch (this.difficulty) {
      // Easy or default
      case 1:
      default: {
        width = 4;
        height = 4;
        break;
      }
      // Medium
      case 2: {
        width = 5;
        height = 5;
        break;
      }
      // Hard
      case 3: {
        width = 7;
        height = 7;
        break;
      }
      // Extreme
      case 4: {
        width = 10;
        height = 10;
        break;
      }
      // Custom board size
      case 5: {
        width = Number(this.route.snapshot.paramMap.get('width'));
        height = Number(this.route.snapshot.paramMap.get('height'));
        console.log(width);
        console.log(height);
        break;
      }
    }

    // Uncomment these to add event listeners
    // this.canvas.addEventListener('mouseup',   (e) => this.mouseReleased(e), false);
    // this.canvas.addEventListener('mousemove', (e) => this.mouseMove(e),     false);

    // window.addEventListener('keyup',   (e) => this.keyReleased(e), false);
    this.board = new Board(width, height, 0);
  }

  toggleMouseHover() {
    this.mouseHover = !this.mouseHover;
    SettingsService.storeData('HoverTileGame', this.mouseHover);
  }

  toggleAnimations() {
    this.showAnimations = !this.showAnimations;
    this.animatingX = -1;
    this.animatingY = -1;
    SettingsService.storeData('tileAnimations', this.showAnimations);
    this.draw();
  }

  configureHotkeys() {
    this.upKey    = SettingsService.getDataNum('TileGameUP');
    this.downKey  = SettingsService.getDataNum('TileGameDOWN');
    this.leftKey  = SettingsService.getDataNum('TileGameLEFT');
    this.rightKey = SettingsService.getDataNum('TileGameRIGHT');
  }

  draw() {
    super.draw();
    // this.drawGrid();
    this.drawTiles();
  }

  drawBackground() {
    this.context.fillStyle = this.colors.BACKGROUND; // Background color
    this.context.fillRect(0, 0, this.canvas.offsetWidth * 2, this.canvas.offsetHeight * 2);
  }

  drawGrid() {
    for (let i = 0 ; i <= this.board.width ; i++) {
      this.context.lineWidth = 1;
      this.showAnimations = !this.showAnimations;
      SettingsService.storeData('tileAnimations', this.showAnimations);
      this.draw();
      this.context.strokeStyle = this.colors.COLOR_1;
      this.context.moveTo(this.gridOffsetX + (i * this.gridBoxSize), this.gridOffsetY);
      this.context.lineTo(this.gridOffsetX + (i * this.gridBoxSize), this.gridOffsetY + (this.board.height * this.gridBoxSize));
      this.context.stroke();
    }

    for (let j = 0 ; j <= this.board.height ; j++) {
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
    for (let j = 0 ; j < this.board.height ; j++) {
      for (let i = 0 ; i < this.board.width; i++) {

        const boardValue = this.board.tilePuzzle[j][i];
        let tileString = '' + boardValue;
        if (tileString === '0') { tileString = ''; }

        if (this.board.width * this.board.height <= 100) {
          this.context.font = 'Bold ' + Math.floor(this.gridBoxSize / 1.4) + 'px Poppins';
        } else {
          this.context.font = 'Bold ' + Math.floor(this.gridBoxSize / 2) + 'px Poppins';
        }
        this.context.textAlign = 'center';

        const drawColors = [
          this.colors.COLOR_6_ALT, // RED
          this.colors.COLOR_4,     // ORANGE
          this.colors.COLOR_4_ALT, // YELLOW
          this.colors.COLOR_1_ALT, // LIGHT GREEN
          this.colors.COLOR_1,     // GREEN
          this.colors.COLOR_3_ALT, // LIGHT BLUE
          this.colors.COLOR_2_ALT, // BLUE
          this.colors.COLOR_3,     // DARK BLUE
          this.colors.COLOR_5,     // PURPLE
          this.colors.COLOR_5_ALT  // PINK
        ];

        let innerColor = '#FFFFFF';

        if (this.colorScheme === 'Fringe') {
          for (let u = this.board.width ; u > 0 ; u--) {
            if (boardValue <= (this.board.width * (u)) ||
              (boardValue % this.board.width) === (u % 10)) {
              this.context.fillStyle = drawColors[(u - 1) % 10];
            }
          }
        } else if (this.colorScheme === 'Rows') {
          for (let h = this.board.width ; h >= 0 ; h--) {
            if (Math.floor((boardValue - 1) / this.board.width) % 10 === h % 10) {
              this.context.fillStyle = drawColors[h % 10];
              break;
            }
          }
        } else if (this.colorScheme === 'Rows & Cols') {
          for (let h = this.board.width ; h >= 0 ; h--) {
            if (
              (Math.floor((boardValue - 1) / this.board.width) % 10 === h % 10) &&
               Math.floor((boardValue - 1) / this.board.width) < this.board.width - 2
            ) {
              this.context.fillStyle = drawColors[h % 10];
              break;
            } else if (((boardValue - 1) % this.board.width) === h &&
              Math.floor((boardValue - 1) / this.board.width) >= this.board.width - 2) {
              this.context.fillStyle = drawColors[h % 10];
              break;
            }
          }
        } else if (this.colorScheme === 'Quadrants') {
          const xi = ((boardValue - 1) % this.board.height);
          const yi = Math.floor((boardValue - 1) / this.board.width);
          let innerBoardValue = -1;

          if (xi < this.board.height / 2 && yi < this.board.width / 2) {
            this.context.fillStyle = drawColors[0];
            innerBoardValue = boardValue - (yi * (this.board.height / 2));
          } else if (xi >= this.board.height / 2 && yi < this.board.width / 2) {
            this.context.fillStyle = drawColors[2];
            innerBoardValue = boardValue - (yi * (this.board.height / 2)) - this.board.width / 2;
          } else if (xi < this.board.height / 2 && yi >= this.board.width / 2) {
            this.context.fillStyle = drawColors[3];
            innerBoardValue = boardValue - ((yi + this.board.height / 2) * (this.board.height / 2));
          } else if (xi >= this.board.height / 2 && yi >= this.board.width / 2) {
            this.context.fillStyle = drawColors[9];
            innerBoardValue = boardValue - ((yi + this.board.height / 2) * (this.board.height / 2)) - this.board.width / 2;
          }

          for (let u = (this.board.width / 2); u > 0 ; u--) {
            if (innerBoardValue <= ((this.board.width / 2) * (u)) ||
              (innerBoardValue % Math.floor(this.board.width / 2)) === (u % 10)) {
              innerColor = drawColors[(u - 1) % 10];
            }
          }
        }


        const spacing = this.gridBoxSize / 40;

        if ((i !== this.animatingX || j !== this.animatingY) || !this.showAnimations) {
          if (boardValue !== 0) {
            this.roundRect(this.context, (this.gridOffsetX + (i * this.gridBoxSize )) + spacing, 
                                  (this.gridOffsetY + (j * this.gridBoxSize )) + spacing,
                                  this.gridBoxSize - (spacing * 2), 
                                  this.gridBoxSize - (spacing * 2), 
                                  (this.gridBoxSize/20), 
                                  true, 
                                  false);

            if (this.colorScheme === 'Quadrants' && (this.board.width * this.board.height) >= 100) {
              this.context.fillStyle = innerColor;
              this.roundRect(this.context, 
                                    ((this.gridOffsetX + (i * this.gridBoxSize )) + spacing) + (0.1 * this.gridBoxSize), 
                                    ((this.gridOffsetY + (j * this.gridBoxSize )) + spacing) + (0.8 * this.gridBoxSize),
                                    (this.gridBoxSize - (spacing * 2)) - (0.2 * this.gridBoxSize), 
                                    (this.gridBoxSize - (spacing * 2)) - (0.85 * this.gridBoxSize), 
                                    (this.gridBoxSize/20), 
                                    true, 
                                    true);
            }
          }

          this.context.fillStyle = this.colors.BACKGROUND;
          this.context.fillText(tileString, (this.gridOffsetX) + ( i * this.gridBoxSize ) + (this.gridBoxSize / 2),
                                            (this.gridOffsetY) + ( (j + 1) * this.gridBoxSize ) - (this.gridBoxSize / 4));
        }
      }
    }
  }

  updateColorScheme() {
    this.colorScheme = SettingsService.getDataStr('TileGameColorScheme');
    this.draw();
  }

  fixSizes() {
    this.context.beginPath();
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.canvas.width = window.innerWidth - this.canvasOffsetX;
    this.canvas.height = window.innerHeight - (this.canvasOffsetY * 2);
    this.context.translate(0.5, 0.5);

    this.gridOffsetX = this.canvas.width / 20;
    this.gridOffsetY = this.canvas.height / 20;

    let boardLength = Math.max(this.board.width, this.board.height);
    let size = Math.min(this.canvas.offsetWidth - (this.gridOffsetX * 2), 
                        this.canvas.offsetHeight - (this.gridOffsetY * 2));

    let w = this.canvas.offsetWidth;
    let h = this.canvas.offsetHeight;
    if (w > h) {
      this.gridOffsetX = Math.round( ( w - h) / 2 ) + this.gridOffsetX;
    } else {
      this.gridOffsetY = Math.round( (h - w) / 2 ) + this.gridOffsetY;
    }

    if (!this.staticTileSize) {
      this.gridBoxSize = Math.round((size / boardLength));
    } else {
      this.gridBoxSize = 75;
    }
    this.animationDelta = this.gridBoxSize/5;

    this.draw();
  }

  toggleStaticSizes() {
    this.staticTileSize = !this.staticTileSize;
    SettingsService.storeData('StaticTileSize', this.staticTileSize);
    this.fixSizes();
  }

  animateTileUp(animx, animy, y, x, destY, destX) {
    if (this.animatingX !== animx || this.animatingY !== animy) {
      return;
    } else if (y > destY) {
      this.animatingX = -1;
      this.animatingY = -1;
      this.draw();
      return;
    } else {

      let dist = this.animationDelta;
      let boardValue = this.board.tilePuzzle[animy][animx];
      this.drawBlankTile(animx, animy - 1);
      this.drawTile(x, y, boardValue);

      let that = this;
      setTimeout(
        function() {
          that.animateTileUp(animx, animy, y + dist, x, destY, destX);
        }, that.animationSpeed);
    }
  }

  animateTileDown(animx, animy, y, x, destY, destX) {
    if (this.animatingX !== animx || this.animatingY !== animy) {
      return;
    } else if (y < destY) {
      this.animatingX = -1;
      this.animatingY = -1;
      this.draw();
      return;
    } else {

      const dist = this.animationDelta;
      const boardValue = this.board.tilePuzzle[animy][animx];
      this.drawBlankTile(animx, animy + 1);
      this.drawTile(x, y, boardValue);

      let that = this;
      setTimeout(
        function() {
          that.animateTileDown(animx, animy, y - dist, x, destY, destX);
        }, that.animationSpeed);
    }
  }

  animateTileLeft(animx, animy, y, x, destY, destX) {
    if (this.animatingX !== animx || this.animatingY !== animy) {
      return;
    } else if (x > destX) {
      this.animatingX = -1;
      this.animatingY = -1;
      this.draw();
      return;
    } else {

      const dist = this.animationDelta;
      const boardValue = this.board.tilePuzzle[animy][animx];
      this.drawBlankTile(animx - 1, animy);
      this.drawTile(x, y, boardValue);

      let that = this;
      setTimeout(
        function() {
          that.animateTileLeft(animx, animy, y, x + dist, destY, destX);
        }, that.animationSpeed);
    }
  }

  animateTileRight(animx, animy, y, x, destY, destX) {
    if (this.animatingX !== animx || this.animatingY !== animy) {
      return;
    } else if (x < destX) {
      this.animatingX = -1;
      this.animatingY = -1;
      this.draw();
      return;
    } else {

      let dist = this.animationDelta;
      let boardValue = this.board.tilePuzzle[animy][animx];
      this.drawBlankTile(animx + 1, animy);
      this.drawTile(x, y, boardValue);

      let that = this;
      setTimeout(
        function() {
          that.animateTileRight(animx, animy, y, x - dist, destY, destX);
        }, that.animationSpeed);
    }
  }

  drawBlankTile(x, y) {
    const spacing = 0;
    this.context.fillStyle = this.colors.BACKGROUND;
    this.context.fillRect(
      (this.gridOffsetX + (x * this.gridBoxSize)) + spacing,
      (this.gridOffsetY + (y * this.gridBoxSize)) + spacing,
                          this.gridBoxSize - (spacing * 2),
                          this.gridBoxSize - (spacing * 2));
  }

  drawTile(x, y, boardValue) {
    const drawColors = [
      this.colors.COLOR_6_ALT, // RED
      this.colors.COLOR_4,     // ORANGE
      this.colors.COLOR_4_ALT, // YELLOW
      this.colors.COLOR_1_ALT, // LIGHT GREEN
      this.colors.COLOR_1,     // GREEN
      this.colors.COLOR_3_ALT, // LIGHT BLUE
      this.colors.COLOR_2_ALT, // BLUE
      this.colors.COLOR_3,     // DARK BLUE
      this.colors.COLOR_5,     // PURPLE
      this.colors.COLOR_5_ALT  // PINK
    ];

    let innerColor = '#FFFFFF';

    if (this.colorScheme === 'Fringe') {
      for (let u = this.board.width ; u > 0 ; u--) {
        if (boardValue <= (this.board.width * (u)) ||
          (boardValue % this.board.width) === (u % 10)) {
          this.context.fillStyle = drawColors[(u - 1) % 10];
        }
      }
    } else if (this.colorScheme === 'Rows') {
      for (let h = this.board.width ; h >= 0 ; h--) {
        if (Math.floor((boardValue - 1) / this.board.width) % 10 === h % 10) {
          this.context.fillStyle = drawColors[h % 10];
          break;
        }
      }
    } else if (this.colorScheme === 'Rows & Cols') {
      for (let h = this.board.width ; h >= 0 ; h--) {
        if (
          (Math.floor((boardValue - 1) / this.board.width) % 10 === h % 10) &&
           Math.floor((boardValue - 1) / this.board.width) < this.board.width - 2
        ) {
          this.context.fillStyle = drawColors[h % 10];
          break;
        } else if (((boardValue - 1) % this.board.width) === h &&
          Math.floor((boardValue - 1) / this.board.width) >= this.board.width - 2) {
          this.context.fillStyle = drawColors[h % 10];
          break;
        }
      }
    } else if (this.colorScheme === 'Quadrants') {
      const xi = ((boardValue - 1) % this.board.height);
      const yi = Math.floor((boardValue - 1) / this.board.width);
      let innerBoardValue = -1;

      if (xi < this.board.height / 2 && yi < this.board.width / 2) {
        this.context.fillStyle = drawColors[0];
        innerBoardValue = boardValue - (yi * (this.board.height / 2));
      } else if (xi >= this.board.height / 2 && yi < this.board.width / 2) {
        this.context.fillStyle = drawColors[2];
        innerBoardValue = boardValue - (yi * (this.board.height / 2)) - this.board.width / 2;
      } else if (xi < this.board.height / 2 && yi >= this.board.width / 2) {
        this.context.fillStyle = drawColors[3];
        innerBoardValue = boardValue - ((yi + this.board.height / 2) * (this.board.height / 2));
      } else if (xi >= this.board.height / 2 && yi >= this.board.width / 2) {
        this.context.fillStyle = drawColors[9];
        innerBoardValue = boardValue - ((yi + this.board.height / 2) * (this.board.height / 2)) - this.board.width / 2;
      }

      for (let u = (this.board.width / 2); u > 0 ; u--) {
        if (innerBoardValue <= ((this.board.width / 2) * (u)) ||
          (innerBoardValue % Math.floor(this.board.width / 2)) === (u % 10)) {
          innerColor = drawColors[(u - 1) % 10];
        }
      }
    }

    const tileString = '' + boardValue;
    const spacing = this.gridBoxSize / 40;
    this.roundRect(this.context, x, y,
                          this.gridBoxSize - (spacing * 2),
                          this.gridBoxSize - (spacing * 2),
                          (this.gridBoxSize / 20), 
                          true, 
                          false);

    if (this.colorScheme === 'Quadrants' && (this.board.width * this.board.height) >= 100) {
      this.context.fillStyle = innerColor;
      this.roundRect(this.context,
                            x + (0.1 * this.gridBoxSize),
                            y + (0.8 * this.gridBoxSize),
                            (this.gridBoxSize - (spacing * 2)) - (0.2 * this.gridBoxSize),
                            (this.gridBoxSize - (spacing * 2)) - (0.85 * this.gridBoxSize),
                            (this.gridBoxSize / 20),
                            true,
                            true);
    }

    this.context.fillStyle = this.colors.BACKGROUND;
    const textX = (x + (this.gridBoxSize / 2) - spacing);
    const j  = (y - spacing - this.gridOffsetY) / this.gridBoxSize;
    const textY = (this.gridOffsetY + ( (j + 1) * this.gridBoxSize) - (this.gridBoxSize / 4));
    this.context.fillText(tileString, textX, textY);
  }

  moveUp(repeat, click) {
    let directions = this.board.getValidDirections();

    if (directions.includes(0) && (this.up || click)) {
      this.board.tilePuzzle[this.board.emptyY][this.board.emptyX] = this.board.tilePuzzle[this.board.emptyY - 1][this.board.emptyX];
      this.board.tilePuzzle[this.board.emptyY - 1][this.board.emptyX] = 0;
      this.board.emptyY--;

      this.animatingX = this.board.emptyX;
      this.animatingY = this.board.emptyY + 1;

      this.draw();

      if (this.showAnimations) {
        const spacing = this.gridBoxSize / 40;
        const y1 = this.board.emptyY + 1;
        const x1 = this.board.emptyX;
        const y2 = this.board.emptyY;
        const x2 = this.board.emptyX;
        this.animateTileUp(
          this.animatingX, this.animatingY,
          (this.gridOffsetY + (y2 * this.gridBoxSize)) + spacing,
          (this.gridOffsetX + (x2 * this.gridBoxSize)) + spacing,
          (this.gridOffsetY + (y1 * this.gridBoxSize)) + spacing,
          (this.gridOffsetX + (x1 * this.gridBoxSize)) + spacing
        );
      }

      this.checkIsSolved(this.board);

      if (this.up && repeat && !this.solved) {
        let that = this;

        this.upTimeout =
        setTimeout(
          function() {
            that.moveUp(true, false);
          },
          this.continuedDelay );
      }
    }
  }

  moveUpFirst() {
    this.moveUp(false, false);
    let that = this;

    if (this.shift && !this.yAxis) {
      this.xAxis = true;
      this.upTimeout =
      setTimeout(
        function() {
          that.moveUp(true, false);
        },
        this.continuedDelay );
    } else {
      this.upTimeout =
      setTimeout(
        function() {
          that.moveUp(true, false);
        },
        this.initialDelay );
    }
  }
  moveDownFirst() {
    this.moveDown(false, false);
    let that = this;

    if (this.shift && !this.yAxis) {
      this.xAxis = true;
      this.downTimeout =
      setTimeout(
        function() {
          that.moveDown(true, false);
        },
        this.continuedDelay );
    } else {
      this.downTimeout =
      setTimeout(
        function() {
          that.moveDown(true, false);
        },
        this.initialDelay );
    }
  }
  moveRightFirst() {
    this.moveRight(false, false);
    let that = this;

    if (this.shift && !this.xAxis) {
      this.yAxis = true;
      this.rightTimeout =
      setTimeout(
        function() {
          that.moveRight(true, false);
        },
        this.continuedDelay );
    } else {
      this.rightTimeout =
      setTimeout(
        function() {
          that.moveRight(true, false);
        },
        this.initialDelay );
    }
  }

  moveLeftFirst() {
    this.moveLeft(false, false);
    let that = this;

    if (this.shift && !this.xAxis) {
      this.yAxis = true;
      this.leftTimeout =
      setTimeout(
        function() {
          that.moveLeft(true, false);
        },
        this.continuedDelay );
    } else {
      this.leftTimeout =
      setTimeout(
        function() {
          that.moveLeft(true, false);
        },
        this.initialDelay );
    }
  }

  moveDown(repeat, click) {
    const directions = this.board.getValidDirections();

    if (directions.includes(1) && (this.down || click)) {
      this.board.tilePuzzle[this.board.emptyY][this.board.emptyX] = this.board.tilePuzzle[this.board.emptyY + 1][this.board.emptyX];
      this.board.tilePuzzle[this.board.emptyY + 1][this.board.emptyX] = 0;
      this.board.emptyY++;

      this.animatingX = this.board.emptyX;
      this.animatingY = this.board.emptyY - 1;

      this.draw();

      if (this.showAnimations) {
        const spacing = this.gridBoxSize / 40;
        const y1 = this.board.emptyY - 1;
        const x1 = this.board.emptyX;
        const y2 = this.board.emptyY;
        const x2 = this.board.emptyX;
        this.animateTileDown(
          this.animatingX, this.animatingY,
          (this.gridOffsetY + (y2 * this.gridBoxSize)) + spacing,
          (this.gridOffsetX + (x2 * this.gridBoxSize)) + spacing,
          (this.gridOffsetY + (y1 * this.gridBoxSize)) + spacing,
          (this.gridOffsetX + (x1 * this.gridBoxSize)) + spacing
        );
      }

      this.checkIsSolved(this.board);

      if (this.down && repeat && !this.solved) {
        let that = this;
        this.downTimeout =
        setTimeout(
          function() {
            that.moveDown(true, false);
          },
          this.continuedDelay );
      }
    }
  }

  moveLeft(repeat, click) {
    const directions = this.board.getValidDirections();

    if (directions.includes(2) && (this.left || click)) {
      this.board.tilePuzzle[this.board.emptyY][this.board.emptyX] = this.board.tilePuzzle[this.board.emptyY][this.board.emptyX - 1];
      this.board.tilePuzzle[this.board.emptyY][this.board.emptyX - 1] = 0;
      this.board.emptyX--;

      this.animatingX = this.board.emptyX + 1;
      this.animatingY = this.board.emptyY;

      this.draw();

      if (this.showAnimations) {
        const spacing = this.gridBoxSize / 40;
        const y1 = this.board.emptyY;
        const x1 = this.board.emptyX + 1;
        const y2 = this.board.emptyY;
        const x2 = this.board.emptyX;
        this.animateTileLeft(
          this.animatingX, this.animatingY,
          (this.gridOffsetY + (y2 * this.gridBoxSize)) + spacing,
          (this.gridOffsetX + (x2 * this.gridBoxSize)) + spacing,
          (this.gridOffsetY + (y1 * this.gridBoxSize)) + spacing,
          (this.gridOffsetX + (x1 * this.gridBoxSize)) + spacing
        );
      }

      this.checkIsSolved(this.board);

      if (this.left && repeat && !this.solved) {
        let that = this;
        this.leftTimeout = 
        setTimeout( 
          function() {
            that.moveLeft(true, false);
          }, 
          this.continuedDelay );
      }
    }
  }

  moveRight(repeat, click) {
    const directions = this.board.getValidDirections();

    if (directions.includes(3) && (this.right || click)) {
      this.board.tilePuzzle[this.board.emptyY][this.board.emptyX] = this.board.tilePuzzle[this.board.emptyY][this.board.emptyX + 1];
      this.board.tilePuzzle[this.board.emptyY][this.board.emptyX + 1] = 0;
      this.board.emptyX++;

      this.animatingX = this.board.emptyX - 1;
      this.animatingY = this.board.emptyY;

      this.draw();

      if (this.showAnimations) {
        const spacing = this.gridBoxSize / 40;
        const y1 = this.board.emptyY;
        const x1 = this.board.emptyX - 1;
        const y2 = this.board.emptyY;
        const x2 = this.board.emptyX;
        this.animateTileRight(
          this.animatingX, this.animatingY,
          (this.gridOffsetY + (y2 * this.gridBoxSize)) + spacing,
          (this.gridOffsetX + (x2 * this.gridBoxSize)) + spacing,
          (this.gridOffsetY + (y1 * this.gridBoxSize)) + spacing,
          (this.gridOffsetX + (x1 * this.gridBoxSize)) + spacing
        );
      }

      this.checkIsSolved(this.board);

      if (this.right && repeat && !this.solved) {
        let that = this;
        this.rightTimeout =
        setTimeout(
          function() {
            that.moveRight(true, false);
          },
          this.continuedDelay );
      }
    }
  }

  moveTile(x, y) {
    const emptyX = this.board.emptyX;
    const emptyY = this.board.emptyY;
    if (x - 1 >= emptyX && y === emptyY) {
      for (let i = emptyX ; i < x ; i++) {
        this.moveRight(false, true);
      }
    } else if (x + 1 <= emptyX && y === emptyY) {
      for (let j = x ; j < emptyX ; j++) {
        this.moveLeft(false, true);
      }
    } else if (x === emptyX && y + 1 <= emptyY) {
      for (let k = y ; k < emptyY ; k++) {
        this.moveUp(false, true);
      }
    } else if (x === emptyX && y - 1 >= emptyY) {
      for (let l = emptyY ; l < y ; l++) {
        this.moveDown(false, true);
      }
    }
  }

  /* EVENT LISTENERS */
  @HostListener('document:mousedown', ['$event'])
  mousePressed(mouseEvent) {
    let x = mouseEvent.clientX - this.canvasOffsetX;
    let y = mouseEvent.clientY - this.canvasOffsetY;

    if (!this.solved) {
      x = Math.floor((x - this.gridOffsetX) / this.gridBoxSize);
      y = Math.floor((y - this.gridOffsetY) / this.gridBoxSize);

      if (
        x > -1 &&
        x <  this.board.width &&
        y > -1 &&
        y < this.board.height
      ) {
        this.moveTile(x, y);
        this.checkIsSolved(this.board);
      }
    }
  }
  mouseReleased(mouseEvent) {
    const x = mouseEvent.clientX - this.canvasOffsetX;
    const y = mouseEvent.clientY - this.canvasOffsetY;
    console.log({'mouseReleasedX': x, 'mouseReleasedY': y});
  }

  @HostListener('document:mousemove', ['$event'])
  mouseMove(mouseEvent) {
    if (this.mouseHover) {
      let x = mouseEvent.clientX - this.canvasOffsetX;
      let y = mouseEvent.clientY - this.canvasOffsetY;

      if (!this.solved) {
        x = Math.floor((x - this.gridOffsetX) / this.gridBoxSize);
        y = Math.floor((y - this.gridOffsetY) / this.gridBoxSize);

        if (
          x > -1 &&
          x <  this.board.width &&
          y > -1 &&
          y < this.board.height
        ) {
          this.moveTile(x, y);
          this.checkIsSolved(this.board);
        }
      }
    }
  }

  @HostListener('document:keydown', ['$event'])
  keyPressed(keyEvent) {
    const code = keyEvent.keyCode;
    if (code === 32) {
      this.newGame();
      return;
    }

    if (!this.solved) {
      switch (code) {
        // UP
        case(40):
        case(this.upKey):
            this.up = true;
            this.down = false;
            this.left = false;
            this.right = false;
            clearTimeout(this.upTimeout);
            this.moveUpFirst();
          break;

        // DOWN
        case(38):
        case(this.downKey):
            this.down = true;
            this.up = false;
            this.left = false;
            this.right = false;
            clearTimeout(this.downTimeout);
            this.moveDownFirst();
          break;

        // LEFT
        case(39):
        case(this.leftKey):
            this.left = true;
            this.up = false;
            this.down = false;
            this.right = false;
            clearTimeout(this.leftTimeout);
            this.moveLeftFirst();
          break;

        // RIGHT
        case(37):
        case(this.rightKey):
            this.right = true;
            this.up = false;
            this.down = false;
            this.left = false;
            clearTimeout(this.rightTimeout);
            this.moveRightFirst();
          break;

        case(this.shiftKey):
            this.shift = true;
          break;
      }
    }
  }

  @HostListener('document:keyup', ['$event'])
  keyReleased(keyEvent) {
    const code = keyEvent.keyCode;
    switch (code) {
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
