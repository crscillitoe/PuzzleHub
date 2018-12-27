export class Board {
  seed: number;
  constructor() { }

  generateBoard() { }

  random() {
      var x = Math.sin(++this.seed) * 10000;
      return x - Math.floor(x);
  }
}
