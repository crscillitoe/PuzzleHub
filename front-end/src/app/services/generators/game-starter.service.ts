import { Injectable } from '@angular/core';
import { GameID } from '../../enums/game-id.enum';

@Injectable({
  providedIn: 'root'
})
export class GameStarterService {

  static startGame(that) {
    that.loader.startLoadingAnimation();

    // Start timer if we are logged in
    if(that.userService.isLoggedIn()) {
      // Get personal high scores
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
          that.seed = data['seed'];

          that.board.seed = that.seed;
          that.board.generateBoard();


          that.startDate = new Date();
          that.displayTimer();

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
        });
    } else {
      that.seed = Math.floor(Math.random() * (2000000000));

      that.board.seed = that.seed;
      that.board.generateBoard();

      that.startDate = new Date();
      that.displayTimer();

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
  }

  constructor() { }
}
