import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Board, MyNode, Bridge } from '../../services/boards/hashi/board.service';
import { HashiStandardComponent } from '../../hashi-standard/hashi-standard.component';
import { LoaderService } from '../../services/loading-service/loader.service';
import { TimerService } from '../../services/timer/timer.service';
import { TunnelService } from '../../services/tunnel/tunnel.service';
import { UserService } from '../../services/user/user.service';
import { GameID } from '../../enums/game-id.enum';

@Component({
  selector: 'app-hashi',
  templateUrl: './hashi.component.html',
  styleUrls: ['./hashi.component.css']
})
export class HashiComponent implements OnInit {

  diff: any;
  timePaused: any;
  startPause: any;
  version: string;
  displayCoords: boolean;
  scrollPressed: boolean;
  scrollX: number;
  scrollY: number;
  scrollMode: boolean;
  medley: any;
  medleyNum: any;
  level: any;
  skip: boolean;
  timesPaused: number;
  worseTime: boolean;
  pause: boolean;
  factor: number;
  squareSize: number;
  width: number;
  height: number;
  solved: boolean;
  xAdd: number;
  seed: number;
  yAdd: number;
  pressedX: number;
  pressedY: number;
  drawLetters: boolean;
  drawGridBool: boolean;
  drawTextColorBool: boolean;
  name: any;
  coloredNode: MyNode;
  board: Board;
  context: any;
  canvas: any;
  extreme: boolean;
  shift: boolean;
  mouseX: number;
  mouseY: number;
  drawMouseX: number;
  drawMouseY: number;

  previousTotalMillis: number;
  previousTime: string;
  difficulty: string;

  personalBest: string;

  hoveredNode: any;

  circleColor: string[];
  circleTextColor: string;
  circleTextColors: string[];
  circleSelectedColor: string[];
  circleSelectedTextColor: string;
  backgroundColor: string;
  gridColor: string;
  bridgeColor: string;
  wrongCircleColor: string;
  seconds: any;
  minutes: any;
  hours: any;
  millis: any;
  t: any;
  daily: boolean;
  numNodes: number;

  gauntlet: number;

  loading: boolean;
  playing: boolean;

  startDate: any;

  constructor(private route: ActivatedRoute, 
    private router: Router,
    private userService: UserService,
    private tunnel: TunnelService,
    private timer: TimerService,
    private loader: LoaderService) { 
      this.pause = false;
      this.mouseX = -1;
      this.mouseY = -1;
  }

