export class Board {
  seed: number;

  width: number;
  height: number;

  thermometers: any;

  bottomLegends: any;
  sideLegends: any;

  constructor(width, height, seed) {
    this.width = width + 1;
    this.height = height + 1;
    this.seed = seed;
  }

  generateBoard() {
    this.thermometers = [];
    this.bottomLegends = [];
    this.sideLegends = [];

    var realWidth = this.width - 1;
    var realHeight = this.height - 1;

    // 0 - Down
    // 1 - Up
    // 2 - Left
    // 3 - Right
    //
    var numSkips = 0;

    //while(!this.isFull()) {
    while(numSkips < 200 && !this.isFull()) {
      var tile = this.getRandomEmptyTile();
      var dir = Math.floor(this.random() * 4);
      var added = false;

      if(dir == 0) {
        if(tile.y <= realHeight - 1) {
          var length = Math.floor(this.random() * ((realHeight - 1) - tile.y)) + 2;
          var filledAmount = Math.floor(this.random() * (length + 1));

          var add = true;
          for(var h = 0 ; h < length ; h++) {
            if(this.getThermometerAt(tile.x, tile.y + h) != null) {
              add = false;
              break;
            }
          }

          if(add) {
            added = true;
            this.thermometers.push(new Thermometer(tile.x, tile.y, length, dir, filledAmount));
          }
        }
      } else if(dir == 1) {
        if(tile.y >= 2) {
          var length = Math.floor(this.random() * (tile.y - 2)) + 2;
          var filledAmount = Math.floor(this.random() * (length + 1));

          var add = true;
          for(var h = 0 ; h < length ; h++) {
            if(this.getThermometerAt(tile.x, tile.y - h) != null) {
              add = false;
              break;
            }
          }

          if(add) {
            added = true;
            this.thermometers.push(new Thermometer(tile.x, tile.y, length, dir, filledAmount));
          }
        }
      } else if(dir == 2) {
        if(tile.x >= 2) {
          var length = Math.floor(this.random() * (tile.x - 2)) + 2;
          var filledAmount = Math.floor(this.random() * (length + 1));

          var add = true;
          for(var h = 0 ; h < length ; h++) {
            if(this.getThermometerAt(tile.x - h, tile.y) != null) {
              add = false;
              break;
            }
          }

          if(add) {
            added = true;
            this.thermometers.push(new Thermometer(tile.x, tile.y, length, dir, filledAmount));
          }
        }
      } else if(dir == 3) {
        if(tile.x <= realWidth - 1) {
          var length = Math.floor(this.random() * ((realWidth - 1) - tile.x)) + 2;
          var filledAmount = Math.floor(this.random() * (length + 1));

          var add = true;
          for(var h = 0 ; h < length ; h++) {
            if(this.getThermometerAt(tile.x + h, tile.y) != null) {
              add = false;
              break;
            }
          }

          if(add) {
            added = true;
            this.thermometers.push(new Thermometer(tile.x, tile.y, length, dir, filledAmount));
          }
        }
      }

      if(!added) {
        numSkips++;
      }
    }
    //}

    // Set legends
    for(var i = 0 ; i < this.width - 1 ; i++) {
      var count = 0;
      for(var j = 0 ; j < this.height - 1 ; j++) {
        if(this.isFilled(i + 1, j + 1)) {
          count++;
        }
      }

      if (count == 0) {
        this.generateBoard();
        return;
      }
      this.bottomLegends.push(count);
    }

    for(var j = 0 ; j < this.height - 1 ; j++) {
      var count = 0;
      for(var i = 0 ; i < this.width - 1 ; i++) {
        if(this.isFilled(i + 1, j + 1)) {
          count++;
        }
      }

      if (count == 0) {
        this.generateBoard();
        return;
      }
      this.sideLegends.push(count);
    }

    if(this.bottomLegends.reduce(this.add) < (this.width * 1.5) ||
       this.sideLegends.reduce(this.add)   < (this.height * 1.5)) {
      this.generateBoard();
      return;
    }

    // Empty thermometers
    for(var k = 0 ; k < this.thermometers.length ; k++) {
      this.thermometers[k].filledAmount = 0;
    }
  }

