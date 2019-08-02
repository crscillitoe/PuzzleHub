import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TunnelService } from '../services/tunnel/tunnel.service';
import { Router } from '@angular/router';
import { GameDataService } from '../services/games/game-data.service';
import { SharedFunctionsService } from '../services/shared-functions/shared-functions.service';
import { MetaService } from '../services/meta.service';
import { IconService } from '../services/icons/icon.service';
import { ProfileData } from '../classes/profile-data';
import { UserService } from '../services/user/user.service';
import { GameID } from '../enums/game-id.enum';

interface GameDifficultyStats {
  'Difficulty': number;
  'Played': number;
}

interface GameStats {
  'GameID': number;
  'GameName': string;
  'GameImage': string;
  'TotalPlayed': number;
  'Difficulties': GameDifficultyStats[];
}

interface GameStatsCollection {
  [key: number]: GameStats;
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {

  searchUsername = '';
  profileFound: boolean;
  username: string;
  profileData: ProfileData;
  games: any = GameDataService.games;
  level: number;
  progress: number;
  favoriteGame: GameStats;
  gameStats: GameStatsCollection;

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
    private router: Router,
    private route: ActivatedRoute,
    private tunnel: TunnelService,
    private meta: MetaService,
    private iconService: IconService,
    private user: UserService
  ) { }

  searchUser(username: string = this.searchUsername) {
    const m = {
      user: username
    };

    this.username = username;
    this.router.navigate(['profile'], {queryParams: m});
    this.loadUser(username);
  }

  ngOnDestroy() {
    this.meta.defaultTags();
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.username = params['user'];

      this.loadUser(this.username);

    });
  }

  loadUser(username: string) {
    const m = {
      'Username': username
    };
    this.gameStats = {};
    this.favoriteGame = undefined;

    this.tunnel.getProfileData(m)
      .subscribe((data: ProfileData) => {
        try {
          this.profileFound = (<any>data).length !== 0;
        } catch (e) {
          this.profileFound = true;
        }

        if (this.profileFound) {
          for (let i = 0 ; i < data.MatchHistory.length ; i++) {
            (data.MatchHistory[i]).TimeElapsed = SharedFunctionsService.convertToDateString((data.MatchHistory[i]).TimeElapsed);
          }

          this.profileData = Object.assign(new ProfileData(this.user), data as ProfileData);

          let gid: number;
          let gameDiff: number;
          let gamesPlayed: number;

          for (let i = 0; i < this.profileData.GamesPlayed.length; i++) {
            gid = this.profileData.GamesPlayed[i].GameID;
            gameDiff = this.profileData.GamesPlayed[i].Difficulty;
            gamesPlayed = this.profileData.GamesPlayed[i].GamesPlayed;

            if (gid === GameID.MINESWEEPER) {
              continue; // Skip Minesweeper
            }

            let g: GameStats = {
              'GameID': gid,
              'GameName': this.getGameName(gid),
              'GameImage': this.getGameImage(gid),
              'TotalPlayed': 0,
              'Difficulties': []
            };

            if (this.gameStats[gid] === undefined) {
              this.gameStats[gid] = g;
            } else {
              g = this.gameStats[gid];
            }

            g.TotalPlayed += gamesPlayed;

            const d: GameDifficultyStats = {
              'Difficulty': gameDiff,
              'Played': gamesPlayed
            };

            g.Difficulties.push(d);
          }
          // console.log(this.gameStats);

          for (const gameID in this.gameStats) {
            if (this.favoriteGame === undefined || this.favoriteGame.TotalPlayed < this.gameStats[gameID].TotalPlayed) {
              this.favoriteGame = this.gameStats[gameID];
            }
          }
          this.meta.profileTags(this.profileData);
        }
      });
  }

  getColor() {
    return this.iconService.getIconColor(this.profileData.PuzzlerIcon);
  }

  getAccentColor() {
    return this.iconService.getIconAccentColor(this.profileData.PuzzlerIcon);
  }

  convertDate(dateStr: string) {
    return new Date(dateStr + 'Z');
  }

  public getGameName(id: number): string {
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

  public getGameImage(id: number): string {
    for (let i = 0 ; i < this.games.length ; i++) {
      if ((this.games[i])['GameID'] === id) {
        return (this.games[i])['Image'];
      }
    }
  }

  public getGameStatsKeys(): Array<string> {
    return Object.keys(this.gameStats);
  }

  getDifficulty(num: number) {
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

  @HostListener('document:keydown', ['$event'])
  keyPressed(keyEvent: KeyboardEvent) {
    if (keyEvent.keyCode === 13 && this.searchUsername !== '') {
      this.searchUser(this.searchUsername.trim());
      this.searchUsername = '';
      document.getElementById('findAccount').blur();
    }
  }
}
