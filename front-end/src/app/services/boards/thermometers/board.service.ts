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

    // 0 - Down
    // 1 - Up
    // 2 - Left
    // 3 - Right

    this.thermometers.push(new Thermometer(1, 1, 2, 3));
    this.thermometers.push(new Thermometer(1, 2, 2, 0));
    this.thermometers.push(new Thermometer(2, 2, 2, 0));
    this.thermometers.push(new Thermometer(3, 3, 3, 1));
    this.thermometers.push(new Thermometer(6, 1, 3, 2));
    this.thermometers.push(new Thermometer(5, 2, 2, 2));
    this.thermometers.push(new Thermometer(6, 2, 3, 0));
    this.thermometers.push(new Thermometer(4, 3, 2, 3));

    this.thermometers.push(new Thermometer(3, 4, 3, 2));
    this.thermometers.push(new Thermometer(2, 5, 2, 3));
    this.thermometers.push(new Thermometer(1, 5, 2, 0));

    this.thermometers.push(new Thermometer(3, 6, 2, 2));

    this.thermometers.push(new Thermometer(4, 6, 3, 1));
    this.thermometers.push(new Thermometer(5, 6, 3, 1));
    this.thermometers.push(new Thermometer(6, 5, 2, 0));

    this.bottomLegends.push(5);
    this.bottomLegends.push(2);
    this.bottomLegends.push(3);
    this.bottomLegends.push(3);
    this.bottomLegends.push(3);
    this.bottomLegends.push(3);

    this.sideLegends.push(3);
    this.sideLegends.push(2);
    this.sideLegends.push(4);
    this.sideLegends.push(4);
    this.sideLegends.push(3);
    this.sideLegends.push(3);
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
    return this.getThermometerAt(x, y).isFilledTo(x, y);
  }

  getThermometerAt(x, y) {
    for(var i = 0 ; i < this.thermometers.length ; i++) {
      if(this.thermometers[i].livesIn(x, y)) {
        return this.thermometers[i];
      }
    }
  }

  click(x, y) {
    this.getThermometerAt(x, y).fillTo(x, y);
  }
}

export class Thermometer {
  x: number;
  y: number;

  length: number;
  direction: number;

  filledAmount: number;

  constructor(x, y, length, direction) {
    this.x = x;
    this.y = y;
    this.length = length;
    this.direction = direction;
    this.filledAmount = 0;
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
