import { Component, OnInit } from '@angular/core';
import { Board, MyNode, Bridge } from '../services/boards/hashi/board.service';

@Component({
  selector: 'app-hashi-standard',
  templateUrl: './hashi-standard.component.html',
  styleUrls: ['./hashi-standard.component.css']
})
export class HashiStandardComponent implements OnInit {


  constructor() { }

  ngOnInit() {
  }

  public static bridgeLeft(that) {
      var counter;
      if(that.isCircleHere(that.coloredNode.getX() - 1, that.coloredNode.getY())) {
          return;
      }
      if(that.isCrossing(that.coloredNode.getX() - 1, that.coloredNode.getY(), 'l')) {
          return;
      }
      for(counter = that.coloredNode.getX() - 1; counter > 0; counter--) {
          if(that.isCircleHere(counter, that.coloredNode.getY())) {
              var toBridgeTo = that.getCircleHere(counter, that.coloredNode.getY());
              var bridgeExists = false;
              for(let bridge of toBridgeTo.getBridges()) {
                  if((bridge.getN1().getX() === that.coloredNode.getX() &&
                      bridge.getN1().getY() === that.coloredNode.getY())||
                     (bridge.getN2().getX() === that.coloredNode.getX() &&
                      bridge.getN2().getY() === that.coloredNode.getY())) {
                      if(bridge.getNum() === 2) {
                          that.addDestroyedBridges(2);
                          bridge.setNum(0);
                      } else {
                          that.addConstructedBridges(2 - bridge.getNum());
                          bridge.setNum(bridge.getNum() + 1);
                      }
                      bridgeExists = true;
                  }
              }

              if(!bridgeExists) {
                  that.addConstructedBridges(1);
                  var bridge = new Bridge(that.coloredNode, toBridgeTo, 1);
                  that.coloredNode.addBridge(bridge);
                  toBridgeTo.addBridge(bridge);
              }

              return;
          }
      }
  }

  public static bridgeRight(that) {
      var counter;
      if(that.isCircleHere(that.coloredNode.getX() + 1, that.coloredNode.getY())) {
          return;
      }
      if(that.isCrossing(that.coloredNode.getX() + 1, that.coloredNode.getY(), 'r')) {
          return;
      }
      for(counter = that.coloredNode.getX() + 1; counter < that.width + 1; counter++) {
          if(that.isCircleHere(counter, that.coloredNode.getY())) {
              var toBridgeTo = that.getCircleHere(counter, that.coloredNode.getY());
              var bridgeExists = false;
              for(let bridge of toBridgeTo.getBridges()) {
                  if((bridge.getN1().getX() === that.coloredNode.getX() &&
                      bridge.getN1().getY() === that.coloredNode.getY())||
                     (bridge.getN2().getX() === that.coloredNode.getX() &&
                      bridge.getN2().getY() === that.coloredNode.getY())) {
                      if(bridge.getNum() === 2) {
                          that.addDestroyedBridges(2);
                          bridge.setNum(0);
                      } else {
                          that.addConstructedBridges(2 - bridge.getNum());
                          bridge.setNum(bridge.getNum() + 1);
                      }
                      bridgeExists = true;
                  }
              }

              if(!bridgeExists) {
                  that.addConstructedBridges(1);
                  var bridge = new Bridge(that.coloredNode, toBridgeTo, 1);
                  that.coloredNode.addBridge(bridge);
                  toBridgeTo.addBridge(bridge);
              }

              return;
          }
      }
  }

  public static bridgeUp(that) {
        var counter;
        if(that.isCircleHere(that.coloredNode.getX() , that.coloredNode.getY() - 1)) {
            return;
        }

        if(that.isCrossing(that.coloredNode.getX() , that.coloredNode.getY() - 1, 'u')) {
            return;
        }

        for(counter = that.coloredNode.getY() - 1; counter > 0; counter--) {
            if(that.isCircleHere(that.coloredNode.getX(), counter)) {
                var toBridgeTo = that.getCircleHere(that.coloredNode.getX(), counter);
                var bridgeExists = false;
                for(let bridge of toBridgeTo.getBridges()) {
                    if((bridge.getN1().getX() === that.coloredNode.getX() &&
                        bridge.getN1().getY() === that.coloredNode.getY())||
                       (bridge.getN2().getX() === that.coloredNode.getX() &&
                        bridge.getN2().getY() === that.coloredNode.getY())) {
                        if(bridge.getNum() === 2) {
                            that.addDestroyedBridges(2);
                            bridge.setNum(0);
                        } else {
                            that.addConstructedBridges(2 - bridge.getNum());
                            bridge.setNum(bridge.getNum() + 1);
                        }
                        bridgeExists = true;
                    }
                }

                if(!bridgeExists) {
                    that.addConstructedBridges(1);
                    var bridge = new Bridge(that.coloredNode, toBridgeTo, 1);
                    that.coloredNode.addBridge(bridge);
                    toBridgeTo.addBridge(bridge);
                }

                return;
            }
        }
    }

  public static specialBridgeUp(that) {
        var counter;
        if(that.isCircleHere(that.coloredNode.getX() , that.coloredNode.getY() - 1)) {
            return;
        }
        if(that.isCrossing(that.coloredNode.getX() , that.coloredNode.getY() - 1, 'u')) {
            return;
        }
        for(counter = that.coloredNode.getY() - 1; counter > 0; counter--) {
            if(that.isCircleHere(that.coloredNode.getX(), counter)) {
                var toBridgeTo = that.getCircleHere(that.coloredNode.getX(), counter);
                var bridgeExists = false;
                for(let bridge of toBridgeTo.getBridges()) {
                    if((bridge.getN1().getX() === that.coloredNode.getX() &&
                        bridge.getN1().getY() === that.coloredNode.getY())||
                        (bridge.getN2().getX() === that.coloredNode.getX() &&
                        bridge.getN2().getY() === that.coloredNode.getY())) {
                        if(bridge.getNum() === 2) {
                            that.addDestroyedBridges(2);
                            bridge.setNum(0);
                        } else {
                            that.addConstructedBridges(2 - bridge.getNum());
                            bridge.setNum(2);
                        }
                        bridgeExists = true;
                    }
                }

                if(!bridgeExists) {
                    that.addConstructedBridges(2);
                    var bridge = new Bridge(that.coloredNode, toBridgeTo, 2);
                    that.coloredNode.addBridge(bridge);
                    toBridgeTo.addBridge(bridge);
                }

                return;
            }
        }
    } 

  public static numBridgeUp(that, num) {
        var counter;
        try {
          if(that.isCircleHere(that.coloredNode.getX() , that.coloredNode.getY() - 1)) {
              return;
          }
        } catch {
          return;
        }
        if(that.isCrossing(that.coloredNode.getX() , that.coloredNode.getY() - 1, 'u')) {
            return;
        }
        for(counter = that.coloredNode.getY() - 1; counter > 0; counter--) {
            if(that.isCircleHere(that.coloredNode.getX(), counter)) {
                var toBridgeTo = that.getCircleHere(that.coloredNode.getX(), counter);
                var bridgeExists = false;
                for(let bridge of toBridgeTo.getBridges()) {
                    if((bridge.getN1().getX() === that.coloredNode.getX() &&
                        bridge.getN1().getY() === that.coloredNode.getY())||
                        (bridge.getN2().getX() === that.coloredNode.getX() &&
                        bridge.getN2().getY() === that.coloredNode.getY())) {
                        if(bridge.getNum() != num) {
                            that.addConstructedBridges(2 - bridge.getNum());
                        }
                        bridge.setNum(num);
                        bridgeExists = true;
                    }
                }

                if(!bridgeExists) {
                    that.addConstructedBridges(num);
                    var bridge = new Bridge(that.coloredNode, toBridgeTo, num);
                    that.coloredNode.addBridge(bridge);
                    toBridgeTo.addBridge(bridge);
                }

                return;
            }
        }
    } 

