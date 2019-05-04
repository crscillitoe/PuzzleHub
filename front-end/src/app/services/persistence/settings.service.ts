import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  static defaults: any = {
    "takuzuGrid":true,
    "takuzuInvert":false,
    "tileAnimations":true,
    "selectedGameID":5,
    "selectedLeaderboard":0,
    "selectedLeaderboardDifficulty": 0,
    "rulesMinimized":false,
    "optionsMinimized":true,
    "controlsMinimized":true,
    "highscoresMinimized":false,
    "timerMinimized":false,
    "hotkeysMinimized":true,
    "HoverTileGame":false,
    "TileGameUP":83,
    "TileGameDOWN":87,
    "TileGameLEFT":68,
    "TileGameRIGHT":65,
    "StaticTileSize":false,
    "TileGameColorScheme":'Fringe'
  };

  constructor() { }

  static getDataStr(name) {
    var toReturn = localStorage.getItem(name);

    if(toReturn == null) {
      return this.defaults[name];
    } else {
      return toReturn;
    }
  }

  static getDataNum(name) {
    var toReturn = localStorage.getItem(name);

    if(toReturn == null) {
      return this.defaults[name];
    } else {
      return Number(toReturn);
    }
  }

  static getDataBool(name) {
    var toReturn = localStorage.getItem(name);

    if(toReturn == null) {
      return this.defaults[name];
    } else {
      return toReturn == 'true';
    }
  }

  static storeData(name, value) {
    localStorage.setItem(name, '' + value);
  }
}
