export class Board {
  seed: number;
  size: number;
  removePerc: number;

  takuzuPuzzle: number[][];
  originalPuzzle: number[][];

  constructor(size, seed, removePerc) {

    this.size = size;
    this.seed = seed;
    this.removePerc = removePerc;
    
    if (this.size % 2 != 0) {
      this.size++;
    }
  }

  /* ------------------------------------------------------ */
  /*                    STATIC SOLVING                      */

  static hasErrorArg(board) {
    var rows = []
    var cols = []

    // create a list of strings of the values of each row and column
    for (var i = 0; i < board.length; i++) {
      var row = "";
      var col = "";
      
      for (var j = 0; j < board[0].length; j++) {
        if (board[i][j] == -1) {
          row += "-";
        } else {
          row += board[i][j];
        }

        if (board[j][i] == -1) {
          col += "-";
        } else {
          col += board[j][i];
        }
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
      if (numOnes > (board.length)/2 ||
          numZeroes > (board[0].length)/2 ||
          curr.includes(invalidOnes) || 
          curr.includes(invalidZeroes)) {
        return true;
      }
    }

    // check cols for runs of three 0's or 1's, too many 0's or 1's, or blanks
    for (var i = 0; i < cols.length; i++) {
      var curr = cols[i];
      var numOnes = curr.split("1").length - 1;
      var numZeroes = curr.split("0").length - 1;
      if (numOnes > (board.length)/2 ||
          numZeroes > (board[0].length)/2 ||
          curr.includes(invalidOnes) || 
          curr.includes(invalidZeroes)) {
        return true;
      }
    }

    // check if any two rows or columns are the same
    for (var i = 0; i < rows.length; i++) {
      
      if (rows[i].includes("-")) {
        continue;
      }
        
      for (var j = i+1; j < rows.length; j++) {
        if (i == j || rows[j].includes("-")) { 
          continue; 
        }
        if (rows[i] == rows[j]) {
          return true;
        }
      }
    }

    for (var i = 0; i < cols.length; i++) {

      if (cols[i].includes("-")) {
        continue;
      }

      for (var j = i+1; j < cols.length; j++) {
        if(i == j || cols[j].includes("-")) {
          continue;
        }
        if (cols[i] == cols[j]) {
          return true;
        }
      }
    }
    
    return false;
  }

  hasError() {
    return Board.hasErrorArg(this.takuzuPuzzle);
  }

  static canAccess(board, i, j) {
    return ((i >= 0 && i < board.length) &&
            (j >= 0 && j < board[i].length));
  }

  static sameVal(board, i1, j1, i2, j2) {
    return (board[i1][j1] == board[i2][j2])
  }

  static negate(board, i, j) {
    if (board[i][j] == 0) { return 1; }
    else if (board[i][j] == 1) { return 0; }
    else { return -1; }
  }

  static wrapTwos(board) {

    var didSomething = false;

    for (var i = 0; i < board.length; i++) {
      for (var j = 0; j < board[i].length; j++) {

        if (board[i][j] != -1) { continue; }

        if (Board.canAccess(board, i - 2, j)) {
          if (Board.sameVal(board, i - 1, j, i - 2, j)) {
            board[i][j] = Board.negate(board, i - 1, j);
            didSomething = true;
          }
        }

        if (Board.canAccess(board, i + 2, j)) {
          if (Board.sameVal(board, i + 1, j, i + 2, j)) {
            board[i][j] = Board.negate(board, i + 1, j);
            didSomething = true;
          }
        }

        if (Board.canAccess(board, i, j - 2)) {
          if (Board.sameVal(board, i, j - 1, i, j - 2)) {
            board[i][j] = Board.negate(board, i, j - 1);
            didSomething = true;
          }
        }

        if (Board.canAccess(board, i, j + 2)) {
          if (Board.sameVal(board, i, j + 1, i, j + 2)) {
            board[i][j] = Board.negate(board, i, j + 1);
            didSomething = true;
          }
        }
      }
    }

    return didSomething;
  }

  static breakThrees(board) 
  { 
    var didSomething = false;

    for (var i = 0; i < board.length; i++) {
      for (var j = 0; j < board[i].length; j++) {

        if (board[i][j] != -1) { continue; }

        if (Board.canAccess(board, i - 1, j) &&
            Board.canAccess(board, i + 1, j)) {
          if (Board.sameVal(board, i - 1, j, i + 1, j)) {
            board[i][j] = Board.negate(board, i - 1, j);
            didSomething = true;
          }
        }

        if (Board.canAccess(board, i, j - 1) &&
            Board.canAccess(board, i, j + 1)) {
          if (Board.sameVal(board, i, j - 1, i, j + 1)) {
            board[i][j] = Board.negate(board, i, j - 1);
            didSomething = true;
          }
        }

      }
    }

    return didSomething;
  }

/*  static finishLines(board) {
    
    var didSomething = false;
 
    for (var i = 0; i < board.length; i++) {
      var row = "";
      var col = "";
      var otherIdx = 0;
      var numZeroes = 0;
      var numOnes = 0;

      // convert rows and columns into strings
      // DOES NOT WORK IF BOARD IS NOT SQUARE
      for (var j = 0; j < board[0].length; j++) {
        if (board[i][j] == -1) {
          row += "-";
        } else {
          row += board[i][j];
        }

        if (board[j][i] == -1) {
          col += "-";
        } else {
          col += board[j][i];
        }
      }

      // if row has only one blank spot, figure out which number is missing
      if ((row.split("-").length - 1) == 1)
      {
        otherIdx = row.indexOf("-");
        numZeroes = (row.split("0").length - 1);
        numOnes = (row.split("1").length - 1);
        
        if (numZeroes == board.length/2) {
          board[i][otherIdx] = 1;
          didSomething = true;
        } else if (numOnes == board.length/2) {
          board[i][otherIdx] = 0;
          didSomething = true;
        }
      }

      // if col has only one blank spot, figure out which number is missing
      if ((col.split("-").length - 1) == 1) {
        otherIdx = col.indexOf("-");
        numZeroes = (col.split("0").length - 1);
        numOnes = (col.split("1").length - 1);

        if (numZeroes == board[i].length/2) {
          board[otherIdx][i] = 1;
          didSomething = true;
        } else if (numOnes == board[i].length/2) {
          board[otherIdx][i] = 0;
          didSomething = true;
        } 
      }
    }

    return didSomething;
  } */

  static completeParity(board)
  {
    var didSomething = false;
 
    for (var i = 0; i < board.length; i++) {
      var row = "";
      var col = "";
      var numZeroes = 0;
      var numOnes = 0;
      var idx = -1;

      // convert rows and columns into strings
      // DOES NOT WORK IF BOARD IS NOT SQUARE
      for (var j = 0; j < board[0].length; j++) {
        if (board[i][j] == -1) {
          row += "-";
        } else {
          row += board[i][j];
        }

        if (board[j][i] == -1) {
          col += "-";
        } else {
          col += board[j][i];
        }
      }
      
      if ((row.split("-").length - 1) != 0) {
        numZeroes = (row.split("0").length - 1);
        numOnes = (row.split("1").length - 1);
        if (numZeroes == board.length/2) {
          idx = -1;
          while ((idx = row.indexOf("-", idx + 1)) != -1) {
            board[i][idx] = 1;
          }
          didSomething = true;
        } else if (numOnes == board.length / 2) {
          idx = -1;
          while ((idx = row.indexOf("-", idx + 1)) != -1) {
            board[i][idx] = 0;
          }
          didSomething = true;
        }
      }

      if ((col.split("-").length - 1) != 0) {
        numZeroes = (col.split("0").length - 1);
        numOnes = (col.split("1").length - 1);
        if (numZeroes == board[i].length / 2) {
          idx = -1;
          while ((idx = col.indexOf("-", idx + 1)) != -1) {
            board[idx][i] = 1;
          }
          didSomething = true;
        } else if (numOnes == board[i].length / 2) {
          idx = -1;
          while ((idx = col.indexOf("-", idx + 1)) != -1) {
            board[idx][i] = 0;
          }
          didSomething = true;
        }
      }
    }
    return didSomething;
  }


  static useTechniques(board) {

      var didSomething = false;

      didSomething = (didSomething || Board.wrapTwos(board));

      if (!didSomething) {
        didSomething = (didSomething || Board.breakThrees(board));
      }

      if (!didSomething) {
        didSomething = (didSomething || Board.completeParity(board));
      }

      if (!didSomething) {
        // do the crazy stuff
      }

      return didSomething;
  }



  static canSolve(board)
  {
    var thisBoard = JSON.parse(JSON.stringify(board));

    while (true) {
      var didSomething = false;
        
      didSomething = Board.useTechniques(thisBoard);

      if (!didSomething) {
        break;
      }
    }

    return (Board.isSolvedArg(thisBoard)); 
  }

  /* ------------------------------------------------------ */
  /*                  BOARD GENERATION                      */

  generateBoard()
  {  
    var board = [];

    for (var i = 0; i < this.size; i++) {
      board.push([]);
      for (var j = 0; j < this.size; j++) {
        board[i].push(-1);
      }
    } 

    while(!Board.isSolvedArg(board)) {

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
    }

    for (var i = 0; i < 10 /*2*(this.removePerc * (this.size * this.size))*/; i++) {
      var row = Math.trunc(this.random() * this.size);
      var col = Math.trunc(this.random() * this.size);
    
      if (board[row][col] == -1) {
        i--;
        continue;
      }

      var oldVal = board[row][col];
      board[row][col] = -1;
      if (!Board.canSolve(board)) {
        board[row][col] = oldVal;
        //i--;
        //continue;
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
  
  static transpose(board) {
    var returnBoard = JSON.parse(JSON.stringify(board));


  }

  static isSolvedArg(board) {
    var rows = []
    var cols = []

    // create a list of strings of the values of each row and column
    for (var i = 0; i < board.length; i++) {
      var row = "";
      var col = "";
      
      for (var j = 0; j < board[0].length; j++) {
        row += board[i][j];
        col += board[j][i];
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
      if (numOnes > (board.length)/2 ||
          numZeroes > (board[0].length)/2 ||
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
      if (numOnes > (board.length)/2 ||
          numZeroes > (board[0].length)/2 ||
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
  
  isSolved() {
    return Board.isSolvedArg(this.takuzuPuzzle);
  }

  static getNumBlanks(board) {
  
    var numBlanks = 0;
    
    // create a list of strings of the values of each row and column
    for (var i = 0; i < board.length; i++) {
      for (var j = 0; j < board[0].length; j++) {
        if (board[i][j] == -1) {
          numBlanks++;
        }
      }
    }

    return numBlanks;
  }
}
