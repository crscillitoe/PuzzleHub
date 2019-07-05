import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TunnelService } from '../services/tunnel/tunnel.service';
import { GameDataService } from '../services/games/game-data.service';
import { UserService } from '../services/user/user.service';
import { SharedFunctionsService } from '../services/shared-functions/shared-functions.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  username: string;
  profileData: any;
  games: any = GameDataService.games;
  level: number;
  currVal: number;
  maxVal: number;
  progress: number;

  medalTypes = [
    'Daily',
    'Weekly',
    'Monthly'
  ];
  medalNames = [
    'Gold',
    'Silver',
    'Bronze'
  ];

  userPuzzlerIconPath = '/assets/images/puzzler-icons/puzzle-hub-profile-';
  medalPath = '/assets/images/medals/';

  constructor(
    private route: ActivatedRoute,
    private tunnel: TunnelService,
    private user: UserService,
    private titleService: Title
  ) { }

  getLevel(xp) {
    return this.user.calculateLevelFromXp(xp);
  }

  xpToNextLevel() {
    return this.user.xpToNextLevel();
  }

  nextLevelThreshold() {
    return UserService.nextLevelThreshold();
  }

  getProgress() {
    return Math.floor((this.currVal / this.maxVal) * 100);
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.username = params['user'];
      this.titleService.setTitle(this.username + '\'s Profile - Puzzle Hub');

      const m = {
        'Username': this.username
      };

      this.tunnel.getProfileData(m)
        .subscribe( (data: any) => {
          for (let i = 0 ; i < data.MatchHistory.length ; i++) {
            (data.MatchHistory[i])['TimeElapsed'] = SharedFunctionsService.convertToDateString((data.MatchHistory[i])['TimeElapsed']);
          }

          this.profileData = data;
          this.userPuzzlerIconPath += data.PuzzlerIcon + '.png';
          this.level = this.getLevel(this.profileData.XP);
          this.currVal = this.xpToNextLevel();
          this.maxVal = this.nextLevelThreshold();
          this.progress = this.getProgress();
        });
    });
  }

  convertDate(dateStr) {
    return new Date(dateStr + 'Z');
  }

  getGameName(id) {
    for (let i = 0 ; i < this.games.length ; i++) {
      if ((this.games[i])['GameID'] === id) {
        return (this.games[i])['Name'];
      }
    }
  }

  loadMore() {
    const m = {
      'Username': this.username,
      'Offset': this.profileData.MatchHistory.length
    };

    this.tunnel.getMoreMatchHistory(m)
      .subscribe( (data: any) => {
        for (let i = 0 ; i < data.length ; i++) {
          (data[i])['TimeElapsed'] = SharedFunctionsService.convertToDateString((data[i])['TimeElapsed']);
        }
        this.profileData.MatchHistory = this.profileData.MatchHistory.concat(data);
      });
  }

  getGameImage(id) {
    for (let i = 0 ; i < this.games.length ; i++) {
      if ((this.games[i])['GameID'] === id) {
        return (this.games[i])['Image'];
      }
    }
  }

  getDifficulty(num) {
    switch (num) {
      case 1:
        return 'Easy';
      case 2:
        return 'Medium';
      case 3:
        return 'Hard';
      case 4:
        return 'Extreme';
    }
  }
}
