export class Board {
  seed: number;
  size: number;

  takuzuPuzzle: number[][];
  originalPuzzle: number[][];

  constructor(size, seed) {

    this.size = size;
    this.seed = seed;
    
    if (this.size % 2 != 0) {
      this.size++;
    }
  }

  /* ------------------------------------------------------ */
  /*                  BOARD GENERATION                      */

  hasError(board, row, col, used) {
    var totalInRow = 0;
    var totalInCol = 0;
    var consecutiveRowVals = 0;
    var consecutiveColVals = 0;

    for (var i = 0; i < this.size; i++) {
      
      if (used[i][col] && board[row][col] == board[i][col]) {
        totalInCol++;
        consecutiveColVals++;
      } else {
        consecutiveColVals = 0;
      }

      if (consecutiveColVals > 2) {
        return true;
      }

      if (used[row][i] && board[row][col] == board[row][i]) {
        totalInRow++;
        consecutiveRowVals++;
      } else {
        consecutiveRowVals = 0;
      }

      if (consecutiveRowVals > 2) {
        return true;
      }
    }

    if ((totalInRow > this.size/2) || (totalInCol > this.size/2)) {
      return true;
    }

    return false;
  }

  containsPosition(positions, row, col, val)
  {
    for (var i = 0; i < positions.length; i++) {
      var curr = positions[i];
      if ((curr.row == row) && (curr.col == col) && (curr.val == val)) {
        return true;
      }
    }

    return false;
  }

  prune(board, row, col, used)
  {
    var result = new BooleanResult();

    var absoluteFound = false;

    if (used[row][col]) {
      absoluteFound = true;
    }

    var totalOnes = 0;
    var totalZeroes = 0;

    for (var i = 0; i < col; i++) {
      if (board[row][i] == 1) {
        totalOnes++;
      } else {
        totalZeroes++;
      }
    }

    if (totalOnes >= this.size/2) {
      if (absoluteFound) {
        if(board[row][col] == 1) {
          result.error = true;
          result.result = true;
          return result;
        }
      }

      board[row][col] = 0;
      absoluteFound = true;
    }

    if (totalZeroes >= this.size/2) {
      if (absoluteFound) {
        if (board[row][col] == 0) {
          result.error = true;
          result.result = true;
          return result;
        }
      }

      board[row][col] = 1;
      absoluteFound = true;
    }

    totalOnes = 0;
    totalZeroes = 0;

    for (var i = 0; i < row; i++) {
      if (board[i][col] == 1) {
        totalOnes++;
      } else {
        totalZeroes++;
      }
    }

    if (totalOnes >= this.size/2) {
      if (absoluteFound) {
        if (board[row][col] == 1) {
          result.error = true;
          result.result = true;
          return result;
        }
      }
    
      board[row][col] = 0;
      absoluteFound = true;
    }

    if (row > 1) {
      if (board[row - 1][col] == board[row - 2][col]) {
        if (absoluteFound) {
          if (board[row][col] == board[row - 1][col]) {
            result.error = true;
            result.result = true;
            return result;
          }
        }

        if (board[row - 1][col] == 1) {
          board[row][col] = 0; 
        } else if (board[row - 1][col] == 0) {
          board[row][col] = 1;
        }
        absoluteFound = true;
      }
    }

    if (col > 1) {
      if (board[row][col - 1] == board[row][col - 2]) {
        if (absoluteFound) {
          if (board[row][col] == board[row][col - 1]) {
            result.error = true;
            result.result = true;
            return result;
          }
        }
      
        if (board[row][col - 1] == 1) {
          board[row][col] = 0;
        } else if (board[row][col - 1] == 0) {
          board[row][col] = 1;
        }
        absoluteFound = true;
      }
    }

    if (col == this.size - 1) {
      for (var i = 0; i < row; i++) {
        var duplicateFound = true;
        for (var j = 0; j < col; j++) {
          if (board[row][j] != board[i][j]) {
            duplicateFound = false;
            break;
          }
        }

        if (duplicateFound) {
          if (absoluteFound) {
            if (board[row][col] == board[i][col]) {
              result.error = true;
              result.result = true;
              return result;
            }
          }

          if (board[i][col] == 1) {
            board[row][col] = 0;
          } else if (board[i][col] == 0) {
            board[row][col] = 1;
          }
          absoluteFound = true;
        }
      }
    }

    if (row == this.size - 1)
    {
      for (var i = 0; i < col; i++) {
        var duplicateFound = true;
        for (var j = 0; j < row; j++) {
          if (board[j][col] != [board][j][i]) {
            duplicateFound = false;
            break;
          }
        }

        if (duplicateFound) {
          if (absoluteFound) {
            if (board[row][col] == board[row][i]) {
              result.error = true;
              result.result = true;
              return result;
            }
          }

          if (board[i][col] == 1) {
            board[row][col] = 0;
          } else if (board[i][col] == 0) {
            board[row][col] = 1;
          }
          absoluteFound = true;
        }
      }
    }

    result.error = false;
    result.result = absoluteFound;
    return result;
  }

