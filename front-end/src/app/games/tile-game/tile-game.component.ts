import { Component, OnInit } from '@angular/core';
import { LoaderService } from '../../services/loading-service/loader.service';
import { TimerService } from '../../services/timer/timer.service';
import { UserService } from '../../services/user/user.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { GameID } from '../../enums/game-id.enum';
import { Board } from '../../services/boards/tile-game/board.service';
import { ColorService } from '../../services/colors/color.service';

@Component({
  selector: 'app-tile-game',
  templateUrl: './tile-game.component.html',
  styleUrls: ['./tile-game.component.css']
})
export class TileGameComponent implements OnInit {

  // Used for drawing to the screen
  canvas: any;
  context: any;


  gridBoxSize: number;
  colors: any;
  
  canvasOffsetX: number = 225;
  canvasOffsetY: number = 56;

  gridOffsetX: number = 100;
  gridOffsetY: number = 100;

  difficulty: number;
  seed: number;

  board: Board;

  constructor(
    private route: ActivatedRoute, 
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

    var width;
    var height;

    // Easy
    if(this.difficulty == 1) {
      console.log('Easy difficulty');
      width = 3;
      height = 3;
    } 
    
    // Medium
    else if (this.difficulty == 2) {
      console.log('Medium difficulty');
      width = 4;
      height = 4;
    } 
    
    // Hard
    else if (this.difficulty == 3) {
      console.log('Hard difficulty');
      width = 5;
      height = 5;
    } 
    
    // Extreme
    else if (this.difficulty == 4) {
      console.log('Extreme difficulty');
      width = 6;
      height= 6;
    }

    // Uncomment these to add event listeners
    //this.canvas.addEventListener('mousedown', (e) => this.mousePressed(e),  false);
    //this.canvas.addEventListener('mouseup',   (e) => this.mouseReleased(e), false);
    //this.canvas.addEventListener('mousemove', (e) => this.mouseMove(e),     false);

    window.addEventListener('keydown', (e) => this.keyPressed(e),  false);
    //window.addEventListener('keyup',   (e) => this.keyReleased(e), false);


    // Start timer if we are logged in
    if(this.userService.isLoggedIn()) {
      this.timer.startTimer(GameID.TILE_GAME, this.difficulty)
        .subscribe( (data) => {
          // Generate board with given seed
          this.seed = data['seed'];

          this.board = new Board(width, height, this.seed); 
          this.board.generateBoard();

          this.fixSizes();
          this.draw();
        });
    } else {
      // Generate board with random seed
      this.seed = Math.floor(Math.random() * (2000000000));

      this.board = new Board(width, height, this.seed); 
      this.board.generateBoard();

      console.log(this.board.tilePuzzle);

      this.fixSizes();
      this.draw();
    }
  }

  draw() {
    this.context.beginPath();
    this.drawBackground();
    this.drawGrid();
    this.drawTiles();
  }

  drawBackground() {
    this.context.fillStyle = this.colors.BACKGROUND; // Background color
    this.context.fillRect(0, 0, this.canvas.offsetWidth * 2, this.canvas.offsetHeight * 2);
  }

  drawGrid() {
    for(var i = 0 ; i <= this.board.width ; i++) {
      this.context.lineWidth = 1;
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
          this.context.fillStyle = this.colors.COLOR_0;
        } else if(boardValue <= (this.board.width * 2) ||
                  (boardValue % this.board.width) == 2) {
          this.context.fillStyle = this.colors.COLOR_6;
        } else if(boardValue <= (this.board.width * 3) ||
                  (boardValue % this.board.width) == 3) {
          this.context.fillStyle = this.colors.COLOR_4;
        } else if(boardValue <= (this.board.width * 4) ||
                  (boardValue % this.board.width) == 4) {
          this.context.fillStyle = this.colors.COLOR_3;
        } else if(boardValue <= (this.board.width * 5) ||
                  (boardValue % this.board.width) == 5) {
          this.context.fillStyle = this.colors.COLOR_2;
        }

        if(boardValue != 0) {
          this.context.fillRect((this.gridOffsetX + (i * this.gridBoxSize )) + 1, 
                                (this.gridOffsetY + (j * this.gridBoxSize )) + 1,
                                this.gridBoxSize - 2, this.gridBoxSize - 2);
        }

        this.context.fillStyle = this.colors.BACKGROUND;
        this.context.fillText(tileString, (this.gridOffsetX) + ( i * this.gridBoxSize ) + (this.gridBoxSize / 2),
                                          (this.gridOffsetY) + ( (j + 1) * this.gridBoxSize ) - (this.gridBoxSize / 4));
      }
    }
  }

  /* Line
    context.lineWidth = 1;
    context.strokeStyle = that.gridColor;
    context.moveTo(circleX, circleY);
    context.lineTo(circleX, circleY2);
    context.stroke();

    Image
    var img = document.getElementById("scream"); // ensure display:none on html
    context.drawImage(img, 10, 10);

    Circle
    ellipse(cx, cy, rx, ry) {
        context.save(); // save state
        context.beginPath();
        context.translate(cx, cy);
        context.scale(rx/2, ry/2);
        context.arc(1, 1, 1, 0, 2 * Math.PI, false);
        context.fill();

        context.restore(); // restore to original state
    }
   */

  done() {
    if(this.userService.isLoggedIn()) {
      this.timer.stopTimer(GameID.TILE_GAME, this.difficulty, 'TODO - Board Solution String')
        .subscribe( (data) => {
          console.log(data);
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

    this.draw();
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
  mouseMove(mouseEvent) {
    let x = mouseEvent.clientX - this.canvasOffsetX;
    let y = mouseEvent.clientY - this.canvasOffsetY;
    console.log({'mouseMoveX':x, 'mouseMoveY':y});
  }

  keyPressed(keyEvent) {
    //console.log({'keyPressed':keyEvent.keyCode});

    let code = keyEvent.keyCode;
    var directions = this.board.getValidDirections();
    switch(code) {
      // UP
      case(40):
      case(83):
          if(directions.includes(0)) {
            this.board.moveUp();
            this.draw();
            if(this.board.isSolved()) {
              this.done();
            }
          }
        break;

      // DOWN
      case(38):
      case(87):
          if(directions.includes(1)) {
            this.board.moveDown();
            this.draw();
            if(this.board.isSolved()) {
              this.done();
            }
          }
        break;

      // LEFT
      case(39):
      case(68):
          if(directions.includes(2)) {
            this.board.moveLeft();
            this.draw();
            if(this.board.isSolved()) {
              this.done();
            }
          }
        break;

      // RIGHT
      case(37):
      case(65):
          if(directions.includes(3)) {
            this.board.moveRight();
            this.draw();
            if(this.board.isSolved()) {
              this.done();
            }
          }
        break;
    }
  }
  keyReleased(keyEvent) {
    //console.log({'keyReleased':keyEvent.keyCode});
  }
}
