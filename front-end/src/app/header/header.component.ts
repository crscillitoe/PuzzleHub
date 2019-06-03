import { Inject, PLATFORM_ID, Input, Component, OnInit, OnChanges } from '@angular/core';
import { TunnelService } from '../services/tunnel/tunnel.service';
import { UserService } from '../services/user/user.service';
import { LoaderService } from '../services/loading-service/loader.service';
import { GameID } from '../enums/game-id.enum';
import { isPlatformBrowser } from '@angular/common';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PuzzleRelayPopupComponent } from '../puzzle-relay-popup/puzzle-relay-popup.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnChanges {

  @Input() level;
  @Input() currVal;
  @Input() maxVal;

  username: any = '';

  first = true;

  displayXpGain = false;
  xpGain = '';
  progress = 0;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private tunnelService: TunnelService,
    private loader: LoaderService,
    private user: UserService,
    public dialog: MatDialog
  ) {
    user.username
      .subscribe( (data) => {
        this.username = data;
      });

    tunnelService.getUsername()
      .subscribe( (data) => {
        user.setUserName(data['username']);
      });

    tunnelService.getLevel()
      .subscribe( (data) => {
        user.setXp(data['xp']);
      });
  }

  openPuzzleRelay() {
    const dialogRef = this.dialog.open(PuzzleRelayPopupComponent, {
      width: '800px',
      height: '630px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }

  getEnum(name) {
    return GameID[name];
  }

  signOut() {
    if (isPlatformBrowser(this.platformId)) {
      this.user.setUserName('');
      this.user.setXp(0);
      document.cookie = 'PuzzleHubToken=; Max-Age=0';
    }
  }

  getLevel() {
    return this.user.calculateLevel();
  }

  xpToNextLevel() {
    return this.user.xpToNextLevel();
  }

  nextLevelThreshold() {
    return UserService.nextLevelThreshold();
  }

  ngOnInit() {
    this.progress = this.getProgress();
  }

  ngOnChanges(changes) {
    let xpGain = changes.currVal.currentValue - changes.currVal.previousValue;
    let levelup = false;
    if (xpGain < 0) {
      levelup = true;
      xpGain = xpGain + UserService.xpPerLevel;
    }

    if ('' + xpGain !== 'NaN' && ! this.first) {
      if (!levelup) {
        this.xpGain = '+ ' + xpGain;
      } else {
        this.xpGain = 'Level up!';
      }
      this.displayXpGain = true;
      const that = this;
      setTimeout(function() { that.displayXpGain = false; } , 1500);
    } else if ('' + xpGain !== 'NaN') {
      this.first = false;
    }

    this.progress = this.getProgress();
  }

  getProgress() {
    return Math.floor((this.currVal / this.maxVal) * 100);
  }

  isElectron() {
    if (isPlatformBrowser(this.platformId)) {
      // Renderer process
      if (typeof window !== 'undefined' && typeof window['process'] === 'object' && window['process'].type === 'renderer') {
          return true;
      }

      // Main process
      if (
        typeof window['process'] !== 'undefined' &&
        typeof window['process'].versions === 'object' &&
        !!window['process'].versions.electron
      ) {
          return true;
      }

      // Detect the user agent when the `nodeIntegration` option is set to true
      if (typeof navigator === 'object' && typeof navigator.userAgent === 'string' && navigator.userAgent.indexOf('Electron') >= 0) {
          return true;
      }
    }

    return false;
  }

  close() {
    window.close();
  }

  maximize() {
  }
}
