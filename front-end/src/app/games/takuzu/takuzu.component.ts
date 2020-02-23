import {
  Inject,
  PLATFORM_ID,
  HostListener,
  Component,
  OnInit
} from "@angular/core";
import { LoaderService } from "../../services/loading-service/loader.service";
import { TimerService } from "../../services/timer/timer.service";
import { TunnelService } from "../../services/tunnel/tunnel.service";
import { UserService } from "../../services/user/user.service";
import { ActivatedRoute } from "@angular/router";
import { Router } from "@angular/router";
import { GameID } from "../../enums/game-id.enum";
import { Board } from "../../services/boards/takuzu/board.service";
import { ColorService } from "../../services/colors/color.service";
import { SettingsService } from "../../services/persistence/settings.service";
import { GameStarterService } from "../../services/generators/game-starter.service";
import { GameBoard } from "../../classes/game-board";
import { OptionsService } from "../../services/games/options.service";
import { MetaService } from "../../services/meta/meta.service";
import { SoundEffectService } from "src/app/services/audio/sound-effect.service";

@Component({
  selector: "app-takuzu",
  templateUrl: "../game-board/game-board.component.html",
  styleUrls: ["../game-board/game-board.component.css"]
})
export class TakuzuComponent extends GameBoard implements OnInit {
  oColor: any;
  cColor: any;

  displayGrid: boolean;
  invertedControls: boolean;

  Takuzu1Key: number;
  Takuzu0Key: number;

  animated: boolean = false;
  warned: boolean = false;

  board: Board;

  constructor(
    @Inject(PLATFORM_ID) private platform: Object,
    route: ActivatedRoute,
    colorService: ColorService,
    router: Router,
    tunnel: TunnelService,
    private soundService: SoundEffectService,
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

    this.gameID = GameID.TAKUZU;

    const toggleGrid = () => {
      this.toggleGrid();
    };

    const invertControls = () => {
      this.invertControls();
    };

    const configureHotkeys = () => {
      this.configureHotkeys();
    };

    this.options = [
      {
        type: "checkbox",
        bindTo: "toggleGrid",
        name: "Display Grid",
        callback: toggleGrid,
        storedName: "takuzuGrid"
      },
      {
        type: "checkbox",
        bindTo: "invertControls",
        name: "Invert Controls",
        callback: invertControls,
        storedName: "takuzuInvert"
      }
    ];

    this.hotkeys = [
      {
        name: "1",
        bindTo: "Takuzu1",
        callback: configureHotkeys
      },
      {
        name: "0",
        bindTo: "Takuzu0",
        callback: configureHotkeys
      }
    ];

    this.oColor = this.colors.FOREGROUND;
    this.cColor = "#66CCFF";

    this.selectedX = -1;
    this.selectedY = -1;
  }

  configureHotkeys() {
    this.Takuzu1Key = SettingsService.getDataNum("Takuzu1");
    this.Takuzu0Key = SettingsService.getDataNum("Takuzu0");
  }

  ngOnInit() {
    this.displayGrid = SettingsService.getDataBool("takuzuGrid");
    this.invertedControls = SettingsService.getDataBool("takuzuInvert");

    this.configureHotkeys();
    super.ngOnInit();
  }

  setupBoard() {
    super.setupBoard();
    let size;
    let removePerc;

    switch (this.difficulty) {
      // Easy or default
      case 1:
      default: {
        size = 6;
        removePerc = 0.6;
        break;
      }
      // Medium
      case 2: {
        size = 8;
        removePerc = 0.6;
        break;
      }
      // Hard
      case 3: {
        size = 10;
        removePerc = 0.7;
        break;
      }
      // Extreme
      case 4: {
        size = 12;
        removePerc = 0.7;
        break;
      }
    }

    this.board = new Board(size, 0, removePerc);
  }

  draw() {
    // super.draw();
    // this.drawSelectedBox();
    // if (this.displayGrid) {
    //   this.drawGrid();
    // } else {
    //   this.drawBorder();
    // }
    // this.drawValues();
  }

  select(x: number, y: number, right: boolean, event: any) {
    if (event) {
      event.preventDefault();
    }

    if (!this.solved && !this.board.isOriginal(y, x)) {
      if (this.invertedControls) {
        this.board.rotateValue(y, x, !right);
        this.playSound(!right);
      } else {
        this.board.rotateValue(y, x, right);
        this.playSound(right);
      }

      this.checkIsSolved(this.board);

      if (this.board.hasError() && !this.warned) {
        this.animateBoard();
        this.playMash();
        this.warned = true;
      } else {
        this.warned = false;
      }
    }
  }

  playTick() {}

