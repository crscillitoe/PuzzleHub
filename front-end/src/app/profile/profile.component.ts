import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TunnelService } from '../services/tunnel/tunnel.service';
import { Router } from '@angular/router';
import { GameDataService } from '../services/games/game-data.service';
import { SharedFunctionsService } from '../services/shared-functions/shared-functions.service';
import { MetaService } from '../services/meta/meta.service';
import { IconService } from '../services/icons/icon.service';
import { ProfileData } from '../classes/profile-data';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {

  searchUsername: string = '';
  profileFound: boolean;
  username: string;
  profileData: ProfileData;
  games: any = GameDataService.games;
  level: number;
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

  medalPath = '/assets/images/medals/';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private tunnel: TunnelService,
    private meta: MetaService,
    private iconService: IconService,
  ) { }

  searchUser(username: string = this.searchUsername) {
    const m = {
      user: username
    };

    this.router.navigate(['profile'], {queryParams: m});
  }

  ngOnDestroy() {
    this.meta.defaultTags();
  }

  ngOnInit() {
    this.route.data.subscribe((data: {profileData: ProfileData}) => {
      this.profileData = data.profileData;
      if (this.profileData.Username === undefined){
        this.profileFound = false;
        return;
      }
      this.profileFound = true;
      for (let i = 0 ; i < this.profileData.MatchHistory.length ; i++) {
        (this.profileData.MatchHistory[i]).TimeElapsed = SharedFunctionsService.convertToDateString((this.profileData.MatchHistory[i]).TimeElapsed);
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

  getGameName(id: number) {
    for (let i = 0 ; i < this.games.length ; i++) {
      if ((this.games[i])['GameID'] === id) {
        return (this.games[i])['Name'];
      }
    }
  }

  loadMore() {
    const m = {
      'Username': this.profileData.Username,
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

  getGameImage(id: number) {
    for (let i = 0 ; i < this.games.length ; i++) {
      if ((this.games[i])['GameID'] === id) {
        return (this.games[i])['Image'];
      }
    }
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
      document.getElementById("findAccount").blur();
    }
  }
}
