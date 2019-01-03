import { HostListener, Component, OnInit } from '@angular/core';
import { LoaderService } from '../../services/loading-service/loader.service';
import { TimerService } from '../../services/timer/timer.service';
import { TunnelService } from '../../services/tunnel/tunnel.service';
import { UserService } from '../../services/user/user.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { GameID } from '../../enums/game-id.enum';
import { Board } from '../../services/boards/takuzu/board.service';
import { ColorService } from '../../services/colors/color.service';

@Component({
  selector: 'app-takuzu',
  templateUrl: './takuzu.component.html',
  styleUrls: ['./takuzu.component.css']
})
export class TakuzuComponent implements OnInit {

  // Used for drawing to the screen
  canvas: any;
  context: any;

  colors: any;
  oColor: any;
  cColor: any;

  canvasOffsetX: number = 225;
  canvasOffsetY: number = 56;

  gridOffsetX: number = 100;
  gridOffsetY: number = 100;
  gridBoxSize: number;

  selectedX: number = -1;
  selectedY: number = -1;

  personalBest: string;

  difficulty: number;
  seed: number;
  startDate: any;
  t: any;

  board: Board;
  solved: boolean = false;

  constructor(
    private route: ActivatedRoute, 
    private colorService: ColorService,
    private router: Router,
    private tunnel: TunnelService,
    private userService: UserService,
    private timer: TimerService,
    private loader: LoaderService) { 
    this.colors = colorService.getColorScheme();
    this.oColor = this.colors.FOREGROUND;
    this.cColor = "#66CCFF";
  }

  ngOnInit() {
    // Read difficulty from URL param
    this.difficulty = Number(this.route.snapshot.paramMap.get('diff'));
    this.canvas = document.getElementById('myCanvas');
    this.context = this.canvas.getContext('2d');

    var size;
    var removePerc;

    // Easy
    if(this.difficulty == 1) {
      size = 6;
      removePerc = 0.6;
    } 
    
    // Medium
    else if (this.difficulty == 2) {
      size = 8;    
      removePerc = 0.6;
    } 
    
    // Hard
    else if (this.difficulty == 3) {
      size = 10;    
      removePerc = 0.7;
    } 
    
    // Extreme
    else if (this.difficulty == 4) {
      size = 12;
      removePerc = 0.7;
    }

    // Uncomment these to add event listeners
    //this.canvas.addEventListener('mousedown', (e) => this.mousePressed(e),  false);
    //this.canvas.addEventListener('mouseup',   (e) => this.mouseReleased(e), false);
    //this.canvas.addEventListener('mousemove', (e) => this.mouseMove(e),     false);

    //window.addEventListener('keydown', (e) => this.keyPressed(e),  false);
    //window.addEventListener('keyup',   (e) => this.keyReleased(e), false);


    // Start timer if we are logged in
    if(this.userService.isLoggedIn()) {
      let m = {
        GameID: GameID.TAKUZU,
        Difficulty: this.difficulty
      }
      this.tunnel.getPersonalBest(m)
        .subscribe( (data) => {
          this.personalBest = data['time'];
        });
      this.timer.startTimer(GameID.TAKUZU, this.difficulty)
        .subscribe( (data) => {
          // Generate board with given seed
          this.seed = data['seed'];

          this.board = new Board(size, this.seed, removePerc);
          this.board.generateBoard();

          this.startDate = new Date();
          this.displayTimer();

          this.fixSizes();
          this.draw();
        });
    } else {
      // Generate board with random seed
      this.seed = Math.floor(Math.random() * (2000000000));
      
      this.board = new Board(size, this.seed, removePerc);
      this.board.generateBoard();

      this.startDate = new Date();
      this.displayTimer();

      this.fixSizes();
      this.draw();
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
        (millis  ? (millis > 99 ? millis : millis > 9 ? "0" + millis : "00" + millis) : "000")

      that.displayTimer();
    } catch {
      // Do nothing - page probably re-routed
    }
  }

  newGame() {
    this.loader.startLoadingAnimation();
    if(this.userService.isLoggedIn()) {
      this.timer.startTimer(GameID.TAKUZU, this.difficulty)
        .subscribe( (data) => {
          // Generate board with given seed
          this.seed = data['seed'];

          this.board.seed = this.seed;
          this.board.generateBoard();

          if(this.solved) {
            this.solved = false;

            this.startDate = new Date();
            this.displayTimer();
          } else {
            this.startDate = new Date();
          }

          this.fixSizes();

          this.loader.stopLoadingAnimation();
          this.draw();
        });
    } else {
      // Generate board with random seed
      this.seed = Math.floor(Math.random() * (2000000000));

      this.board.seed = this.seed;
      this.board.generateBoard();

      if(this.solved) {
        this.solved = false;

        this.startDate = new Date();
        this.displayTimer();
      } else {
        this.startDate = new Date();
      }

      this.fixSizes();

      this.loader.stopLoadingAnimation();
      this.draw();
    }
  }

  displayTimer() {
    if(!this.solved) {
      var _this = this;
      this.t = setTimeout(function() {_this.add(_this)}, 50);
    }
  }

  draw() {
    this.context.beginPath();
    this.drawBackground();
    this.drawSelectedBox();
    this.drawGrid();
    this.drawValues();
  }

  drawSelectedBox() {
    if(this.selectedX < this.board.size && this.selectedX >= 0 &&
       this.selectedY < this.board.size && this.selectedY >= 0) {
      this.context.fillStyle = "#3D3D3D";
      this.context.fillRect(this.gridOffsetX + (this.selectedX * this.gridBoxSize),
                            this.gridOffsetY + (this.selectedY * this.gridBoxSize),
                              this.gridBoxSize, this.gridBoxSize);
    }
  }

