export class Board {

  constructor(size, seed, removePerc) {
    this.size = size;
    this.seed = seed;
    this.removePerc = removePerc;

    if (this.size % 2 != 0) {
      this.size++;
    }
  }
  seed: number;
  size: number;
  removePerc: number;

  takuzuPuzzle: number[][];
  originalPuzzle: number[][];

  /* ------------------------------------------------------ */
  /*                  MAIN SOLVER FUNCTIONS                 */
  /* ------------------------------------------------------ */

  static hasErrorArg(board) {
    const rows = [];
    const cols = [];

    // create a list of strings of the values of each row and column
    for (let i = 0; i < board.length; i++) {
      let row = '';
      let col = '';

      for (let j = 0; j < board[0].length; j++) {
        if (board[i][j] == -1) {
          row += '-';
        } else {
          row += board[i][j];
        }

        if (board[j][i] == -1) {
          col += '-';
        } else {
          col += board[j][i];
        }
      }

      rows.push(row);
      cols.push(col);
    }

    const invalidOnes = '111';
    const invalidZeroes = '000';

    // check rows for runs of three 0's or 1's, too many 0's or 1's, or blanks
    for (let i = 0; i < rows.length; i++) {
      const curr = rows[i];
      const numOnes = curr.split('1').length - 1;
      const numZeroes = curr.split('0').length - 1;
      if (numOnes > (board.length) / 2 ||
          numZeroes > (board[0].length) / 2 ||
          curr.includes(invalidOnes) ||
          curr.includes(invalidZeroes)) {
        return true;
      }
    }

    // check cols for runs of three 0's or 1's, too many 0's or 1's, or blanks
    for (let i = 0; i < cols.length; i++) {
      const curr = cols[i];
      const numOnes = curr.split('1').length - 1;
      const numZeroes = curr.split('0').length - 1;
      if (numOnes > (board.length) / 2 ||
          numZeroes > (board[0].length) / 2 ||
          curr.includes(invalidOnes) ||
          curr.includes(invalidZeroes)) {
        return true;
      }
    }

    // check if any two rows or columns are the same
    for (let i = 0; i < rows.length; i++) {

      if (rows[i].includes('-')) {
        continue;
      }

      for (let j = i + 1; j < rows.length; j++) {
        if (i == j || rows[j].includes('-')) {
          continue;
        }
        if (rows[i] == rows[j]) {
          return true;
        }
      }
    }

    for (let i = 0; i < cols.length; i++) {

      if (cols[i].includes('-')) {
        continue;
      }

      for (let j = i + 1; j < cols.length; j++) {
        if (i == j || cols[j].includes('-')) {
          continue;
        }
        if (cols[i] == cols[j]) {
          return true;
        }
      }
    }

    return false;
  }

  /* ------------------------------------------------------ */

