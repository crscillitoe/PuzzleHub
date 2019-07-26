import { Inject, PLATFORM_ID, Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../services/user/user.service';
import { isPlatformBrowser } from '@angular/common';
import { TunnelService } from '../services/tunnel/tunnel.service';
import { GameID } from '../enums/game-id.enum';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { LoaderService } from '../services/loading-service/loader.service';
import { SettingsService } from '../services/persistence/settings.service';
import { Game } from '../classes/game';
import { GameListAllService } from '../services/games/game-list-all.service';
import { SharedFunctionsService } from '../services/shared-functions/shared-functions.service';
import { forkJoin } from 'rxjs';
import { MetaService } from '../services/meta.service';

@Component({
  selector: 'app-leaderboards',
  templateUrl: './leaderboards.component.html',
  styleUrls: ['./leaderboards.component.scss']
})
export class LeaderboardsComponent implements OnInit, OnDestroy {
  games: Game[] = GameListAllService.games;

  resetDate: any;

  leaderboardData: any[] = [];
  leaderboardEntries: number[] = [];
  leaderboardCurrentPage: number[] = [];
  leaderboardPages: number[] = [];

  private _leaderboardPageGroupSize = 5;
  leaderboardPageGroup: number[][] = [];

  footerData: any[] = [];

  private _leaderboard = 0;
  leaderboardName = 'Daily';
  private _leaderboardDifficulty = 1;

  pageSize = 25;
  pageSizeOptions: number[] = [5, 10, 25];
  username = '';

  userPuzzlerIcon: number;

  private _gameID: number;

  get gameID(): number {
    return this._gameID;
  }
  set gameID(id: number) {
    this._gameID = id;
    this.updateMeta();
    if(isPlatformBrowser(this.platformId)) {
      SettingsService.storeData('selectedGameID', id);
    }
    this.loadLeaderboard();
  }

  get leaderboardDifficulty(): number {
    return this._leaderboardDifficulty;
  }
  set leaderboardDifficulty(n: number) {
    this._leaderboardDifficulty = n;
    if(isPlatformBrowser(this.platformId)) {
      SettingsService.storeData('selectedLeaderboardDifficulty', n);
    }
    this.loadLeaderboard();
  }

  get leaderboard(): number {
    return this._leaderboard;
  }
  set leaderboard(num: number) {
    this._leaderboard = num;
    if(isPlatformBrowser(this.platformId)) {
      SettingsService.storeData('selectedLeaderboard', num);
    }
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
    @Inject(PLATFORM_ID) private platformId: Object,
    private route: ActivatedRoute,
    private loader: LoaderService,
    private router: Router,
    private tunnel: TunnelService,
    private user: UserService,
    private meta: MetaService
  ) { 
    user.accountData.subscribe(accountData => {
      if (accountData) {
        this.userPuzzlerIcon = accountData.puzzlerIcon;
      }
    });
  }

  getGameName(id: number) {
    for (const game of this.games) {
      if (game.id === id) {
        return game.name;
      }
    }

    return ''
  }

  updateMeta() {
    this.meta.leaderboardsTags(this.gameID);
  }

  getGameDiffs(id) {
    for (const game of this.games) {
      if (game.id === id) {
        return game.diffs;
      }
    }

    return '';
  }

  getLongestLength() {
    let toReturn = 0;
    for (let i = 0 ; i < this.leaderboardData.length ; i++) {
      if (this.leaderboardData[i]) {
        if (this.leaderboardData[i].length > toReturn) {
          if (this.footerData[i] != null && this.footerData[i].length > 0) {
            toReturn = this.leaderboardData[i].length;
          } else {
            toReturn = this.leaderboardData[i].length - 1;
          }
        }
      }
    }

    return toReturn;
  }

  getLeftoverBlankRows(diff) {
    if (this.leaderboardData[diff]) {
      const maxLen = this.getLongestLength();
      if (this.leaderboardData[diff].length >= maxLen) {
        return [];
      } else {
        let toReturn = [];
        for (let i = 0 ; i < maxLen - this.leaderboardData[diff].length ; i++) {
          toReturn.push(1);
        }

        return toReturn;
      }
    }

    return [];
  }

  ngOnDestroy() {
    this.meta.defaultTags()
  }

  ngOnInit() {
    this.user.accountData
      .subscribe( (data) => {
        if (data) {
          this.username = data.username;
        }
      });

    if(isPlatformBrowser(this.platformId)) {
      this.gameID = SettingsService.getDataNum('selectedGameID');
      this.leaderboard = SettingsService.getDataNum('selectedLeaderboard');
      this.leaderboardDifficulty = SettingsService.getDataNum('selectedLeaderboardDifficulty');
    } else {
      this.gameID = 1;
      this.leaderboard = 1;
      this.leaderboardDifficulty = 1;
    }

    this.updateMeta();

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
    if(isPlatformBrowser(this.platformId)) {
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
    this.loader.startLoadingAnimation();

    this.leaderboardData = [];
    this.leaderboardEntries = [];
    this.leaderboardCurrentPage = [];
    this.footerData = [];

    let httpRequests = [];

    for (const diff of this.getGameDiffs(this.gameID)) {
      const m = {
        'Position': 0,
        'NumEntries': (this.pageSize),
        'GameID': this.gameID,
        'Difficulty': diff['diff'],
        'Leaderboard': this.leaderboard
      };

      const m2 = {
        'GameID': this.gameID,
        'Difficulty': diff['diff'],
        'Leaderboard': this.leaderboard
      };

      this.leaderboardCurrentPage[diff['diff']] = 1;
      httpRequests.push(this.tunnel.getLeaderboards(m));
      httpRequests.push(this.tunnel.getNumEntries(m));
      httpRequests.push(this.tunnel.getFooter(m2));
    }

    forkJoin(httpRequests)
      .subscribe(responses => {
        for (var count = 0 ; count < responses.length ; count++) {
          let data = responses[count];

          if ( count % 3 === 0 ) {
            // get leaderboards
            const diff = this.getGameDiffs(this.gameID)[count/3];
            for (let i = 0; i < data.length; i++) {
              (data[i])['time'] = SharedFunctionsService.convertToDateString((data[i])['time']);
            }

            this.leaderboardData[diff['diff']] = data;
          } else if ( count % 3 === 1 ) {
            // get num entries
            const diff = this.getGameDiffs(this.gameID)[(count - 1)/3];
            try {
              if (data.NumEntries > 0) {
                this.leaderboardEntries[diff['diff']] = data.NumEntries;
                this.leaderboardPages[diff['diff']] = Math.ceil(data.NumEntries / this.pageSize);
                this.fillPageGroup(diff['diff'], 1);
              }
            } catch (e) { /* This try/catch is might be pointless */ }
          } else if ( count % 3 === 2) {
            // get footer
            const diff = this.getGameDiffs(this.gameID)[(count - 2)/3];
            try {
              if (data[0]) {
                (data[0])['time'] = SharedFunctionsService.convertToDateString((data[0])['time']);
              }
            } catch { }
            this.footerData[diff['diff']] = data;
          }
        } 

        this.loader.stopLoadingAnimation();
      })
  }

  fillPageGroup(diff: any, seed: number) {
    const len = this._leaderboardPageGroupSize;
    const offset = Math.floor(len / 2);
    const start = (seed - offset > 0) ? seed - offset : 1;
    const end = Math.min(start + len, this.leaderboardPages[diff]);
    const groupLen = end - start + 1;
    this.leaderboardPageGroup[diff] = Array(groupLen).fill(0, 0, groupLen).map((x, i) => i + start);
  }

  pageChange(diff: any, page: number) {
    const m = {
      'Position': (page - 1) * this.pageSize,
      'NumEntries': (this.pageSize),
      'GameID': this.gameID,
      'Difficulty': diff,
      'Leaderboard': this.leaderboard
    };

    this.leaderboardCurrentPage[diff] = page;

    this.tunnel.getLeaderboards(m).subscribe( (data: any) => {
      for (let i = 0; i < data.length; i++) {
        (data[i])['time'] = SharedFunctionsService.convertToDateString((data[i])['time']);
      }

      this.leaderboardData[diff] = data;
    });
    this.fillPageGroup(diff, page);
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
