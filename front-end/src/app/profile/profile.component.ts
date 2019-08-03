import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TunnelService } from '../services/tunnel/tunnel.service';
import { Router } from '@angular/router';
import { GameListAllService } from '../services/games/game-list-all.service';
import { SharedFunctionsService } from '../services/shared-functions/shared-functions.service';
import { MetaService } from '../services/meta/meta.service';
import { IconService } from '../services/icons/icon.service';
import { ProfileData } from '../classes/profile-data';
import { GameID } from '../enums/game-id.enum';
import { Game } from '../classes/game';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GameHistoryComponent } from '../game-history/game-history.component';

interface GameDifficultyStats {
  'Played': number;
}

interface GameStats {
  'GameID': number;
  'GameName': string;
  'GameImage': string;
  'TotalPlayed': number;
  'Difficulties': Map<number, GameDifficultyStats>;
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
  games: any = GameListAllService.games;
  level: number;
  progress: number;

  gameStats: GameStats[];
  favoriteGame: GameStats;
  favoriteDiff: number;

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
    public dialog: MatDialog,
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


      if (this.profileData.Username === undefined) {
        this.profileFound = false;
        return;
      }

      this.profileFound = true;

      for (let i = 0; i < this.profileData.MatchHistory.length ; i++) {
        (this.profileData.MatchHistory[i]).TimeElapsed = SharedFunctionsService.convertToDateString((this.profileData.MatchHistory[i]).TimeElapsed);
      }

      this.setStats();
    });
  }

  setStats() {
    this.gameStats = [];
    this.favoriteGame = undefined;

    for (const game of GameListAllService.games) {
      this.gameStats.push(
        {
          'GameID': game.id,
          'GameName': game.name,
          'GameImage': game.image,
          'TotalPlayed': 0,
          'Difficulties': new Map(),
        });

      for (const d of Object.keys(game.diffs)) {
        this.gameStats[this.gameStats.length - 1].Difficulties.set(game.diffs[d].diff, {
          'Played': 0,
        });
      }
    }

    let favorite = 0;
    let gid: number;
    let gameDiff: number;
    let gamesPlayed: number;

    for (let i = 0; i < this.profileData.GamesPlayed.length; i++) {
      gid = this.profileData.GamesPlayed[i].GameID;
      gameDiff = this.profileData.GamesPlayed[i].Difficulty;
      gamesPlayed = this.profileData.GamesPlayed[i].GamesPlayed;

      if (gid === GameID.MINESWEEPER || gid === GameID.KAKURO) {
        continue;
      }

      let game: GameStats;
      for (let i = 0 ; i < this.gameStats.length ; i++) {
        if (this.gameStats[i].GameID === gid) {
          game = this.gameStats[i];
        }
      }

      game.TotalPlayed += gamesPlayed;
      game.Difficulties.get(gameDiff).Played += gamesPlayed;

      if (gamesPlayed > favorite || favorite === 0) {
        this.favoriteGame = game;
        this.favoriteDiff = gameDiff;
        favorite = gamesPlayed;
      }
    }

    this.gameStats.sort((a: GameStats, b: GameStats) => {
      return b.TotalPlayed - a.TotalPlayed
    });
  }

  diffToString(diff: number) {
    switch (diff) {
      case 1:
        return "Easy";
      case 2:
        return "Medium";
      case 3:
        return "Hard";
      case 4:
        return "Extreme";
    }
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

  public getGameNameById(id: number): string {
    return GameListAllService.getGameNameById(id);
  }

  public getGameImageById(id: number): string {
    return GameListAllService.getGameImageById(id);
  }

  openGameHistory() {
    const dialogRef = this.dialog.open(GameHistoryComponent);

    dialogRef.componentInstance.profileData = this.profileData;
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
