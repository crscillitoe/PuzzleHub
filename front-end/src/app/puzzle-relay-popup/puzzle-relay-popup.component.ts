import { Component, OnInit, Inject } from '@angular/core';
import { GameListAllService } from '../services/games/game-list-all.service';
import { RelayTrackerService } from '../services/relay/relay-tracker.service';
import { Game } from '../classes/game';
import { CdkDragDrop, moveItemInArray, transferArrayItem, copyArrayItem } from '@angular/cdk/drag-drop';
import { cloneDeep } from 'lodash';
import { Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-puzzle-relay-popup',
  templateUrl: './puzzle-relay-popup.component.html',
  styleUrls: ['./puzzle-relay-popup.component.scss']
})
export class PuzzleRelayPopupComponent implements OnInit {

  gameList: any;
  gameQueue: any;
  diffs: any;
  difficulty: any;
  multiplier: number;

  constructor(private router: Router,
              public dialogRef: MatDialogRef<PuzzleRelayPopupComponent>) { }

  ngOnInit() {
    this.diffs = [];
    for (var i = 0 ; i < GameListAllService.games[0].diffs.length ; i++) {
      this.diffs.push({
        diff: GameListAllService.games[0].diffs[i].diff,
        name: GameListAllService.games[0].diffs[i].name,
        color: GameListAllService.games[0].diffs[i].color,
        requiresLogin: GameListAllService.games[0].diffs[i].requiresLogin,
        minLevel: GameListAllService.games[0].diffs[i].minLevel,
      })
    }
    this.diffs.push({
      diff: 99,
      name: 'random',
      color: 'purple',
      requiresLogin: false,
      minLevel: 0
    });

    this.difficulty = this.diffs[0];
    this.multiplier = 1;

    this.gameList = [];
    for (var i = 0 ; i < GameListAllService.games.length ; i++) {
      if (GameListAllService.games[i].name !== 'Minesweeper') {
        let m = {
          image: GameListAllService.games[i].image,
          name:  GameListAllService.games[i].name,
          id:    GameListAllService.games[i].id,
          difficulty: null,
          multiplier: 1
        }

        this.gameList.push(m);
      }
    }

    this.gameList.push({
      image: 'assets/images/game-splashes/random_game.svg',
      name: 'Random',
      id: 99,
      difficulty: null,
      multiplier: 1
    });

    console.log(this.gameList);

    this.gameQueue = [];
  }

  close() {
    this.dialogRef.close();
  }

  setDifficulty(diff) {
    this.difficulty = diff;
  }

  setMultiplier(mult) {
    this.multiplier = mult;
  }

  removeQueueItem(index) {
    this.gameQueue.splice(index, 1);
  }

  playRelay() {
    // Convert relay into stack
    let gameStack = [];
    for (var i = 0 ; i < this.gameQueue.length ; i++) {
      let entry = this.gameQueue[i];
      for (var j = 0 ; j < entry.multiplier ; j++) {
        let m = {
          name: entry.name,
          id: entry.id,
          difficulty: entry.difficulty.diff
        }

        gameStack.push(m);
      }
    }

    RelayTrackerService.playingQueue = true;
    RelayTrackerService.queue = gameStack;
    RelayTrackerService.index = 0;
    RelayTrackerService.timeElapsed = 0;
    RelayTrackerService.queueTimes = [];
    RelayTrackerService.challengeMode = 0;

    let route = gameStack[0].name;
    if (route == 'Random') {
      route = GameListAllService.getRandomGameName();
    }

    let diffToAdd = 0;
    if (gameStack[0].difficulty == 99) {
      diffToAdd = GameListAllService.getRandomDifficulty();
    } else {
      diffToAdd = gameStack[0].difficulty;
    }

    const m = {
      diff: diffToAdd
    }

    this.router.navigate([route, m]);
    this.close();
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
  }

  moveToQueue(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      let clone = cloneDeep(event.previousContainer.data[event.previousIndex]);
      clone.difficulty = this.difficulty;
      clone.multiplier = this.multiplier;

      event.container.data.splice(this.gameQueue.length, 0, clone);
    }
  }
}
