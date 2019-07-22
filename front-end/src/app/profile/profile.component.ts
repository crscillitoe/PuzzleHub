import { PLATFORM_ID, Inject, Component, OnInit, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TunnelService } from '../services/tunnel/tunnel.service';
import { Router } from '@angular/router';
import { GameDataService } from '../services/games/game-data.service';
import { UserService } from '../services/user/user.service';
import { SharedFunctionsService } from '../services/shared-functions/shared-functions.service';
import { Title } from '@angular/platform-browser';
import { IconService } from '../services/icons/icon.service';
import { pipe, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  searchUsername: string = '';
  profileFound: boolean;
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

  puzzlerIconID: number;
  medalPath = '/assets/images/medals/';

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router,
    private route: ActivatedRoute,
    private tunnel: TunnelService,
    private user: UserService,
    private titleService: Title,
    private iconService: IconService
  ) { }

  getLevel(xp) {
    return this.user.calculateLevelFromXp(xp);
  }

  xpToNextLevel() {
    return this.profileData.XP % this.user.xpPerLevel;
  }

  nextLevelThreshold() {
    return this.user.xpPerLevel;
  }

  getProgress() {
    return Math.floor((this.currVal / this.maxVal) * 100);
  }

  searchUser(username: string = this.searchUsername) {
    const m = {
      user: username
    };

    this.router.navigate(['profile'], {queryParams: m});
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.username = params['user'];
      this.titleService.setTitle(this.username + '\'s Profile - Puzzle Hub');

      const m = {
        'Username': this.username
      };

      this.tunnel.getProfileData(m)
        .subscribe(data => {
          try {
            this.profileFound = (<any>data).length !== 0;
          } catch (e) {
            this.profileFound = true;
          }

          if (this.profileFound) {
            for (let i = 0 ; i < data.MatchHistory.length ; i++) {
              (data.MatchHistory[i]).TimeElapsed = SharedFunctionsService.convertToDateString((data.MatchHistory[i]).TimeElapsed);
            }

            this.profileData = data;

            this.puzzlerIconID = data.PuzzlerIcon;

            this.iconService.configureProfileBarColors(data.PuzzlerIcon);

            this.level = this.getLevel(this.profileData.XP);
            this.currVal = this.xpToNextLevel();
            this.maxVal = this.nextLevelThreshold();
            this.progress = this.getProgress();
          }
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

  @HostListener('document:keydown', ['$event'])
  keyPressed(keyEvent) {
    if (keyEvent.keyCode === 13 && this.searchUsername !== '') {
      this.searchUser(this.searchUsername.trim());
      this.searchUsername = '';
      document.getElementById("findAccount").blur();
    }
  }
}
