import { Component, OnInit } from '@angular/core';
import { TunnelService } from '../services/tunnel/tunnel.service';
import { GameID } from '../enums/game-id.enum';
import { Router } from '@angular/router';
import { GameDataService } from '../services/games/game-data.service';
import { RelayTrackerService } from '../services/relay/relay-tracker.service';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-daily-challenges',
  templateUrl: './daily-challenges.component.html',
  styleUrls: ['./daily-challenges.component.scss']
})
export class DailyChallengesComponent implements OnInit {

  public dailyChallenges: any;
  public completedChallenges: number[];
  gameList: any;

  public mappedGames = [
    GameID.HASHI,
    GameID.TAKUZU,
    GameID.SUDOKU,
    GameID.THERMOMETERS,
    GameID.TILE_GAME,
    GameID.NONOGRAMS
  ];

  games: any = GameDataService.games;

  constructor(
    private router: Router,
    public dialogRef: MatDialogRef<DailyChallengesComponent>,
    public tunnel: TunnelService
  ) {
    tunnel.getCompletedDailyChallenges()
      .subscribe(result => {
        this.completedChallenges = result;
        tunnel.getDailyChallenges()
          .subscribe(data => {
            this.dailyChallenges = [];
            for (let i = 0 ; i < data.length ; i++) {
              const entry = data[i];
              const gameList: number[] = JSON.parse(entry.Relay);

              const toAdd = {
                Difficulty: entry.Difficulty,
                XPReward: entry.XPReward,
                Relay: gameList.slice(0, entry.Length),
                Length: entry.Length
              };

              this.dailyChallenges.push(toAdd);
            }
          });
      });
  }

  getGame(id) {
    console.log(id);
    for (let i = 0 ; i < this.games.length ; i++) {
      if (this.games[i].GameID === id) {
        return this.games[i];
      }
    }

    return null;
  }

  playChallenge(challenge) {
    if (this.completedChallenges.includes(challenge.Difficulty)) {
      return;
    }

    const gameStack = [];
    for (let i = 0 ; i < challenge.Relay.length ; i++) {
      const game = this.getGame(this.mappedGames[challenge.Relay[i]]);
      console.log(game);

      const m = {
        name: game.Name,
        id: game.GameID,
        difficulty: challenge.Difficulty
      };

      gameStack.push(m);
    }

    RelayTrackerService.playingQueue = true;
    RelayTrackerService.queue = gameStack;
    RelayTrackerService.index = 0;
    RelayTrackerService.timeElapsed = 0;
    RelayTrackerService.queueTimes = [];
    RelayTrackerService.challengeMode = challenge.Difficulty;

    const route = gameStack[0].name;
    const diffToAdd = gameStack[0].difficulty;

    const m2 = {
      diff: diffToAdd
    };

    this.router.navigate([route, m2]);
    this.close();
  }

  getGameImage(id) {
    for (let i = 0 ; i < this.games.length ; i++) {
      if ((this.games[i])['GameID'] === id) {
        return (this.games[i])['Image'];
      }
    }
  }

  public getDifficulty(num: number): string {
    switch (num) {
      case 1:
        return 'Easy';
      case 2:
        return 'Medium';
      case 3:
        return 'Hard';
      case 4:
        return 'Extreme';
    }
  }

  ngOnInit() {
  }

  close() {
    this.dialogRef.close();
  }

}
