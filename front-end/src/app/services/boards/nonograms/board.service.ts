export class Board {
  seed: number;

  width: number;
  height: number;

  rowLabels: any = [];
  colLabels: any = [];

  boardVals: any = [];
  markedVals: any = [];

  maxWidth: number = 0;
  maxHeight: number = 0;

  constructor(width, height, seed) { 
    this.width = width;
    this.height = height;
    this.seed = seed;
  }

  getLegendLength() {
    return this.maxWidth - this.width;
  }

  markTile(x, y) {
    if(this.boardVals[x][y] == 0) {
      this.boardVals[x][y] = 1;
    } else {
      this.boardVals[x][y] = 0;
      this.markedVals[x][y] = 0;
    }
  }

  markRed(x, y) {
    if(this.markedVals[x][y] == 0) {
      this.markedVals[x][y] = 1;
    } else {
      this.boardVals[x][y] = 0;
      this.markedVals[x][y] = 0;
    }
  }

  mark(x, y) {
    if(x < this.width && x >= 0 && y < this.height && y >= 0) {
      this.markRed(x, y);
    }
  }

  click(x, y) {
    if(x < this.width && x >= 0 && y < this.height && y >= 0) {
      this.markTile(x, y);
    }
  }

  isSolved() {
    var rowLabels = [];
    for(var i = 0 ; i < this.width ; i++) {
      var count = 0;
      var rowLabel = [];
      for(var j = 0 ; j < this.height ; j++) {
        if(this.boardVals[i][j] == 0 && count > 0) {
          rowLabel.push(count);
          count = 0;
        } else {
          count += this.boardVals[i][j];
        }
      }

      if(count > 0) {
        rowLabel.push(count);
        count = 0;
      }

      rowLabels.push(rowLabel);
    }

    if(rowLabels.length != this.rowLabels.length) {
      return false;
    }

    for(var x = 0 ; x < this.rowLabels.length ; x++) {
      for(var y = 0 ; y < this.rowLabels[x].length ; y++) {
        if(this.rowLabels[x][y] != rowLabels[x][y]) {
          return false;
        }
      }
    }


    var colLabels = [];
    for(var j = 0 ; j < this.height ; j++) {
      var count = 0;
      var colLabel = [];
      for(var i = 0 ; i < this.width ; i++) {
        if(this.boardVals[i][j] == 0 && count > 0) {
          colLabel.push(count);
          count = 0;
        } else {
          count += this.boardVals[i][j];
        }
      }

      if(count > 0) {
        colLabel.push(count);
        count = 0;
      }

      if(this.width + colLabel.length > this.maxWidth) {
        this.maxWidth = this.width + colLabel.length;
      }
      colLabels.push(colLabel);
    }

    if(colLabels.length != this.colLabels.length) {
      return false;
    }

    for(var x = 0 ; x < this.colLabels.length ; x++) {
      for(var y = 0 ; y < this.colLabels[x].length ; y++) {
        if(this.colLabels[x][y] != colLabels[x][y]) {
          return false;
        }
      }
    }

    return true;
  }

  isColLabelValid(col, index) {
    var count = 0;
    var colLabel = [];
    for(var i = 0 ; i < this.width ; i++) {
      if(this.boardVals[i][col] == 0 && count > 0) {
        colLabel.push(count);
        count = 0;
      } else {
        count += this.boardVals[i][col];
      }
    }

    if(count > 0) {
      colLabel.push(count);
      count = 0;
    }

    if(colLabel.length != this.colLabels[col].length) {
      return 0;
    }

    for(var i = 0 ; i < colLabel.length ; i++) {
      if(colLabel[i] != this.colLabels[col][i]) {
        return 0;
      }
    }

    return 1;
  }

  isRowLabelValid(row, index) {
    var count = 0;
    var rowLabel = [];
    for(var j = 0 ; j < this.height ; j++) {
      if(this.boardVals[row][j] == 0 && count > 0) {
        rowLabel.push(count);
        count = 0;
      } else {
        count += this.boardVals[row][j];
      }
    }

    if(count > 0) {
      rowLabel.push(count);
      count = 0;
    }

    if(rowLabel.length != this.rowLabels[row].length) {
      return 0;
    }

    for(var i = 0 ; i < rowLabel.length ; i++) {
      if(rowLabel[i] != this.rowLabels[row][i]) {
        return 0;
      }
    }

    return 1;
  }

  add(a, b) {
    return a + b;
  }

  generateBoard() {
    this.boardVals = [];
    this.markedVals = [];
    for(var i = 0 ; i < this.width ; i++) {
      var toAdd = [];
      var toAdd2 = [];
      for(var j = 0 ; j < this.height ; j++) {
        toAdd.push(0);
        toAdd2.push(0);
      }

      this.markedVals.push(toAdd2);
      this.boardVals.push(toAdd);
    }

    this.maxHeight = 0;
    this.maxWidth = 0;
    var board = [];

    for(var i = 0 ; i < this.width ; i++) {
      var row = [];
      for(var j = 0 ; j < this.height ; j++) {
        row.push(Math.floor(this.random() * 2));
      }

      board.push(row);
    }

    var rowLabels = [];
    for(var i = 0 ; i < this.width ; i++) {
      var count = 0;
      var rowLabel = [];
      for(var j = 0 ; j < this.height ; j++) {
        if(board[i][j] == 0 && count > 0) {
          rowLabel.push(count);
          count = 0;
        } else {
          count += board[i][j];
        }
      }

      if(count > 0) {
        rowLabel.push(count);
        count = 0;
      }

      if(this.height + rowLabel.length > this.maxHeight) {
        this.maxHeight = this.height + rowLabel.length;
      }
      rowLabels.push(rowLabel);
    }

    var colLabels = [];
    for(var j = 0 ; j < this.height ; j++) {
      var count = 0;
      var colLabel = [];
      for(var i = 0 ; i < this.width ; i++) {
        if(board[i][j] == 0 && count > 0) {
          colLabel.push(count);
          count = 0;
        } else {
          count += board[i][j];
        }
      }

      if(count > 0) {
        colLabel.push(count);
        count = 0;
      }

      if(this.width + colLabel.length > this.maxWidth) {
        this.maxWidth = this.width + colLabel.length;
      }
      colLabels.push(colLabel);
    }


    if(this.maxWidth > this.maxHeight) {
      this.maxHeight = this.maxWidth;
    } else {
      this.maxWidth = this.maxHeight;
    }

    this.rowLabels = rowLabels;
    this.colLabels = colLabels;

    var regenerate = false;
    for(var i = 0 ; i < this.colLabels.length ; i++) {
      if(this.colLabels[i].length == 0) {
        regenerate = true;
      }
    }

    for(var i = 0 ; i < this.rowLabels.length ; i++) {
      if(this.rowLabels[i].length == 0) {
        regenerate = true;
      }
    }

    if(regenerate) {
      this.generateBoard();
    }
  }

  random() {
    var x = Math.sin(++this.seed) * 10000;
    return x - Math.floor(x);
  }
}

export class Label {
  num: number;
  constructor(num) {
    this.num = num;
  }
}
