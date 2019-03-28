import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TunnelService } from '../services/tunnel/tunnel.service';
import { GameDataService } from '../services/games/game-data.service';
import { UserService } from '../services/user/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  username: string;
  profileData: any;
  games: any = GameDataService.games;

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

  medalPath = '/assets/images/medals/';

  constructor(
    private route: ActivatedRoute,
    private tunnel: TunnelService,
    private user: UserService
  ) { }

  getLevel(xp) {
    return this.user.calculateLevelFromXp(xp);
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.username = params['user'];

      const m = {
        'Username': this.username
      };

      this.tunnel.getProfileData(m)
        .subscribe( (data) => {
          this.profileData = data;
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
      .subscribe( (data) => {
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
