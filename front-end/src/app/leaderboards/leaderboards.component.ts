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
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { Title } from '@angular/platform-browser';
import { SharedFunctionsService } from '../services/shared-functions/shared-functions.service';

@Component({
  selector: 'app-leaderboards',
  templateUrl: './leaderboards.component.html',
  styleUrls: ['./leaderboards.component.scss']
})
export class LeaderboardsComponent implements OnInit {
  games: Game[] = GameListAllService.games;

  resetDate: any;

  leaderboardData: MatTableDataSource<any> = new MatTableDataSource();
  footerData: any;

  private _leaderboard = 0;
  leaderboardName = 'Daily';
  private _leaderboardDifficulty = 1;
  leaderboardColumns: string[] = [
    'rowIndex',
    'username',
    'goldMedals',
    'silverMedals',
    'bronzeMedals',
    'time'
  ];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  pageSize = 25;
  pageSizeOptions: number[] = [5, 10, 25];
  username = '';

  private _gameID: number;

  get gameID(): number {
    return this._gameID;
  }
  set gameID(id: number) {
    this._gameID = id;
    this.updateTitle();
    SettingsService.storeData('selectedGameID', id);
    this.loadLeaderboard();
  }

  get leaderboardDifficulty(): number {
    return this._leaderboardDifficulty;
  }
  set leaderboardDifficulty(n: number) {
    this._leaderboardDifficulty = n;
    SettingsService.storeData('selectedLeaderboardDifficulty', n);
    this.loadLeaderboard();
  }

  get leaderboard(): number {
    return this._leaderboard;
  }
  set leaderboard(num: number) {
    this._leaderboard = num;
    SettingsService.storeData('selectedLeaderboard', num);
    if (num === 0) {
      this.leaderboardName = 'Daily';
    } else if (num === 1) {
      this.leaderboardName = 'Weekly';
    } else if (num === 2) {
      this.leaderboardName = 'Monthly';
    }
    this.loadLeaderboard();
  }

  constructor(
    private route: ActivatedRoute,
    private loader: LoaderService,
    private router: Router,
    private tunnel: TunnelService,
    private user: UserService,
    private titleService: Title
  ) { }

  updateTitle() {
    this.titleService.setTitle(this.getGameName(this.gameID) + ' Leaderboards - Puzzle Hub');
  }

  getGameName(id) {
    for (const game of this.games) {
      if (game.id === id) {
        return game.name;
      }
    }

    return '';
  }

  getGameDiffs(id) {
    for (const game of this.games) {
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
    this.loadLeaderboard();
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

  loadLeaderboard() {
    const m = {
      'Position': 0,
      'NumEntries': (this.paginator.pageSize !== undefined ? this.paginator.pageSize : this.pageSize),
      'GameID': this.gameID,
      'Difficulty': this.leaderboardDifficulty,
      'Leaderboard': this.leaderboard
    };
    this.paginator.pageIndex = 0;

    this.loader.startLoadingAnimation();

    this.tunnel.getLeaderboards(m).subscribe( (data: any) => {
      for (let i = 0 ; i < data.length ; i++) {
        (data[i])['time'] = SharedFunctionsService.convertToDateString((data[i])['time']);
      }

      try {
        if (data.length > 0 && (data[data.length - 1])['position'] === 0) {
          this.footerData = data.pop();
        }
      } catch { /* This is fine. There just aren't any times! */ }

      const tmpData = data;

      this.tunnel.getNumEntries(m).subscribe( (data2: any) => {
        try {
          if (data2.NumEntries > 0) {
            const totalLen = data2.NumEntries;

            /* Filling the array with dummy data accomplishes 2 things:
             * 1. The paginator's length can be set once instead of any time the page changes.
             * 2. The paginator's range values (x-y of z) are accurate when using the last page
             * or first page buttons.
             */
            while (tmpData.length < totalLen) {
              tmpData.push('');
            }

            this.leaderboardData = new MatTableDataSource(tmpData as any);
            this.leaderboardData.paginator = this.paginator;
          }
        } catch { /* This try/catch is might be pointless */ }
      });
    }).add(() => { this.loader.stopLoadingAnimation(); });
    // .add() runs when subscribe has finished
  }

  // Called when the number of pages changes, or when the page changes
  pageEvent(event) {
    const idx = event.pageIndex;
    const sz = event.pageSize;

    const m = {
      'Position': idx * sz,
      'NumEntries': sz,
      'GameID': this.gameID,
      'Difficulty': this.leaderboardDifficulty,
      'Leaderboard': this.leaderboard
    };

    this.pushData(m);
  }

  pushData(m) {
    this.loader.startLoadingAnimation();
    this.tunnel.getLeaderboards(m).subscribe(
      (data: any) => {
        for (let i = 0 ; i < data.length ; i++) {
          (data[i])['time'] = SharedFunctionsService.convertToDateString((data[i])['time']);
        }

        try {
          if (data.length > 0 && (data[data.length - 1])['position'] === 0) {
            this.footerData = data.pop();
          }
        } catch { /* This is fine. There just aren't any times! */ }

        for (let i = 0 ; i < data.length ; i++) {
          // Adding values to their "expected" positions in the array for the paginator
          this.leaderboardData.data[m['Position'] + i] = data[i];
        }
        this.leaderboardData.data = this.leaderboardData.data.slice();
      }
    ).add (() => { this.loader.stopLoadingAnimation(); } );
    // .add() runs when subscribe has finished
  }

  hasMedals(user) {
    return user.bronzeMedals > 0 || user.silverMedals > 0 || user.goldMedals > 0;
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

}
