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

  generateBoard() { 
    var rows = [];
    for (var i = 0; i < this.size; i++) {
      var column = [];
      for (var j = 0; j < this.size; j++) {
        column.push(Math.round(this.random() * 2) - 1);
      }

      rows.push(column);
    }

    this.originalPuzzle = rows;
    this.takuzuPuzzle = JSON.parse(JSON.stringify(this.originalPuzzle));
    console.log(this.takuzuPuzzle);
  }

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

  rotateValue(x, y) {
    if (x >= this.size || y >= this.size || this.isOriginal(x, y)) {
      return;
    }

    this.takuzuPuzzle[y][x] += 1;
    if (this.takuzuPuzzle[y][x] == 2)
    {
        this.takuzuPuzzle[y][x] = -1;
    }
  }

  isSolved() {
    var rows = []
    var cols = []

    // create a list of strings of the values of each row and column
    for (var i = 0; i < this.size; i++) {
      row = "";
      col = "";
      
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
          curr.includes('-') {
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
          curr.includes('-') {
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
