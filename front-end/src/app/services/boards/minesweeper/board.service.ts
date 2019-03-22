export class Board {
  seed: number;

  width: number;
  height: number;
  bombCount: number;

  mineField: number[][];
  lastMineX = 0;
  lastMineY = 0;

  // 0 for not seen
  // 1 for seen
  // 2 for flagged
  visible: number[][];

  constructor(width, height, bombCount, seed) {
    this.width = width;
    this.height = height;
    // the silent "first bomb" gets removed so you cant insta-lose
    this.bombCount = bombCount + 1;
    this.seed = seed;
  }

  generateBoard() {
    const rows = [];
    for (let j  = 0; j < this.height; j++) {
      const column = [];
      for (let i = 0; i < this.width; i++) {
        column.push(0);
      }

      rows.push(column);
    }

    this.mineField = rows;

    const vRows = [];
    for (let j  = 0; j < this.height; j++) {
      const vColumn = [];
      for (let i = 0; i < this.width; i++) {
        vColumn.push(0);
      }

      vRows.push(vColumn);
    }
    this.visible = vRows;
  }

  fillBoard(firstX, firstY) {
    let mineXPos;
    let mineYPos;

    for (let _ = 0; _ < this.bombCount; _++) {
      do {
        mineXPos = Math.floor(this.random() * this.width);
        mineYPos = Math.floor(this.random() * this.height);
      } while (!this.checkValidMine(mineXPos, mineYPos, firstX, firstY));

      for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
          if (i == 0 && j == 0) {
            this.mineField[mineYPos][mineXPos] = -1;
          } else {
            this.updateNeighborTile(mineXPos + i, mineYPos + j);
          }
        }
      }
    }
  }

  checkValidMine(x, y, firstX, firstY) {
    if (this.mineField[y][x] < 0) {
      return false;
    }

    if ((Math.abs(x - firstX) <= 1) && (Math.abs(y - firstY)) <= 1) {
      return false;
    }

    let nbrMineCount = 0;
    // at least two free spaces must surround a mine
    for (let i = x - 1; i <= x + 1; i++) {
      for (let j = y - 1; j <= y + 1; j++) {
        if (i >= 0 && i < this.width && j >= 0 && j < this.height) {
          if (this.mineField[j][i] < 0) {
            nbrMineCount += 1;
          }
        }
      }
    }

    if (nbrMineCount > 4) {
      return false;
    }

    return true;
  }

  doubleClick(x, y) {
    const val = this.mineField[y][x];
    if (val == this.countFlagNeighbors(x, y) && val != 0) {
      for (const neighbor of this.getNeighbors(x, y)) {
        const goodPress = this.click(neighbor.x, neighbor.y);
        if (!goodPress) {
          return false;
        }
      }
    }

    return true;
  }

  countFlagNeighbors(x, y) {
    let toReturn = 0;
    for (const neighbor of this.getNeighbors(x, y)) {
      if (this.visible[neighbor.y][neighbor.x] == 2) {
        toReturn++;
      }
    }

    return toReturn;
  }

  getNeighbors(x, y) {
    const toReturn = [];
    if (x + 1 < this.width) {
      const m1 = {
        'x': x + 1,
        'y': y
      };
      toReturn.push(m1);

      if (y + 1 < this.height) {
        const m2 = {
          'x': x + 1,
          'y': y + 1
        };
        toReturn.push(m2);
      }

      if (y - 1 >= 0) {
        const m3 = {
          'x': x + 1,
          'y': y - 1
        };
        toReturn.push(m3);
      }
    }

    if (x - 1 >= 0) {
      const m4 = {
        'x': x - 1,
        'y': y
      };
      toReturn.push(m4);

      if (y + 1 < this.height) {
        const m5 = {
          'x': x - 1,
          'y': y + 1
        };
        toReturn.push(m5);
      }

      if (y - 1 >= 0) {
        const m6 = {
          'x': x - 1,
          'y': y - 1
        };
        toReturn.push(m6);
      }
    }

    if (y + 1 < this.height) {
      const m7 = {
        'x': x,
        'y': y + 1
      };
      toReturn.push(m7);
    }

    if (y - 1 >= 0) {
      const m8 = {
        'x': x,
        'y': y - 1
      };
      toReturn.push(m8);
    }

    return toReturn;
  }

  updateNeighborTile(x, y) {
    if (x >= 0 && x < this.width && y >= 0 && y < this.height) {
      if (this.mineField[y][x] >= 0) {
        this.mineField[y][x] += 1;
      }
    }
  }

  // turns a mine into an empty tile
    /*replaceMine(x, y){
    this.mineField[y][x] = 0;
    for(var i = x-1; i <= x+1; i++){
      for(var j = y-1; j <= y+1; j++){
        if(i >= 0 && i < this.width && j >= 0 && j < this.height && !(i == x && j == y)){
          if(this.mineField[j][i] >= 0){
            this.mineField[j][i] -= 1;
          }
          if(this.mineField[j][i] < 0){
            this.mineField[y][x] += 1;
          }
        }
      }
    }
  }*/

  floodFill(x, y) {
    if (x < 0 || y < 0 || x >= this.width || y >= this.height) {
      return;
    }
    if (this.mineField[y][x] < 0 || this.visible[y][x] > 0) {
      return;
    }

    this.visible[y][x] = 1;
    if (this.mineField[y][x] != 0) {
      return;
    }

    for (let i = x - 1; i <= x + 1; i++) {
      for (let j = y - 1; j <= y + 1; j++) {
        this.floodFill(i, j);
      }
    }

  }

  firstClick(x, y) {
    if (this.visible[y][x] == 2) {
      return;
    }

    this.fillBoard(x, y);
    this.floodFill(x, y);
  }

  click(x, y) {
    if (this.visible[y][x] == 2) {
      return true;
    }

    if (this.mineField[y][x] < 0) {
      return false;
    } else {
      this.floodFill(x, y);
      return true;
    }

  }

  flagTile(x, y) {
    if (this.visible[y][x] == 2) {
      this.visible[y][x] = 0;
    } else if (this.visible[y][x] == 0) {
      this.visible[y][x] = 2;
    }
  }

  isSolved() {
    let numBombs = 0;
    for (let j = 0 ; j < this.height ; j++) {
      for (let i = 0 ; i < this.width ; i++) {
        if (this.mineField[j][i] >= 0 && this.visible[j][i] == 0) {
          return false;
        } else if (this.visible[j][i] == 2) {
          numBombs++;
        }
      }
    }

    if (numBombs > this.bombCount) {
      return false;
    }

    for (let j = 0 ; j < this.height ; j++) {
      for (let i = 0 ; i < this.width ; i++) {
        if (this.mineField[j][i] == -1) {
          this.visible[j][i] = 2;
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
