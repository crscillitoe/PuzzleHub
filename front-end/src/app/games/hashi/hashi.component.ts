import { Inject, PLATFORM_ID, HostListener, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Board, MyNode, Bridge } from '../../services/boards/hashi/board.service';
import { LoaderService } from '../../services/loading-service/loader.service';
import { TimerService } from '../../services/timer/timer.service';
import { TunnelService } from '../../services/tunnel/tunnel.service';
import { UserService } from '../../services/user/user.service';
import { GameID } from '../../enums/game-id.enum';
import { ColorService } from '../../services/colors/color.service';
import { SettingsService } from '../../services/persistence/settings.service';
import { GameStarterService } from '../../services/generators/game-starter.service';
import { GameBoard } from '../../classes/game-board';
import { OptionsService } from '../../services/games/options.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-hashi',
  templateUrl: '../game-board/game-board.component.html',
  styleUrls: ['../game-board/game-board.component.css']
})
export class HashiComponent extends GameBoard implements OnInit {

  board: Board;
  factor: number;
  squareSize: number;

  solved: boolean;

  mouseX: number;
  mouseY: number;

  pressedX: number;
  pressedY: number;

  xAdd: number;
  yAdd: number;

  drawMouseX: number;
  drawMouseY: number;

  shift: boolean = false;

  coloredNode: MyNode;
  hoveredNode: MyNode;

  circleColor: string[];
  circleTextColor: string;

  circleSelectedColor: string[];
  backgroundColor: string;
  gridColor: string;
  bridgeColor: string;
  wrongCircleColor: string;


  constructor(
    @Inject(PLATFORM_ID) private platform: Object,
    route: ActivatedRoute,
    colorService: ColorService,
    router: Router,
    tunnel: TunnelService,
    userService: UserService,
    timer: TimerService,
    loader: LoaderService,
    optionsService: OptionsService,
    private titleService: Title
  ) {
    super(
      platform,
      route,
      colorService,
      router,
      tunnel,
      userService,
      timer,
      loader,
      optionsService
    );

    if(Number(this.route.snapshot.paramMap.get('diff')) === 0) {
      titleService.setTitle('Easy Hashi - Puzzle Hub - Play Hashi Online');
    }

    this.gameID = GameID.HASHI;
  }

  done() {
    this.coloredNode = null;
    this.hoveredNode = null;
    super.done();
  }

  newGame(difficulty = this.difficulty) {
    this.coloredNode = null;
    this.hoveredNode = null;
    super.newGame(difficulty);
  }

  ngOnInit() {
    this.solved = false;

    this.setupColors();

    super.ngOnInit();
  }

  setupColors() {
    this.circleColor = [
      '#4db93b',
      '#aad46d',
      '#80daaf',
      '#4bb5ac',
      '#ffba53',
      '#d88799',
      '#f24b3e',
      '#dc1d2b',
      '#ec2474'
    ];

    this.circleTextColor = '#303030';
    this.circleSelectedColor = [
      '#4db93b',
      '#d1f898',
      '#a5fad1',
      '#84e8de',
      '#ffd79d',
      '#f8abbd',
      '#ff9289',
      '#f86872',
      '#ff77ad',
    ];

    this.backgroundColor = '#2c2c2c';
    this.gridColor = '#a89984';
    this.bridgeColor = '#fff2ad';
    this.wrongCircleColor = '#FFFFFF';
  }

  setupBoard() {
    super.setupBoard();

    let width;
    let height;
    let numNodes;
    let extreme;

    switch (this.difficulty) {
      // Easy or default
      case 1:
      default: {
        width = 10;
        height = 10;
        numNodes = 15000;
        extreme = false;
        break;
      }
      // Medium
      case 2: {
        width = 15;
        height = 15;
        numNodes = 15000;
        extreme = false;
        break;
      }
      // Hard
      case 3: {
        width = 25;
        height = 25;
        numNodes = 500000;
        extreme = false;
        break;
      }
      // Extreme
      case 4: {
        width = 29;
        height = 29;
        numNodes = 500000;
        extreme = true;
        break;
      }
      // Custom board size
      case 5: {
        width = Number(this.route.snapshot.paramMap.get('width'));
        height = Number(this.route.snapshot.paramMap.get('height'));
        numNodes = 500000;
        extreme = false;
        break;
      }
    }

    this.board = new Board(width, height, numNodes, extreme, 0);
  }

