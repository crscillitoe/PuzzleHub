import { Injectable } from '@angular/core';
import { GameID } from '../../enums/game-id.enum';

@Injectable({
  providedIn: 'root'
})
export class GameStarterService {

  static startGame(that) {
    that.loader.startLoadingAnimation();

    if(that.userService.isLoggedIn()) {
      let m = {
        GameID: that.gameID,
        Difficulty: that.difficulty
      }
      that.tunnel.getPersonalBest(m)
        .subscribe( (data) => {
          that.personalBestDaily = data['daily'];
          that.personalBestWeekly = data['weekly'];
          that.personalBestMonthly = data['monthly'];
        });

      that.timer.startTimer(that.gameID, that.difficulty)
        .subscribe( (data) => {
          this.loadGame(that, data['seed']);
        });
    } else {
      this.loadGame(that, Math.floor(Math.random() * (2000000000)));
    }
  }

  static loadGame(that, seed) {
    that.seed = seed

    that.board.seed = that.seed;
    that.board.generateBoard();

    if(that.gameID == GameID.MINESWEEPER) {
      that.lose = false;
      that.firstPress = true;
    } else if(that.gameID == GameID.SUDOKU) {
      that.notes = {};
    }

    if(that.solved) {
      that.solved = false;

      that.startDate = new Date();
      that.displayTimer();
    } else {
      that.startDate = new Date();
    }

    that.fixSizes();

    that.loader.stopLoadingAnimation();
    if(that.gameID == GameID.MINESWEEPER) {
      var img = document.getElementById("flag");
      img.onload = () => {
        that.draw();
      }
    } else {
      that.draw();
    }
  }

  static newGame(that) {
    that.loader.startLoadingAnimation();

    if(that.userService.isLoggedIn()) {
      that.timer.startTimer(that.gameID, that.difficulty)
        .subscribe( (data) => {
          this.loadGame(that, data['seed']);
        });
    } else {
      this.loadGame(that, Math.floor(Math.random() * (2000000000)));
    }
  }

  constructor() { }
}