    public static numBridgeDown(that, num) {
        var counter;
        try {
          if(that.isCircleHere(that.coloredNode.getX() , that.coloredNode.getY() + 1)) {
              return;
          }
        } catch {
          return;
        }
        if(that.isCrossing(that.coloredNode.getX() , that.coloredNode.getY() + 1, 'd')) {
            return;
        }
        for(counter = that.coloredNode.getY() + 1; counter < that.height + 1; counter++) {
            if(that.isCircleHere(that.coloredNode.getX(), counter)) {
                var toBridgeTo = that.getCircleHere(that.coloredNode.getX(), counter);
                var bridgeExists = false;
                for(let bridge of toBridgeTo.getBridges()) {
                    if((bridge.getN1().getX() === that.coloredNode.getX() &&
                        bridge.getN1().getY() === that.coloredNode.getY())||
                       (bridge.getN2().getX() === that.coloredNode.getX() &&
                        bridge.getN2().getY() === that.coloredNode.getY())) {
                        if(bridge.getNum() != num) {
                            that.addConstructedBridges(2 - bridge.getNum());
                        }
                        bridge.setNum(num);
                        bridgeExists = true;
                    }
                }

                if(!bridgeExists) {
                    that.addConstructedBridges(num);
                    var bridge = new Bridge(that.coloredNode, toBridgeTo, num);
                    that.coloredNode.addBridge(bridge);
                    toBridgeTo.addBridge(bridge);
                }

                return;
            }
        }
    }

    public static specialBridgeDown(that) {
        var counter;
        if(that.isCircleHere(that.coloredNode.getX() , that.coloredNode.getY() + 1)) {
            return;
        }
        if(that.isCrossing(that.coloredNode.getX() , that.coloredNode.getY() + 1, 'd')) {
            return;
        }
        for(counter = that.coloredNode.getY() + 1; counter < that.height + 1; counter++) {
            if(that.isCircleHere(that.coloredNode.getX(), counter)) {
                var toBridgeTo = that.getCircleHere(that.coloredNode.getX(), counter);
                var bridgeExists = false;
                for(let bridge of toBridgeTo.getBridges()) {
                    if((bridge.getN1().getX() === that.coloredNode.getX() &&
                        bridge.getN1().getY() === that.coloredNode.getY())||
                       (bridge.getN2().getX() === that.coloredNode.getX() &&
                        bridge.getN2().getY() === that.coloredNode.getY())) {
                        if(bridge.getNum() === 2) {
                            that.addDestroyedBridges(2);
                            bridge.setNum(0);
                        } else {
                            that.addConstructedBridges(2 - bridge.getNum());
                            bridge.setNum(2);
                        }
                        bridgeExists = true;
                    }
                }

                if(!bridgeExists) {
                    that.addConstructedBridges(2);
                    var bridge = new Bridge(that.coloredNode, toBridgeTo, 2);
                    that.coloredNode.addBridge(bridge);
                    toBridgeTo.addBridge(bridge);
                }

                return;
            }
        }
    }

    public static bridgeDown(that) {
        var counter;
        if(that.isCircleHere(that.coloredNode.getX() , that.coloredNode.getY() + 1)) {
            return;
        }
        if(that.isCrossing(that.coloredNode.getX() , that.coloredNode.getY() + 1, 'd')) {
            return;
        }
        for(counter = that.coloredNode.getY() + 1; counter < that.height + 1; counter++) {
            if(that.isCircleHere(that.coloredNode.getX(), counter)) {
                var toBridgeTo = that.getCircleHere(that.coloredNode.getX(), counter);
                var bridgeExists = false;
                for(let bridge of toBridgeTo.getBridges()) {
                    if((bridge.getN1().getX() === that.coloredNode.getX() &&
                        bridge.getN1().getY() === that.coloredNode.getY())||
                       (bridge.getN2().getX() === that.coloredNode.getX() &&
                        bridge.getN2().getY() === that.coloredNode.getY())) {
                        if(bridge.getNum() === 2) {
                            that.addDestroyedBridges(2);
                            bridge.setNum(0);
                        } else {
                            that.addConstructedBridges(2 - bridge.getNum());
                            bridge.setNum(bridge.getNum() + 1);
                        }
                        bridgeExists = true;
                    }
                }

                if(!bridgeExists) {
                    that.addConstructedBridges(1);
                    var bridge = new Bridge(that.coloredNode, toBridgeTo, 1);
                    that.coloredNode.addBridge(bridge);
                    toBridgeTo.addBridge(bridge);
                }

                return;
            }
        }
    }

    public static specialBridgeLeft(that) {
        var counter;
        if(that.isCircleHere(that.coloredNode.getX() - 1, that.coloredNode.getY())) {
            return;
        }
        if(that.isCrossing(that.coloredNode.getX() - 1, that.coloredNode.getY(), 'l')) {
            return;
        }
        for(counter = that.coloredNode.getX() - 1; counter > 0; counter--) {
            if(that.isCircleHere(counter, that.coloredNode.getY())) {
                var toBridgeTo = that.getCircleHere(counter, that.coloredNode.getY());
                var bridgeExists = false;
                for(let bridge of toBridgeTo.getBridges()) {
                    if((bridge.getN1().getX() === that.coloredNode.getX() &&
                        bridge.getN1().getY() === that.coloredNode.getY())||
                       (bridge.getN2().getX() === that.coloredNode.getX() &&
                        bridge.getN2().getY() === that.coloredNode.getY())) {
                        if(bridge.getNum() === 2) {
                            that.addDestroyedBridges(2);
                            bridge.setNum(0);
                        } else {
                            that.addConstructedBridges(2 - bridge.getNum());
                            bridge.setNum(2);
                        }
                        bridgeExists = true;
                    }
                }

                if(!bridgeExists) {
                    that.addConstructedBridges(2);
                    var bridge = new Bridge(that.coloredNode, toBridgeTo, 2);
                    that.coloredNode.addBridge(bridge);
                    toBridgeTo.addBridge(bridge);
                }

                return;
            }
        }
    }

    public static addConstructedBridges(that, num) {
    } 

    public static addDestroyedBridges(that, num) {
    } 