  draw() {
    super.draw();

    this.drawGrid();
    this.drawBridges();
    this.drawCircles();

    this.drawCircleRed(this.coloredNode);
    this.drawCircleRed(this.hoveredNode);
  }

  drawGrid() {
    let circleX: number;
    let circleX2: number;
    let circleY: number;
    let circleY2: number;
    let x: number;
    let y: number;

    for (x = 1 ; x <= this.board.width ; x++) {
      circleX = this.xAdd + (x * (this.factor));
      circleY = this.yAdd + (1 * (this.factor));
      circleY2 = this.yAdd + (this.board.height * (this.factor));

      this.context.lineWidth = 1;
      this.context.strokeStyle = this.gridColor;
      this.context.moveTo(circleX, circleY);
      this.context.lineTo(circleX, circleY2);
      this.context.stroke();

    }

    for (y = 1 ; y <= this.board.height ; y++) {
      circleX = this.xAdd + (1 * (this.factor));
      circleY = this.yAdd + (y * (this.factor));
      circleX2 = this.xAdd + (this.board.width * (this.factor));

      this.context.lineWidth = 1;
      this.context.strokeStyle = this.gridColor;
      this.context.moveTo(circleX, circleY);
      this.context.lineTo(circleX2, circleY);
      this.context.stroke();
    }
  }

  drawBridges() {
    for(let node of this.board.getNodes()) {
      for(let bridge of node.getBridges()) {
        if (bridge.getNum() > 0) {
          if (bridge.getNum() === 1) {
            var n1x = this.xAdd + (bridge.getN1().getX() * (this.factor));
            var n1y = this.yAdd + (bridge.getN1().getY() * (this.factor));
            var n2x = this.xAdd + (bridge.getN2().getX() * (this.factor));
            var n2y = this.yAdd + (bridge.getN2().getY() * (this.factor));

            this.context.strokeStyle = this.bridgeColor;
            this.context.lineWidth = this.factor/10;
            this.context.strokeRect(n1x, n1y, n2x-n1x, n2y-n1y);
          } else {
            var n1x = this.xAdd + (bridge.getN1().getX() * (this.factor));
            var n1y = this.yAdd + (bridge.getN1().getY() * (this.factor));
            var n2x = this.xAdd + (bridge.getN2().getX() * (this.factor));
            var n2y = this.yAdd + (bridge.getN2().getY() * (this.factor));
            if (n1x === n2x) {
              var b1x = n1x - this.factor/5;
              var b2x = n2x - this.factor/5;
              var b3x = n1x + this.factor/5;
              var b4x = n2x + this.factor/5;
              this.context.strokeStyle = this.bridgeColor;
              this.context.lineWidth = this.factor/10;
              this.context.strokeRect(b1x, n1y, b2x-b1x, (n2y-n1y));
              this.context.strokeRect(b3x, n1y, b4x-b3x, (n2y-n1y));
            } else {
              var b1y = n1y - this.factor/5;
              var b2y = n2y - this.factor/5;
              var b3y = n1y + this.factor/5;
              var b4y = n2y + this.factor/5;
              this.context.strokeStyle = this.bridgeColor;
              this.context.lineWidth = this.factor/10;
              this.context.strokeRect(n1x, b1y, (n2x-n1x), (b2y-b1y));
              this.context.strokeRect(n1x, b3y, (n2x-n1x), (b4y-b3y));
            }
          }
        }
      }
    }
  }

  drawCircles() {
    for(let node of this.board.getNodes()) {
      let colorStr;
      if(node.getVal() - this.getNumBridges(node) >= 0) {
        colorStr = this.circleColor[node.getVal() - this.getNumBridges(node)];
      } else {
        colorStr = this.wrongCircleColor;
      }

      this.drawCircle(node, colorStr);
    }
  }

  getCircleHere(x: number, y: number) {
    for(let node of this.board.getNodes()) {
      if (node.getX() == x && node.getY() == y) {
        return node;
      }
    }
    return null;
  }

  isCircleHere(x: number, y: number) {
    for(let node of this.board.getNodes()) {
      if (node.getX() == x && node.getY() == y) {
        return true;
      }
    }
    return false;
  }

