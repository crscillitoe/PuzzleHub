import { HostListener, Component, OnInit } from '@angular/core';
import { LoaderService } from '../../services/loading-service/loader.service';
import { TimerService } from '../../services/timer/timer.service';
import { TunnelService } from '../../services/tunnel/tunnel.service';
import { UserService } from '../../services/user/user.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { GameID } from '../../enums/game-id.enum';
import { Board } from '../../services/boards/minesweeper/board.service';
import { ColorService } from '../../services/colors/color.service';

@Component({
  selector: 'app-minesweeper',
  templateUrl: './minesweeper.component.html',
  styleUrls: ['./minesweeper.component.css']
})
export class MinesweeperComponent implements OnInit {
  // Used for drawing to the screen
  canvas: any;
  context: any;

  colors: any;

  
  canvasOffsetX: number = 225;
  canvasOffsetY: number = 56;

  gridBoxSize: number = 20; //needs to be dynamically adjusted by fixed sizes
  
  gridOffsetX: number = 100;
  gridOffsetY: number = 100;

  firstPress: boolean = true;
  isPressed: boolean = false;

  selectedX: number;
  selectedY: number;
  personalBest: string;

  mb1Pressed: boolean = false;
  mb2Pressed: boolean = false;

  
  startDate: any;
  t: any;
  solved: boolean = false;
  
  difficulty: number;
  seed: number;

  lose: boolean = false;

  board: Board;