  add(that) {
    var display = document.getElementById("timer");
    var now = +new Date();

    var diff = ((now - that.startDate));

    var hours   = Math.trunc(diff / (60 * 60 * 1000));
    var minutes = Math.trunc(diff / (60 * 1000)) % 60;
    var seconds = Math.trunc(diff / (1000)) % 60;
    var millis  = diff % 1000;

    try {
      display.textContent = 
        hours + ":" + 
        (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" +
        (seconds ? (seconds > 9 ? seconds : "0" + seconds) : "00") + "." +
        (millis  ? (millis > 99 ? millis : millis > 9 ? "0" + millis : "00" + millis) : "000")

      that.displayTimer();
    } catch {
      // Do nothing - page probably re-routed
    }
  }

  displayTimer() {
    if(!this.solved) {
      var _this = this;
      this.t = setTimeout(function() {_this.add(_this)}, 50);
    }
  }

  fullscreen() {
      document.documentElement.webkitRequestFullScreen()
  }

  back() {
    var that = this;
    return HashiStandardComponent.back(that);
  }

  newGame() {
    var that = this;
    return HashiStandardComponent.newBoard(that);
  }

  generateFairBoard(numNodes) {
    var that = this;
    return HashiStandardComponent.generateFairBoard(that, numNodes);
  }

  // Initializes data
  ngOnInit() {
    var that = this;
    return HashiStandardComponent.ngOnInitOverwrite(that);
  }

  play() {
    var that = this;
    return HashiStandardComponent.play(that);
  }

  mouseMove(mouseEventData) {
    var that = this;
    return HashiStandardComponent.mouseMove(that, mouseEventData);
  }

  pauseGame() {
    var that = this;
    return HashiStandardComponent.pauseGame(that);
  }

  colorblindMode() {
      this.circleColor = [
          "#144df7", //0
          "#117733", //1
          "#88ccee", //2
          "#44aa99", //3
          "#ddcc77", //4
          "#ff9933", //5
          "#ff4a38", //6
          "#ff5ef1", //7
          "#851f53" //8
      ];

      this.circleTextColor = "#303030";
      this.circleSelectedColor = [
          "#144df7", //0
          "#5da274", //1
          "#aedcf3", //2
          "#7fc5b9", //3
          "#e8dca2",//4
          "#ffcc99", //5
          "#ff9085", //6
          "#ff9df6",//7
          "#b47696",//8
      ];
      this.circleSelectedTextColor = "#ebdbb2";
      this.backgroundColor = "#2c2c2c";
      this.gridColor = "#fff6cc";
      this.bridgeColor = "#fff1b1";
      this.wrongCircleColor = "#f7f7f7";

      this.draw();
  }

  lightTheme() {
      this.circleColor = [
          "#4db93b", //0
          "#aad46d", //1
          "#80daaf", //2
          "#4bb5ac", //3
          "#ffba53", //4
          "#e092a3", //5
          "#d86155", //6
          "#dc1d2b", //7
          "#ec2474" //8
      ];

      this.circleTextColor = "#303030";
      this.circleSelectedColor = [
          "#4db93b", //0
          "#c2e193", //1
          "#a2e6c5", //2
          "#7accc4", //3
          "#ffca82",//4
          "#eaaab8", //5
          "#e6857b", //6
          "#e93d5b",//7
          "#f44894",//8
      ];
      this.circleSelectedTextColor = "#ebdbb2";
      this.backgroundColor = "#fffef9";
      this.gridColor = "#ff8460";
      this.bridgeColor = "#ff7e59";
      this.wrongCircleColor = "#68686b";

      this.draw();
  }  

  getProgress(totalBuilt) {
      return (((totalBuilt % 1239) / 1239) * 100);
  }

  nightTheme() {
      this.circleColor = [
          "#4db93b",
          "#aad46d",
          "#80daaf",
          "#4bb5ac",
          "#ffba53",
          "#d88799",
          "#f24b3e",
          "#dc1d2b",
          "#ec2474"
      ];

      this.circleTextColors = [
          "#b246c4",
          "#552B92",
          "#7F2550",
          "#b44a53",
          "#0045AC",
          "#277866",
          "#0db4c1",
          "#23e2d4",
          "#13db8b"
      ];

      this.circleTextColor = "#303030";
      this.circleSelectedColor = [
          "#4db93b",
          "#d1f898",
          "#a5fad1",
          "#84e8de",
          "#ffd79d",
          "#f8abbd",
          "#ff9289",
          "#f86872",
          "#ff77ad",
      ];
      this.circleSelectedTextColor = "#ebdbb2";
      this.backgroundColor = "#2c2c2c";
      this.gridColor = "#a89984";
      this.bridgeColor = "#fff2ad";
      this.wrongCircleColor = "#FFFFFF";

      this.draw();
  }

  zoomOut() {
    var that = this;
    return HashiStandardComponent.zoomOut(that);
  }

  zoomIn() {
    var that = this;
    return HashiStandardComponent.zoomIn(that);
  }

  bigBoard() {
    var that = this;
    return HashiStandardComponent.bigBoard(that);
  }

  veryBigBoard() {
    var that = this;
    return HashiStandardComponent.veryBigBoard(that);
  }

  fixSizes() {
    var that = this;
    return HashiStandardComponent.fixSizes(that);
  }

  draw() {
    var that = this;
    return HashiStandardComponent.draw(that);
  }

  drawGrid() {
    var that = this;
    return HashiStandardComponent.drawGrid(that);
  }

  drawCircles() {
    var that = this;
    return HashiStandardComponent.drawCircles(that);
  }

  drawCircle(node: MyNode) {
    var that = this;
    return HashiStandardComponent.drawCircle(that, node);
  }

  ellipse(context, cx, cy, rx, ry){
    var that = this;
    return HashiStandardComponent.ellipse(that, context, cx, cy, rx, ry);
  }

  ellipseFill(context, cx, cy, rx, ry){
    var that = this;
    return HashiStandardComponent.ellipseFill(that, context, cx, cy, rx, ry);
  }

  makeCircle(x, y, diameter) {
    var that = this;
    return HashiStandardComponent.makeCircle(that, x, y, diameter);
  }

  toggleLetters() {
    var that = this;
    return HashiStandardComponent.toggleLetters(that);
  }

  toggleTextColor() {
    var that = this;
    return HashiStandardComponent.toggleTextColor(that);
  }

  toggleGrid() {
    var that = this;
    return HashiStandardComponent.toggleGrid(that);
  }

  getNumBridges(node) {
    var that = this;
    return HashiStandardComponent.getNumBridges(that, node);
  }

  drawCircleOutline(node: MyNode) {
    var that = this;
    return HashiStandardComponent.drawCircleOutline(that, node);
  }

  drawCircleRed(node: MyNode) {
    var that = this;
    return HashiStandardComponent.drawCircleRed(that, node);
  }

  drawBackground() {
    var that = this;
    return HashiStandardComponent.drawBackground(that);
  }

  isCircleHere(x: number, y: number) {
    var that = this;
    return HashiStandardComponent.isCircleHere(that, x, y);
  }

  getCircleHere(x: number, y: number) {
    var that = this;
    return HashiStandardComponent.getCircleHere(that, x, y);
  }

  mousePressed(mouseEventData) {
    var that = this;
    return HashiStandardComponent.mousePressed(that, mouseEventData);
  }

  getBridgeArray() {
    var that = this;
    return HashiStandardComponent.getBridgeArray(that);
  }

  isCrossing(startX, startY, direction) {
    var that = this;
    return HashiStandardComponent.isCrossing(that, startX, startY, direction); 
  }

  isBridgeHere(x, y, direction) {
    var that = this;
    return HashiStandardComponent.isBridgeHere(that, x, y, direction);
  }

  drawBridges() {
    var that = this;
    return HashiStandardComponent.drawBridges(that);
  }

  bridgeUp() {
    var that = this;
    return HashiStandardComponent.bridgeUp(that);
  }

  specialBridgeUp() {
    var that = this;
    return HashiStandardComponent.specialBridgeUp(that);
  } 

  numBridgeUp(num) {
    var that = this;
    return HashiStandardComponent.numBridgeUp(that, num);
  } 

  numBridgeDown(num) {
    var that = this;
    return HashiStandardComponent.numBridgeDown(that, num);
  }

  specialBridgeDown() {
    var that = this;
    return HashiStandardComponent.specialBridgeDown(that);
  }

  bridgeDown() {
    var that = this;
    return HashiStandardComponent.bridgeDown(that);
  }

  specialBridgeLeft() {
    var that = this;
    return HashiStandardComponent.specialBridgeLeft(that);
  }

  addConstructedBridges(num) {
    var that = this;
    return HashiStandardComponent.addConstructedBridges(that, num);
  } 

  addDestroyedBridges(num) {
    var that = this;
    return HashiStandardComponent.addDestroyedBridges(that, num);
  } 

  numBridgeLeft(num) {
    var that = this;
    return HashiStandardComponent.numBridgeLeft(that, num);
  }

  bridgeLeft() {
    var that = this;
    return HashiStandardComponent.bridgeLeft(that);
  }

  numBridgeRight(num) {
    var that = this;
    return HashiStandardComponent.numBridgeRight(that, num);
  }

  specialBridgeRight() {
    var that = this;
    return HashiStandardComponent.specialBridgeRight(that);
  }

  bridgeRight() {
    var that = this;
    return HashiStandardComponent.bridgeRight(that);
  }

  mouseReleased(mouseEventData) {
    var that = this;
    return HashiStandardComponent.mouseReleased(that, mouseEventData);
  }

  submit() {
    var that = this;
    return HashiStandardComponent.submit(that);
  }

  getUid() {
    var that = this;
    return HashiStandardComponent.getUid(that);
  }

  keyPressed(event, __this) {
    var that = this;
    return HashiStandardComponent.keyPressed(that, event, __this);
  }

  keyReleased(event, __this) {
    var that = this;
    return HashiStandardComponent.keyReleased(that, event, __this);
  }

  done() {
    var that = this;
    return HashiStandardComponent.done(that);
  }

  toggleCoords() {
    var that = this;
    return HashiStandardComponent.toggleCoords(that);
  }

  isLoggedIn() {
    var that = this;
    return HashiStandardComponent.isLoggedIn(that);
  }

  clearBoard() {
    var that = this;
    return HashiStandardComponent.clearBoard(that);
  }
  contextMenu() {return false;}

}
