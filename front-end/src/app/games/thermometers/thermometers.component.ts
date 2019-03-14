import { HostListener, Component, OnInit } from '@angular/core';
import { LoaderService } from '../../services/loading-service/loader.service';
import { TimerService } from '../../services/timer/timer.service';
import { TunnelService } from '../../services/tunnel/tunnel.service';
import { UserService } from '../../services/user/user.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { GameID } from '../../enums/game-id.enum';
import { ColorService } from '../../services/colors/color.service';
import { Board } from '../../services/boards/thermometers/board.service';
import { GameStarterService } from '../../services/generators/game-starter.service';
import { GameBoard } from '../../classes/game-board';
import { OptionsService } from '../../services/games/options.service';

@Component({
  selector: 'app-thermometers',
  templateUrl: './thermometers.component.html',
  styleUrls: ['./thermometers.component.css']
})
export class ThermometersComponent extends GameBoard implements OnInit {

  board: Board;

  constructor(
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
      route,
      colorService,
      router,
      tunnel,
      userService,
      timer,
      loader,
      optionsService
    );

    this.gameID = GameID.THERMOMETERS;

    this.rules = 'The numbers in the rows/columns indicate the amount of fluid that must be present in ' +
            'that given row/column.';
    this.controls = 'Click anywhere on the thermometer to insert fluid.';

    // Most games utilize a grid
    this.gridOffsetX = 100;
    this.gridOffsetY = 100;

    this.solved = false;