  static isSolvedArg(board) {
    const rows = [];
    const cols = [];

    // create a list of strings of the values of each row and column
    for (let i = 0; i < board.length; i++) {
      let row = '';
      let col = '';

      for (let j = 0; j < board[0].length; j++) {
        row += board[i][j];
        col += board[j][i];
      }

      rows.push(row);
      cols.push(col);
    }

    const invalidOnes = '111';
    const invalidZeroes = '000';

    // check rows for runs of three 0's or 1's, too many 0's or 1's, or blanks
    for (let i = 0; i < rows.length; i++) {
      const curr = rows[i];
      const numOnes = curr.split('1').length - 1;
      const numZeroes = curr.split('0').length - 1;
      if (numOnes > (board.length) / 2 ||
          numZeroes > (board[0].length) / 2 ||
          curr.includes(invalidOnes) ||
          curr.includes(invalidZeroes) ||
          curr.includes('-')) {
        return false;
      }
    }

    // check cols for runs of three 0's or 1's, too many 0's or 1's, or blanks
    for (let i = 0; i < cols.length; i++) {
      const curr = cols[i];
      const numOnes = curr.split('1').length - 1;
      const numZeroes = curr.split('0').length - 1;
      if (numOnes > (board.length) / 2 ||
          numZeroes > (board[0].length) / 2 ||
          curr.includes(invalidOnes) ||
          curr.includes(invalidZeroes) ||
        curr.includes('-')) {
        return false;
      }
    }

    // check if any two rows or columns are the same
    for (let i = 0; i < rows.length; i++) {
      for (let j = i + 1; j < rows.length; j++) {
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

  /* ------------------------------------------------------ */

  static canSolve(board) {
    const thisBoard = JSON.parse(JSON.stringify(board));

    while (true) {
      let didSomething = false;

      didSomething = Board.useTechniques(thisBoard);

      if (!didSomething) {
        break;
      }
    }

    return (Board.isSolvedArg(thisBoard));
  }

  /* ------------------------------------------------------ */

  static canSolveOptimized(board, i, j, val) {
    if (board[i][j] == val) { return true; }

    const thisBoard = JSON.parse(JSON.stringify(board));

    while (true) {
      let didSomething = true;

      didSomething = Board.useTechniques(thisBoard);

      if (!didSomething || thisBoard[i][j] == val) {
        break;
      }
    }

    return (thisBoard[i][j] == val || Board.isSolvedArg(thisBoard));
  }

  /* ------------------------------------------------------ */
  /*                    SOLVER MODULES                      */
  /* ------------------------------------------------------ */

  static useTechniques(board) {
      let didSomething = false;

      didSomething = (didSomething || Board.wrapTwos(board));

      if (!didSomething) {
        didSomething = (didSomething || Board.breakThrees(board));
      }

      if (!didSomething) {
        didSomething = (didSomething || Board.completeParity(board));
      }

      if (!didSomething) {
        didSomething = (didSomething || Board.eliminateImpossibilities(board));
      }

      return didSomething;
  }

  /* ------------------------------------------------------ */

  static wrapTwos(board) {

    let didSomething = false;

    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {

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

  /* ------------------------------------------------------ */

  static breakThrees(board) {
    let didSomething = false;

    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {

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

  /* ------------------------------------------------------ */

  static completeParity(board) {
    let didSomething = false;

    for (let i = 0; i < board.length; i++) {
      let row = '';
      let col = '';
      let numZeroes = 0;
      let numOnes = 0;
      let idx = -1;

      // convert rows and columns into strings
      // DOES NOT WORK IF BOARD IS NOT SQUARE
      for (let j = 0; j < board[0].length; j++) {
        if (board[i][j] == -1) {
          row += '-';
        } else {
          row += board[i][j];
        }

        if (board[j][i] == -1) {
          col += '-';
        } else {
          col += board[j][i];
        }
      }

      if ((row.split('-').length - 1) != 0) {
        numZeroes = (row.split('0').length - 1);
        numOnes = (row.split('1').length - 1);
        if (numZeroes == board.length / 2) {
          idx = -1;
          while ((idx = row.indexOf('-', idx + 1)) != -1) {
            board[i][idx] = 1;
          }
          didSomething = true;
        } else if (numOnes == board.length / 2) {
          idx = -1;
          while ((idx = row.indexOf('-', idx + 1)) != -1) {
            board[i][idx] = 0;
          }
          didSomething = true;
        }
      }

      if ((col.split('-').length - 1) != 0) {
        numZeroes = (col.split('0').length - 1);
        numOnes = (col.split('1').length - 1);
        if (numZeroes == board[i].length / 2) {
          idx = -1;
          while ((idx = col.indexOf('-', idx + 1)) != -1) {
            board[idx][i] = 1;
          }
          didSomething = true;
        } else if (numOnes == board[i].length / 2) {
          idx = -1;
          while ((idx = col.indexOf('-', idx + 1)) != -1) {
            board[idx][i] = 0;
          }
          didSomething = true;
        }
      }
    }
    return didSomething;
  }

  /* ------------------------------------------------------ */

  static eliminateImpossibilities(board) {
    let didSomething = false;
    let testBoard = JSON.parse(JSON.stringify(board));

    for (let i = 0; i < board.length; i++) {
      let row = '';
      const idx = -1;
      const matches = [];

      for (let j = 0; j < board[0].length; j++) {
        if (board[i][j] == -1) {
          row += '-';
        } else {
          row += board[i][j];
        }
      }

      if (row.includes('-')) {

        const numEmpty = (row.split('-').length - 1);

        const possibilities = Board.getPermutations(numEmpty);
        const validPossibilities = [];

        let testString = '';

        // try all possibilities and record ones that make a valid board
        for (let k = 0; k < possibilities.length; k++) {
          testString = Board.fillBlanks(row, possibilities[k]);
          if (Board.lineStringHasError(testString)) { continue; }
          Board.writeStringToLocation(testBoard, i, 0, testString, true);
          if (!Board.hasErrorArg(testBoard)) {
            validPossibilities.push(testString);
          }
          Board.writeStringToLocation(testBoard, i, 0, row, true);
        }

        if (validPossibilities.length != 0) {
          // find any values that are shared between all valid possibilities
          let boardAdditions = validPossibilities[0];
          for (let m = 1; m < validPossibilities.length; m++) {
            for (let n = 0; n < validPossibilities[m].length; n++) {
              if (boardAdditions.charAt(n) != '-' && validPossibilities[m].charAt(n) != boardAdditions.charAt(n)) {
                boardAdditions = Board.setCharAt(boardAdditions, n, '-');
              }
            }
          }
          if (boardAdditions != row) {
            didSomething = true;
            Board.writeStringToLocation(board, i, 0, boardAdditions, true);
          }
        }
      }
    }

    // repeat for cols
    testBoard = JSON.parse(JSON.stringify(board));

    for (let i = 0; i < board.length; i++) {
      let col = '';
      const idx = -1;
      const matches = [];

      for (let j = 0; j < board[0].length; j++) {
        if (board[j][i] == -1) {
          col += '-';
        } else {
          col += board[j][i];
        }
      }

      if (col.includes('-')) {

        const numEmpty = (col.split('-').length - 1);

        const possibilities = Board.getPermutations(numEmpty);
        const validPossibilities = [];

        let testString = '';

        // try all possibilities and record ones that make a valid board
        for (let k = 0; k < possibilities.length; k++) {
          testString = Board.fillBlanks(col, possibilities[k]);
          if (Board.lineStringHasError(testString)) { continue; }
          Board.writeStringToLocation(testBoard, 0, i, testString, false);
          if (!Board.hasErrorArg(testBoard)) {
            validPossibilities.push(testString);
          }
          Board.writeStringToLocation(testBoard, 0, i, col, false);
        }

        if (validPossibilities.length != 0) {
          // find any values that are shared between all valid possibilities
          let boardAdditions = validPossibilities[0];
          for (let m = 1; m < validPossibilities.length; m++) {
            for (let n = 0; n < validPossibilities[m].length; n++) {
              if (boardAdditions.charAt(n) != '-' && validPossibilities[m].charAt(n) != boardAdditions.charAt(n)) {
                boardAdditions = Board.setCharAt(boardAdditions, n, '-');
              }
            }
          }
          if (boardAdditions != col) {
            didSomething = true;
            Board.writeStringToLocation(board, 0, i, boardAdditions, false);
          }
        }
      }
    }
    return didSomething;
  }

  /* ------------------------------------------------------ */

  static canAccess(board, i, j) {
    return ((i >= 0 && i < board.length) &&
            (j >= 0 && j < board[i].length));
  }

  /* ------------------------------------------------------ */

  static sameVal(board, i1, j1, i2, j2) {
    return (board[i1][j1] == board[i2][j2] && board[i1][j1] != -1);
  }

  /* ------------------------------------------------------ */

  static negate(board, i, j) {
    if (board[i][j] == 0) { return 1; } else if (board[i][j] == 1) { return 0; } else { return -1; }
  }

  /* ------------------------------------------------------ */

  static setCharAt(str, index, chr) {
    if (index > str.length - 1) {return str; }
    return str.substr(0, index) + chr + str.substr(index + 1);
  }

  /* ------------------------------------------------------ */

  static lineStringHasError(str) {
    const numZeroes = (str.split('0').length - 1);
    const numOnes = (str.split('1').length - 1);
    return (str.includes('000') ||
            str.includes('111') ||
            numZeroes > str.length / 2 ||
            numOnes > str.length / 2);
  }

  /* ------------------------------------------------------ */

  static getPermutations(n) {
    if (n < 2) { return []; }

    let i = 0;
    let b = i.toString(2);

    const result = [];
    while (b.length <= n) {

      // prepend zeroes
      if (b.length < n) {
        b = (new Array((n - b.length) + 1).join('0')) + b;
      }

      result.push(b);

      b = (++i).toString(2);
    }
    return result;
  }

  /* ------------------------------------------------------ */

  static writeStringToLocation(board, i, j, str, toRow) {
    for (let ii = 0; ii < str.length; ii++) {

      let writeChar = str.charAt(ii);
      if (writeChar == '-') { writeChar = '-1'; }
      writeChar = parseInt(writeChar);

      if (!toRow && Board.canAccess(board, i + ii, j)) {
        board[i + ii][j] = writeChar;
      } else if (toRow && Board.canAccess(board, i, j + ii)) {
        board[i][j + ii] = writeChar;
      }
    }
  }

  /* ------------------------------------------------------ */

  static fillBlanks(mainStr, fillStr) {
    let result = '';
    let fillIdx = 0;
    for (let i = 0; i < mainStr.length; i++) {
      if (mainStr.charAt(i) == '-') {
        result += fillStr.charAt(fillIdx);
        fillIdx++;
      } else {
        result += mainStr.charAt(i);
      }
    }
    return result;
  }

  /* ------------------------------------------------------ */
  /*                  BOARD GENERATION                      */
  /* ------------------------------------------------------ */

  generateBoard() {
    const board = [];

    for (let i = 0; i < this.size; i++) {
      board.push([]);
      for (let j = 0; j < this.size; j++) {
        board[i].push(-1);
      }
    }

    while (!Board.isSolvedArg(board)) {

      const columnData = {};

      for ( let i = 0 ; i < this.size ; i ++) {
        const m = {
          'numTotOnes': 0,
          'numTotZeroes': 0,
          'recentOnes': 0,
          'recentZeroes': 0
        };
        columnData[i] = m;
      }

      for (let i = 0; i < this.size; i++) {
        let numTotOnes = 0;
        let numTotZeroes = 0;
        let recentOnes = 0;
        let recentZeroes = 0;
        let added = false;

        for (let j = 0; j < this.size; j++) {
          const choice = Math.round(this.random());
          added = false;

          const column = columnData[j];

          if (numTotOnes < this.size / 2 && choice == 1 && recentOnes < 2 &&
              column['numTotOnes'] < this.size / 2 && column['recentOnes'] < 2
          ) {
            column['recentZeroes'] = 0;
            column['recentOnes']++;
            column['numTotOnes']++;

            recentZeroes = 0;
            recentOnes++;
            numTotOnes++;

            board[i][j] = choice;
            added = true;
          } else if (numTotZeroes < this.size / 2 && choice == 1 && recentZeroes < 2 &&
              column['numTotZeroes'] < this.size / 2 && column['recentZeroes'] < 2) {
            column['recentOnes'] = 0;
            column['recentZeroes']++;
            column['numTotZeroes']++;

            recentOnes = 0;
            recentZeroes++;
            numTotZeroes++;

            board[i][j] = 0;
            added = true;
          }

          if (numTotZeroes < this.size / 2 && choice == 0 && recentZeroes < 2 &&
              column['numTotZeroes'] < this.size / 2 && column['recentZeroes'] < 2) {
            column['recentOnes'] = 0;
            column['recentZeroes']++;
            column['numTotZeroes']++;

            recentOnes = 0;
            recentZeroes++;
            numTotZeroes++;

            board[i][j] = choice;
            added = true;
          } else if (numTotOnes < this.size / 2 && choice == 0 && recentOnes < 2 &&
                     column['numTotOnes'] < this.size / 2 && column['recentOnes'] < 2) {
            column['recentZeroes'] = 0;
            column['recentOnes']++;
            column['numTotOnes']++;

            recentZeroes = 0;
            recentOnes++;
            numTotOnes++;

            board[i][j] = 1;
            added = true;
          }

          if (added = false) {
            break;
          }
        }

        if (added = false) {
          break;
        }
      }
    }

    this.originalPuzzle = board;
    this.carve();
  }

  /* ------------------------------------------------------ */

  carve() {
    const carvedBoard = JSON.parse(JSON.stringify(this.originalPuzzle));

    const indexes = [];

      for (let i = 0; i < this.size; i++) {
        for (let j = 0; j < this.size; j++) {
          indexes.push([i, j]);
        }
      }

      for (let i = 0; i < (this.removePerc * (this.size * this.size)); i++) {

        if (indexes.length == 0) { break; }

        const idx = Math.trunc(this.random() * indexes.length);
        const row = (indexes[idx])[0];
        const col = (indexes[idx])[1];
        indexes.splice(idx, 1);

        if (carvedBoard[row][col] == -1) {
          i--;
          continue;
        }

        const oldVal = carvedBoard[row][col];
        carvedBoard[row][col] = -1;
        if (!Board.canSolve(carvedBoard)) {
          carvedBoard[row][col] = oldVal;
          i--;
        }
      }

      this.originalPuzzle = JSON.parse(JSON.stringify(carvedBoard));
      this.takuzuPuzzle = JSON.parse(JSON.stringify(carvedBoard));
  }


  /* ------------------------------------------------------ */
  /*                  MISC. FRONT-END API                   */
  /* ------------------------------------------------------ */

  isSolved() {
    return Board.isSolvedArg(this.takuzuPuzzle);
  }

  /* ------------------------------------------------------ */

  hasError() {
    return Board.hasErrorArg(this.takuzuPuzzle);
  }

  /* ------------------------------------------------------ */

  isOriginal(x, y) {
    if (x >= this.size || y >= this.size) {
      return false;
    } else if (this.originalPuzzle[y][x] != -1) {
      return true;
    } else {
      return false;
    }
  }

  /* ------------------------------------------------------ */

  rotateValue(x, y, forward) {
    if (x >= this.size || y >= this.size || this.isOriginal(x, y)) {
      return;
    }

    if (forward) {
      this.takuzuPuzzle[y][x] += 1;
      if (this.takuzuPuzzle[y][x] == 2) {
        this.takuzuPuzzle[y][x] = -1;
      }
    } else {
      this.takuzuPuzzle[y][x] -= 1;
      if (this.takuzuPuzzle[y][x] == -2) {
        this.takuzuPuzzle[y][x] = 1;
      }
    }
  }

  public isInvalidTile(x, y): boolean {
    const boardVal = this.takuzuPuzzle[y][x];

    if (boardVal == -1) {
      return false;
    }

    let numFound = 0;
    let inARow = 0;

    // Check row
    for (let i = 0 ; i < this.size ; i++) {
      if (this.takuzuPuzzle[y][i] == boardVal) {
        numFound++;
        inARow++;
      } else {
        inARow = 0;
      }

      if (inARow == 3 && x >= i - 2 && x <= i) {
        return true;
      }
    }

    if (numFound > this.size / 2) {
      return true;
    }

    numFound = 0;
    inARow = 0;

    // Check column
    for (let i = 0 ; i < this.size ; i++) {
      if (this.takuzuPuzzle[i][x] == boardVal) {
        numFound++;
        inARow++;
      } else {
        inARow = 0;
      }

      if (inARow == 3 && y >= i - 2 && y <= i) {
        return true;
      }
    }

    if (numFound > this.size / 2) {
      return true;
    }

    const rows = [];
    const cols = [];
    for (let i = 0 ; i < this.size ; i++) {
      let row = '';
      let col = '';
      for (let j = 0 ; j < this.size ; j++) {
        row += this.takuzuPuzzle[i][j];
        col += this.takuzuPuzzle[j][i];
      }

      rows.push(row);
      cols.push(col);
    }

    if (!(rows[y].split('-1').length > 1)) {
      for (let i = 0 ; i < this.size ; i++) {
        if (i != y) {
          if (rows[i] == rows[y]) {
            return true;
          }
        }
      }
    }

    if (!(cols[x].split('-1').length > 1)) {
      for (let i = 0 ; i < this.size ; i++) {
        if (i != x) {
          if (cols[i] == cols[x]) {
            return true;
          }
        }
      }
    }

    return false;
  }

  /* ------------------------------------------------------ */
  /*                     MISC. HELPERS                      */
  /* ------------------------------------------------------ */

  random() {
      const x = Math.sin(++this.seed) * 10000;
      return x - Math.floor(x);
  }

  /* ------------------------------------------------------ */
}