    public static numBridgeLeft(that, num) {
        var counter;
        try {
          if(that.isCircleHere(that.coloredNode.getX() - 1, that.coloredNode.getY())) {
            return;
          }
        } catch {
          return;
        }
        if(that.isCrossing(that.coloredNode.getX() - 1, that.coloredNode.getY(), 'l')) {
            return;
        }
        for(counter = that.coloredNode.getX() - 1; counter > 0; counter--) {
            if(that.isCircleHere(counter, that.coloredNode.getY())) {
                var toBridgeTo = that.getCircleHere(counter, that.coloredNode.getY());
                var bridgeExists = false;
                for(let bridge of toBridgeTo.getBridges()) {
                    if((bridge.getN1().getX() === that.coloredNode.getX() &&
                        bridge.getN1().getY() === that.coloredNode.getY())||
                       (bridge.getN2().getX() === that.coloredNode.getX() &&
                        bridge.getN2().getY() === that.coloredNode.getY())) {
                        if(bridge.getNum() != num) {
                            that.addConstructedBridges(2 - bridge.getNum());
                        }
                        bridge.setNum(num);
                        bridgeExists = true;
                    }
                }

                if(!bridgeExists) {
                    that.addConstructedBridges(num);
                    var bridge = new Bridge(that.coloredNode, toBridgeTo, num);
                    that.coloredNode.addBridge(bridge);
                    toBridgeTo.addBridge(bridge);
                }

                return;
            }
        }
    }

    public static numBridgeRight(that, num) {
        var counter;
        try {
          if(that.isCircleHere(that.coloredNode.getX() + 1, that.coloredNode.getY())) {
            return;
          }
        } catch {
          return;
        }
        if(that.isCrossing(that.coloredNode.getX() + 1, that.coloredNode.getY(), 'r')) {
            return;
        }
        for(counter = that.coloredNode.getX() + 1; counter < that.width + 1; counter++) {
            if(that.isCircleHere(counter, that.coloredNode.getY())) {
                var toBridgeTo = that.getCircleHere(counter, that.coloredNode.getY());
                var bridgeExists = false;
                for(let bridge of toBridgeTo.getBridges()) {
                    if((bridge.getN1().getX() === that.coloredNode.getX() &&
                        bridge.getN1().getY() === that.coloredNode.getY())||
                       (bridge.getN2().getX() === that.coloredNode.getX() &&
                        bridge.getN2().getY() === that.coloredNode.getY())) {
                        if(bridge.getNum() != num) {
                            that.addConstructedBridges(2 - bridge.getNum());
                        }
                        bridge.setNum(num);
                        bridgeExists = true;
                    }
                }

                if(!bridgeExists) {
                    that.addConstructedBridges(num);
                    var bridge = new Bridge(that.coloredNode, toBridgeTo, num);
                    that.coloredNode.addBridge(bridge);
                    toBridgeTo.addBridge(bridge);
                }

                return;
            }
        }
    }

    public static specialBridgeRight(that) {
        var counter;
        if(that.isCircleHere(that.coloredNode.getX() + 1, that.coloredNode.getY())) {
            return;
        }
        if(that.isCrossing(that.coloredNode.getX() + 1, that.coloredNode.getY(), 'r')) {
            return;
        }
        for(counter = that.coloredNode.getX() + 1; counter < that.width + 1; counter++) {
            if(that.isCircleHere(counter, that.coloredNode.getY())) {
                var toBridgeTo = that.getCircleHere(counter, that.coloredNode.getY());
                var bridgeExists = false;
                for(let bridge of toBridgeTo.getBridges()) {
                    if((bridge.getN1().getX() === that.coloredNode.getX() &&
                        bridge.getN1().getY() === that.coloredNode.getY())||
                       (bridge.getN2().getX() === that.coloredNode.getX() &&
                        bridge.getN2().getY() === that.coloredNode.getY())) {
                        if(bridge.getNum() === 2) {
                            that.addDestroyedBridges(2);
                            bridge.setNum(0);
                        } else {
                            that.addConstructedBridges(2 - bridge.getNum());
                            bridge.setNum(2);
                        }
                        bridgeExists = true;
                    }
                }

                if(!bridgeExists) {
                    that.addConstructedBridges(2);
                    var bridge = new Bridge(that.coloredNode, toBridgeTo, 2);
                    that.coloredNode.addBridge(bridge);
                    toBridgeTo.addBridge(bridge);
                }

                return;
            }
        }
    }

    public static mouseReleased(that, mouseEventData) {
        if(!that.scrollMode) {
            if(!that.pause) {
                var x = mouseEventData.clientX + window.scrollX;
                var y = mouseEventData.clientY + window.scrollY;
                var button = mouseEventData.button;
                if(!that.shift) {
                    if(that.coloredNode !== undefined) {
                        if(Math.abs(that.pressedX - x) > Math.abs(that.pressedY - y)) {
                            if(that.pressedX > x) {
                                that.bridgeLeft();
                                if(button == 2) {
                                    that.bridgeLeft();
                                }
                                that.done();
                                that.draw();
                            } else {
                                that.bridgeRight();
                                if(button == 2) {
                                    that.bridgeRight();
                                }
                                that.done();
                                that.draw();
                            }
                        } else {
                            if(that.pressedY > y) {
                                that.bridgeUp();
                                if(button == 2) {
                                    that.bridgeUp();
                                }
                                that.done();
                                that.draw();
                            } else {
                                that.bridgeDown();
                                if(button == 2) {
                                    that.bridgeDown();
                                }
                                that.done();
                                that.draw();
                            }
                        }
                        that.coloredNode = undefined;
                        that.draw();
                    }
                } else {
                    if(button == 2) {
                        that.numBridgeUp(2);
                        that.numBridgeDown(2);
                        that.numBridgeRight(2);
                        that.numBridgeLeft(2);
                    } else {
                        that.numBridgeUp(1);
                        that.numBridgeDown(1);
                        that.numBridgeRight(1);
                        that.numBridgeLeft(1);
                    }
                    that.coloredNode = undefined;
                    that.done();
                    that.draw();
                }
            }
        } else {
            that.scrollPressed = false;
        }
    }