    this.selectedX = -1;
    this.selectedY = -1;
  }

  setupBoard() {
    super.setupBoard();

    let width = 0;
    let height = 0;

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
        width = 7;
        height = 7;
        break;
      }
      // Hard
      case 3: {
        width = 9;
        height = 9;
        break;
      }
      // Extreme
      case 4: {
        width = 13;
        height = 13;
        break;
      }
    }

    this.board = new Board(width, height, 0);
  }

  draw() {
    super.draw();
    this.drawGrid();
    if (!this.solved) {
      this.drawSelectedBox();
    }
    this.drawThermometers();
    this.drawLegends();
  }

  drawSelectedBox() {
    if (this.selectedX <= this.board.width - 2 && this.selectedX >= 0 &&
       this.selectedY <= this.board.height - 2 && this.selectedY >= 0) {
      this.context.fillStyle = '#3D3D3D';
      this.context.fillRect(this.gridOffsetX + (this.selectedX * this.gridBoxSize) + 2,
                            this.gridOffsetY + (this.selectedY * this.gridBoxSize) + 2,
                              this.gridBoxSize - 4, this.gridBoxSize - 4);
    }
  }

  drawGrid() {
    this.context.strokeStyle = this.colors.FOREGROUND;
    this.context.lineWidth = 1;
    for (let i = 0; i <= this.board.width - 1; i++) {
      this.context.moveTo(this.gridOffsetX + (i * this.gridBoxSize), this.gridOffsetY);
      this.context.lineTo(this.gridOffsetX + (i* this.gridBoxSize), this.gridOffsetY + ((this.board.height - 1) * this.gridBoxSize));
      this.context.stroke();
    }

    for (let j = 0; j <= this.board.height - 1; j++) {
      this.context.moveTo(this.gridOffsetX, this.gridOffsetY + (j * this.gridBoxSize));
      this.context.lineTo(this.gridOffsetX + ((this.board.width - 1) * this.gridBoxSize), this.gridOffsetY + (j * this.gridBoxSize));
      this.context.stroke();
    }
  }

  drawLegends() {
    this.context.font = 'Bold ' + Math.floor(this.gridBoxSize / 1.4) + 'px Poppins';
    this.context.textAlign = 'center';

    for (let i = 0 ; i < this.board.width - 1; i++) {
      let valid = this.board.bottomLegendValid(i);

      if (valid === 1) {
        this.context.fillStyle = this.colors.COLOR_1;
      } else if (valid === 0) {
        this.context.fillStyle = '#e8d9be';
      } else {
        this.context.fillStyle = this.colors.COLOR_8;
      }
      this.context.fillText('' + this.board.bottomLegends[i],
                            this.gridOffsetX + (i * this.gridBoxSize) + (this.gridBoxSize / 2),
                            this.gridOffsetY + ((this.board.height - 1) * this.gridBoxSize) + (this.gridBoxSize/1.3));
    }

    for (let j = 0 ; j < this.board.height - 1; j++) {
      let validSide = this.board.sideLegendValid(j);

      if (validSide === 1) {
        this.context.fillStyle = this.colors.COLOR_1;
      } else if (validSide === 0) {
        this.context.fillStyle = '#e8d9be';
      } else {
        this.context.fillStyle = this.colors.COLOR_8;
      }

      this.context.fillText('' + this.board.sideLegends[j],
                            this.gridOffsetX + ((this.board.width - 1) * this.gridBoxSize) + (this.gridBoxSize / 2),
        this.gridOffsetY + (j * this.gridBoxSize) + (this.gridBoxSize/1.3));
    }
  }

  drawBackground() {
    this.context.fillStyle = this.colors.BACKGROUND; // Background color
    this.context.fillRect(0, 0, this.canvas.offsetWidth * 2, this.canvas.offsetHeight * 2);
  }

  drawThermometers() {
    for (let thermometer of this.board.thermometers) {
      this.drawThermometerHead(thermometer.x, thermometer.y, thermometer.direction, thermometer.filledAmount);
      this.drawThermometerBody(thermometer.x, thermometer.y, thermometer.direction, thermometer.length, thermometer.filledAmount);
      this.drawThermometerTail(thermometer.x, thermometer.y, thermometer.direction, thermometer.length, thermometer.filledAmount);
    }
  }

  drawThermometerHead(x, y, dir, fillAmount) {
    this.context.strokeStyle = this.colors.color_1;
    if (fillAmount === 0) {
      this.context.fillStyle = this.colors.BACKGROUND;
    } else {
      if (!this.solved) {
        this.context.fillStyle = this.colors.COLOR_3;
      } else {
        this.context.fillStyle = this.colors.COLOR_1;
      }
    }
    this.context.lineWidth = 3;
    this.context.beginPath();
    let drawX = this.gridOffsetX + (x * this.gridBoxSize) - this.gridBoxSize / 2;
    let drawY = this.gridOffsetY + (y * this.gridBoxSize) - this.gridBoxSize / 2;

    let radius = this.gridBoxSize / 2.5;
    let thermometerOpenAmount = 0.15 * Math.PI;
    let startPoint;

    if (dir === 0) {
      // DOWN
      startPoint = 0.5 * Math.PI;
    } else if (dir === 1) {
      // UP
      startPoint = 1.5 * Math.PI;
    } else if (dir === 2) {
      // LEFT
      startPoint = 1 * Math.PI;
    } else if (dir === 3) {
      // RIGHT
      startPoint = 0 * Math.PI;
    }

    this.context.arc(drawX, drawY, radius, startPoint + thermometerOpenAmount
                                         , startPoint - thermometerOpenAmount);
    this.context.fill();
    this.context.stroke();
  }

  drawThermometerTail(x, y, dir, length, fillAmount) {
    this.context.strokeStyle = this.colors.color_1;
    if (fillAmount < length) {
      this.context.fillStyle = this.colors.BACKGROUND;
    } else {
      if (!this.solved) {
        this.context.fillStyle = this.colors.COLOR_3;
      } else {
        this.context.fillStyle = this.colors.COLOR_1;
      }
    }
    this.context.lineWidth = 3;
    this.context.beginPath();

    let newX = x;
    let newY = y;
    if (dir === 0) {
      newY = y + length - 1;
    } else if (dir === 1) {
      newY = y - length + 1;
    } else if (dir === 2) {
      newX = x - length + 1;
    } else if (dir === 3) {
      newX = x + length - 1;
    }

    let drawX = this.gridOffsetX + (newX * this.gridBoxSize) - this.gridBoxSize / 2;
    let drawY = this.gridOffsetY + (newY * this.gridBoxSize) - this.gridBoxSize / 2;

    let radius = this.gridBoxSize/5.8;
    let thermometerOpenAmount = 0.5 * Math.PI;
    let startPoint;
    if (dir === 0) {
      startPoint = 1.5 * Math.PI;
    } else if (dir === 1) {
      startPoint = 0.5 * Math.PI;
    } else if (dir === 2) {
      startPoint = 0 * Math.PI;
    } else if (dir === 3) {
      startPoint = 1 * Math.PI;
    }

    this.context.arc(drawX, drawY, radius, startPoint + thermometerOpenAmount
                                         , startPoint - thermometerOpenAmount);
    this.context.fill();
    this.context.stroke();
  }

  drawThermometerBody(x, y, dir, length, fillAmount) {
    let i;
    let width;
    let height;
    let drawX;
    let drawY;

    if (dir === 0) {
      width = this.gridBoxSize / 2.9;
      height = (this.gridBoxSize * (length - 2)) + ((this.gridBoxSize / 2) - width) + (width * 1.5);

      drawX = (this.gridOffsetX + (x * this.gridBoxSize) - this.gridBoxSize / 2) - width / 2;
      drawY = (this.gridOffsetY + (y * this.gridBoxSize) - this.gridBoxSize / 2) + width;
    } else if (dir === 1) {
      width = this.gridBoxSize / 2.9;
      height = (this.gridBoxSize * (length - 2)) + ((this.gridBoxSize / 2) - width) + (width * 1.5);

      drawX = (this.gridOffsetX + (x * this.gridBoxSize) - this.gridBoxSize / 2) - width / 2;
      drawY = (this.gridOffsetY + ((y - length + 1) * this.gridBoxSize)) - (width * 1.5);
    } else if (dir === 2) {
      height = this.gridBoxSize / 2.9;
      width = (this.gridBoxSize * (length - 2)) + ((this.gridBoxSize / 2) - height) + (height * 1.5);

      drawX = (this.gridOffsetX + ((x - length + 1) * this.gridBoxSize)) - (height * 1.5);
      drawY = (this.gridOffsetY + (y * this.gridBoxSize) - this.gridBoxSize / 2) - height / 2;
    } else if (dir === 3) {
      // RIGHT
      height = this.gridBoxSize / 2.9;
      width = (this.gridBoxSize * (length - 2)) + ((this.gridBoxSize / 2) - height) + (height * 1.5);

      drawX = (this.gridOffsetX + (x * this.gridBoxSize) - this.gridBoxSize / 2) + height;
      drawY = (this.gridOffsetY + (y * this.gridBoxSize) - this.gridBoxSize / 2) - height / 2;
    }

    if (dir === 0 || dir === 1) {
      this.context.moveTo(drawX, drawY);
      this.context.lineTo(drawX, drawY + height);
      this.context.stroke();

      this.context.moveTo(drawX + width, drawY);
      this.context.lineTo(drawX + width, drawY + height);
      this.context.stroke();
    } else {
      this.context.moveTo(drawX, drawY);
      this.context.lineTo(drawX + width, drawY);
      this.context.stroke();

      this.context.moveTo(drawX, drawY + height);
      this.context.lineTo(drawX + width, drawY + height);
      this.context.stroke();
    }

    this.context.strokeStyle = this.colors.color_1;
    this.context.fillStyle = this.colors.BACKGROUND;
    this.context.lineWidth = 3;
    this.context.fillRect(drawX, drawY, width, height);
    this.context.stroke();

    if (!this.solved) {
      this.context.fillStyle = this.colors.COLOR_3;
    } else {
      this.context.fillStyle = this.colors.COLOR_1;
    }

    if (fillAmount > 1) {
      if (dir === 0) {
        if (fillAmount < length) {
          this.context.fillRect(
            drawX + 1,
            drawY - 1,
            width - 2,
            2 + this.gridBoxSize * (fillAmount - 1)
          );
        } else {
          this.context.fillRect(
            drawX + 1,
            drawY - 1,
            width - 2,
            2 + height * (fillAmount / length)
          );
        }
      } else if (dir === 3) {
        if (fillAmount < length) {
          this.context.fillRect(
            drawX - 1,
            drawY + 1,
            2 + this.gridBoxSize * (fillAmount - 1),
            height - 2
          );
        } else {
          this.context.fillRect(
            drawX - 1,
            drawY + 1,
            2 + width * (fillAmount / length),
            height - 2
          );
        }
      } else if (dir === 1) {
        const rectHeight = height * (fillAmount / length);
        if (fillAmount < length) {
          this.context.fillRect(
            drawX + 1,
            (drawY + ((length - 1) * this.gridBoxSize) - width) -
              (this.gridBoxSize * (fillAmount - 1)) + 1,
            width - 2,
            2 + this.gridBoxSize * (fillAmount - 1)
          );
        } else {
          this.context.fillRect(
            drawX + 1,
            (drawY + ((length - 1) * this.gridBoxSize) - width) - rectHeight + 1,
            width - 2,
            2 + rectHeight
          );
        }
      } else if (dir === 2) {
        const rectWidth = width * (fillAmount / length);
        if (fillAmount < length) {
          this.context.fillRect(
            (drawX + ((length - 1) * this.gridBoxSize) - height) -
              (this.gridBoxSize * (fillAmount - 1)) + 1,
            drawY + 1,
            2 + this.gridBoxSize * (fillAmount - 1),
            height - 2
          );
        } else {
          this.context.fillRect(
            (drawX + ((length - 1) * this.gridBoxSize) - height) - rectWidth + 1,
            drawY + 1,
            2 + rectWidth,
            height - 2
          );
        }
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

    const boardLength = Math.max(this.board.width, this.board.height);
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

      this.board.click(x + 1, y + 1);
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
  // @HostListener('document:keyup', ['$event'])
  keyReleased(keyEvent) {
    console.log({'keyReleased': keyEvent.keyCode});
  }
}
