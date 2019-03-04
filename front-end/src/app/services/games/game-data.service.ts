import { Injectable } from '@angular/core';
import { GameID } from '../../enums/game-id.enum';

@Injectable({
  providedIn: 'root'
})
export class GameDataService {

  static games: any = [
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
      'Description': 'Tile game is a common puzzle where the user slides tiles into the correct order.'},

    {'GameID': GameID.SUDOKU, 
      'Name': 'Sudoku', 
      'Image': 'assets/images/game-splashes/sudoku.svg',
      'Description': 'A classic puzzle game where you must fill out the board with numbers 1-9.'},
    {
      'GameID': GameID.THERMOMETERS,
      'Name': 'Thermometers',
      'Image': 'assets/images/game-splashes/thermometers.svg',
      'Description': 'A New York Times classic where you must fill up thermometers to a certain amount.'
    }
  ]

  constructor() { }
}