    public static submit(that) {
        var numNodes = Number(that.route.snapshot.paramMap.get('numNodes'));
        var m;
        if(!that.daily && that.gauntlet == 0 && !that.medley) {
            if(that.timesPaused > 0) {
                m = {
                    name: that.name,
                    totalTime: that.millis + (that.seconds * 100) + (that.minutes * 60 * 100) + (that.hours * 60 * 60 * 100),
                    seed: that.board.initialSeed,
                    pauses: that.timesPaused
                };
            } else {
                m = {
                    name: that.name,
                    totalTime: that.millis + (that.seconds * 100) + (that.minutes * 60 * 100) + (that.hours * 60 * 60 * 100),
                    seed: that.board.initialSeed
                };
            }
            var board = "";
            if(that.width == 40 && that.height == 40 && numNodes == 500000 && !that.extreme && that.name != "") {
                board = "40x40hard";
            } else if(that.width == 7 && that.height == 7 && numNodes == 14 && that.name != "") {
                board = "7x7easy";
            }  else if(that.width == 7 && that.height == 7 && numNodes == 21 && that.name != "") {
                board = "7x7medium";
            } else if(that.width == 15 && that.height == 15 && numNodes == 30 && that.name != "") {
                board = "15x15easy";
            } else if(that.width == 15 && that.height == 15 && numNodes == 45 && that.name != "") {
                board = "15x15medium";
            } else if(that.width == 25 && that.height == 25 && numNodes == 50 && that.name != "") {
                board = "25x25easy";
            } else if(that.width == 40 && that.height == 40 && numNodes == 80 && that.name != "") {
                board = "40x40easy";
            } else if(that.width == 40 && that.height == 40 && numNodes == 120 && that.name != "") {
                board = "40x40medium";
            } else if(that.width == 100 && that.height == 100 && numNodes == 200 && that.name != "") {
                board = "100x100easy";
            } else if(that.width == 100 && that.height == 100 && numNodes == 300 && that.name != "") {
                board = "100x100medium";
            } else if(that.width == 25 && that.height == 25 && numNodes == 75 && that.name != "") {
                board = "25x25medium";
            } else if(that.width == 7 && that.height == 7 && numNodes == 500000 && !that.extreme && that.name != "") {
                board = "7x7hard";
            } else if(that.width == 7 && that.height == 7 && numNodes == 500000 && that.extreme && that.name != "") {
                board = "7x7extreme";
            } else if(that.width == 10 && that.height == 10 && numNodes == 20 && !that.extreme && that.name != "") {
                board = "10x10easy";
            } else if(that.width == 10 && that.height == 10 && numNodes == 30 && !that.extreme && that.name != "") {
                board = "10x10medium";
            } else if(that.width == 10 && that.height == 10 && numNodes == 500000 && !that.extreme && that.name != "") {
                board = "10x10hard";
            } else if(that.width == 10 && that.height == 10 && numNodes == 500000 && that.extreme && that.name != "") {
                board = "10x10extreme";
            } else if(that.width == 60 && that.height == 60 && numNodes == 120 && !that.extreme && that.name != "") {
                board = "60x60easy";
            } else if(that.width == 60 && that.height == 60 && numNodes == 180 && !that.extreme && that.name != "") {
                board = "60x60medium";
            } else if(that.width == 60 && that.height == 60 && numNodes == 500000 && !that.extreme && that.name != "") {
                board = "60x60hard";
            } else if(that.width == 60 && that.height == 60 && numNodes == 500000 && that.extreme && that.name != "") {
                board = "60x60extreme";
            } else if(that.width == 25 && that.height == 25 && that.extreme && that.name != "") {
                board = "25x25extreme";
            } else if(that.width == 15 && that.height == 15 && numNodes == 500000 && !that.extreme && that.name != "") {
                board = "15x15hard";
            } else if(that.width == 100 && that.height == 100 && numNodes == 500000 && !that.extreme && that.name != "") {
                board = "100x100hard";
            } else if(that.width == 100 && that.height == 100 && that.extreme && that.name != "") {
                board = "100x100extreme";
            } else if(that.width==15 && that.height == 15 && that.extreme && that.name != "") {
                board = "15x15extreme";
            } else if(that.width==40 && that.height == 40 && that.extreme && that.name != "") {
                board = "40x40extreme";
            } else if(that.width==25 && that.height==25 && !that.extreme && numNodes == 500000 && that.name != "") {
                board = "25x25hard";
            }

            that._firebaseAuth.auth.currentUser.getIdToken(true)
                .then((token) => {
                    that.http.put('https://woohoojinbridges.firebaseio.com/' + board + '/'+that.userDetails.uid+'.json?auth=' + token, m)
                        .subscribe((data) => {

                        let n = board.split('x')[0];
                        let p = 0;
                        if(n == '7') {
                            p = 1;
                        } else if(n == '10') {
                            p = 2;
                        } else if(n == '15') {
                            p = 3;
                        } else if(n == '25') {
                            p = 4;
                        } else if(n == '40') {
                            p = 5;
                        } else if(n == '60') {
                            p = 6;
                        } else if(n == '100') {
                            p = 7;
                        }
                        let mod = {
                            page: p
                        }
                        that.router.navigate(['leaderboards', mod]);
                    });
                })
        } else if(that.daily && that.gauntlet == 0) {
            if(that.timesPaused > 0) {
                m = {
                    name: that.name,
                    totalTime: that.millis + (that.seconds * 100) + (that.minutes * 60 * 100) + (that.hours * 60 * 60 * 100),
                    pauses: that.timesPaused
                };
            } else {
                m = {
                    name: that.name,
                    totalTime: that.millis + (that.seconds * 100) + (that.minutes * 60 * 100) + (that.hours * 60 * 60 * 100),
                };
            }

            var board = "";

            var dailyDiff  = that.route.snapshot.paramMap.get('dailyDiff');

            if(dailyDiff == 'hard') {
                board = "dailyScores";
            } else if(dailyDiff == 'easy') {
                board = "dailyScoresEasy";
            } else if(dailyDiff == 'medium') {
                board = "dailyScoresMedium";
            } else if(dailyDiff == 'extreme') {
                board = "dailyScoresExtreme";
            }


            that._firebaseAuth.auth.currentUser.getIdToken(true)
                .then((token) => {
                    that.http.put('https://woohoojinbridges.firebaseio.com/' + board + '/'+that.userDetails.uid+'.json?auth=' + token, m)
                        .subscribe((data) => {

                        let mod = {
                            page: 8
                        }
                        that.router.navigate(['leaderboards', mod]);
                    });
                })
        } else if(that.gauntlet > 0) {
            if(that.timesPaused > 0) {
                m = {
                    name: that.name,
                    totalTime: that.millis + (that.seconds * 100) + (that.minutes * 60 * 100) + (that.hours * 60 * 60 * 100),
                    pauses: that.timesPaused
                };
            } else {
                m = {
                    name: that.name,
                    totalTime: that.millis + (that.seconds * 100) + (that.minutes * 60 * 100) + (that.hours * 60 * 60 * 100),
                };
            }
            that._firebaseAuth.auth.currentUser.getIdToken(true)
                .then((token) => {
                    that.http.put('https://woohoojinbridges.firebaseio.com/gauntlet/'+that.userDetails.uid+'.json?auth=' + token, m)
                        .subscribe((data) => {
                        let mod = {
                            page: 9
                        }
                        that.router.navigate(['leaderboards', mod]);
                    });
                })
        } else if(that.medley) {
            if(that.timesPaused > 0) {
                m = {
                    name: that.name,
                    totalTime: that.millis + (that.seconds * 100) + (that.minutes * 60 * 100) + (that.hours * 60 * 60 * 100),
                    pauses: that.timesPaused
                };
            } else {
                m = {
                    name: that.name,
                    totalTime: that.millis + (that.seconds * 100) + (that.minutes * 60 * 100) + (that.hours * 60 * 60 * 100),
                };
            }
            that._firebaseAuth.auth.currentUser.getIdToken(true)
                .then((token) => {
                    that.http.put('https://woohoojinbridges.firebaseio.com/' + that.route.snapshot.paramMap.get('dailyDiff') + '/'+that.userDetails.uid+'.json?auth=' + token, m)
                        .subscribe((data) => {
                        let mod = {
                            page: 9
                        }
                        that.router.navigate(['leaderboards', mod]);
                    });
                })
        }
    }

    public static getUid(that) {
        if(that.userDetails == null) {
            return '';
        } else {
            return that.userDetails.uid;
        }
    }

