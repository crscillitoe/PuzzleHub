export class Board {
  seed: number;

  width: number;
  height: number;

  constructor(width, height, seed) { 
    this.width = width;
    this.height = height;
    this.seed = seed;
  }

  generateBoard() {
    var board = [];

    for(var i = 0 ; i < this.width ; i++) {
      var row = [];
      for(var j = 0 ; j < this.height ; j++) {
        row.push(Math.floor(this.random() * 2));
      }

      board.push(row);
    }

    console.log(board);
  }

  random() {
      var x = Math.sin(++this.seed) * 10000;
      return x - Math.floor(x);
  }
}
