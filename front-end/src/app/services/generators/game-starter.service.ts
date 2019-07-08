import { Injectable } from '@angular/core';
import { GameID } from '../../enums/game-id.enum';
import { UserService } from '../user/user.service';
import { SharedFunctionsService } from '../shared-functions/shared-functions.service';
import { RelayTrackerService } from '../relay/relay-tracker.service';
import { GameListAllService } from '../games/game-list-all.service';

@Injectable({
  providedIn: 'root'
})
export class GameStarterService {
  static customSeed: number;

  static startGame(that) {
    that.loader.startLoadingAnimation();
    that.solved = true;

    this.customSeed = Number(that.route.snapshot.paramMap.get('seed'));

    if (that.userService.isLoggedIn()) {
      this.loadBestTimes(that);

      if (this.customSeed === 0) {
        that.timer.startTimer(that.gameID, that.difficulty)
          .subscribe( (data) => {
            this.loadGame(that, data['seed']);
          });
      } else {
        this.loadGame(that, this.customSeed);
      }
    } else {
      if (this.customSeed === 0) {
        this.loadGame(that, Math.floor(Math.random() * (2000000000)));
      } else {
        this.loadGame(that, this.customSeed);
      }
    }
  }

  static done(that) {
    if (that.userService.isLoggedIn() && this.customSeed === 0) {
      that.timer.stopTimer(that.seed, that.gameID, that.difficulty, 'TODO - Board Solution String')
        .subscribe( (data) => {
          that.userService.reloadAccountData();
          if (data['Daily']) {
            that.personalBestDaily = SharedFunctionsService.convertToDateString(data['TimeElapsed']);
          }

          if (data['Weekly']) {
            that.personalBestWeekly = SharedFunctionsService.convertToDateString(data['TimeElapsed']);
          }

          if (data['Monthly']) {
            that.personalBestMonthly = SharedFunctionsService.convertToDateString(data['TimeElapsed']);
          }

          if (RelayTrackerService.playingQueue) {
            RelayTrackerService.timeElapsed += data['TimeElapsed'];
            RelayTrackerService.index += 1;

            RelayTrackerService.queueTimes.push(data['TimeElapsed']);

            if (RelayTrackerService.index < RelayTrackerService.queue.length) {
              let route = RelayTrackerService.queue[RelayTrackerService.index].name;
              if (route == 'Random') {
                route = GameListAllService.getRandomGameName();
              }

              let diffToAdd = 0;
              if (RelayTrackerService.queue[RelayTrackerService.index].difficulty == 99) {
                diffToAdd = GameListAllService.getRandomDifficulty();
              } else {
                diffToAdd = RelayTrackerService.queue[RelayTrackerService.index].difficulty;
              }

              const m = {
                diff: diffToAdd
              }

              if (that.router.url.includes(route) ||
                  (that.router.url.includes('Tile%20Game') && route == 'Tile Game')) {
                that.newGame(m.diff);
              } else {
                that.router.navigate([route, m]);
              }
            } else {
              const display = document.getElementById('timer');
              display.textContent = SharedFunctionsService.convertToDateString(data['TimeElapsed']);
            }
          } else {
            const display = document.getElementById('timer');
            display.textContent = SharedFunctionsService.convertToDateString(data['TimeElapsed']);
          }
        });
    } else {
      // Do nothing - we're not logged in
    }
    that.solved = true;
  }

  static loadGame(that, seed) {
    that.seed = seed;

    that.board.seed = that.seed;
    that.board.generateBoard();

    if (that.gameID === GameID.MINESWEEPER) {
      that.lose = false;
      that.firstPress = true;
    } else if (that.gameID === GameID.SUDOKU) {
      that.notes = {};
    }

    if (that.solved) {
      that.solved = false;

      that.startDate = new Date();
      that.displayTimer();
    } else {
      that.startDate = new Date();
    }

    that.fixSizes();

    that.loader.stopLoadingAnimation();
    if (that.gameID === GameID.MINESWEEPER) {
      that.imgFlag.onload = () => {
        that.draw();
      };
    } else {
      that.draw();
    }
  }

  static loadBestTimes(that) {
    const m = {
      GameID: that.gameID,
      Difficulty: that.difficulty
    };
    that.tunnel.getPersonalBest(m)
      .subscribe( (data) => {
        that.personalBestDaily = SharedFunctionsService.convertToDateString(data['daily']);
        that.personalBestWeekly = SharedFunctionsService.convertToDateString(data['weekly']);
        that.personalBestMonthly = SharedFunctionsService.convertToDateString(data['monthly']);
      });
  }

  static newGame(that) {
    that.loader.startLoadingAnimation();
    this.customSeed = 0;

    if (that.userService.isLoggedIn()) {
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
