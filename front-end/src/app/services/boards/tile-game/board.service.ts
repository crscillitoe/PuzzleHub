export class Board {
  seed: number;

  width: number;
  height: number;

  // 2d array of numbers - 0 is the empty slot
  tilePuzzle: number[][];

  NUM_SWITCHES = 1000;

  emptyX = 0;
  emptyY = 0;

  constructor(width, height, seed) {
    this.width = width;
    this.height = height;
    this.seed = seed;
  }

  generateBoard() {
    this.emptyX = this.width - 1;
    this.emptyY = this.height - 1;
    const rows = [];

    // First generate the board in its solved state
    for (let i = 0 ; i < this.height ; i++) {
      const column = [];
      for (let j = 0 ; j < this.width; j++) {
        column.push(1 + j + ((i * this.width)));
      }

      rows.push(column);
    }

    this.tilePuzzle = rows;
    this.tilePuzzle[this.height - 1][this.width - 1] = 0;

    // Algorithm credit - ben1996123
    let swapCounter = 0;
    for (let j = 0 ; j < this.height; j++) {
      for (let i = 0 ; i < this.width; i++) {
        if (i == this.width - 1 && j == this.height - 1) {
          continue;
        }
        const swap = this.getRandomTile(i, j); // Returns tile greater than or equal to this index
                                             // Excludes the tile that contains 0

        const initial = this.tilePuzzle[j][i];
        const newVal  = this.tilePuzzle[swap['y']][swap['x']];

        if (newVal != initial) {
          this.tilePuzzle[j][i] = newVal;
          this.tilePuzzle[swap.y][swap.x] = initial;
          swapCounter++;
        }
      }
    }

    // Avoid parity, if we've swapped an odd number of times, swap once more
    if (swapCounter % 2 == 1) {
      const initial = this.tilePuzzle[this.height - 1][this.width - 2];
      const newVal  = this.tilePuzzle[this.height - 1][this.width - 3];

      this.tilePuzzle[this.height - 1][this.width - 2] = newVal;
      this.tilePuzzle[this.height - 1][this.width - 3] = initial;
    }

    const up = Math.floor(this.random() * (this.height));
    const left = Math.floor(this.random() * (this.width));

    for (let x = 0 ; x < up ; x++) {
      this.moveUp();
    }

    for (let x = 0 ; x < left ; x++) {
      this.moveLeft();
    }
  }

  convertXYToVal(x, y) {
    return (y * this.width) + (x + 1);
  }

  getRandomTile(x, y) {
    const val = this.convertXYToVal(x, y);
    const randVal = Math.floor(this.random() * ((this.width * this.height) - val)) + val;

    const randY = Math.floor((randVal - 1) / this.width);
    const randX = (randVal - 1) % this.width;

    const m = {
      x: randX,
      y: randY
    };

    return m;
  }

  numTilesInCorrectPosition() {
    let toReturn = 0;
    for (let j = 0 ; j < this.height ; j++) {
      for (let i = 0 ; i < this.width ; i++) {
        const val = this.tilePuzzle[j][i];
        if (val == (i + 1) + (j * this.width) && val != 0) {
          toReturn++;
        }
      }
    }

    return toReturn;
  }

  switchTiles() {
    const validDirections = this.getValidDirections();
    const dir = validDirections[Math.floor(this.random() * validDirections.length)];

    switch (dir) {
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
    // var validDirections = [0, 1, 2, 3];
    const validDirections = [];

    if (this.emptyY != 0) {
      validDirections.push(0);
    }

    if (this.emptyY != this.height - 1) {
      validDirections.push(1);
    }

    if (this.emptyX != 0) {
      validDirections.push(2);
    }

    if (this.emptyX != this.width - 1) {
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
    if (x - 1 == this.emptyX && y == this.emptyY) {
      this.moveRight();
    } else if (x + 1 == this.emptyX && y == this.emptyY) {
      this.moveLeft();
    } else if (x == this.emptyX && y + 1 == this.emptyY) {
      this.moveUp();
    } else if (x == this.emptyX && y - 1 == this.emptyY) {
      this.moveDown();
    }
  }

  isSolved() {
    for (let j = 0 ; j < this.height ; j++) {
      for (let i = 0 ; i < this.width ; i++) {
        const val = this.tilePuzzle[j][i];
        if (val != (i + 1) + (j * this.width) && val != 0) {
          return false;
        }
      }
    }

    return true;
  }

  random() {
      const x = Math.sin(++this.seed) * 10000;
      return x - Math.floor(x);
  }
}
