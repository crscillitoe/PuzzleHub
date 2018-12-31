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
        totalInCols++;
        consecutiveColVals++;
      } else {
        consecutiveColVals = 0;
      }

      if (consecutiveColVals > 2) {
        return true;
      }

      if (used[row][i] && board[row][col] == board[row][i]) {
        totalInRows++;
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
          if (board[row][j] != board][i][j]) {
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
    var used = [];
    var zeroes = [];
    var ones = [];

    var order = [];
    var totalBoards = 0;

    for (var i = 0; i < this.size; i++) {
      board.push([]);
      used.push([]);
      zeroes.push([]);
      ones.push([]);

      for (var j = 0; j < this.size; j++) {
        board[i].push(0);
        used[i].push(false);
        zeroes[i].push(-1);
        ones[i].push(-1);
      }
    } 

    for (var i = 0; i < this.size/4; i++) {
      var row = Math.round(this.random() * (this.size - 1));
      var col = Math.round(this.random() * (this.size - 1));
      
      if (!used[row][col])
      {
        board[row][col] = Math.round(this.random());
        if (!this.hasError(board, row, col, used)) {
          used[row][col] = true;
          
          var curr = new Position();
          curr.row = row;
          curr.col = col;
          curr.val = board[row][col];
          order.push(curr);
        } else {
          board[row][col] = -1;
          i--;
        }
      } else {
        i--;
      }
    }

    
    while (true) {
    
    
      for (var i = 0; i < this.size; i++) {
        for (var j = 0; j < this.size; j++) {
          zeroes[i][j] = 0;
          ones[i][j] = 0;
        }
      }

      this.getPossibleBoards(board, 0, 0, used, zeroes, ones);
      console.log(zeroes);
      console.log(ones);
    
      var lowestZero = 0;
      var lowestZeroRow = 0;
      var lowestZeroCol = 0;
      var lowestOne = 0;
      var lowestOneRow = 0;
      var lowestOneCol = 0;

      for (var i = 0; i < this.size; i++) {
        for (var j = 0; j < this.size; j++) {
          if (!(this.containsPosition(order[order.length - 1].usedPositions, i, j, 0)) && (zeroes[i][j] != 0) && ((lowestZero == 0) || (zeroes[i][j] < lowestZero)))
          {
            lowestZero = zeroes[i][j];
            lowestZeroRow = i;
            lowestZeroCol = j;
          }

          if (!(this.containsPosition(order[order.length - 1].usedPositions, i, j, 1)) && (ones[i][j] != 0) && ((lowestOne == 0) || (ones[i][j] < lowestOne)))
          { 
            lowestOne = ones[i][j];
            lowestOneRow = i;
            lowestOneCol = j;
          }
        }
      }
      
      if (lowestZero == 0 || lowestOne == 0) {
        break;
      }

      if (lowestZero < lowestOne) {
        board[lowestZeroRow][lowestZeroCol] = 0;
        used[lowestZeroRow][lowestZeroCol] = true;

        var adder = new Position();
        adder.row = lowestZeroRow;
        adder.col = lowestZeroCol;
        adder.val = 0;
        order.push(adder);
      } else {
        board[lowestOneRow][lowestOneCol] = 1;
        used[lowestOneRow][lowestOneCol] = true;

        var adder = new Position();
        adder.row = lowestOneRow;
        adder.col = lowestOneCol;
        adder.val = 1;
        order.push(adder);
      }

      if (lowestZero == 1 || lowestOne == 1) {
        totalBoards++;
        if (totalBoards > 10) {
          break;
        }

        var curr = order.pop();
        order[order.length - 1].usedPositions.push(curr);
        board[curr.row][curr.col] = -1;
        used[curr.row][curr.col] = false;
      }
    }
    
    this.originalPuzzle = board;
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
  usedPositions: [] = [];
}

export class BooleanResult {
  error : boolean;
  result : boolean;
}
