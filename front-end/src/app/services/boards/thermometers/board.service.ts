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
