import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../services/user/user.service';
import { TunnelService } from '../services/tunnel/tunnel.service';
import { GameID } from '../enums/game-id.enum';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { LoaderService } from '../services/loading-service/loader.service';
import { SettingsService } from '../services/persistence/settings.service';
import { Game } from '../classes/game';
import { GameListAllService } from '../services/games/game-list-all.service';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-leaderboards',
  templateUrl: './leaderboards.component.html',
  styleUrls: ['./leaderboards.component.scss']
})
export class LeaderboardsComponent implements OnInit {
  games: Game[] = GameListAllService.games;

  footer: any = [];
  resetDate: any;
  leaderboards: MatTableDataSource<any>[];

  leaderboard = 0;
  leaderboardName = 'Daily';
  leaderboardDifficulty = 0;
  leaderboardColumns: string[] = [
    'rowIndex',
    'username',
    'goldMedals',
    'silverMedals',
    'bronzeMedals',
    'time'
  ];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  pageSize = 25;
  pageSizeOptions: number[] = [5, 10, 25];

  gameID: number;
  username = '';

  constructor(
    private route: ActivatedRoute,
    private loader: LoaderService,
    private router: Router,
    private tunnel: TunnelService,
    private user: UserService,
    private titleService: Title
  ) { }

  updateTitle() {
    console.log('update-title');
    console.log(this.gameID);
    this.titleService.setTitle(this.getGameName(this.gameID) + ' Leaderboards - Puzzle Hub');
  }

  getGameName(id) {
    for (let game of this.games) {
      if (game.id === id) {
        return game.name;
      }
    }

    return '';
  }

  getGameDiffs(id) {
    for (let game of this.games) {
      if (game.id === id) {
        return game.diffs;
      }
    }

    return '';
  }

  ngOnInit() {
    console.log('ngoninit');
    this.username = this.user.user;
    this.user.username
      .subscribe( (data) => {
        this.username = data;
      });
    this.gameID = SettingsService.getDataNum('selectedGameID');
    this.leaderboard = SettingsService.getDataNum('selectedLeaderboard');
    this.leaderboardDifficulty = SettingsService.getDataNum('selectedLeaderboardDifficulty');

    this.updateTitle();

    this.countDownTimer();

    if (this.leaderboard === 0) {
      this.leaderboardName = 'Daily';
    } else if (this.leaderboard === 1) {
      this.leaderboardName = 'Weekly';
    } else if (this.leaderboard === 2) {
      this.leaderboardName = 'Monthly';
    }
    this.loadScores();
  }

  decrementTimer(that) {
    const display = document.getElementById('leaderboardstimer');
    const now = +new Date();

    const diff = ((that.resetDate - now));
    const hours   = Math.trunc(diff / (60 * 60 * 1000));
    const minutes = Math.trunc(diff / (60 * 1000)) % 60;
    const seconds = Math.trunc(diff / (1000)) % 60;

    try {
      display.textContent =
        hours + ':' +
        (minutes ? (minutes > 9 ? minutes : '0' + minutes) : '00') + ':' +
        (seconds ? (seconds > 9 ? seconds : '0' + seconds) : '00');

      that.countDownTimer();
    } catch {
      // Do nothing - page probably re-routed
    }
  }

  countDownTimer() {
    this.resetDate = new Date();
    if (this.leaderboard === 0) {
      this.resetDate.setDate(this.resetDate.getDate() + 1);
      this.resetDate.setUTCHours(5, 0, 0, 0);

      const date = +new Date();
      const diff = (this.resetDate - date);
      if (diff > 86400000) {
        this.resetDate.setDate(this.resetDate.getDate() - 1);
        this.resetDate.setUTCHours(5, 0, 0, 0);
      }
    } else if (this.leaderboard === 1) {

      let friday = this.resetDate.getDate() + (13 - this.resetDate.getDay()) % 7;
      if (this.resetDate.getDay() === 6) {
        friday = friday + 7;
      }

      this.resetDate.setHours(0, 0, 0, 0);
      this.resetDate.setUTCHours(5, 0, 0, 0);
      this.resetDate.setDate(friday);

    } else if (this.leaderboard === 2) {
      const newMonth = this.resetDate.getMonth() + 1;
      this.resetDate.setDate(1);
      this.resetDate.setMonth(
        newMonth
      );


      this.resetDate.setUTCHours(5, 0, 0, 0);
      this.resetDate.setDate(1);
    }

    const _this = this;
    setTimeout(function() {
      _this.decrementTimer(_this);
    },
      50
    );
  }

  changeLeaderboard(num) {
    this.leaderboard = num;
    SettingsService.storeData('selectedLeaderboard', num);
    if (num === 0) {
      this.leaderboardName = 'Daily';
    } else if (num === 1) {
      this.leaderboardName = 'Weekly';
    } else if (num === 2) {
      this.leaderboardName = 'Monthly';
    }
    this.loadScores();
  }

  setLeaderboardDifficulty(n) {
    this.leaderboardDifficulty = n;
    SettingsService.storeData('selectedLeaderboardDifficulty', n);
  }

  loadScores() {
    this.loader.startLoadingAnimation();
    this.leaderboards = [];
    this.footer = [];

    for (let i = 1 ; i <= 4 ; i++) {
      const m = {
        'GameID': this.gameID,
        'Difficulty': i,
        'Leaderboard': this.leaderboard
      };

      this.tunnel.getLeaderboards(m)
        .subscribe( (data: any) => {

          console.log(data);
          try {
            if (data.length > 0 && (data[data.length - 1])['position'] === 0) {
              this.footer[i] = data.pop();
            }
          } catch { /* This is fine. There just aren't any times! */ }

          this.loader.stopLoadingAnimation();
          console.log(data);
          this.leaderboards[m['Difficulty']] = new MatTableDataSource(data as any);
          this.leaderboards[m['Difficulty']].paginator = this.paginator;
          this.leaderboards[m['Difficulty']].sort = this.sort;
        });
    }
  }

  hasMedals(user) {
    return user.bronzeMedals > 0 || user.silverMedals > 0 || user.goldMedals > 0;
  }

  setGame(id) {
    this.gameID = id;
    this.updateTitle();
    SettingsService.storeData('selectedGameID', id);
    this.loadScores();
  }

  viewProfile(name) {
    const m = {
      user: name
    };

    this.router.navigate(['profile'], {queryParams: m});
  }

  getEnum(name) {
    return GameID[name];
  }

  logLeaderboards() {
    console.log(this.leaderboards);
  }

}