  drawCircleRed(node: MyNode) {
    if(node != undefined) {
      if (node.getVal() - this.getNumBridges(node) >= 0) {
        this.drawCircle(node, this.circleSelectedColor[node.getVal() - this.getNumBridges(node)]);
      } else {
        this.drawCircle(node, this.circleSelectedColor[0]);
      }
    }
  }

  getNumBridges(node) {
    var toReturn = 0;
    for(let b of node.getBridges()) {
      toReturn += b.getNum();
    }
    return toReturn;
  }

  drawCircle(node, colorStr) {
    try {
      var circleX = (node.getX() * (this.factor)) - this.factor/2;
      var circleY = (node.getY() * (this.factor)) - this.factor/2;

      var circleString = "" + node.getVal();

      this.context.fillStyle = colorStr;
      this.context.strokeStlye = "#FFFFFF";
      this.ellipse(this.context, this.xAdd + circleX, this.yAdd + circleY, this.squareSize, this.squareSize);

      this.context.textAlign = 'center';
      this.context.fillStyle = this.circleTextColor;
      this.context.fillText(circleString, this.xAdd + circleX + this.factor/2, this.yAdd + circleY + this.factor/1.2);
    } catch {
      return;
    }
  }

  ellipse(context, cx, cy, rx, ry) {
    context.save(); // save state
    context.beginPath();
    context.translate(cx, cy);
    context.scale(rx/2, ry/2);
    context.arc(1, 1, 1, 0, 2 * Math.PI, false);
    context.fill();

    context.restore(); // restore to original state
  }

  fixSizes() {
    this.context.beginPath();
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.canvas.width = window.innerWidth - 225;
    this.canvas.height = window.innerHeight - 112;
    this.context.translate(0.5, 0.5)



    var larger = Math.max(this.board.width, this.board.height) + 1;
    var size = Math.min(this.canvas.offsetWidth, this.canvas.offsetHeight);

    this.factor = Math.floor(size/larger);
    this.squareSize = this.factor;
    this.context.font = 'bold '+Math.round(this.factor)+'px Poppins';

    let w = this.canvas.offsetWidth;
    let h = this.canvas.offsetHeight;

    if (w > h) {
      this.xAdd = Math.round( ( w - h) / 2 );
      this.yAdd = 0;
    } else {
      this.xAdd = 0;
      this.yAdd = Math.round( (h - w) / 2 );
    }

    this.draw();    
  }

  /* EVENT LISTENERS */
  @HostListener('document:mousedown', ['$event'])
  mousePressed(mouseEvent) {
    if (!this.solved) {
      var x = mouseEvent.clientX + window.scrollX;
      var y = mouseEvent.clientY + window.scrollY;
      this.pressedX = x;
      this.pressedY = y;


      var pointX = Math.round(((x - 225 - this.xAdd))/this.factor);
      var pointY = Math.round(((y - 56 - this.yAdd))/this.factor);

      if (this.isCircleHere(pointX, pointY)) {
        this.coloredNode = this.getCircleHere(pointX, pointY);
        this.draw();
      } else {
        this.coloredNode = undefined;
      }
    }
  }

  numBridgeDown(num) {
    var counter;
    try {
      if (this.isCircleHere(this.coloredNode.getX() , this.coloredNode.getY() + 1)) {
        return;
      }
    } catch {
      return;
    }
    if (this.isCrossing(this.coloredNode.getX() , this.coloredNode.getY() + 1, 'd')) {
      return;
    }
    for(counter = this.coloredNode.getY() + 1; counter < this.board.height + 1; counter++) {
      if (this.isCircleHere(this.coloredNode.getX(), counter)) {
        var toBridgeTo = this.getCircleHere(this.coloredNode.getX(), counter);
        var bridgeExists = false;
        for(let bridge of toBridgeTo.getBridges()) {
          if ((bridge.getN1().getX() === this.coloredNode.getX() &&
            bridge.getN1().getY() === this.coloredNode.getY())||
            (bridge.getN2().getX() === this.coloredNode.getX() &&
              bridge.getN2().getY() === this.coloredNode.getY())) {
            bridge.setNum(num);
            bridgeExists = true;
          }
        }

        if (!bridgeExists) {
          var bridge = new Bridge(this.coloredNode, toBridgeTo, num);
          this.coloredNode.addBridge(bridge);
          toBridgeTo.addBridge(bridge);
        }

        return;
      }
    }
  }

