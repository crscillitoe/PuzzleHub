import { Component, OnInit } from '@angular/core';
import { LoaderService } from '../../services/loading-service/loader.service';
import { TimerService } from '../../services/timer/timer.service';
import { UserService } from '../../services/user/user.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { GameID } from '../../enums/game-id.enum';
import { Board } from '../../services/boards/sudoku/board.service';
import { ColorService } from '../../services/colors/color.service';

@Component({
  selector: 'app-sudoku',
  templateUrl: './sudoku.component.html',
  styleUrls: ['./sudoku.component.css']
})
export class SudokuComponent implements OnInit {

  // Used for drawing to the screen
  canvas: any;
  context: any;

  colors: any;
  
  canvasOffsetX: number = 225;
  canvasOffsetY: number = 56;

  difficulty: number;
  seed: number;

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

    // Easy
    if(this.difficulty == 1) {
      console.log('Easy difficulty');
    } 
    
    // Medium
    else if (this.difficulty == 2) {
      console.log('Medium difficulty');
    } 
    
    // Hard
    else if (this.difficulty == 3) {
      console.log('Hard difficulty');
    } 
    
    // Extreme
    else if (this.difficulty == 4) {
      console.log('Extreme difficulty');
    }

    // Uncomment these to add event listeners
    //this.canvas.addEventListener('mousedown', (e) => this.mousePressed(e),  false);
    //this.canvas.addEventListener('mouseup',   (e) => this.mouseReleased(e), false);
    //this.canvas.addEventListener('mousemove', (e) => this.mouseMove(e),     false);

    //window.addEventListener('keydown', (e) => this.keyPressed(e),  false);
    //window.addEventListener('keyup',   (e) => this.keyReleased(e), false);


    // Start timer if we are logged in
    if(this.userService.isLoggedIn()) {
      this.timer.startTimer(GameID.SUDOKU, this.difficulty)
        .subscribe( (data) => {
          // Generate board with given seed
          this.seed = data['seed'];

          this.draw();
        });
    } else {
      // Generate board with random seed
      this.seed = Math.floor(Math.random() * (2000000000));

      this.draw();
    }
  }

  draw() {
    this.context.beginPath();
    this.drawBackground();
  }

  drawBackground() {
    this.context.fillStyle = this.colors.BACKGROUND; // Background color
    this.context.fillRect(0, 0, this.canvas.offsetWidth * 2, this.canvas.offsetHeight * 2);
  }

  done() {
    if(this.userService.isLoggedIn()) {
      this.timer.stopTimer(GameID.SUDOKU, this.difficulty, 'TODO - Board Solution String')
        .subscribe( (data) => {
          console.log(data);
        });
    } else {
      console.log('done - not logged in');
    }
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
