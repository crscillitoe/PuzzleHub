import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class KakuroService
{

  seed: number;
  size: number;

  kakuroPuzzle: number[][];
  kakuroClues: Clue[];

  constructor(size, seed)
  {
    this.size = size;
    this.seed = seed;
  }

  generateBoard()
  {
    // TODO: REMOVE
    seed = 6;
  
    kakuroPuzzle = [
      [0, 0, 0, 0, 0],
      [0, 0, -1, -1, 0],
      [0, -1, -1, -1, -1],
      [0, -1, -1, -1, -1],
      [0, 0, -1, -1, 0]
     ];

    //kakuroClues.push(new Clue());

  }

  getClues(x, y) 
  {
    var clues = [];
    for (var i = 0; i < kakuroClues.length; i++) {
      if (kakuroClues[i].x == x && kakuroClues[i].y == y) {
        clues.push(kakuroClues[i]);
      }
    }

    return clues;
  }

  random()
  {
    var x = Math.sin(++this.seed) * 10000;
    return x - Math.floor(x);
  }
}

export class Clue
{
  x: number;
  y: number;
  dir: boolean; // True - the clue is for left row, False - the clue is for down column
  val: number;

  constructor(x, y, dir, val)
  {
    this.x = x;
    this.y = y;
    this.dir = dir;
    this.val = val;
  }
}
