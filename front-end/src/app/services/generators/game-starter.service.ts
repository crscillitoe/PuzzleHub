import { Injectable } from '@angular/core';
import { GameID } from '../../enums/game-id.enum';
import { UserService }  from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class GameStarterService {

  static startGame(that) {
    that.loader.startLoadingAnimation();
    that.solved = true;

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

  static done(that) {
    if(that.userService.isLoggedIn() && !that.solved) {
      that.timer.stopTimer(that.seed, that.gameID, that.difficulty, 'TODO - Board Solution String')
        .subscribe( (data) => {
          UserService.addXp(data['XPGain']);
          if(data['Daily']) {
            that.personalBestDaily = data['TimeElapsed'];
          }

          if(data['Weekly']) {
            that.personalBestWeekly = data['TimeElapsed'];
          }

          if(data['Monthly']) {
            that.personalBestMonthly = data['TimeElapsed'];
          }

          var display = document.getElementById("timer");
          display.textContent = data['TimeElapsed'];
        });
    } else {
      // Do nothing - we're not logged in
    }
    that.solved = true;
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