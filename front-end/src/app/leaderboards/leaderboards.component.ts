import { Component, OnInit } from '@angular/core';
import { TunnelService } from '../services/tunnel/tunnel.service';
import { GameID } from '../enums/game-id.enum';
import { ActivatedRoute } from '@angular/router';
import { LoaderService } from '../services/loading-service/loader.service';

@Component({
  selector: 'app-leaderboards',
  templateUrl: './leaderboards.component.html',
  styleUrls: ['./leaderboards.component.css']
})
export class LeaderboardsComponent implements OnInit {
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
      'Description': 'This is a description for tile game is has to be a similar length to the other descriptions so it looks nice.'},

    {'GameID': GameID.SUDOKU, 
      'Name': 'Sudoku', 
      'Image': 'assets/images/game-splashes/sudoku.svg',
      'Description': 'Sudoku blah blah blah numbers blah blah square blah blah blah Sudoku blah blah this is text description blah.'}
  ]

  leaderboards: any;

  difficulties: any = [
    'Easy',
    'Medium',
    'Hard',
    'Extreme'
  ]

  gameID: number;

  constructor(
    private route: ActivatedRoute, 
    private loader: LoaderService,
    private tunnel: TunnelService
  ) { }

  ngOnInit() {
    this.gameID = 5;
    this.loadScores();
  }

  loadScores() {
    this.loader.startLoadingAnimation();
    this.leaderboards = {};

    for(var i = 1 ; i <= 4 ; i++) {
      let m = {
        "GameID":this.gameID,
        "Difficulty":i
      }

      this.tunnel.getLeaderboards(m)
        .subscribe( (data) => {
          var that = this;
          setTimeout(function() {
            that.loader.stopLoadingAnimation()
            that.leaderboards[m['Difficulty']] = data;
          }, 500);
        });
    }
  }

  setGame(id) {
    this.gameID = id;
    this.loadScores();
  }

  getEnum(name) {
    return GameID[name];
  }

  logLeaderboards() {
    console.log(this.leaderboards);
  }

}
