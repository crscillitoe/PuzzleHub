export class Board {
  seed: number;

  width: number;
  height: number;
  bombCount: number;

  mineField: number[][];
  lastMineX: number = 0;
  lastMineY: number = 0;

  //0 for not seen
  //1 for seen
  //2 for flagged
  visible: number[][];

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

    var vRows = [];
    for(var j  = 0; j < this.height; j++) {
      var vColumn = [];
      for(var i = 0; i < this.width; i++) {
        vColumn.push(0);
      }

      vRows.push(vColumn);
    }
    this.visible = vRows;

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

    this.lastMineX = mineXPos;
    this.lastMineY = mineYPos;

    console.log(this.mineField);
    console.log(this.visible);
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

    if(nbrMineCount > 4){
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

  //turns a mine into an empty tile
  replaceMine(x, y){
    this.mineField[y][x] = 0;
    for(var i = x-1; i <= x+1; i++){
      for(var j = y-1; j <= y+1; j++){
        if(i >= 0 && i < this.width && j >= 0 && j < this.height){
          if(this.mineField[j][i] >= 0){
            this.mineField[j][i] -= 1;
          }
          else{
            this.mineField[y][x] += 1;
          }
        }
      }
    }
  }

  floodFill(x, y){
    if(x < 0 || y < 0 || x >= this.width || y >= this.height){
      return;
    }
    if(this.mineField[y][x] < 0 || this.visible[y][x] == 1){
      return;
    }

    this.visible[y][x] = 1;
    if(this.mineField[y][x] != 0){
      return;
    }

    for(var i = x-1; i <= x+1; i++){
      for(var j = y-1; j <= y+1; j++){
        this.floodFill(i, j);
      }
    }
    
  }
 
  firstClick(x, y){
    if(this.visible[y][x] == 2){
      //we dont let you click on something you flagged.
      return;
    }

    if(this.mineField[y][x] < 0){
      this.replaceMine(x, y); 
    }
    else{
      this.replaceMine(this.lastMineX, this.lastMineY);
    }
    this.floodFill(x, y);
  }

  click(x, y){
    if(this.visible[y][x] == 2){
      return;
    }

    if(this.mineField[y][x] < 0){
      console.log("Touching a mine!");
    }
    else{
      this.floodFill(x, y);
    }

  }


  random() {
      var x = Math.sin(++this.seed) * 10000;
      return x - Math.floor(x);
  }
}