  specialBridgeDown() {
    var counter;
    if (this.isCircleHere(this.coloredNode.getX() , this.coloredNode.getY() + 1)) {
      return;
    }
    if (this.isCrossing(this.coloredNode.getX() , this.coloredNode.getY() + 1, 'd')) {
      return;
    }
    for(counter = this.coloredNode.getY() + 1; counter < this.board.height + 1; counter++) {
      if (this.isCircleHere(this.coloredNode.getX(), counter)) {
        var toBridgeTo = this.getCircleHere(this.coloredNode.getX(), counter);
        var bridgeExists = false;
        for(let bridge of toBridgeTo.getBridges()) {
          if ((bridge.getN1().getX() === this.coloredNode.getX() &&
            bridge.getN1().getY() === this.coloredNode.getY())||
            (bridge.getN2().getX() === this.coloredNode.getX() &&
              bridge.getN2().getY() === this.coloredNode.getY())) {
            if (bridge.getNum() === 2) {
              bridge.setNum(0);
            } else {
              bridge.setNum(2);
            }
            bridgeExists = true;
          }
        }

        if (!bridgeExists) {
          var bridge = new Bridge(this.coloredNode, toBridgeTo, 2);
          this.coloredNode.addBridge(bridge);
          toBridgeTo.addBridge(bridge);
        }

        return;
      }
    }
  }

  bridgeDown() {
    var counter;
    if (this.isCircleHere(this.coloredNode.getX() , this.coloredNode.getY() + 1)) {
      return;
    }
    if (this.isCrossing(this.coloredNode.getX() , this.coloredNode.getY() + 1, 'd')) {
      return;
    }
    for(counter = this.coloredNode.getY() + 1; counter < this.board.height + 1; counter++) {
      if (this.isCircleHere(this.coloredNode.getX(), counter)) {
        var toBridgeTo = this.getCircleHere(this.coloredNode.getX(), counter);
        var bridgeExists = false;
        for(let bridge of toBridgeTo.getBridges()) {
          if ((bridge.getN1().getX() === this.coloredNode.getX() &&
            bridge.getN1().getY() === this.coloredNode.getY())||
            (bridge.getN2().getX() === this.coloredNode.getX() &&
              bridge.getN2().getY() === this.coloredNode.getY())) {
            if (bridge.getNum() === 2) {
              bridge.setNum(0);
            } else {
              bridge.setNum(bridge.getNum() + 1);
            }
            bridgeExists = true;
          }
        }

        if (!bridgeExists) {
          var bridge = new Bridge(this.coloredNode, toBridgeTo, 1);
          this.coloredNode.addBridge(bridge);
          toBridgeTo.addBridge(bridge);
        }

        return;
      }
    }
  }

  bridgeUp() {
    var counter;
    if (this.isCircleHere(this.coloredNode.getX() , this.coloredNode.getY() - 1)) {
      return;
    }

    if (this.isCrossing(this.coloredNode.getX() , this.coloredNode.getY() - 1, 'u')) {
      return;
    }

    for(counter = this.coloredNode.getY() - 1; counter > 0; counter--) {
      if (this.isCircleHere(this.coloredNode.getX(), counter)) {
        var toBridgeTo = this.getCircleHere(this.coloredNode.getX(), counter);
        var bridgeExists = false;
        for(let bridge of toBridgeTo.getBridges()) {
          if ((bridge.getN1().getX() === this.coloredNode.getX() &&
            bridge.getN1().getY() === this.coloredNode.getY())||
            (bridge.getN2().getX() === this.coloredNode.getX() &&
              bridge.getN2().getY() === this.coloredNode.getY())) {
            if (bridge.getNum() === 2) {
              bridge.setNum(0);
            } else {
              bridge.setNum(bridge.getNum() + 1);
            }
            bridgeExists = true;
          }
        }

        if (!bridgeExists) {
          var bridge = new Bridge(this.coloredNode, toBridgeTo, 1);
          this.coloredNode.addBridge(bridge);
          toBridgeTo.addBridge(bridge);
        }

        return;
      }
    }
  }

