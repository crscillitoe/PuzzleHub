export class Board {
  seed: number;

  width: number;
  height: number;

  thermometers: any;

  constructor(width, height, seed) {
    this.width = width;
    this.height = height;
    this.seed = seed;
  }

  
  generateBoard() {
    this.thermometers = [];
    this.thermometers.push(new Thermometer(1, 1, 4, 0));
    this.thermometers.push(new Thermometer(2, 4, 4, 1));
    this.thermometers.push(new Thermometer(3, 1, 4, 0));
    this.thermometers.push(new Thermometer(4, 4, 4, 1));
  }

  isSolved() {
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
}