  playSound(left: boolean) {
    const choice = this.randomInt(8);

    if (choice === 0) {
      this.soundService.playC();
    } else if (choice === 1) {
      this.soundService.playD();
    } else if (choice === 2) {
      this.soundService.playE();
    } else if (choice === 3) {
      this.soundService.playF();
    } else if (choice === 4) {
      this.soundService.playG();
    } else if (choice === 5) {
      this.soundService.playA();
    } else if (choice === 6) {
      this.soundService.playB();
    } else if (choice === 7) {
      this.soundService.playC2();
    }
  }

  playMash() {
    this.soundService.playC();
    this.soundService.playD();
    this.soundService.playE();
    this.soundService.playF();
    this.soundService.playG();
    this.soundService.playA();
    this.soundService.playB();
    this.soundService.playC2();
  }

  private randomInt(max: number) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  animateBoard() {
    if (!this.animated) {
      this.animated = true;
      this.delay(100).then(() => (this.animated = false));
    }
  }

  async delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  getTileColor(x: number, y: number) {
    const original = this.board.isOriginal(y, x);
    const invalid = this.board.isInvalidTile(y, x);

    if (original) {
      if (invalid) {
        return this.colors.COLOR_7;
      } else {
        return this.oColor;
      }
    } else {
      if (invalid) {
        return this.colors.COLOR_7_ALT;
      } else if (this.board.takuzuPuzzle[x][y] !== -1) {
        return this.cColor;
      }
    }

    return "#303030";
  }

  getFontSize() {
    const game = document.getElementById("takuzu-game");
    const gridBoxSize = Math.min(game.offsetWidth, game.offsetHeight);

    return Math.floor(gridBoxSize / this.board.size / 1.4);
  }

  drawSelectedBox() {
    if (
      this.selectedX < this.board.size &&
      this.selectedX >= 0 &&
      this.selectedY < this.board.size &&
      this.selectedY >= 0
    ) {
      this.context.fillStyle = "#3D3D3D";
      this.context.fillRect(
        this.gridOffsetX + this.selectedX * this.gridBoxSize,
        this.gridOffsetY + this.selectedY * this.gridBoxSize,
        this.gridBoxSize,
        this.gridBoxSize
      );
    }
  }

  drawBackground() {
    this.context.fillStyle = this.colors.BACKGROUND; // Background color
    this.context.fillRect(
      0,
      0,
      this.canvas.offsetWidth * 2,
      this.canvas.offsetHeight * 2
    );
  }

  drawGrid() {
    for (let i = 0; i <= this.board.size; i++) {
      this.context.lineWidth = 1;
      this.context.strokeStyle = this.colors.COLOR_1;
      this.context.moveTo(
        this.gridOffsetX + i * this.gridBoxSize,
        this.gridOffsetY
      );

      this.context.lineTo(
        this.gridOffsetX + i * this.gridBoxSize,
        this.gridOffsetY + this.board.size * this.gridBoxSize
      );
      this.context.stroke();
    }

    for (let j = 0; j <= this.board.size; j++) {
      this.context.lineWidth = 1;
      this.context.strokeStyle = this.colors.FOREGROUND;
      this.context.moveTo(
        this.gridOffsetX,
        this.gridOffsetY + j * this.gridBoxSize
      );
      this.context.lineTo(
        this.gridOffsetX + this.board.size * this.gridBoxSize,
        this.gridOffsetY + j * this.gridBoxSize
      );
      this.context.stroke();
    }
  }

  toggleGrid() {
    this.displayGrid = !this.displayGrid;
    SettingsService.storeData("takuzuGrid", this.displayGrid);
    this.draw();
  }

  invertControls() {
    this.invertedControls = !this.invertedControls;
    SettingsService.storeData("takuzuInvert", this.invertedControls);
  }

  drawBorder() {
    this.context.lineWidth = 1;
    this.context.strokeStyle = this.colors.COLOR_1;
    this.context.moveTo(
      this.gridOffsetX + 0 * this.gridBoxSize,
      this.gridOffsetY
    );

    this.context.lineTo(
      this.gridOffsetX + 0 * this.gridBoxSize,
      this.gridOffsetY + this.board.size * this.gridBoxSize
    );
    this.context.stroke();

    this.context.lineWidth = 1;
    this.context.strokeStyle = this.colors.COLOR_1;
    this.context.moveTo(
      this.gridOffsetX + this.board.size * this.gridBoxSize,
      this.gridOffsetY
    );

    this.context.lineTo(
      this.gridOffsetX + this.board.size * this.gridBoxSize,
      this.gridOffsetY + this.board.size * this.gridBoxSize
    );
    this.context.stroke();

    this.context.lineWidth = 1;
    this.context.strokeStyle = this.colors.FOREGROUND;
    this.context.moveTo(
      this.gridOffsetX,
      this.gridOffsetY + 0 * this.gridBoxSize
    );
    this.context.lineTo(
      this.gridOffsetX + this.board.size * this.gridBoxSize,
      this.gridOffsetY + 0 * this.gridBoxSize
    );
    this.context.stroke();

    this.context.lineWidth = 1;
    this.context.strokeStyle = this.colors.FOREGROUND;
    this.context.moveTo(
      this.gridOffsetX,
      this.gridOffsetY + this.board.size * this.gridBoxSize
    );
    this.context.lineTo(
      this.gridOffsetX + this.board.size * this.gridBoxSize,
      this.gridOffsetY + this.board.size * this.gridBoxSize
    );
    this.context.stroke();
  }