    public static keyPressed(that, event, __that) {
        if(event.code == "ControlLeft") {
            __that.scrollMode = true;
        }
        if(!that.pause) {
            if(!that.solved) {
                if(event.code == "ShiftLeft") {
                    __that.shift = true;
                }

                // Key tracking
                if(event.key == "w" || event.key == "W" || event.key == "s" || event.key == "S"
                || event.key == "d" || event.key == "D" || event.key == "a" || event.key == "A") {
                }

                if(event.key == "w") {
                    let pointX = that.mouseX;
                    let pointY = that.mouseY;
                    
                    if(that.isCircleHere(pointX, pointY)) {
                        that.coloredNode = that.getCircleHere(pointX, pointY);
                        that.bridgeUp();
                        that.done();
                        that.draw();
                        that.coloredNode = undefined;
                    }
                } else if(event.key == "W") {
                    let pointX = that.mouseX;
                    let pointY = that.mouseY;
                    
                    if(that.isCircleHere(pointX, pointY)) {
                        that.coloredNode = that.getCircleHere(pointX, pointY);
                        that.specialBridgeUp();
                        that.done();
                        that.draw();
                        that.coloredNode = undefined;
                    }
                } else if(event.key == "s") {
                    let pointX = that.mouseX;
                    let pointY = that.mouseY;
                    
                    if(that.isCircleHere(pointX, pointY)) {
                        that.coloredNode = that.getCircleHere(pointX, pointY);
                        that.bridgeDown();
                        that.done();
                        that.draw();
                        that.coloredNode = undefined;
                    }
                } else if(event.key == "S") {
                    let pointX = that.mouseX;
                    let pointY = that.mouseY;
                    
                    if(that.isCircleHere(pointX, pointY)) {
                        that.coloredNode = that.getCircleHere(pointX, pointY);
                        that.specialBridgeDown();
                        that.done();
                        that.draw();
                        that.coloredNode = undefined;
                    }
                } else if(event.key == "a") {
                    let pointX = that.mouseX;
                    let pointY = that.mouseY;
                    
                    if(that.isCircleHere(pointX, pointY)) {
                        that.coloredNode = that.getCircleHere(pointX, pointY);
                        that.bridgeLeft();
                        that.done();
                        that.draw();
                        that.coloredNode = undefined;
                    }
                } else if(event.key == "A") {
                    let pointX = that.mouseX;
                    let pointY = that.mouseY;
                    
                    if(that.isCircleHere(pointX, pointY)) {
                        that.coloredNode = that.getCircleHere(pointX, pointY);
                        that.specialBridgeLeft();
                        that.done();
                        that.draw();
                        that.coloredNode = undefined;
                    }
                } else if(event.key == "d") {
                    let pointX = that.mouseX;
                    let pointY = that.mouseY;
                    
                    if(that.isCircleHere(pointX, pointY)) {
                        that.coloredNode = that.getCircleHere(pointX, pointY);
                        that.bridgeRight();
                        that.done();
                        that.draw();
                        that.coloredNode = undefined;
                    }
                } else if(event.key == "D") {
                    let pointX = that.mouseX;
                    let pointY = that.mouseY;
                    
                    if(that.isCircleHere(pointX, pointY)) {
                        that.coloredNode = that.getCircleHere(pointX, pointY);
                        that.specialBridgeRight();
                        that.done();
                        that.draw();
                        that.coloredNode = undefined;
                    }
                } else if(event.key == "p" || event.key == "P" || event.key == "Escape") {
                    that.pauseGame();
                }            
            }
        } else {
            if(event.key == "p" || event.key == "P" || event.key == "Escape") {
                that.pauseGame();
            }
        }
    }

    public static keyReleased(that, event, __that) {
        if(event.code == "ControlLeft") {
            __that.scrollMode = false;
            __that.scrollPressed = false;
        }
        if(event.code == "ShiftLeft") {
            __that.shift = false;
        }
    }

    public static done(that) {
      if(!that.skip) {
          for(let n of that.board.getNodes()) {
              var total = 0;
              for(let b of n.bridges) {
                  total += b.num;
              }
              if(total != n.val) {
                  return;
              }
          }
      }
    }

    public static toggleCoords(that) {
      that.displayCoords = !that.displayCoords;
      that.draw();
    }

    public static isLoggedIn(that) {
        if (that.userDetails == null ) {
            return false;
          } else {
            return true;
          }
        }

    public static clearBoard(that) {
        for(let n of that.board.getNodes()) {
            for(let b of n.getBridges()) {
                b.setNum(0);
            }
        }
        that.draw();
    }

    public static isCrossing(that, startX, startY, direction) {
        if(direction == 'u') {
            while(true) {
                if(that.isBridgeHere(startX, startY, 'h')) return true;
                if(that.isCircleHere(startX, startY)) return false;
                if(startY <= 0) return true;

                startY--;
            }
        } else if(direction == 'd') {
            while(true) {
                if(that.isBridgeHere(startX, startY, 'h')) return true;
                if(that.isCircleHere(startX, startY)) return false;
                if(startY >= that.height) return true;

                startY++;
            }
        } else if(direction == 'r') {
            while(true) {
                if(that.isBridgeHere(startX, startY, 'v')) return true;
                if(that.isCircleHere(startX, startY)) return false;
                if(startX >= that.width) return true;

                startX++;
            }
        } else if(direction == 'l') {
            while(true) {
                if(that.isBridgeHere(startX, startY, 'v')) return true;
                if(that.isCircleHere(startX, startY)) return false;
                if(startX <= 0) return true;

                startX--;
            }
        }
    }

    public static isBridgeHere(that, x, y, direction) {
        var bridges = that.getBridgeArray();
        if(direction == 'v') {
            bridges = bridges.filter(b => b.n1.x == b.n2.x && b.n1.x == x && ((b.n1.y > y && b.n2.y < y) || (b.n1.y < y && b.n2.y > y)));
        } else if(direction == 'h') {
            bridges = bridges.filter(b => b.n1.y == b.n2.y && b.n1.y == y && ((b.n1.x > x && b.n2.x < x) || (b.n1.x < x && b.n2.x > x)));
        }

        return bridges.length > 0;
    }

    public static drawBridges(that) {
        for(let node of that.board.getNodes()) {
            for(let bridge of node.getBridges()) {
                if(bridge.getNum() > 0) {
                    if(bridge.getNum() === 1) {
                        var n1x = that.xAdd + (bridge.getN1().getX() * (that.factor));
                        var n1y = that.yAdd + (bridge.getN1().getY() * (that.factor));
                        var n2x = that.xAdd + (bridge.getN2().getX() * (that.factor));
                        var n2y = that.yAdd + (bridge.getN2().getY() * (that.factor));

                        that.context.strokeStyle = that.bridgeColor;
                        that.context.lineWidth = that.factor/10;
                        that.context.strokeRect(n1x, n1y, n2x-n1x, n2y-n1y);
                    } else {
                        var n1x = that.xAdd + (bridge.getN1().getX() * (that.factor));
                        var n1y = that.yAdd + (bridge.getN1().getY() * (that.factor));
                        var n2x = that.xAdd + (bridge.getN2().getX() * (that.factor));
                        var n2y = that.yAdd + (bridge.getN2().getY() * (that.factor));
                        if(n1x === n2x) {
                            var b1x = n1x - that.factor/5;
                            var b2x = n2x - that.factor/5;
                            var b3x = n1x + that.factor/5;
                            var b4x = n2x + that.factor/5;
                            that.context.strokeStyle = that.bridgeColor;
                            that.context.lineWidth = that.factor/10;
                            that.context.strokeRect(b1x, n1y, b2x-b1x, (n2y-n1y));
                            that.context.strokeRect(b3x, n1y, b4x-b3x, (n2y-n1y));
                        } else {
                            var b1y = n1y - that.factor/5;
                            var b2y = n2y - that.factor/5;
                            var b3y = n1y + that.factor/5;
                            var b4y = n2y + that.factor/5;
                            that.context.strokeStyle = that.bridgeColor;
                            that.context.lineWidth = that.factor/10;
                            that.context.strokeRect(n1x, b1y, (n2x-n1x), (b2y-b1y));
                            that.context.strokeRect(n1x, b3y, (n2x-n1x), (b4y-b3y));
                        }
                    }
                }
            }
        }
    }

