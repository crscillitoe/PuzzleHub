export class Board {
  seed: number;

  width: number;
  height: number;
  bombCount: number;

  mineField: number[][];

  constructor(width, height, bombCount, seed) {
    this.width = width;
    this.height = height;
    //the silent "first bomb" gets removed so you cant insta-lose
    this.bombCount = bombCount + 1;
    this.seed = seed;
  }

  generateBoard() { 
    var rows = [];
    for(var j  = 0; j < this.height; j++) {
      var column = [];
      for(var i = 0; i < this.width; i++) {
        column.push(0);
      }

      rows.push(column);
    }

    this.mineField = rows;

    var mineXPos;
    var mineYPos;

    for(var _ = 0; _ < this.bombCount; _++) {
      do {
        mineXPos = Math.floor(this.random() * this.width);
        mineYPos = Math.floor(this.random()* this.height);
      } while (!this.checkValidMine(mineXPos, mineYPos));    

      for(var i = -1; i <= 1; i++){
        for(var j = -1; j <= 1; j++){
          if(i == 0 && j == 0){
            this.mineField[mineYPos][mineXPos] = -1;
          }
          else{
            this.updateNeighborTile(mineXPos+i, mineYPos+j);
          }
        }
      }
    }

    console.log(this.mineField);
  }

  checkValidMine(x, y){

    if(this.mineField[y][x] < 0){
      return false;
    }

    var nbrMineCount = 0;
    //at least two free spaces must surround a mine
    for(var i = x-1; i <= x+1; i++){
      for(var j = y-1; j <= y+1; j++){
        if(i >= 0 && i < this.width && j >= 0 && j < this.height){
          if(this.mineField[j][i] < 0){
            nbrMineCount += 1;
          }
        } 
      }
    
    }
    if(nbrMineCount >= 2){
      return false;
    }

    return true;
    
    //TODO: check for overdistant mines
  }

  updateNeighborTile(x, y){
    if(x >=0 && x < this.width && y >= 0 && y < this.height){
      if(this.mineField[y][x] >= 0){
        this.mineField[y][x] += 1;
      }
    }
  }

  random() {
      var x = Math.sin(++this.seed) * 10000;
      return x - Math.floor(x);
  }
}
