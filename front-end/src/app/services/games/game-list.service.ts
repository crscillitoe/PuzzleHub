import { Injectable, Optional } from '@angular/core';
import { Difficulty } from '../../interfaces/difficulty';
import { Game } from '../../classes/game';
import { GameID } from '../../enums/game-id.enum';

@Injectable({
  providedIn: 'root'
})
export class GameListService {
    public static defaultGames: Game[] = [
      new Game(
        GameID.SUDOKU,
        'Sudoku',
        'sudoku',
        'sudoku.svg',
        'Sudoku is a classic puzzle game where you must fill out the board with numbers 1-9.',
        [
          'Sudoku is a classic puzzle game where you must fill out the board with numbers 1-9.',
          'Each of the nine blocks must contain numbers 1-9 in its squares. Each number can only appear once in a row, column, or box.'
        ],
        'Each of the nine blocks must contain the numbers 1-9 in its squares. ' +
        'Each number can only appear once in a row, column, or box.',
        'Hover over a box and input 1-9 on the keyboard, input a 0 to clear a box. Pressing "t" ' +
        'will switch Taking Notes mode on and off.',
        'play sudoku online, sudoku online'
      ),
      new Game(
        GameID.TAKUZU,
        'Takuzu',
        'takuzu',
        'takuzu.svg',
        'Takuzu is a logic-based number placement puzzle. The objective is to fill a ' +
        '(usually 10×10) grid with 1s and 0s.',
        [
          'Takuzu is a logic-based number placement puzzle. The objective is to fill a ' +
          '(usually 10×10) grid with 1s and 0s.',
          'The objective is to fill a grid with 1s and 0s, where there is an equal number of ' +
          '1s and 0s in each row and column and no more than two of either number adjacent to ' +
          'each other. Additionally, there can be no identical rows or columns.',
        ],
        'The objective is to fill a grid with 1s and 0s, where there is an equal number of ' +
        '1s and 0s in each row and column and no more than two of either number adjacent to ' +
        'each other. Additionally, there can be no identical rows or columns.',
        'Left/Right click',
        'play takuzu online, takuzu online'
      ),
      new Game(
        GameID.NONOGRAMS,
        'Nonograms',
        'nonograms',
        'nonograms.svg',
        'Nonograms is a picture logic puzzles in which tiles in a grid must be colored ' +
        'according to numbers at the side of the grid to reveal a hidden picture.',
        [
          'Nonograms is a picture logic puzzles in which tiles in a grid must be colored ' +
          'according to numbers at the side of the grid to reveal a hidden picture.',
          'The object is to color in tiles based on the numbers on the outside of the rows and ' +
          'columns. The numbers represent the number of consecutive tiles that need to be ' +
          'colored in in the row or column. There must be at least one blank tile between each ' +
          'group.',
        ],
        'The object is to color in tiles based on the numbers on the outside of the rows and ' +
        'columns. The numbers represent the number of consecutive tiles that need to be ' +
        'colored in in the row or column. There must be at least one blank tile between each ' +
        'group.',
        'Left-click on a tile to fill it in, right-click on a tile to mark it blank.',
        'play nonograms online, nonograms online',
      ),
      new Game(
        GameID.THERMOMETERS,
        'Thermometers',
        'thermometers',
        'thermometers.svg',
        'Thermometers is a New York Times classic where you must fill up thermometers to a ' +
        'certain amount.',
        [
          'Thermometers is a New York Times classic where you must fill up thermometers to a ' +
          'certain amount.',
          'The numbers in the rows/columns indicate the amount of fluid that must be present in ' +
          'that given row/column.',
        ],
        'The numbers in the rows/columns indicate the amount of fluid that must be present in ' +
        'that given row/column.',
        'Click anywhere on the thermometer to insert fluid.',
        'play thermometers online, thermometers online, new york times thermometers',
      ),
      new Game(
        GameID.HASHI,
        'Hashi',
        'hashi',
        'hashi.svg',
        'Hashi (Hashiwokakero), also known as Bridges, is a logic puzzle with simple rules and ' +
        'challenging solutions where all islands must be connected by drawing a series of ' +
        'bridges.',
        [
          'Hashi (Hashiwokakero), also known as Bridges, is a logic puzzle with simple rules and ' +
          'challenging solutions where all islands must be connected by drawing a series of ' +
          'bridges.',
          'The goal is to connect all of the islands into a single connected group by ' +
          'drawing a series of bridges between the islands. The number of bridges coming off of ' +
          'an island must match the number written on that island.',
        ],
        'The goal is to connect all of the islands into a single connected group by ' +
        'drawing a series of bridges between the islands. The number of bridges coming off of ' +
        'an island must match the number written on that island.',
        'Click and drag from an island to build a bridge. Alternatively, you can press WASD ' +
        'while hovering your mouse over an island. Shift+WASD will build two bridges.',
        'play hashi online, hashi online, puzzle bridges online',
      ),
      new Game(
        GameID.TILE_GAME,
        'Tile Game',
        'tilegame',
        'tilegame.svg',
        'Tile Game, also know as 15-puzzle, is a common puzzle where the user slides tiles into ' +
        'the correct order.',
        [
          'Tile Game, also know as 15-puzzle, is a common puzzle where the user slides tiles into ' +
          'the correct order.',
          'Order the numbers in sequential order from left to right, top to bottom',
        ],
        'Order the numbers in sequential order from left to right, top to bottom',
        'With the Mouse Hover option enabled, hover your mouse over a tile to move it into the ' +
        'blank space. Alternatively, use the arrow keys or WASD.',
        'play tiles game online, play 15-puzzle online, tile game online, 15-puzzle online, 15 puzzle online'
      )
    ];

  public games: Game[];

  constructor(@Optional() games: Game[]) {
    this.games = games || GameListService.defaultGames;
  }

  public getGameById(id: number): Game {
    for (const g of this.games) {
      if (g.id === id) {
        return g;
      }
    }
    return null;
  }

  public getGameByName(name: string): Game {
    for (const g of this.games) {
      if (g.cleanName === name) {
        return g;
      }
    }
    return null;
  }

  public getGameNameById(id: number): string {
    for (const g of this.games) {
      if (g.id === id) {
        return g.name;
      }
    }
  }

  public getGameImageById(id: number): string {
    for (const g of this.games) {
      if (g.id === id) {
        return g.image;
      }
    }
  }

  public getGameDifficultyById(gid: number, did: number): Difficulty {
    const game = this.getGameById(gid);
    return game.getDifficultyById(did);
  }

  public getGameDifficultyNameById(gid: number, did: number): string {
    const game = this.getGameById(gid);
    return game.getDifficultyNameById(did);
  }

  public getRandomDifficulty(): number {
    return Math.floor(Math.random() * 4) + 1;
  }

  public getRandomGameName(): string {
    let gameName = this.games[Math.floor(Math.random() * this.games.length)].name;

    while (gameName === 'Minesweeper') {
      gameName = this.games[Math.floor(Math.random() * this.games.length)].name;
    }

    return gameName;
  }
}
