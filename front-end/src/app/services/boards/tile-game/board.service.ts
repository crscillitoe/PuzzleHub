export class Board {
  seed: number;

  width: number;
  height: number;

  // 2d array of numbers - 0 is the empty slot
  tilePuzzle: number[][];

  NUM_SWITCHES: number = 1000;

  emptyX: number = 0;
  emptyY: number = 0;

  constructor(width, height, seed) { 
    this.width = width;
    this.height = height;
    this.seed = seed;
  }

  generateBoard() { 
    this.emptyX = this.width - 1;
    this.emptyY = this.height - 1;
    var rows = [];
    for(var i = 0 ; i < this.height ; i++) {
      var column = [];
      for(var j = 0 ; j < this.width; j++) {
        column.push(1 + j + ((i * this.width)));
      }

      rows.push(column);
    }

    this.tilePuzzle = rows;
    this.tilePuzzle[this.height - 1][this.width - 1] = 0;

    var numTiles = (this.width * this.height) - 1;
    while( this.numTilesInCorrectPosition() > Math.round(numTiles/4) ) {
      for(var _ = 0 ; _ < this.NUM_SWITCHES ; _++) {
        this.switchTiles();
      }
    }
  }

  numTilesInCorrectPosition() {
    var toReturn = 0;
    for(var j = 0 ; j < this.height ; j++) {
      for(var i = 0 ; i < this.width ; i++) {
        var val = this.tilePuzzle[j][i];
        if(val == (i + 1) + (j * this.width) && val != 0) {
          toReturn++;
        }
      }
    }

    return toReturn;
  }

  switchTiles() {
    var validDirections = this.getValidDirections();
    var dir = validDirections[Math.floor(this.random() * validDirections.length)];

    switch(dir) {
      // UP
      case(0):
          this.moveUp();
        break;

      // DOWN
      case(1):
          this.moveDown();
        break;

      // LEFT
      case(2):
          this.moveLeft();
        break;

      // RIGHT
      case(3):
          this.moveRight();
        break;
    }
  }

  getValidDirections() {
    //                       U  D  L  R
    //var validDirections = [0, 1, 2, 3];
    var validDirections = [];

    if(this.emptyY != 0) {
      validDirections.push(0);
    }

    if(this.emptyY != this.height - 1) {
      validDirections.push(1);
    }

    if(this.emptyX != 0) {
      validDirections.push(2);
    }

    if(this.emptyX != this.width - 1) {
      validDirections.push(3);
    }

    return validDirections;
  }

  moveUp() {
    this.tilePuzzle[this.emptyY][this.emptyX] = this.tilePuzzle[this.emptyY - 1][this.emptyX];
    this.tilePuzzle[this.emptyY - 1][this.emptyX] = 0;
    this.emptyY--;
  }

  moveDown() {
    this.tilePuzzle[this.emptyY][this.emptyX] = this.tilePuzzle[this.emptyY + 1][this.emptyX];
    this.tilePuzzle[this.emptyY + 1][this.emptyX] = 0;
    this.emptyY++;
  }

  moveLeft() {
    this.tilePuzzle[this.emptyY][this.emptyX] = this.tilePuzzle[this.emptyY][this.emptyX - 1];
    this.tilePuzzle[this.emptyY][this.emptyX - 1] = 0;
    this.emptyX--;
  }

  moveRight() {
    this.tilePuzzle[this.emptyY][this.emptyX] = this.tilePuzzle[this.emptyY][this.emptyX + 1];
    this.tilePuzzle[this.emptyY][this.emptyX + 1] = 0;
    this.emptyX++;
  }

  moveTile(x, y) {
    if(x - 1 == this.emptyX && y == this.emptyY) {
      this.moveRight();
    } else if(x + 1 == this.emptyX && y == this.emptyY) {
      this.moveLeft();
    } else if(x == this.emptyX && y + 1 == this.emptyY) {
      this.moveUp();
    } else if(x == this.emptyX && y - 1 == this.emptyY) {
      this.moveDown();
    }
  }

  isSolved() { 
    for(var j = 0 ; j < this.height ; j++) {
      for(var i = 0 ; i < this.width ; i++) {
        var val = this.tilePuzzle[j][i];
        if(val != (i + 1) + (j * this.width) && val != 0) {
          return false;
        }
      }
    }

    return true;
  }

  random() {
      var x = Math.sin(++this.seed) * 10000;
      return x - Math.floor(x);
  }
}
