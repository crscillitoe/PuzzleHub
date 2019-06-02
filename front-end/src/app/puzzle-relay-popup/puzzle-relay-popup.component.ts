import { Component, OnInit } from '@angular/core';
import { GameListAllService } from '../services/games/game-list-all.service';
import { Game } from '../classes/game';
import { CdkDragDrop, moveItemInArray, transferArrayItem, copyArrayItem } from '@angular/cdk/drag-drop';
import { cloneDeep } from 'lodash';

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

  constructor() { }

  ngOnInit() {
    this.diffs = GameListAllService.games[0].diffs;
    this.difficulty = this.diffs[0];
    this.multiplier = 1;

    this.gameList = [];
    for (var i = 0 ; i < GameListAllService.games.length ; i++) {
      let m = {
        image: GameListAllService.games[i].image,
        name:  GameListAllService.games[i].name,
        id:    GameListAllService.games[i].id,
        difficulty: null,
        multiplier: 1
      }

      this.gameList.push(m);
    }

    this.gameQueue = [];
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
