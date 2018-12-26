import { Component, OnInit } from '@angular/core';
import { TimerService } from '../services/timer/timer.service'
import { TunnelService } from '../services/tunnel/tunnel.service'
import { LoaderService } from '../services/loading-service/loader.service'
import { Router } from "@angular/router";

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.css']
})
export class MainMenuComponent implements OnInit {

  games: any = [
    {'GameID': 1, 
      'Name': 'Minesweeper', 
      'Image': 'assets/images/game-splashes/placeholder.jpg',
      'Description': 'Minesweeper is a single-player puzzle video game. The objective of the game is to clear a rectangular board containing hidden mines.'},

    {'GameID': 2, 
      'Name': 'Hashi', 
      'Image': 'assets/images/game-splashes/placeholder.jpg',
      'Description': 'Hashi (Hashiwokakero) also known as Bridges is a logic puzzle with simple rules and challenging solutions.'},

    {'GameID': 3, 
      'Name': 'Takuzu', 
      'Image': 'assets/images/game-splashes/placeholder.jpg',
      'Description': 'Takuzu is a logic-based number placement puzzle. The objective is to fill a (usually 10×10) grid with 1s and 0s.'},

    {'GameID': 4, 
      'Name': 'Tile Game', 
      'Image': 'assets/images/game-splashes/placeholder.jpg',
      'Description': 'This is a description for tile game is has to be a similar length to the other descriptions so it looks nice.'},

    {'GameID': 5, 
      'Name': 'Sudoku', 
      'Image': 'assets/images/game-splashes/placeholder.jpg',
      'Description': 'Sudoku blah blah blah numbers blah blah square blah blah blah Sudoku blah blah this is text description blah.'}
  ]

  constructor(
    private timerService: TimerService,
    private tunnelService: TunnelService,
    private router: Router,
    private loader: LoaderService
  ) { 
  }

  playGame(id, diff) {
    console.log({id, diff});
    let m = {
      diff: diff
    }
    console.log(m);
    if(id == 2) {
      this.router.navigate(['hashi', m]);
    }
  }

  ngOnInit() {
  }
}