    public static drawBackground(that) {
        that.context.fillStyle = that.backgroundColor;
        that.context.fillRect(0, 0, that.canvas.offsetWidth * 2, that.canvas.offsetHeight * 2);
    }

    public static isCircleHere(that, x: number, y: number) {
        for(let node of that.board.getNodes()) {
            if(node.getX() == x && node.getY() == y) {
                return true;
            }
        }
        return false;
    }

    public static getCircleHere(that, x: number, y: number) {
        for(let node of that.board.getNodes()) {
            if(node.getX() == x && node.getY() == y) {
                return node;
            }
        }
        return null;
    }

    public static mousePressed(that, mouseEventData) {
        if(!that.scrollMode) {
            if(!that.pause) {
                if(!that.solved) {
                    var x = mouseEventData.clientX + window.scrollX;
                    var y = mouseEventData.clientY + window.scrollY;
                    that.pressedX = x;
                    that.pressedY = y;


                    var pointX = Math.round(((x - 225 - that.xAdd))/that.factor);
                    var pointY = Math.round(((y - 56 - that.yAdd))/that.factor);

                    if(that.isCircleHere(pointX, pointY)) {
                        that.coloredNode = that.getCircleHere(pointX, pointY);
                        that.drawCircleRed(that.coloredNode);
                    } else {
                        that.coloredNode = undefined;
                    }
                }
            }
        } else {
            var x = mouseEventData.clientX + window.scrollX;
            var y = mouseEventData.clientY + window.scrollY;

            that.scrollPressed = true;
            that.scrollX = x;
            that.scrollY = y;
        }
    }

    public static getBridgeArray(that) {
        var toReturn = [];
        for(let node of that.board.getNodes()) {
            for(let bridge of node.getBridges()) {
                if(bridge.getNum() > 0) toReturn.push(bridge);
            }
        }
        return toReturn;
    }

    public static ellipse(that, context, cx, cy, rx, ry){
        context.save(); // save state
        context.beginPath();
        context.translate(cx, cy);
        context.scale(rx/2, ry/2);
        context.arc(1, 1, 1, 0, 2 * Math.PI, false);
        context.fill();

        context.restore(); // restore to original state
    }

    public static ellipseFill(that, context, cx, cy, rx, ry){
        context.save(); // save state
        context.beginPath();
        context.translate(cx, cy);
        context.scale(rx/2, ry/2);
        context.arc(1, 1, 1, 0, 2 * Math.PI, false);
        context.fill();
        context.restore(); // restore to original state
        that.context.strokeStyle = that.bridgeColor;
        that.context.lineWidth = that.factor/10;
        context.stroke();
    }

    public static makeCircle(that, x, y, diameter) {
        that.context.arc(x, y, diameter/2, 0, 2*Math.PI, false);
    }

    public static toggleLetters(that) {
        that.drawLetters = !that.drawLetters;
        that.draw();
    }

    public static toggleTextColor(that) {
        that.drawTextColorBool = !that.drawTextColorBool;
        that.draw();
    }

    public static toggleGrid(that) {
        that.drawGridBool = !that.drawGridBool;
        that.draw();
    }

    public static getNumBridges(that, node) {
        var toReturn = 0;
        for(let b of node.getBridges()) {
            toReturn += b.getNum();
        }
        return toReturn;
    }

    public static drawCircleOutline(that, node: MyNode) {
        var circleX = (node.getX() * (that.factor)) - that.factor/2;
        var circleY = (node.getY() * (that.factor)) - that.factor/2;

        var circleString = "" + node.getVal();

        if(node.getVal() - that.getNumBridges(node) >= 0) {
            that.context.fillStyle = that.circleSelectedColor[node.getVal() - that.getNumBridges(node)];
        } else {
            that.context.fillStyle = that.wrongCircleColor;
        }

        
        //that.context.fillRect(circleX, circleY, that.squareSize, that.squareSize);
        that.ellipseFill(that.context, that.xAdd + circleX, that.yAdd + circleY, that.squareSize, that.squareSize);

        if(that.drawLetters) {
            if(that.drawTextColorBool) {
                that.context.fillStyle = that.circleTextColors[node.getVal() - that.getNumBridges(node)];
            } else {
                that.context.fillStyle = that.circleTextColor;
            }
            
            that.context.fillText(circleString, that.xAdd + circleX + that.factor/4.3, that.yAdd + circleY + that.factor/1.2);
        }
    }

    public static drawCircleRed(that, node: MyNode) {
        var circleX = (node.getX() * (that.factor)) - that.factor/2;
        var circleY = (node.getY() * (that.factor)) - that.factor/2;

        var circleString = "" + node.getVal();

        if(node.getVal() - that.getNumBridges(node) >= 0) {
            that.context.fillStyle = that.circleSelectedColor[node.getVal() - that.getNumBridges(node)];
        } else {
            that.context.fillStyle = that.circleSelectedColor[0];
        }
        that.context.strokeStlye = "#FFFFFF";
        //that.context.fillRect(circleX, circleY, that.squareSize, that.squareSize);
        that.ellipse(that.context, that.xAdd + circleX, that.yAdd + circleY, that.squareSize, that.squareSize);
        if(that.drawLetters) {
            if(that.drawTextColorBool) {
                that.context.fillStyle = that.circleTextColors[node.getVal() - that.getNumBridges(node)];
            } else {
                that.context.fillStyle = that.circleTextColor;
            }
            that.context.fillText(circleString, that.xAdd + circleX + that.factor/4.3, that.yAdd + circleY + that.factor/1.2);
        }

    }

    public static zoomOut(that) {
        that.context.beginPath();
        that.context.clearRect(0, 0, that.canvas.width, that.canvas.height);
        that.canvas.width = that.canvas.width - 300;
        that.canvas.height = that.canvas.height- 300;
        that.context.translate(0.5, 0.5)
        
        var larger = Math.max(that.width, that.height) + 1;
        var size = Math.min(that.canvas.offsetWidth, that.canvas.offsetHeight);

        that.factor = Math.floor(size/larger);
        that.squareSize = that.factor;
        that.context.font = 'bold '+Math.round(that.factor)+'px Arial';
        that.xAdd = 0;
        that.yAdd = 0;

        that.draw();  
    }