  specialBridgeUp() {
    var counter;
    if (this.isCircleHere(this.coloredNode.getX() , this.coloredNode.getY() - 1)) {
      return;
    }
    if (this.isCrossing(this.coloredNode.getX() , this.coloredNode.getY() - 1, 'u')) {
      return;
    }
    for(counter = this.coloredNode.getY() - 1; counter > 0; counter--) {
      if (this.isCircleHere(this.coloredNode.getX(), counter)) {
        var toBridgeTo = this.getCircleHere(this.coloredNode.getX(), counter);
        var bridgeExists = false;
        for(let bridge of toBridgeTo.getBridges()) {
          if ((bridge.getN1().getX() === this.coloredNode.getX() &&
            bridge.getN1().getY() === this.coloredNode.getY())||
            (bridge.getN2().getX() === this.coloredNode.getX() &&
              bridge.getN2().getY() === this.coloredNode.getY())) {
            if (bridge.getNum() === 2) {
              bridge.setNum(0);
            } else {
              bridge.setNum(2);
            }
            bridgeExists = true;
          }
        }

        if (!bridgeExists) {
          var bridge = new Bridge(this.coloredNode, toBridgeTo, 2);
          this.coloredNode.addBridge(bridge);
          toBridgeTo.addBridge(bridge);
        }

        return;
      }
    }
  } 

  numBridgeUp(num) {
    var counter;
    try {
      if (this.isCircleHere(this.coloredNode.getX() , this.coloredNode.getY() - 1)) {
        return;
      }
    } catch {
      return;
    }
    if (this.isCrossing(this.coloredNode.getX() , this.coloredNode.getY() - 1, 'u')) {
      return;
    }
    for(counter = this.coloredNode.getY() - 1; counter > 0; counter--) {
      if (this.isCircleHere(this.coloredNode.getX(), counter)) {
        var toBridgeTo = this.getCircleHere(this.coloredNode.getX(), counter);
        var bridgeExists = false;
        for(let bridge of toBridgeTo.getBridges()) {
          if ((bridge.getN1().getX() === this.coloredNode.getX() &&
            bridge.getN1().getY() === this.coloredNode.getY())||
            (bridge.getN2().getX() === this.coloredNode.getX() &&
              bridge.getN2().getY() === this.coloredNode.getY())) {
            bridge.setNum(num);
            bridgeExists = true;
          }
        }

        if (!bridgeExists) {
          var bridge = new Bridge(this.coloredNode, toBridgeTo, num);
          this.coloredNode.addBridge(bridge);
          toBridgeTo.addBridge(bridge);
        }

        return;
      }
    }
  } 

  bridgeRight() {
    var counter;
    if (this.isCircleHere(this.coloredNode.getX() + 1, this.coloredNode.getY())) {
      return;
    }
    if (this.isCrossing(this.coloredNode.getX() + 1, this.coloredNode.getY(), 'r')) {
      return;
    }
    for(counter = this.coloredNode.getX() + 1; counter < this.board.width + 1; counter++) {
      if (this.isCircleHere(counter, this.coloredNode.getY())) {
        var toBridgeTo = this.getCircleHere(counter, this.coloredNode.getY());
        var bridgeExists = false;
        for(let bridge of toBridgeTo.getBridges()) {
          if ((bridge.getN1().getX() === this.coloredNode.getX() &&
            bridge.getN1().getY() === this.coloredNode.getY())||
            (bridge.getN2().getX() === this.coloredNode.getX() &&
              bridge.getN2().getY() === this.coloredNode.getY())) {
            if (bridge.getNum() === 2) {
              bridge.setNum(0);
            } else {
              bridge.setNum(bridge.getNum() + 1);
            }
            bridgeExists = true;
          }
        }

        if (!bridgeExists) {
          var bridge = new Bridge(this.coloredNode, toBridgeTo, 1);
          this.coloredNode.addBridge(bridge);
          toBridgeTo.addBridge(bridge);
        }

        return;
      }
    }
  }

  numBridgeRight(num) {
    var counter;
    try {
      if (this.isCircleHere(this.coloredNode.getX() + 1, this.coloredNode.getY())) {
        return;
      }
    } catch {
      return;
    }
    if (this.isCrossing(this.coloredNode.getX() + 1, this.coloredNode.getY(), 'r')) {
      return;
    }
    for (counter = this.coloredNode.getX() + 1; counter < this.board.width + 1; counter++) {
      if (this.isCircleHere(counter, this.coloredNode.getY())) {
        let toBridgeTo = this.getCircleHere(counter, this.coloredNode.getY());
        let bridgeExists = false;
        for (let bridge of toBridgeTo.getBridges()) {
          if ((bridge.getN1().getX() === this.coloredNode.getX() &&
            bridge.getN1().getY() === this.coloredNode.getY()) ||
            (bridge.getN2().getX() === this.coloredNode.getX() &&
              bridge.getN2().getY() === this.coloredNode.getY())) {
            bridge.setNum(num);
            bridgeExists = true;
          }
        }

        if (!bridgeExists) {
          let bridge = new Bridge(this.coloredNode, toBridgeTo, num);
          this.coloredNode.addBridge(bridge);
          toBridgeTo.addBridge(bridge);
        }

        return;
      }
    }
  }

