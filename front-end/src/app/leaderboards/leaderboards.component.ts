import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user/user.service';
import { TunnelService } from '../services/tunnel/tunnel.service';
import { GameID } from '../enums/game-id.enum';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { LoaderService } from '../services/loading-service/loader.service';
import { SettingsService } from '../services/persistence/settings.service';
import { GameDataService } from '../services/games/game-data.service';

@Component({
  selector: 'app-leaderboards',
  templateUrl: './leaderboards.component.html',
  styleUrls: ['./leaderboards.component.css']
})
export class LeaderboardsComponent implements OnInit {
  games: any = GameDataService.games;

  leaderboards: any;

  difficulties: any = [
    'Easy',
    'Medium',
    'Hard',
    'Extreme'
  ]

  leaderboard: number = 0;
  leaderboardName: string = "Daily";

  gameID: number;
  username: string = "";

  constructor(
    private route: ActivatedRoute, 
    private loader: LoaderService,
    private router: Router,
    private tunnel: TunnelService,
    private user: UserService
  ) { 
  }

  getGameName(id) {
    for(let game of this.games) {
      if(game['GameID'] == id) {
        return game['Name'];
      }
    }

    return '';
  }

  ngOnInit() {
    this.username = this.user.user;
    this.user.username
      .subscribe( (data) => {
        this.username = data;
      });
    this.gameID = SettingsService.getDataNum('selectedGameID');
    this.leaderboard = SettingsService.getDataNum('selectedLeaderboard');
    if(this.leaderboard == 0) {
      this.leaderboardName = 'Daily';
    } else if(this.leaderboard == 1) {
      this.leaderboardName = 'Weekly';
    } else if(this.leaderboard == 2) {
      this.leaderboardName = 'Monthly';
    }
    this.loadScores();
  }

  changeLeaderboard(num) {
    this.leaderboard = num;
    SettingsService.storeData('selectedLeaderboard', num);
    if(num == 0) {
      this.leaderboardName = 'Daily';
    } else if(num == 1) {
      this.leaderboardName = 'Weekly';
    } else if(num == 2) {
      this.leaderboardName = 'Monthly';
    }
    this.loadScores();
  }

  loadScores() {
    this.loader.startLoadingAnimation();
    this.leaderboards = {};

    for(var i = 1 ; i <= 4 ; i++) {
      let m = {
        "GameID":this.gameID,
        "Difficulty":i,
        "Leaderboard":this.leaderboard
      }

      this.tunnel.getLeaderboards(m)
        .subscribe( (data) => {
          console.log(data);
          var that = this;
          setTimeout(function() {
            that.loader.stopLoadingAnimation()
            that.leaderboards[m['Difficulty']] = data;
          }, 500);
        });
    }
  }

  hasMedals(user) {
    return user.bronzeMedals > 0 || user.silverMedals > 0 || user.goldMedals > 0
  }

  setGame(id) {
    this.gameID = id;
    SettingsService.storeData('selectedGameID', id);
    this.loadScores();
  }

  viewProfile(name) {
    let m = {
      user: name
    }

    this.router.navigate(['profile'], {queryParams: m});
  }

  getEnum(name) {
    return GameID[name];
  }

  logLeaderboards() {
    console.log(this.leaderboards);
  }

}