    public static zoomIn(that) {
        that.context.beginPath();
        that.context.clearRect(0, 0, that.canvas.width, that.canvas.height);
        that.canvas.width = that.canvas.width + 300;
        that.canvas.height = that.canvas.height+ 300;
        that.context.translate(0.5, 0.5)
        
        var larger = Math.max(that.width, that.height) + 1;
        var size = Math.min(that.canvas.offsetWidth, that.canvas.offsetHeight);

        that.factor = Math.floor(size/larger);
        that.squareSize = that.factor;
        that.context.font = 'bold '+Math.round(that.factor)+'px Arial';
        that.xAdd = 0;
        that.yAdd = 0;

        that.draw();  
    }

    public static bigBoard(that) {
        that.context.beginPath();
        that.context.clearRect(0, 0, that.canvas.width, that.canvas.height);
        that.canvas.width = 3000;
        that.canvas.height = 3000;
        that.context.translate(0.5, 0.5)

       
        
        var larger = Math.max(that.width, that.height) + 1;
        var size = Math.min(that.canvas.offsetWidth, that.canvas.offsetHeight);

        that.factor = Math.floor(size/larger);
        that.squareSize = that.factor;
        that.context.font = 'bold '+Math.round(that.factor)+'px Arial';
        that.xAdd = 0;
        that.yAdd = 0;

        that.draw();  
    }

    public static veryBigBoard(that) {
        that.context.beginPath();
        that.context.clearRect(0, 0, that.canvas.width, that.canvas.height);
        that.canvas.width = 8000;
        that.canvas.height = 8000;
        that.context.translate(0.5, 0.5)

       
        
        var larger = Math.max(that.width, that.height) + 1;
        var size = Math.min(that.canvas.offsetWidth, that.canvas.offsetHeight);

        that.factor = Math.floor(size/larger);
        that.squareSize = that.factor;
        that.context.font = 'bold '+Math.round(that.factor)+'px Arial';
        that.xAdd = 0;
        that.yAdd = 0;

        that.draw();  
    }

    public static fixSizes(that) {
      that.context.beginPath();
      that.context.clearRect(0, 0, that.canvas.width, that.canvas.height);

      that.canvas.width = window.innerWidth - 225;
      that.canvas.height = window.innerHeight - 112;
      that.context.translate(0.5, 0.5)

      
      
      var larger = Math.max(that.width, that.height) + 1;
      var size = Math.min(that.canvas.offsetWidth, that.canvas.offsetHeight);

      that.factor = Math.floor(size/larger);
      that.squareSize = that.factor;
      that.context.font = 'bold '+Math.round(that.factor)+'px Arial';

      let w = that.canvas.offsetWidth;
      let h = that.canvas.offsetHeight;

      if(w > h) {
        that.xAdd = Math.round( ( w - h) / 2 );
        that.yAdd = 0;
      } else {
        that.xAdd = 0;
        that.yAdd = Math.round( (h - w) / 2 );
      }

      that.draw();    
    }

    public static draw(that) {
        that.context.beginPath();
        that.drawBackground();
        that.drawGrid();    
        that.drawBridges();
        that.drawCircles();
    }

    public static drawGrid(that) {
        
        if(that.drawGridBool) {
            var x = 0;
            var y = 0;
            for(x = 1 ; x <= that.width ; x++) {
                var circleX = that.xAdd + (x * (that.factor));
                var circleY = that.yAdd + (1 * (that.factor));
                var circleY2 = that.yAdd + (that.height * (that.factor));

                
                that.context.lineWidth = 1;
                that.context.strokeStyle = that.gridColor;
                that.context.moveTo(circleX, circleY);
                that.context.lineTo(circleX, circleY2);
                that.context.stroke();

            }

            for(y = 1 ; y <= that.height ; y++) {
                var circleX = that.xAdd + (1 * (that.factor));
                var circleY = that.yAdd + (y * (that.factor));
                var circleX2 = that.xAdd + (that.width * (that.factor));

                
                that.context.lineWidth = 1;
                that.context.strokeStyle = that.gridColor;
                that.context.moveTo(circleX, circleY);
                that.context.lineTo(circleX2, circleY);
                that.context.stroke();
            }
        }

      if(that.displayCoords) {
        var x = 0;
        var y = 0;
        for(x = 1 ; x <= that.width ; x++) {
          for(y = 1; y <= that.height ; y++) {
            var circleX = that.xAdd + (x * (that.factor));
            var circleY = that.yAdd + (y * (that.factor));
            that.context.font = 'bold '+Math.round(that.factor/5)+'px Arial';
            that.context.fillStyle = that.gridColor;
            that.context.fillText(""+ x + "," + y + "", circleX, circleY);
          }
        }
      }
    }

    public static drawCircles(that) {
        for(let node of that.board.getNodes()) {
            that.drawCircle(node);
        }
    }

    public static drawCircle(that, node: MyNode) {
       
        var circleX = (node.getX() * (that.factor)) - that.factor/2;
        var circleY = (node.getY() * (that.factor)) - that.factor/2;

        var circleString = "" + node.getVal();
        that.context.font = 'bold '+Math.round(that.factor)+'px Arial';

        if(node.getVal() - that.getNumBridges(node) >= 0) {
            that.context.fillStyle = that.circleColor[node.getVal() - that.getNumBridges(node)];
        } else {
            that.context.fillStyle = that.wrongCircleColor;
        }

        
        //that.context.fillRect(circleX, circleY, that.squareSize, that.squareSize);
        that.ellipse(that.context, circleX + that.xAdd, circleY + that.yAdd, that.squareSize, that.squareSize);

        if(that.drawLetters) {
            if(that.drawTextColorBool) {
                that.context.fillStyle = that.circleTextColors[node.getVal() - that.getNumBridges(node)];
            } else {
                that.context.fillStyle = that.circleTextColor;
            }
            
            that.context.fillText(circleString, that.xAdd + circleX + that.factor/4.3, that.yAdd + circleY + that.factor/1.2);
        }
    }

    public static ngOnInitOverwrite(that) {
        that.loading = true;
        that.playing = false;

        var diff = Number(that.route.snapshot.paramMap.get('diff'));
        var numNodes;

        if(diff == 1) {
          that.width = 10;
          that.height = 10;
          numNodes = 0;
          that.extreme = false;
        } else if(diff == 2) {
          that.width = 15;
          that.height = 15;
          numNodes = 15000;
          that.extreme = false;
        } else if(diff == 3) {
          that.width = 25;
          that.height = 25;
          numNodes = 500000;
          that.extreme = false;
        } else if(diff == 4) {
          that.width = 25;
          that.height = 25;
          numNodes = 500000;
          that.extreme = true;
        }

        that.seed = Number(that.route.snapshot.paramMap.get('seed'));
        if(numNodes === 0) {
            numNodes = Math.floor(Math.sqrt(that.width * that.height)) * 2;
        }

        that.numNodes = numNodes;

        if(that.seed == 0) {
            that.generateFairBoard(numNodes);
        } else {
            that.board = new Board(that.width, that.height, numNodes, that.extreme, that.seed, null, null, null, null, null, that.gauntlet, null);
            that.board.generateBoard();
        }

        that.loading = false;
        this.play(that)
    }