  specialBridgeRight() {
    var counter;
    if (this.isCircleHere(this.coloredNode.getX() + 1, this.coloredNode.getY())) {
      return;
    }
    if (this.isCrossing(this.coloredNode.getX() + 1, this.coloredNode.getY(), 'r')) {
      return;
    }
    for(counter = this.coloredNode.getX() + 1; counter < this.board.width + 1; counter++) {
      if (this.isCircleHere(counter, this.coloredNode.getY())) {
        var toBridgeTo = this.getCircleHere(counter, this.coloredNode.getY());
        var bridgeExists = false;
        for(let bridge of toBridgeTo.getBridges()) {
          if ((bridge.getN1().getX() === this.coloredNode.getX() &&
            bridge.getN1().getY() === this.coloredNode.getY())||
            (bridge.getN2().getX() === this.coloredNode.getX() &&
              bridge.getN2().getY() === this.coloredNode.getY())) {
            if (bridge.getNum() === 2) {
              bridge.setNum(0);
            } else {
              bridge.setNum(2);
            }
            bridgeExists = true;
          }
        }

        if (!bridgeExists) {
          var bridge = new Bridge(this.coloredNode, toBridgeTo, 2);
          this.coloredNode.addBridge(bridge);
          toBridgeTo.addBridge(bridge);
        }

        return;
      }
    }
  }

  bridgeLeft() {
    var counter;
    if (this.isCircleHere(this.coloredNode.getX() - 1, this.coloredNode.getY())) {
      return;
    }
    if (this.isCrossing(this.coloredNode.getX() - 1, this.coloredNode.getY(), 'l')) {
      return;
    }
    for(counter = this.coloredNode.getX() - 1; counter > 0; counter--) {
      if (this.isCircleHere(counter, this.coloredNode.getY())) {
        var toBridgeTo = this.getCircleHere(counter, this.coloredNode.getY());
        var bridgeExists = false;
        for(let bridge of toBridgeTo.getBridges()) {
          if ((bridge.getN1().getX() === this.coloredNode.getX() &&
            bridge.getN1().getY() === this.coloredNode.getY())||
            (bridge.getN2().getX() === this.coloredNode.getX() &&
              bridge.getN2().getY() === this.coloredNode.getY())) {
            if (bridge.getNum() === 2) {
              bridge.setNum(0);
            } else {
              bridge.setNum(bridge.getNum() + 1);
            }
            bridgeExists = true;
          }
        }

        if (!bridgeExists) {
          var bridge = new Bridge(this.coloredNode, toBridgeTo, 1);
          this.coloredNode.addBridge(bridge);
          toBridgeTo.addBridge(bridge);
        }

        return;
      }
    }
  }

  numBridgeLeft(num) {
    var counter;
    try {
      if (this.isCircleHere(this.coloredNode.getX() - 1, this.coloredNode.getY())) {
        return;
      }
    } catch {
      return;
    }
    if (this.isCrossing(this.coloredNode.getX() - 1, this.coloredNode.getY(), 'l')) {
      return;
    }
    for(counter = this.coloredNode.getX() - 1; counter > 0; counter--) {
      if (this.isCircleHere(counter, this.coloredNode.getY())) {
        var toBridgeTo = this.getCircleHere(counter, this.coloredNode.getY());
        var bridgeExists = false;
        for(let bridge of toBridgeTo.getBridges()) {
          if ((bridge.getN1().getX() === this.coloredNode.getX() &&
            bridge.getN1().getY() === this.coloredNode.getY())||
            (bridge.getN2().getX() === this.coloredNode.getX() &&
              bridge.getN2().getY() === this.coloredNode.getY())) {
            bridge.setNum(num);
            bridgeExists = true;
          }
        }

        if (!bridgeExists) {
          var bridge = new Bridge(this.coloredNode, toBridgeTo, num);
          this.coloredNode.addBridge(bridge);
          toBridgeTo.addBridge(bridge);
        }

        return;
      }
    }
  }

