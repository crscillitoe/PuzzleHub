import { Component, OnInit } from '@angular/core';
import { LoaderService } from '../../services/loading-service/loader.service';
import { TimerService } from '../../services/timer/timer.service';
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
    var bombCount;

    // Easy
    if(this.difficulty == 1) {
      width = 9;
      height = 9;
      bombCount = 10; //ratio of 8
    } 
    
    // Medium
    else if (this.difficulty == 2) {
      width = 16;
      height = 16;
      bombCount = 40; //ratio of 6.2
    } 
    
    // Hard
    else if (this.difficulty == 3) {
      width = 16;
      height = 30;
      bombCount = 99; //ratio of 4.8
    } 
    
    // Extreme
    else if (this.difficulty == 4) {
      width = 30;
      height = 30;
      bombCount = 280; //ratio of 3.2
    }

    // Uncomment these to add event listeners
    //this.canvas.addEventListener('mousedown', (e) => this.mousePressed(e),  false);
    //this.canvas.addEventListener('mouseup',   (e) => this.mouseReleased(e), false);
    //this.canvas.addEventListener('mousemove', (e) => this.mouseMove(e),     false);

    //window.addEventListener('keydown', (e) => this.keyPressed(e),  false);
    //window.addEventListener('keyup',   (e) => this.keyReleased(e), false);


    // Start timer if we are logged in
    if(this.userService.isLoggedIn()) {
      this.timer.startTimer(GameID.MINESWEEPER, this.difficulty)
        .subscribe( (data) => {
          // Generate board with given seed
          this.seed = data['seed'];

          this.board = new Board(width, height, bombCount, this.seed);
          this.board.generateBoard();
          
          this.canvas.addEventListener('mouseup',   (e) => this.mouseReleased(e), false); 
          this.canvas.addEventListener('mousedown', (e) => this.mousePressed(e),  false);
          //this.displayTimer();

          this.fixSizes();
          this.draw();
        });
    } else {
      // Generate board with random seed
      this.seed = Math.floor(Math.random() * (2000000000));
      
      this.board = new Board(width, height, bombCount, this.seed);
      this.board.generateBoard();
 
      this.canvas.addEventListener('mouseup',   (e) => this.mouseReleased(e), false); 
      this.canvas.addEventListener('mousedown', (e) => this.mousePressed(e),  false);
      
      //this.displayTimer();

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
    for(var i = 0; i <= this.board.width; i++) {
      this.context.lineWidth = 1;
      this.context.strokeStyle = this.colors.FOREGROUND;
      this.context.moveTo(this.gridOffsetX + (i * this.gridBoxSize), this.gridOffsetY);
      this.context.lineTo(this.gridOffsetX + (i* this.gridBoxSize), this.gridOffsetY + (this.board.height * this.gridBoxSize));
      this.context.stroke();
    }

    for(var j = 0; j <= this.board.height; j++) {
      this.context.lineWidth = 1;
      this.context.strokeStyle = this.colors.FOREGROUND;
      this.context.moveTo(this.gridOffsetX, this.gridOffsetY + (j * this.gridBoxSize));
      this.context.lineTo(this.gridOffsetX + (this.board.width * this.gridBoxSize), this.gridOffsetY + (j * this.gridBoxSize));
      this.context.stroke();
    }
  }

  drawTiles() {
    for(var j = 0; j < this.board.height; j++) {
      for(var i = 0; i < this.board.width; i++) {

        var boardValue = this.board.mineField[j][i];
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
        
        this.context.fillText(tileString, (this.gridOffsetX) + ( i * this.gridBoxSize ) + (this.gridBoxSize / 2),
                                          (this.gridOffsetY) + ( (j + 1) * this.gridBoxSize ) - (this.gridBoxSize / 4)); 
      }
    }

  }

  done() {
    if(this.userService.isLoggedIn()) {
      this.timer.stopTimer(GameID.MINESWEEPER, this.difficulty, 'TODO - Board Solution String')
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
      this.gridOffsetX = Math.round( (w - h) / 2 ) + this.gridOffsetX;
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
    console.log({'keyPressed':keyEvent.keyCode});
  }
  keyReleased(keyEvent) {
    console.log({'keyReleased':keyEvent.keyCode});
  }
}