    public static play(that) {
        that.playing = true;
        var numNodes = Number(that.route.snapshot.paramMap.get('numNodes'));
        that.displayCoords = false;
        that.scrollMode = false;

        that.timePaused = 0;
        that.startPause = null;
        that.skip = false;
        that.timesPaused = 0;
        that.worseTime = true;
        that.name = "";
        that.drawLetters = true;
        that.drawGridBool = true;
        that.drawTextColorBool = false;
        that.solved = false;

        that.drawLetters = true;
        that.drawGridBool = true;
        that.gauntlet = false;

        that.canvas = document.getElementById('myCanvas');
        that.context = that.canvas.getContext('2d');

        var __that = that;

        that.canvas.addEventListener('mousedown', (e) => that.mousePressed(e), false);
        that.canvas.addEventListener('mouseup', (e) => that.mouseReleased(e), false);
        
        that.canvas.addEventListener('mousemove', (e) => that.mouseMove(e), false);
        window.addEventListener('keydown', function(e) {__that.keyPressed(e, __that) }, false);
        window.addEventListener('keyup', function(e) {__that.keyReleased(e, __that) }, false);

        that.nightTheme();

        that.startDate = new Date();
        that.fixSizes();
    }

    public static mouseMove(that, mouseEventData) {
      that.mouseX = Math.round((mouseEventData.clientX - 225 - that.xAdd)/that.factor);
      that.mouseY = Math.round((mouseEventData.clientY - 56 - that.yAdd)/that.factor);
    }

    public static pauseGame(that) {
        if(that.getUid() != '4UF1vLpR0eVL3Lor900jvE716mM2' && that.gauntlet == 0) {
            that.pause = !that.pause;
            if(that.pause == true) {
                that.timesPaused++;
                that.drawBackground();
            } else { 
                that.draw();
            }
        }
    }

    public static back(that) {
        that.nightTheme();
        that.router.navigate(['mainMenu']);
    }

    public static newBoard(that) {
        var numNodes = Number(that.route.snapshot.paramMap.get('numNodes'));
        if(numNodes === 0) {
            numNodes = Math.floor(Math.sqrt(that.width * that.height)) * 2;
        }
        that.seed = 0;


        that.timePaused = 0;
        that.startPause = null;
        that.generateFairBoard(numNodes);
        that.name = "";
        that.millis = 0;
        that.seconds = 0;
        that.minutes = 0;
        that.hours = 0;
        if(that.solved) {
            that.solved = false;
            that.timer();
        }

        that.solved = false;

        that.startDate = new Date();
        that.draw();
    }

    public static generateFairBoard(that, numNodes) {
        var min = 0;
        var max = 0;
        if(that.width == 40 && that.height == 40 && numNodes == 500000 && !that.extreme) {
            //board = "40x40hard";
            min = 190;
            max = 220;
        } else if(that.width == 7 && that.height == 7 && numNodes == 14) {
            //board = "7x7easy";
            min = 7;
            max = 7;
        }  else if(that.width == 7 && that.height == 7 && numNodes == 21) {
            //board = "7x7medium";
            min = 7;
            max = 7;
        } else if(that.width == 15 && that.height == 15 && numNodes == 30) {
            //board = "15x15easy";
            min = 30;
            max = 30;
        } else if(that.width == 15 && that.height == 15 && numNodes == 45) {
            //board = "15x15medium";
            min = 32;
            max = 36;
        } else if(that.width == 25 && that.height == 25 && numNodes == 50) {
            //board = "25x25easy";
            min = 50;
            max = 50;
        } else if(that.width == 40 && that.height == 40 && numNodes == 80) {
            //board = "40x40easy";
            min = 80;
            max = 80;
        } else if(that.width == 40 && that.height == 40 && numNodes == 120) {
            //board = "40x40medium";
            min = 110;
            max = 130;
        } else if(that.width == 100 && that.height == 100 && numNodes == 200) {
            //board = "100x100easy";
        } else if(that.width == 100 && that.height == 100 && numNodes == 300) {
            //board = "100x100medium";
        } else if(that.width == 25 && that.height == 25 && numNodes == 75) {
            //board = "25x25medium";
            min = 68;
            max = 80;
        } else if(that.width == 7 && that.height == 7 && numNodes == 500000 && !that.extreme) {
            //board = "7x7hard";
            min = 7;
            max = 7;
        } else if(that.width == 7 && that.height == 7 && numNodes == 500000 && that.extreme) {
            //board = "7x7extreme";
            min = 8;
            max = 8;
        } else if(that.width == 10 && that.height == 10 && numNodes == 20 && !that.extreme) {
            //board = "10x10easy";
            min = 13;
            max = 15;
        } else if(that.width == 10 && that.height == 10 && numNodes == 30 && !that.extreme) {
            //board = "10x10medium";
            min = 15;
            max = 17;
        } else if(that.width == 10 && that.height == 10 && numNodes == 500000 && !that.extreme) {
            //board = "10x10hard";
            min = 15;
            max = 17;
        } else if(that.width == 10 && that.height == 10 && numNodes == 500000 && that.extreme) {
            //board = "10x10extreme";
            min = 19;
            max = 21;
        } else if(that.width == 60 && that.height == 60 && numNodes == 120 && !that.extreme) {
            //board = "60x60easy";
        } else if(that.width == 60 && that.height == 60 && numNodes == 180 && !that.extreme) {
            //board = "60x60medium";
        } else if(that.width == 60 && that.height == 60 && numNodes == 500000 && !that.extreme) {
            //board = "60x60hard";
        } else if(that.width == 60 && that.height == 60 && numNodes == 500000 && that.extreme) {
            //board = "60x60extreme";
        } else if(that.width == 25 && that.height == 25 && that.extreme) {
            //board = "25x25extreme";
        } else if(that.width == 15 && that.height == 15 && numNodes == 500000 && !that.extreme) {
            //board = "15x15hard";
            min = 38;
            max = 42;
        } else if(that.width == 100 && that.height == 100 && numNodes == 500000 && !that.extreme) {
            //board = "100x100hard";
        } else if(that.width == 100 && that.height == 100 && that.extreme) {
            //board = "100x100extreme";
        } else if(that.width==15 && that.height == 15 && that.extreme) {
            //board = "15x15extreme";
        } else if(that.width==40 && that.height == 40 && that.extreme) {
            //board = "40x40extreme";
        } else if(that.width==25 && that.height==25 && !that.extreme && numNodes == 500000) {
            //board = "25x25hard";
            min = 82;
            max = 94;
        }

        if(min != 0 && max != 0) {
            that.board = new Board(that.width, that.height, numNodes, that.extreme, 0, null, null, null, null, null, that.gauntlet, null);
            that.board.generateBoard();
            while(that.board.nodes.length < min || that.board.nodes.length > max) {
                that.board = new Board(that.width, that.height, numNodes, that.extreme, 0, null, null, null, null, null, that.gauntlet, null);
                that.board.generateBoard();
            }
        } else {
            that.board = new Board(that.width, that.height, numNodes, that.extreme, 0, null, null, null, null, null, that.gauntlet, null);
            that.board.generateBoard();
        }
        
        that.version = that.board.version;
    }

}