  getPossibleBoards(board, row, col, used, zeroes, ones)
  {
    if (row >= this.size) {
      return 1;
    }

    var nextRow = row;
    var nextCol = col;
    nextCol++;
    if (nextCol >= this.size) {
      nextCol = 0;
      nextRow++;
    }

    var result = this.prune(board, row, col, used)
    if (result.result) {
      if (result.error) {
        return 0;
      } else {
        var initialUsedVal = used[row][col];
        used[row][col] = true;

        var totalBoards = this.getPossibleBoards(board, nextRow, nextCol, used, zeroes, ones);
        if(board[row][col] == 1) {
          ones[row][col] += totalBoards;
        } else if (board[row][col] == 0) {
          zeroes[row][col] += totalBoards;
        }

        used[row][col] = initialUsedVal;
        return totalBoards;
      }
    }

    board[row][col] = 1;
    used[row][col] = true;
    var totalOnes = this.getPossibleBoards(board, nextRow, nextCol, used, zeroes, ones);
    ones[row][col] += totalOnes;

    board[row][col] = 0;
    var totalZeroes = this.getPossibleBoards(board, nextRow, nextCol, used, zeroes, ones);
    zeroes[row][col] += totalZeroes;

    used[row][col] = false;

    return totalOnes + totalZeroes;
  }


  generateBoard()
  {  
    var board = [];
    //var used = [];
    //var zeroes = [];
    //var ones = [];

    //var order = [];
    //var totalBoards = 0;

    for (var i = 0; i < this.size; i++) {
      board.push([]);
      //used.push([]);
      //zeroes.push([]);
      //ones.push([]);

      for (var j = 0; j < this.size; j++) {
        board[i].push(-1);
        //used[i].push(false);
        //zeroes[i].push(-1);
        //ones[i].push(-1);
      }
    } 

    console.log('' + board);

    this.originalPuzzle = board;
      this.takuzuPuzzle = board;

    while(!this.isSolved()) {

      var columnData = {};

      for ( var i = 0 ; i < this.size ; i ++) {
        let m = {
          'numTotOnes':0,
          'numTotZeroes':0,
          'recentOnes':0,
          'recentZeroes':0
        }
        columnData[i] = m;
      }

      for (var i = 0; i < this.size; i++) {
        var numTotOnes = 0;
        var numTotZeroes = 0;
        var recentOnes = 0;
        var recentZeroes = 0;
        var added = false;

        for (var j = 0; j < this.size; j++) {
          var choice = Math.round(this.random());
          added = false;

          let column = columnData[j];
        
          if (numTotOnes < this.size/2 && choice == 1 && recentOnes < 2 &&
              column['numTotOnes'] < this.size/2 && column['recentOnes'] < 2
          ) {
            column['recentZeroes'] = 0;
            column['recentOnes']++;
            column['numTotOnes']++;

            recentZeroes = 0;
            recentOnes++;
            numTotOnes++;

            board[i][j] = choice;
            added = true;
          } else if (numTotZeroes < this.size/2 && choice == 1 && recentZeroes < 2 &&
              column['numTotZeroes'] < this.size/2 && column['recentZeroes'] < 2) {
            column['recentOnes'] = 0;
            column['recentZeroes']++;
            column['numTotZeroes']++;

            recentOnes = 0;
            recentZeroes++;
            numTotZeroes++;

            board[i][j] = 0;
            added = true;
          }
  
          if (numTotZeroes < this.size/2 && choice == 0 && recentZeroes < 2 &&
              column['numTotZeroes'] < this.size/2 && column['recentZeroes'] < 2) {
            column['recentOnes'] = 0;
            column['recentZeroes']++;
            column['numTotZeroes']++;

            recentOnes = 0;
            recentZeroes++;
            numTotZeroes++;

            board[i][j] = choice;
            added = true;
          } else if (numTotOnes < this.size/2 && choice == 0 && recentOnes < 2 &&
                     column['numTotOnes'] < this.size/2 && column['recentOnes'] < 2) {
            column['recentZeroes'] = 0;
            column['recentOnes']++;
            column['numTotOnes']++;

            recentZeroes = 0;
            recentOnes++;
            numTotOnes++;

            board[i][j] = 1;
            added = true;
          }

          if(added = false) {
            break;
          }
        }

        if(added = false) {
          break;
        }
      }

      this.originalPuzzle = board;
      this.takuzuPuzzle = board;
    }


    this.takuzuPuzzle = JSON.parse(JSON.stringify(this.originalPuzzle));
  }

