import { Component, OnInit } from '@angular/core';
import { TimerService } from '../services/timer/timer.service'
import { TunnelService } from '../services/tunnel/tunnel.service'
import { LoaderService } from '../services/loading-service/loader.service'
import { UserService } from '../services/user/user.service';
import { Router } from '@angular/router';
import { GameID } from '../enums/game-id.enum';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.css']
})
export class MainMenuComponent implements OnInit {

  games: any = [
    {'GameID': GameID.MINESWEEPER, 
      'Name': 'Minesweeper', 
      'Image': 'assets/images/game-splashes/minesweeper.png',
      'Description': 'Minesweeper is a single-player puzzle video game. The objective of the game is to clear a rectangular board containing hidden mines.'},

    {'GameID': GameID.HASHI, 
      'Name': 'Hashi', 
      'Image': 'assets/images/game-splashes/hashi.png',
      'Description': 'Hashi (Hashiwokakero) also known as Bridges is a logic puzzle with simple rules and challenging solutions.'},

    {'GameID': GameID.TAKUZU, 
      'Name': 'Takuzu', 
      'Image': 'assets/images/game-splashes/takuzu.jpg',
      'Description': 'Takuzu is a logic-based number placement puzzle. The objective is to fill a (usually 10×10) grid with 1s and 0s.'},

    {'GameID': GameID.TILE_GAME, 
      'Name': 'Tile Game', 
      'Image': 'assets/images/animations/loading.svg',
      'Description': 'This is a description for tile game is has to be a similar length to the other descriptions so it looks nice.'},

    {'GameID': GameID.SUDOKU, 
      'Name': 'Sudoku', 
      'Image': 'assets/images/animations/loading.svg',
      'Description': 'Sudoku blah blah blah numbers blah blah square blah blah blah Sudoku blah blah this is text description blah.'}
  ]

  constructor(
    private timerService: TimerService,
    private tunnelService: TunnelService,
    private router: Router,
    private user: UserService,
    private loader: LoaderService
  ) { 
  }

  playGame(route, diff) {
    let m = {
      diff: diff
    }

    this.router.navigate([route, m]);
  }

  ngOnInit() {
  }
}
