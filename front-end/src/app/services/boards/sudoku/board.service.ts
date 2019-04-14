import { SudokuSolver } from '@jlguenego/sudoku-generator';

export class Board {
  seed: number;
  sudokuPuzzle: any;
  originalPuzzle: any;

  numCarved: number;

  constructor(numCarved) { 
    this.numCarved = numCarved;
  }

  generateBoard() { 
    var grid = SudokuSolver.generate();
    var grid2 = SudokuSolver.carve(grid, this.numCarved);

    this.originalPuzzle = grid2;
    this.sudokuPuzzle = JSON.parse(JSON.stringify(this.originalPuzzle));
  }

  isSolved() { return this.valid(this.sudokuPuzzle); }

  random() {
      var x = Math.sin(++this.seed) * 10000;
      return x - Math.floor(x);
  }

  isInvalidTile(x, y, tileValue) {
    if(tileValue == 0) return false;

    for(var i = 0 ; i < 9 ; i++) {
      if(i != x) {
        if(this.sudokuPuzzle[i][y] == tileValue) return true;
      }

      if(i != y) {
        if(this.sudokuPuzzle[x][i] == tileValue) return true;
      }
    }

    if(x % 3 == 0 && y % 3 == 0) {
      if(this.sudokuPuzzle[x + 1][y] == tileValue) return true;
      if(this.sudokuPuzzle[x + 2][y] == tileValue) return true;
      if(this.sudokuPuzzle[x][y + 1] == tileValue) return true;
      if(this.sudokuPuzzle[x + 1][y + 1] == tileValue) return true;
      if(this.sudokuPuzzle[x + 2][y + 1] == tileValue) return true;
      if(this.sudokuPuzzle[x][y + 2] == tileValue) return true;
      if(this.sudokuPuzzle[x + 1][y + 2] == tileValue) return true;
      if(this.sudokuPuzzle[x + 2][y + 2] == tileValue) return true;
    }

    else if(x % 3 == 1 && y % 3 == 0) {
      if(this.sudokuPuzzle[x - 1][y] == tileValue) return true;
      if(this.sudokuPuzzle[x + 1][y] == tileValue) return true;
      if(this.sudokuPuzzle[x][y + 1] == tileValue) return true;
      if(this.sudokuPuzzle[x - 1][y + 1] == tileValue) return true;
      if(this.sudokuPuzzle[x + 1][y + 1] == tileValue) return true;
      if(this.sudokuPuzzle[x][y + 2] == tileValue) return true;
      if(this.sudokuPuzzle[x - 1][y + 2] == tileValue) return true;
      if(this.sudokuPuzzle[x + 1][y + 2] == tileValue) return true;
    }

    else if(x % 3 == 2 && y % 3 == 0) {
      if(this.sudokuPuzzle[x - 1][y] == tileValue) return true;
      if(this.sudokuPuzzle[x - 2][y] == tileValue) return true;
      if(this.sudokuPuzzle[x][y + 1] == tileValue) return true;
      if(this.sudokuPuzzle[x - 1][y + 1] == tileValue) return true;
      if(this.sudokuPuzzle[x - 2][y + 1] == tileValue) return true;
      if(this.sudokuPuzzle[x][y + 2] == tileValue) return true;
      if(this.sudokuPuzzle[x - 1][y + 2] == tileValue) return true;
      if(this.sudokuPuzzle[x - 2][y + 2] == tileValue) return true;
    }

    else if(x % 3 == 0 && y % 3 == 1) {
      if(this.sudokuPuzzle[x][y - 1] == tileValue) return true;
      if(this.sudokuPuzzle[x][y + 1] == tileValue) return true;
      if(this.sudokuPuzzle[x + 1][y] == tileValue) return true;
      if(this.sudokuPuzzle[x + 1][y - 1] == tileValue) return true;
      if(this.sudokuPuzzle[x + 1][y + 1] == tileValue) return true;
      if(this.sudokuPuzzle[x + 2][y] == tileValue) return true;
      if(this.sudokuPuzzle[x + 2][y - 1] == tileValue) return true;
      if(this.sudokuPuzzle[x + 2][y + 1] == tileValue) return true;
    }

    else if(x % 3 == 0 && y % 3 == 2) {
      if(this.sudokuPuzzle[x][y - 1] == tileValue) return true;
      if(this.sudokuPuzzle[x][y - 2] == tileValue) return true;
      if(this.sudokuPuzzle[x + 1][y] == tileValue) return true;
      if(this.sudokuPuzzle[x + 1][y - 1] == tileValue) return true;
      if(this.sudokuPuzzle[x + 1][y - 2] == tileValue) return true;
      if(this.sudokuPuzzle[x + 2][y] == tileValue) return true;
      if(this.sudokuPuzzle[x + 2][y - 1] == tileValue) return true;
      if(this.sudokuPuzzle[x + 2][y - 2] == tileValue) return true;
    }

    else if(x % 3 == 1 && y % 3 == 1) {
      if(this.sudokuPuzzle[x - 1][y - 1] == tileValue) return true;
      if(this.sudokuPuzzle[x - 1][y] == tileValue) return true;
      if(this.sudokuPuzzle[x - 1][y + 1] == tileValue) return true;
      if(this.sudokuPuzzle[x][y - 1] == tileValue) return true;
      if(this.sudokuPuzzle[x][y + 2] == tileValue) return true;
      if(this.sudokuPuzzle[x + 1][y] == tileValue) return true;
      if(this.sudokuPuzzle[x + 1][y - 1] == tileValue) return true;
      if(this.sudokuPuzzle[x + 1][y + 1] == tileValue) return true;
    }
    
    else if(x % 3 == 2 && y % 3 == 1) {
      if(this.sudokuPuzzle[x][y - 1] == tileValue) return true;
      if(this.sudokuPuzzle[x - 1][y - 1] == tileValue) return true;
      if(this.sudokuPuzzle[x - 2][y - 1] == tileValue) return true;
      if(this.sudokuPuzzle[x][y + 1] == tileValue) return true;
      if(this.sudokuPuzzle[x - 1][y + 1] == tileValue) return true;
      if(this.sudokuPuzzle[x - 2][y + 1] == tileValue) return true;
      if(this.sudokuPuzzle[x - 1][y] == tileValue) return true;
      if(this.sudokuPuzzle[x - 2][y] == tileValue) return true;
    }

    else if(x % 3 == 1 && y % 3 == 2) {
      if(this.sudokuPuzzle[x + 1][y] == tileValue) return true;
      if(this.sudokuPuzzle[x - 1][y] == tileValue) return true;
      if(this.sudokuPuzzle[x][y - 1] == tileValue) return true;
      if(this.sudokuPuzzle[x + 1][y - 1] == tileValue) return true;
      if(this.sudokuPuzzle[x - 1][y - 1] == tileValue) return true;
      if(this.sudokuPuzzle[x][y - 2] == tileValue) return true;
      if(this.sudokuPuzzle[x + 1][y - 2] == tileValue) return true;
      if(this.sudokuPuzzle[x - 1][y - 2] == tileValue) return true;
    }

    else if(x % 3 == 2 && y % 3 == 2) {
      if(this.sudokuPuzzle[x][y - 1] == tileValue) return true;
      if(this.sudokuPuzzle[x][y - 2] == tileValue) return true;
      if(this.sudokuPuzzle[x - 1][y] == tileValue) return true;
      if(this.sudokuPuzzle[x - 1][y - 1] == tileValue) return true;
      if(this.sudokuPuzzle[x - 1][y - 2] == tileValue) return true;
      if(this.sudokuPuzzle[x - 2][y] == tileValue) return true;
      if(this.sudokuPuzzle[x - 2][y - 1] == tileValue) return true;
      if(this.sudokuPuzzle[x - 2][y - 2] == tileValue) return true;
    }


    return false;
  }

  valid(arraySolution) {
      for (var y = 0; y < 9; ++y) {
          for (var x = 0; x < 9; ++x) {
              var value = arraySolution[y][x];
              if(value == 0) return false;
  
              if (value) {
                  // Check the line
                  for (var x2 = 0; x2 < 9; ++x2) {
                      if (x2 != x && arraySolution[y][x2] == value) {
                          return false;
                      } 
                  }
  
                  // Check the column
                  for (var y2 = 0; y2 < 9; ++y2) {
                      if (y2 != y && arraySolution[y2][x] == value) {
                          return false;
                      } 
                  }
  
                  // Check the square
                  var startY = Math.floor(y/3)*3;
                  for (var y2 = startY; y2 < startY + 3; ++y2) {
                      var startX = Math.floor(x/3)*3;
                      for (x2 = startX; x2 < startX + 3; ++x2) {
                          if ((x2 != x || y2 != y) && arraySolution[y2][x2] == value) {
                              return false;
                          }
                      }
                  }
              }
          }
      }
  
      return true;
  }
}

export class BoardService {}