  drawBackground() {
    this.context.fillStyle = this.colors.BACKGROUND; // Background color
    this.context.fillRect(0, 0, this.canvas.offsetWidth * 2, this.canvas.offsetHeight * 2);
  }

  drawGrid() {
    for (var i = 0; i <= this.board.size; i++) {

      this.context.lineWidth = 1;
      this.context.strokeStyle = this.colors.COLOR_1;
      this.context.moveTo(this.gridOffsetX + (i * this.gridBoxSize), this.gridOffsetY);

      this.context.lineTo(this.gridOffsetX + (i * this.gridBoxSize), this.gridOffsetY + (this.board.size * this.gridBoxSize));
      this.context.stroke();
    }

    for (var j = 0; j <= this.board.size; j++) {

      this.context.lineWidth = 1;
      this.context.strokeStyle = this.colors.FOREGROUND;
      this.context.moveTo(this.gridOffsetX, 
                          this.gridOffsetY + (j * this.gridBoxSize));
      this.context.lineTo(this.gridOffsetX + (this.board.size * this.gridBoxSize),
                          this.gridOffsetY + (j * this.gridBoxSize));
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


  drawValues() {
    for (var j = 0; j < this.board.size; j++) {
      for (var i = 0; i < this.board.size; i++) {
        var boardValue = this.board.takuzuPuzzle[j][i];
        var original = this.board.isOriginal(i, j);  
          
        var entryString = "" + boardValue;
        this.context.font = 'Bold ' + Math.floor(this.gridBoxSize / 1.4) + 'px Poppins';
        this.context.textAlign = "center";
        
        var spacing = this.gridBoxSize / 40;

        if (boardValue == 1) {
          if (original) {
            this.context.fillStyle = this.oColor;
          } else {
            this.context.fillStyle = this.cColor; 
          }
        
          this.roundRect(this.context, (this.gridOffsetX + (i * this.gridBoxSize)) + spacing,
                                       (this.gridOffsetY + (j * this.gridBoxSize)) + spacing,
                                       this.gridBoxSize - (spacing * 2),
                                       this.gridBoxSize - (spacing * 2),
                                       (this.gridBoxSize/20),
                                       true,
                                       false);
        
          this.context.fillStyle = this.colors.BACKGROUND;  
          this.context.fillText(entryString, (this.gridOffsetX) + ( i * this.gridBoxSize ) + (this.gridBoxSize / 2),
                                             (this.gridOffsetY) + ( (j+1) * this.gridBoxSize ) - (this.gridBoxSize/4));
        

        } else if (boardValue == 0) {  
          if (original) {
            this.context.fillStyle = this.oColor;
          } else {
            this.context.fillStyle = this.cColor; 
          }
            
          this.roundRect(this.context, (this.gridOffsetX + (i * this.gridBoxSize)) + spacing,
                                       (this.gridOffsetY + (j * this.gridBoxSize)) + spacing,
                                       this.gridBoxSize - (spacing * 2),
                                       this.gridBoxSize - (spacing * 2),
                                       (this.gridBoxSize/20),
                                       true,
                                       false);
        
          this.context.fillStyle = this.colors.BACKGROUND;
          this.roundRect(this.context, (this.gridOffsetX + (i * this.gridBoxSize)) + (spacing * 3),
                                       (this.gridOffsetY + (j * this.gridBoxSize)) + (spacing * 3),
                                       this.gridBoxSize - (spacing * 6),
                                       this.gridBoxSize - (spacing * 6),
                                       (this.gridBoxSize/20),
                                       true,
                                       false);
            
          if (original) {
            this.context.fillStyle = this.oColor;
          } else {
            this.context.fillStyle = this.cColor; 
          }
          this.context.fillText(entryString, (this.gridOffsetX) + ( i * this.gridBoxSize ) + (this.gridBoxSize / 2),
                                             (this.gridOffsetY) + ( (j+1) * this.gridBoxSize ) - (this.gridBoxSize/4));
        }
      }
    }
  }

  done() {
    this.solved = true;
    if(this.userService.isLoggedIn()) {
      this.timer.stopTimer(GameID.TAKUZU, this.difficulty, 'TODO - Board Solution String')
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

    var boardSize = Math.min(this.canvas.offsetWidth - (this.gridOffsetX * 2),
                             this.canvas.offsetHeight - (this.gridOffsetY * 2));

    let w = this.canvas.offsetWidth;
    let h = this.canvas.offsetHeight;
    if (w > h) {
        this.gridOffsetX = Math.round( ( w - h ) / 2 ) + this.gridOffsetX;
    } else {
        this.gridOffsetY = Math.round( ( h - w ) / 2 ) + this.gridOffsetY; 
    }

    this.gridBoxSize = Math.round((boardSize / this.board.size));
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


      if (mouseEvent.button == 2) {
        this.board.rotateValue(x, y, false);
      } else {
        this.board.rotateValue(x, y, true);
      }
      this.draw();
      
      if (this.board.isSolved()) {
        this.done();
      }
    }

  }
  mouseReleased(mouseEvent) { 
    let x = mouseEvent.clientX - this.canvasOffsetX;
    let y = mouseEvent.clientY - this.canvasOffsetY;
    console.log({'mouseReleasedX':x, 'mouseReleasedY':y});
  }

  @HostListener('document:mousemove', ['$event'])
  mouseMove(mouseEvent) {
    let x = mouseEvent.clientX - this.canvasOffsetX;
    let y = mouseEvent.clientY - this.canvasOffsetY;

    if(!this.solved) {
      this.selectedX = Math.floor((x - this.gridOffsetX) / this.gridBoxSize);
      this.selectedY = Math.floor((y - this.gridOffsetY) / this.gridBoxSize);
      this.draw();
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
