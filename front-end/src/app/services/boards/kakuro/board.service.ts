import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class Board {

  seed: number;
  size: number;

  kakuroPuzzle: number[][];
  kakuroClues: Clue[];

  constructor(size, seed) {
    this.size = size;
    this.seed = seed;
  }

  generateBoard() {
    // TODO: REMOVE
    this.seed = 6;

    this.kakuroPuzzle = [
      [0, 0, 0, 0, 0],
      [0, 0, -1, -1, 0],
      [0, -1, -1, -1, -1],
      [0, -1, -1, -1, -1],
      [0, 0, -1, -1, 0]
     ];

    // kakuroClues.push(new Clue());

  }

  getClues(x, y) {
    let clues = [];
    for (let i = 0; i < this.kakuroClues.length; i++) {
      if (this.kakuroClues[i].x == x && this.kakuroClues[i].y == y) {
        clues.push(this.kakuroClues[i]);
      }
    }

    return clues;
  }

  random() {
    let x = Math.sin(++this.seed) * 10000;
    return x - Math.floor(x);
  }
}

export class Clue {
  x: number;
  y: number;
  dir: boolean; // True - the clue is for left row, False - the clue is for down column
  val: number;

  constructor(x, y, dir, val) {
    this.x = x;
    this.y = y;
    this.dir = dir;
    this.val = val;
  }
}
