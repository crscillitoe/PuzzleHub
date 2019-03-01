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

    this.thermometers.push(new Thermometer(1, 1, 4, 0));
    this.thermometers.push(new Thermometer(2, 4, 4, 1));
    this.thermometers.push(new Thermometer(3, 1, 4, 0));
    this.thermometers.push(new Thermometer(4, 4, 4, 1));

    this.thermometers.push(new Thermometer(1, 5, 5, 3));
    this.thermometers.push(new Thermometer(5, 6, 5, 2));

    this.bottomLegends.push(0);
    this.bottomLegends.push(1);
    this.bottomLegends.push(2);
    this.bottomLegends.push(3);
    this.bottomLegends.push(4);
    this.bottomLegends.push(5);

    this.sideLegends.push(0);
    this.sideLegends.push(1);
    this.sideLegends.push(2);
    this.sideLegends.push(3);
    this.sideLegends.push(4);
    this.sideLegends.push(5);
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