  /* ------------------------------------------------------ */

  random() {
      var x = Math.sin(++this.seed) * 10000;
      return x - Math.floor(x);
  }

  isOriginal(x, y)
  {
    if (x >= this.size || y >= this.size) {
      return false;
    } else if (this.originalPuzzle[y][x] != -1) {
      return true;
    } else {
      return false;
    }
  }

  rotateValue(x, y, forward) {
    if (x >= this.size || y >= this.size || this.isOriginal(x, y)) {
      return;
    }

    if (forward) {
      this.takuzuPuzzle[y][x] += 1;
      if (this.takuzuPuzzle[y][x] == 2)
      {
        this.takuzuPuzzle[y][x] = -1;
      }
    } else {
      this.takuzuPuzzle[y][x] -= 1;
      if (this.takuzuPuzzle[y][x] == -2)
      {
        this.takuzuPuzzle[y][x] = 1;
      }
    }
  }

  isSolved() {
    var rows = []
    var cols = []

    // create a list of strings of the values of each row and column
    for (var i = 0; i < this.size; i++) {
      var row = "";
      var col = "";
      
      for (var j = 0; j < this.size; j++) {
        row += this.takuzuPuzzle[i][j];
        col += this.takuzuPuzzle[j][i];
      }

      rows.push(row);
      cols.push(col);
    }


    var invalidOnes = "111";
    var invalidZeroes = "000";

    // check rows for runs of three 0's or 1's, too many 0's or 1's, or blanks
    for (var i = 0; i < rows.length; i++) {
      var curr = rows[i];
      var numOnes = curr.split("1").length - 1;
      var numZeroes = curr.split("0").length - 1;
      if (numOnes > this.size/2 ||
          numZeroes > this.size/2 ||
          curr.includes(invalidOnes) || 
          curr.includes(invalidZeroes) || 
          curr.includes('-')) {
        return false;
      }
    }

    // check cols for runs of three 0's or 1's, too many 0's or 1's, or blanks
    for (var i = 0; i < cols.length; i++) {
      var curr = cols[i];
      var numOnes = curr.split("1").length - 1;
      var numZeroes = curr.split("0").length - 1;
      if (numOnes > this.size/2 ||
          numZeroes > this.size/2 ||
          curr.includes(invalidOnes) || 
          curr.includes(invalidZeroes) || 
          curr.includes('-')) {
        return false;
      }
    }

    // check if any two rows or columns are the same
    for (var i = 0; i < rows.length; i++) {
      for (var j = i+1; j < rows.length; j++) {
        if (i == j) { continue; }
        if (rows[i] == rows[j]) {
          return false;
        } else if (cols[i] == cols[j]) {
          return false;
        }
      }
    }

    return true;
  }
}

export class Position {
  row : number;
  col : number;
  val : number;
  usedPositions: any = [];
}

export class BooleanResult {
  error : boolean;
  result : boolean;
}