  specialBridgeLeft() {
    var counter;
    if (this.isCircleHere(this.coloredNode.getX() - 1, this.coloredNode.getY())) {
      return;
    }
    if (this.isCrossing(this.coloredNode.getX() - 1, this.coloredNode.getY(), 'l')) {
      return;
    }
    for(counter = this.coloredNode.getX() - 1; counter > 0; counter--) {
      if (this.isCircleHere(counter, this.coloredNode.getY())) {
        var toBridgeTo = this.getCircleHere(counter, this.coloredNode.getY());
        var bridgeExists = false;
        for(let bridge of toBridgeTo.getBridges()) {
          if ((bridge.getN1().getX() === this.coloredNode.getX() &&
            bridge.getN1().getY() === this.coloredNode.getY())||
            (bridge.getN2().getX() === this.coloredNode.getX() &&
              bridge.getN2().getY() === this.coloredNode.getY())) {
            if (bridge.getNum() === 2) {
              bridge.setNum(0);
            } else {
              bridge.setNum(2);
            }
            bridgeExists = true;
          }
        }

        if (!bridgeExists) {
          var bridge = new Bridge(this.coloredNode, toBridgeTo, 2);
          this.coloredNode.addBridge(bridge);
          toBridgeTo.addBridge(bridge);
        }

        return;
      }
    }
  }

  isCrossing(startX, startY, direction) {
    if (direction == 'u') {
      while(true) {
        if (this.isBridgeHere(startX, startY, 'h')) return true;
        if (this.isCircleHere(startX, startY)) return false;
        if (startY <= 0) return true;

        startY--;
      }
    } else if (direction == 'd') {
      while(true) {
        if (this.isBridgeHere(startX, startY, 'h')) return true;
        if (this.isCircleHere(startX, startY)) return false;
        if (startY >= this.board.height) return true;

        startY++;
      }
    } else if (direction == 'r') {
      while(true) {
        if (this.isBridgeHere(startX, startY, 'v')) return true;
        if (this.isCircleHere(startX, startY)) return false;
        if (startX >= this.board.width) return true;

        startX++;
      }
    } else if (direction == 'l') {
      while(true) {
        if (this.isBridgeHere(startX, startY, 'v')) return true;
        if (this.isCircleHere(startX, startY)) return false;
        if (startX <= 0) return true;

        startX--;
      }
    }
  }

  isBridgeHere(x, y, direction) {
    var bridges = this.getBridgeArray();
    if (direction == 'v') {
      bridges = bridges.filter(b => b.n1.x == b.n2.x && b.n1.x == x && ((b.n1.y > y && b.n2.y < y) || (b.n1.y < y && b.n2.y > y)));
    } else if (direction == 'h') {
      bridges = bridges.filter(b => b.n1.y == b.n2.y && b.n1.y == y && ((b.n1.x > x && b.n2.x < x) || (b.n1.x < x && b.n2.x > x)));
    }

    return bridges.length > 0;
  }

  getBridgeArray() {
    var toReturn = [];
    for(let node of this.board.getNodes()) {
      for(let bridge of node.getBridges()) {
        if (bridge.getNum() > 0) toReturn.push(bridge);
      }
    }
    return toReturn;
  }

  @HostListener('document:mouseup', ['$event'])
  mouseReleased(mouseEvent) {
    var x = mouseEvent.clientX;
    var y = mouseEvent.clientY;
    var button = mouseEvent.button;
    if (!this.shift) {
      if (this.coloredNode !== undefined) {
        if (Math.abs(this.pressedX - x) > Math.abs(this.pressedY - y)) {
          if (this.pressedX > x) {
            this.bridgeLeft();
            if (button == 2) {
              this.bridgeLeft();
            }
            this.draw();
          } else {
            this.bridgeRight();
            if (button == 2) {
              this.bridgeRight();
            }
            this.draw();
          }
        } else {
          if (this.pressedY > y) {
            this.bridgeUp();
            if (button == 2) {
              this.bridgeUp();
            }
            this.draw();
          } else {
            this.bridgeDown();
            if (button == 2) {
              this.bridgeDown();
            }
            this.draw();
          }
        }
        this.coloredNode = undefined;
        this.draw();
      }
    } else {
      if (button == 2) {
        this.numBridgeUp(2);
        this.numBridgeDown(2);
        this.numBridgeRight(2);
        this.numBridgeLeft(2);
      } else {
        this.numBridgeUp(1);
        this.numBridgeDown(1);
        this.numBridgeRight(1);
        this.numBridgeLeft(1);
      }
      this.coloredNode = undefined;
      this.draw();
    }
   
    this.checkIsSolved(this.board);
  }

