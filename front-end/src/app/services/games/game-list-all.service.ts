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
        GameID.MINESWEEPER,
        'Minesweeper',
        'minesweeper.svg',
        'Minesweeper is a single-player puzzle video game. The objective of the game is to clear a rectangular board containing hidden mines.',
      ),
      new Game(
        GameID.HASHI,
        'Hashi',
        'hashi.svg',
        'Hashi (Hashiwokakero) also known as Bridges is a logic puzzle with simple rules and challenging solutions.',
      ),
      new Game(
        GameID.TAKUZU,
        'Takuzu',
        'takuzu.svg',
        'Takuzu is a logic-based number placement puzzle. The objective is to fill a (usually 10×10) grid with 1s and 0s.',
      ),
      new Game(
        GameID.TILE_GAME,
        'Tile Game',
        'tilegame.svg',
        'Tile game is a common puzzle where the user slides tiles into the correct order.',
      ),
      new Game(
        GameID.SUDOKU,
        'Sudoku',
        'sudoku.svg',
        'A classic puzzle game where you must fill out the board with numbers 1-9.',
      ),
      new Game(
        GameID.THERMOMETERS,
        'Thermometers',
        'thermometers.svg',
        'A New York Times classic where you must fill up thermometers to a certain amount.',
      ),
      new Game(
        GameID.NONOGRAMS,
        'Nonograms',
        'nonograms.svg',
        'Nonograms are picture logic puzzles in which cells in a grid must be colored according to numbers at the side of the grid to reveal a hidden picture.'
      )
    ];

  constructor() {
    super();
  }

  public static getGameById(id: number): Game {
    for (let g of GameListAllService.games) {
      if (g.id === id) {
        return g;
      }
    }
    return null;
  }
}