  constructor(
    private route: ActivatedRoute, 
    private colorService: ColorService,
    private router: Router,
    private tunnel: TunnelService,
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
    var bombCount;

    // Easy
    if(this.difficulty == 1) {
      width = 8;
      height = 8;
      bombCount = 10; //ratio of 8
    } 
    
    // Medium
    else if (this.difficulty == 2) {
      width = 16;
      height = 13;
      bombCount = 40;
    } 
    
    // Hard
    else if (this.difficulty == 3) {
      width = 30;
      height = 16;
      bombCount = 99; //ratio of 4.8
    } 
    
    // Extreme
    else if (this.difficulty == 4) {
      width = 45;
      height = 30;
      bombCount = 280;
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
        GameID: GameID.MINESWEEPER,
        Difficulty: this.difficulty
      }
      this.tunnel.getPersonalBest(m)
        .subscribe( (data) => {
          this.personalBest = data['time'];
        });

      this.timer.startTimer(GameID.MINESWEEPER, this.difficulty)
        .subscribe( (data) => {
          // Generate board with given seed
          this.seed = data['seed'];

          this.board = new Board(width, height, bombCount, this.seed);
          this.board.generateBoard();
          
          //this.canvas.addEventListener('mouseup',   (e) => this.mouseReleased(e), false); 
          //this.canvas.addEventListener('mousedown', (e) => this.mousePressed(e),  false);
          //this.canvas.addEventListener('mousemove', (e) => this.mouseMove(e),     false);
          //this.displayTimer();

          this.startDate = new Date();
          this.displayTimer();

          this.loader.stopLoadingAnimation();
          this.fixSizes();
          var img = document.getElementById("flag");
          img.onload = () => {
            this.draw();
          }
        });
    } else {
      // Generate board with random seed
      this.seed = Math.floor(Math.random() * (2000000000));
      
      this.board = new Board(width, height, bombCount, this.seed);
      this.board.generateBoard();
 
      //this.canvas.addEventListener('mouseup',   (e) => this.mouseReleased(e), false); 
      //this.canvas.addEventListener('mousedown', (e) => this.mousePressed(e),  false);
      //this.canvas.addEventListener('mousemove', (e) => this.mouseMove(e),     false);
      
      this.startDate = new Date();
      this.displayTimer();

      this.loader.stopLoadingAnimation();

      this.fixSizes();
      var img = document.getElementById("flag");
      img.onload = () => {
        this.draw();
      }
    }
  }

  newGame() {
    this.loader.startLoadingAnimation();
    this.lose = false;
    if(this.userService.isLoggedIn()) {
      this.timer.startTimer(GameID.MINESWEEPER, this.difficulty)
        .subscribe( (data) => {
          // Generate board with given seed
          this.seed = data['seed'];

          this.board.seed = this.seed;
          this.board.generateBoard();
          this.firstPress = true;

          if(this.solved) {
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

      if(this.solved) {
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

  draw() {
    this.context.beginPath();
    this.drawBackground();

    this.drawGrid();
    this.drawTiles();

    if(!this.lose) {
      this.highlightTile();
    } else {
      this.drawBombs();
    }
  }

  drawBackground() {
    this.context.fillStyle = this.colors.BACKGROUND; // Background color
    this.context.fillRect(0, 0, this.canvas.offsetWidth * 2, this.canvas.offsetHeight * 2);
  }

  drawGrid() {
    this.context.strokeStyle = '#606060';
    this.context.lineWidth = 1;
    for(var i = 0; i <= this.board.width; i++) {
      this.context.moveTo(this.gridOffsetX + (i * this.gridBoxSize), this.gridOffsetY);
      this.context.lineTo(this.gridOffsetX + (i* this.gridBoxSize), this.gridOffsetY + (this.board.height * this.gridBoxSize));
      this.context.stroke();
    }

    for(var j = 0; j <= this.board.height; j++) {
      this.context.moveTo(this.gridOffsetX, this.gridOffsetY + (j * this.gridBoxSize));
      this.context.lineTo(this.gridOffsetX + (this.board.width * this.gridBoxSize), this.gridOffsetY + (j * this.gridBoxSize));
      this.context.stroke();
    }
  }

  drawBombs() {
    for(var j = 0; j < this.board.height; j++) {
      for(var i = 0; i < this.board.width; i++) {
        if(this.board.mineField[j][i] == -1) {
          this.drawBomb(i, j);
        }
      }
    }
  }

  drawBomb(x, y) {
    var startX = (this.gridOffsetX) + ( x * this.gridBoxSize );
    var startY = (this.gridOffsetY) + ( y * this.gridBoxSize );
    var width = this.gridBoxSize;
    var height = this.gridBoxSize;

    this.context.fillStyle= '#FF0000';
    this.context.fillRect(startX, startY, width, height);

    var img = document.getElementById("bomb");
    this.context.drawImage(img, startX, startY, width, height);
  }

  drawVisibleTile(x, y){
    var boardValue = this.board.mineField[y][x];
    var tileString

    if(boardValue == 0) tileString = ''
    else if(boardValue == -1) tileString = 'B';
    else tileString = "" + boardValue;

    this.context.font = 'Bold ' + Math.floor(this.gridBoxSize / 1.6) + 'px Poppins';
    this.context.textAlign = "center";
    this.context.fillStyle = this.colors.COLOR_1;

    if(tileString == "1") this.context.fillStyle = this.colors.COLOR_2;
    if(tileString == "2") this.context.fillStyle = this.colors.COLOR_1;
    if(tileString == "3") this.context.fillStyle = this.colors.COLOR_3;
    if(tileString == "4") this.context.fillStyle = this.colors.COLOR_4;
    if(tileString == "5") this.context.fillStyle = this.colors.COLOR_5;
    if(tileString == "6") this.context.fillStyle = this.colors.COLOR_6;
		if(tileString == "7") this.context.fillStyle = this.colors.COLOR_7;
    if(tileString == "8") this.context.fillStyle = this.colors.COLOR_8
     
    this.context.fillText(tileString, (this.gridOffsetX) + ( x * this.gridBoxSize ) + (this.gridBoxSize / 2),
                                      (this.gridOffsetY) + ( (y + 1) * this.gridBoxSize ) - (this.gridBoxSize / 4));
  }

  drawPressedTile(x, y) {
    var startX = (this.gridOffsetX) + ( x * this.gridBoxSize ) ;
    var startY = (this.gridOffsetY) + ( y * this.gridBoxSize ) ;
    var width = this.gridBoxSize ;
    var height = this.gridBoxSize ;

    this.context.fillStyle = '#A0A0A0';
    this.context.fillRect(startX, startY, width, height);
  }

  drawHiddenTile(x, y, color){
    var startX = (this.gridOffsetX) + ( x * this.gridBoxSize ) ;
    var startY = (this.gridOffsetY) + ( y * this.gridBoxSize ) ;
    var width = this.gridBoxSize ;
    var height = this.gridBoxSize ;

    var img = document.getElementById("tile");
    this.context.drawImage(img, startX, startY, width, height);
  }

  drawFlaggedTile(x, y){
    this.drawHiddenTile(x, y, this.colors.COLOR_2);
    let startX = (this.gridOffsetX) + ( x * this.gridBoxSize ) + (this.gridBoxSize/4);
    let startY = (this.gridOffsetY) + ( y * this.gridBoxSize ) + (this.gridBoxSize/4);
    let width = this.gridBoxSize - (this.gridBoxSize/2);
    let height = this.gridBoxSize - (this.gridBoxSize/2);
    
    var img = document.getElementById("flag");
    this.context.drawImage(img, startX, startY, width, height);
  }
  
  drawTiles() {
    for(var j = 0; j < this.board.height; j++) {
      for(var i = 0; i < this.board.width; i++) {
        if(this.board.visible[j][i] == 2){
          this.drawFlaggedTile(i, j);
        }
        else if(this.board.visible[j][i] != 0) {
          this.drawVisibleTile(i, j);
        } 
        else {
          this.drawHiddenTile(i, j, this.colors.COLOR_5_ALT);
        } 
      }
    }
  }

  highlightTile(){
    if(this.selectedX < 0 || this.selectedX >= this.board.width || this.selectedY < 0 || this.selectedY >= this.board.height){
      return;
    }
    if(!this.isPressed && (!this.mb1Pressed || !this.mb2Pressed)) {
      return;
    }

    if(this.mb1Pressed && this.mb2Pressed) {
      let x = this.selectedX;
      let y = this.selectedY;

      if(this.board.visible[y][x] == 0) {
        this.drawPressedTile(x, y);
      }

      if(x + 1 < this.board.width) {
        if(this.board.visible[y][x + 1] == 0) {
          this.drawPressedTile(x + 1, y);
        }

        if(y + 1 < this.board.height) {
          if(this.board.visible[y + 1][x + 1] == 0) {
            this.drawPressedTile(x + 1, y + 1);
          }
        }

        if(y - 1 >= 0) {
          if(this.board.visible[y - 1][x + 1] == 0) {
            this.drawPressedTile(x + 1, y - 1);
          }
        }
      }

      if(x - 1 >= 0) {
        if(this.board.visible[y][x - 1] == 0) {
          this.drawPressedTile(x - 1, y);
        }

        if(y + 1 < this.board.height) {
          if(this.board.visible[y + 1][x - 1] == 0) {
            this.drawPressedTile(x - 1, y + 1);
          }
        }

        if(y - 1 >= 0) {
          if(this.board.visible[y - 1][x - 1] == 0) {
            this.drawPressedTile(x - 1, y - 1);
          }
        }
      }

      if(y + 1 < this.board.height) {
        if(this.board.visible[y + 1][x] == 0) {
          this.drawPressedTile(x, y + 1);
        }
      }

      if(y - 1 >= 0) {
        if(this.board.visible[y - 1][x] == 0) {
          this.drawPressedTile(x, y - 1);
        }
      }


    } else {
      if(this.board.visible[this.selectedY][this.selectedX] == 0){
        this.drawPressedTile(this.selectedX, this.selectedY);
      }
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
        (millis  ? (millis > 99 ? millis : millis > 9 ? "0" + millis : "00" + millis) : "000");

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

  done() {
    this.solved = true;
    if(this.userService.isLoggedIn()) {
      this.timer.stopTimer(GameID.MINESWEEPER, this.difficulty, 'TODO - Board Solution String')
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
      this.gridOffsetX = Math.round( (w - h) / 2 ) + this.gridOffsetX;
    } else {
      this.gridOffsetY = Math.round( (h - w) / 2 ) + this.gridOffsetY;
    }

    this.gridBoxSize = Math.round((size / boardLength));

    this.draw();
  }

  /* EVENT LISTENERS */
  @HostListener('document:mousedown', ['$event'])
  mousePressed(mouseEvent) { 
    let x = mouseEvent.clientX - this.canvasOffsetX;
    let y = mouseEvent.clientY - this.canvasOffsetY;
    if(!this.solved) {
      x = Math.floor((x - this.gridOffsetX) / this.gridBoxSize);
      y = Math.floor((y - this.gridOffsetY) / this.gridBoxSize);

      if(mouseEvent.button == 2 && !this.mb1Pressed) {
        this.mb2Pressed = true;
        this.board.flagTile(x, y);
        this.draw();
      } else if(mouseEvent.button == 0 && !this.mb2Pressed) {
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
    if(!this.solved) {
      if(mouseEvent.button == 2) {
        this.mb2Pressed = false;
        this.draw();
      }

      if(mouseEvent.button == 0) {
        this.isPressed = false;
        this.mb1Pressed = false;
        this.draw();
      }
      let x = mouseEvent.clientX - this.canvasOffsetX;
      let y = mouseEvent.clientY - this.canvasOffsetY;

      x = Math.floor((x - this.gridOffsetX) / this.gridBoxSize);
      y = Math.floor((y - this.gridOffsetY) / this.gridBoxSize);

      if(x < 0 || x >= this.board.width || y < 0 || y >= this.board.height){
        return;
      }
      
      if(mouseEvent.button == 2 && !this.mb1Pressed){
        this.mb2Pressed = false;
      } else if(mouseEvent.button == 0 && this.firstPress && !this.mb2Pressed) { 
        if(this.board.visible[y][x] != 2){
          this.board.firstClick(x, y);
          this.firstPress = false;
        }
        this.draw();
      } else if(mouseEvent.button == 0 && !this.mb2Pressed) {
        var goodPress = this.board.click(x, y);
        if(!goodPress) {
          this.lose = true;
          this.solved = true;
        }
        this.draw();
      } else {
        var goodPress = this.board.doubleClick(x, y);
        if(!goodPress) {
          this.lose = true;
          this.solved = true;
        }
        this.draw();
      }

      if(this.board.isSolved()) {
        this.draw();
        this.done();
      }
    }
  }

  @HostListener('document:mousemove', ['$event'])
  mouseMove(mouseEvent) {
    let x = mouseEvent.clientX - this.canvasOffsetX;
    let y = mouseEvent.clientY - this.canvasOffsetY;

    if(!this.solved) {
      x = Math.floor((x - this.gridOffsetX) / this.gridBoxSize);
      y = Math.floor((y - this.gridOffsetY) / this.gridBoxSize);

      if(this.isPressed || (this.mb1Pressed && this.mb2Pressed)){
        this.selectedX = x;
        this.selectedY = y;
        this.draw();
      } 
    }
  }

  @HostListener('document:keydown', ['$event'])
  keyPressed(keyEvent) {
    if(keyEvent.keyCode == 32) {
      this.newGame();
      return;
    }
  }
  keyReleased(keyEvent) {
    console.log({'keyReleased':keyEvent.keyCode});
  }
}