  @HostListener('document:mousemove', ['$event'])
  mouseMove(mouseEvent) {
    this.mouseX = Math.round((mouseEvent.clientX - 225 - this.xAdd) / this.factor);
    this.mouseY = Math.round((mouseEvent.clientY - 56 - this.yAdd) / this.factor);

    if (this.isCircleHere(this.mouseX, this.mouseY)) {
      this.hoveredNode = this.getCircleHere(this.mouseX, this.mouseY);
      this.drawCircleRed(this.coloredNode);
    } else {
      this.hoveredNode = null;
    }

    this.draw();
  }

  @HostListener('document:keydown', ['$event'])
  keyPressed(keyEvent) {
    if (keyEvent.keyCode == 32) {
      this.newGame();
      return;
    }

    if (!this.solved) {
      if (keyEvent.code == "ShiftLeft") {
        this.shift = true;
      }

      if (keyEvent.key == "w") {
        let pointX = this.mouseX;
        let pointY = this.mouseY;

        if (this.isCircleHere(pointX, pointY)) {
          this.coloredNode = this.getCircleHere(pointX, pointY);
          this.bridgeUp();
          this.draw();
          this.coloredNode = undefined;
        }
      } else if (keyEvent.key == "W") {
        let pointX = this.mouseX;
        let pointY = this.mouseY;

        if (this.isCircleHere(pointX, pointY)) {
          this.coloredNode = this.getCircleHere(pointX, pointY);
          this.specialBridgeUp();
          this.draw();
          this.coloredNode = undefined;
        }
      } else if (keyEvent.key == "s") {
        let pointX = this.mouseX;
        let pointY = this.mouseY;

        if (this.isCircleHere(pointX, pointY)) {
          this.coloredNode = this.getCircleHere(pointX, pointY);
          this.bridgeDown();
          this.draw();
          this.coloredNode = undefined;
        }
      } else if (keyEvent.key == "S") {
        let pointX = this.mouseX;
        let pointY = this.mouseY;

        if (this.isCircleHere(pointX, pointY)) {
          this.coloredNode = this.getCircleHere(pointX, pointY);
          this.specialBridgeDown();
          this.draw();
          this.coloredNode = undefined;
        }
      } else if (keyEvent.key == "a") {
        let pointX = this.mouseX;
        let pointY = this.mouseY;

        if (this.isCircleHere(pointX, pointY)) {
          this.coloredNode = this.getCircleHere(pointX, pointY);
          this.bridgeLeft();
          this.draw();
          this.coloredNode = undefined;
        }
      } else if (keyEvent.key == "A") {
        let pointX = this.mouseX;
        let pointY = this.mouseY;

        if (this.isCircleHere(pointX, pointY)) {
          this.coloredNode = this.getCircleHere(pointX, pointY);
          this.specialBridgeLeft();
          this.draw();
          this.coloredNode = undefined;
        }
      } else if (keyEvent.key == "d") {
        let pointX = this.mouseX;
        let pointY = this.mouseY;

        if (this.isCircleHere(pointX, pointY)) {
          this.coloredNode = this.getCircleHere(pointX, pointY);
          this.bridgeRight();
          this.draw();
          this.coloredNode = undefined;
        }
      } else if (keyEvent.key == "D") {
        let pointX = this.mouseX;
        let pointY = this.mouseY;

        if (this.isCircleHere(pointX, pointY)) {
          this.coloredNode = this.getCircleHere(pointX, pointY);
          this.specialBridgeRight();
          this.draw();
          this.coloredNode = undefined;
        }
      }
    }

    this.checkIsSolved(this.board);
  }

  @HostListener('document:keyup', ['$event'])
  keyReleased(keyEvent) {
    if (keyEvent.code == "ShiftLeft") {
      this.shift = false;
    }
  }
}