  getRandomEmptyTile() {
    var x = Math.floor(this.random() * (this.width  - 1)) + 1;
    var y = Math.floor(this.random() * (this.height - 1)) + 1;

    while(this.getThermometerAt(x, y) != null) {
      x = Math.floor(this.random() * (this.width  - 1)) + 1;
      y = Math.floor(this.random() * (this.height - 1)) + 1;
    }

    return {
      x: x,
      y: y
    }
  }

  add(a, b) {
    return a + b;
  }

  isFull() {
    for(var i = 0 ; i < this.width - 1 ; i++) {
      for(var j = 0 ; j < this.height - 1 ; j++) {
        if(this.getThermometerAt(i + 1, j + 1) == null) {
          return false;
        }
      }
    }

    return true;
  }

  isSolved() {
    for(var i = 0 ; i < this.width - 1 ; i++) {
      var count = 0;
      for(var j = 0 ; j < this.height - 1 ; j++) {
        if(this.isFilled(i + 1, j + 1)) {
          count++;
        }
      }

      if(count != this.bottomLegends[i]) {
        return false;
      }
    }

    for(var j = 0 ; j < this.height - 1 ; j++) {
      var count = 0;
      for(var i = 0 ; i < this.width - 1 ; i++) {
        if(this.isFilled(i + 1, j + 1)) {
          count++;
        }
      }

      if(count != this.sideLegends[j]) {
        return false;
      }
    }

    return true;
  }

  isFilled(x, y) {
    var thermometer = this.getThermometerAt(x, y);
    if(thermometer != null) {
      return thermometer.isFilledTo(x, y);
    }

    return false;
  }

  getThermometerAt(x, y) {
    for(var i = 0 ; i < this.thermometers.length ; i++) {
      if(this.thermometers[i].livesIn(x, y)) {
        return this.thermometers[i];
      }
    }

    return null;
  }

  click(x, y) {
    var thermometer = this.getThermometerAt(x, y);
    if(thermometer != null) {
      thermometer.fillTo(x, y);
    }
  }

  random() {
      var x = Math.sin(++this.seed) * 10000;
      return x - Math.floor(x);
  }

  bottomLegendValid(i) {
    var count = 0;
    for(var j = 0 ; j < this.height - 1 ; j++) {
      if(this.isFilled(i + 1, j + 1)) {
        count++;
      }
    }

    if(count < this.bottomLegends[i]) {
      return 0;
    } else if(count > this.bottomLegends[i]) {
      return -1;
    }

    return 1;
  }

  sideLegendValid(j) {
    var count = 0;
    for(var i = 0 ; i < this.width - 1 ; i++) {
      if(this.isFilled(i + 1, j + 1)) {
        count++;
      }
    }

    if(count < this.sideLegends[j]) {
      return 0;
    } else if(count > this.sideLegends[j]) {
      return -1;
    }

    return 1;
  }
}

export class Thermometer {
  x: number;
  y: number;

  length: number;
  direction: number;

  filledAmount: number;

  constructor(x, y, length, direction, filledAmount) {
    this.x = x;
    this.y = y;
    this.length = length;
    this.direction = direction;
    this.filledAmount = filledAmount;
  }

  livesIn(paramX, paramY) {
    if(this.direction == 0) {
      //DOWN
      return (paramX == this.x) && 
             (paramY >= this.y) && 
             (paramY < this.y + this.length);
    } else if(this.direction == 1) {
      //UP
      return (paramX == this.x) && 
             (paramY <= this.y) && 
             (paramY > this.y - this.length);
    } else if(this.direction == 2) {
      //LEFT
      return (paramY == this.y) && 
             (paramX <= this.x) && 
             (paramX > this.x - this.length);
    } else if(this.direction == 3) {
      //RIGHT
      return (paramY == this.y) && 
             (paramX >= this.x) && 
             (paramX < this.x + this.length);
    }
  }

  fillTo(paramX, paramY) {
    var diff = Math.abs(this.x - paramX) + Math.abs(this.y - paramY);

    if(this.filledAmount >= diff + 1) {
      this.filledAmount = diff;
    } else {
      this.filledAmount = diff + 1;
    }
  }

  isFilledTo(paramX, paramY) {
    var diff = Math.abs(this.x - paramX) + Math.abs(this.y - paramY);

    return this.filledAmount >= diff + 1;
  }
}

export class BoardService {}

