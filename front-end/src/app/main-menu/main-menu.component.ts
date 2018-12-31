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
      'Image': 'assets/images/game-splashes/minesweeper.svg',
      'Description': 'Minesweeper is a single-player puzzle video game. The objective of the game is to clear a rectangular board containing hidden mines.'},

    {'GameID': GameID.HASHI, 
      'Name': 'Hashi', 
      'Image': 'assets/images/game-splashes/hashi.svg',
      'Description': 'Hashi (Hashiwokakero) also known as Bridges is a logic puzzle with simple rules and challenging solutions.'},

    {'GameID': GameID.TAKUZU, 
      'Name': 'Takuzu', 
      'Image': 'assets/images/game-splashes/takuzu.svg',
      'Description': 'Takuzu is a logic-based number placement puzzle. The objective is to fill a (usually 10×10) grid with 1s and 0s.'},

    {'GameID': GameID.TILE_GAME, 
      'Name': 'Tile Game', 
      'Image': 'assets/images/game-splashes/tilegame.svg',
      'Description': 'Tile game is a common puzzle where the user slides tiles into the correct order.'},

    {'GameID': GameID.SUDOKU, 
      'Name': 'Sudoku', 
      'Image': 'assets/images/game-splashes/sudoku.svg',
      'Description': 'A classic puzzle game where you must fill out the board with numbers 1-9.'}
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