  roundRect(ctx, x, y, width, height, radius, fill, stroke) {
    radius = { tl: radius, tr: radius, br: radius, bl: radius };
    ctx.beginPath();
    ctx.moveTo(x + radius.tl, y);
    ctx.lineTo(x + width - radius.tr, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius.tr);
    ctx.lineTo(x + width, y + height - radius.br);
    ctx.quadraticCurveTo(
      x + width,
      y + height,
      x + width - radius.br,
      y + height
    );
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

  drawValues() {
    for (let j = 0; j < this.board.size; j++) {
      for (let i = 0; i < this.board.size; i++) {
        const boardValue = this.board.takuzuPuzzle[j][i];
        const original = this.board.isOriginal(i, j);

        const invalidTile = this.board.isInvalidTile(i, j);
        const entryString = "" + boardValue;
        this.context.font =
          "Bold " + Math.floor(this.gridBoxSize / 1.4) + "px Poppins";
        this.context.textAlign = "center";

        const spacing = this.gridBoxSize / 40;

        if (boardValue === 1) {
          if (original) {
            this.context.fillStyle = this.oColor;
            if (invalidTile) {
              this.context.fillStyle = this.colors.COLOR_7;
            }
          } else {
            this.context.fillStyle = this.cColor;
            if (invalidTile) {
              this.context.fillStyle = this.colors.COLOR_7_ALT;
            }
          }

          this.roundRect(
            this.context,
            this.gridOffsetX + i * this.gridBoxSize + spacing,
            this.gridOffsetY + j * this.gridBoxSize + spacing,
            this.gridBoxSize - spacing * 2,
            this.gridBoxSize - spacing * 2,
            this.gridBoxSize / 20,
            true,
            false
          );

          this.context.fillStyle = this.colors.BACKGROUND;
          this.context.fillText(
            entryString,
            this.gridOffsetX + i * this.gridBoxSize + this.gridBoxSize / 2,
            this.gridOffsetY + (j + 1) * this.gridBoxSize - this.gridBoxSize / 4
          );
        } else if (boardValue === 0) {
          if (original) {
            this.context.fillStyle = this.oColor;
            if (invalidTile) {
              this.context.fillStyle = this.colors.COLOR_7;
            }
          } else {
            this.context.fillStyle = this.cColor;
            if (invalidTile) {
              this.context.fillStyle = this.colors.COLOR_7_ALT;
            }
          }

          this.roundRect(
            this.context,
            this.gridOffsetX + i * this.gridBoxSize + spacing,
            this.gridOffsetY + j * this.gridBoxSize + spacing,
            this.gridBoxSize - spacing * 2,
            this.gridBoxSize - spacing * 2,
            this.gridBoxSize / 20,
            true,
            false
          );

          this.context.fillStyle = this.colors.BACKGROUND;
          this.roundRect(
            this.context,
            this.gridOffsetX + i * this.gridBoxSize + spacing * 3,
            this.gridOffsetY + j * this.gridBoxSize + spacing * 3,
            this.gridBoxSize - spacing * 6,
            this.gridBoxSize - spacing * 6,
            this.gridBoxSize / 20,
            true,
            false
          );
          if (original) {
            this.context.fillStyle = this.oColor;
            if (invalidTile) {
              this.context.fillStyle = this.colors.COLOR_7;
            }
          } else {
            this.context.fillStyle = this.cColor;
            if (invalidTile) {
              this.context.fillStyle = this.colors.COLOR_7_ALT;
            }
          }

          this.context.fillText(
            entryString,
            this.gridOffsetX + i * this.gridBoxSize + this.gridBoxSize / 2,
            this.gridOffsetY + (j + 1) * this.gridBoxSize - this.gridBoxSize / 4
          );
        }
      }
    }
  }

  done() {
    let that = this;
    GameStarterService.done(that);
  }

  fixSizes() {}

  @HostListener("document:keydown", ["$event"])
  keyPressed(keyEvent) {
    const code = keyEvent.keyCode;
    super.keyPressed(keyEvent);

    if (!this.solved) {
      switch (code) {
        case this.Takuzu0Key:
          this.board.setValue(this.selectedX, this.selectedY, 0);
          break;
        case this.Takuzu1Key:
          this.board.setValue(this.selectedX, this.selectedY, 1);
          break;
      }

      this.draw();
      this.checkIsSolved(this.board);
    }
  }
}
