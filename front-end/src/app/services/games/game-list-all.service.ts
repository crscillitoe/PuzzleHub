import { Injectable } from '@angular/core';
import { Difficulty } from '../../interfaces/difficulty';
import { Game } from '../../classes/game';
import { GameList } from '../../classes/game-list';
import { GameID } from '../../enums/game-id.enum';

@Injectable({
  providedIn: 'root'
})
export class GameListAllService extends GameList {
    public static games: Game[] = [
      new Game(
        GameID.SUDOKU,
        'Sudoku',
        'sudoku',
        'sudoku.svg',
        'A classic puzzle game where you must fill out the board with numbers 1-9.',
        'Each of the nine blocks must contain the numbers 1-9 in its squares. ' +
        'Each number can only appear once in a row, column, or box.',
        'Hover over a box and input 1-9 on the keyboard, input a 0 to clear a box'
      ),
      new Game(
        GameID.TAKUZU,
        'Takuzu',
        'takuzu',
        'takuzu.svg',
        'Takuzu is a logic-based number placement puzzle. The objective is to fill a ' +
        '(usually 10×10) grid with 1s and 0s.',
        'The objective is to fill a grid with 1s and 0s, where there is an equal number of ' +
        '1s and 0s in each row and column and no more than two of either number adjacent to ' +
        'each other. Additionally, there can be no identical rows or columns.',
        'Left/Right click'
      ),
      new Game(
        GameID.NONOGRAMS,
        'Nonograms',
        'nonograms',
        'nonograms.svg',
        'Nonograms are picture logic puzzles in which cells in a grid must be colored according ' +
        'to numbers at the side of the grid to reveal a hidden picture.',
        'Google it you goof.',
        'Left click on a tile to mark it.'
      ),
      new Game(
        GameID.THERMOMETERS,
        'Thermometers',
        'thermometers',
        'thermometers.svg',
        'A New York Times classic where you must fill up thermometers to a certain amount.',
        'The numbers in the rows/columns indicate the amount of fluid that must be present in ' +
        'that given row/column.',
        'Click anywhere on the thermometer to insert fluid.'
      ),
      new Game(
        GameID.HASHI,
        'Hashi',
        'hashi',
        'hashi.svg',
        'Hashi (Hashiwokakero) also known as Bridges is a logic puzzle with simple rules and ' +
        'challenging solutions.',
        'The goal is to connect all of the islands into a single connected group by ' +
        'drawing a series of bridges between the islands. The number of bridges coming off of ' +
        'an island must match the number written on that island.',
        'Click and drag from an island to build a bridge.'
      ),
      new Game(
        GameID.TILE_GAME,
        'Tile Game',
        'tilegame',
        'tilegame.svg',
        'Tile game is a common puzzle where the user slides tiles into the correct order.',
        'Order the numbers in sequential order from left to right, top to bottom',
        'Arrow Keys or WASD',
      ),
      new Game(
        GameID.MINESWEEPER,
        'Minesweeper',
        'minesweeper',
        'minesweeper.svg',
        'Minesweeper is a single-player puzzle video game. The objective of the game is to ' +
        'clear a rectangular board containing hidden mines.',
        'The objective of the game is to clear a rectangular board containing hidden mines ' +
        'without detonating any of them.',
        ''
      )
    ];

  constructor() {
    super();
  }

  public static getGameById(id: number): Game {
    for (const g of GameListAllService.games) {
      if (g.id === id) {
        return g;
      }
    }
    return null;
  }
}
