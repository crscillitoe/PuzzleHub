import { Inject, PLATFORM_ID, Input, Component, OnInit, OnChanges } from '@angular/core';
import { TunnelService } from '../services/tunnel/tunnel.service';
import { UserService } from '../services/user/user.service';
import { LoaderService } from '../services/loading-service/loader.service';
import { GameID } from '../enums/game-id.enum';
import { isPlatformBrowser } from '@angular/common';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PuzzleRelayPopupComponent } from '../puzzle-relay-popup/puzzle-relay-popup.component';
import { DailyChallengesComponent } from '../daily-challenges/daily-challenges.component';
import { ProfileIconPickerComponent } from '../profile-icon-picker/profile-icon-picker.component';
import { IconService } from '../services/icons/icon.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  level: number;
  username: any = '';

  first = true;
  xpToNextLevel = 0;

  displayXpGain = false;
  xpGain = '';
  progress = 0;

  puzzlerIconID: number;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private tunnelService: TunnelService,
    private loader: LoaderService,
    private snackBar: MatSnackBar,
    private user: UserService,
    public dialog: MatDialog
  ) {
    user.accountData.subscribe(data => {
      if (data) {
        this.username = data.username;
        this.level = data.level;
        this.xpToNextLevel = data.xpToNextLevel;
        this.puzzlerIconID = data.puzzlerIcon;
        IconService.configureHeaderBarColors(data.puzzlerIcon);
        this.progress = (data.xpToNextLevel / user.xpPerLevel) * 100;

        if (data.xpGain > 0) {
          this.snackBar.open('+' + data.xpGain + ' XP', 'Close', {
            duration: 4000
          });
        }
      } else {
        this.username = '';
      }
    });
  }

  isMainMenu() {
    return document.getElementById('mainmenu') != null;
  }

  openIconPicker() {
    const dialogRef = this.dialog.open(ProfileIconPickerComponent, {
      width: '800px'
    });
  }

  openPuzzleRelay() {
    const dialogRef = this.dialog.open(PuzzleRelayPopupComponent, {
      width: '800px',
      height: '700px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }

  openDailyChallenges() {
    const dialogRef = this.dialog.open(DailyChallengesComponent, {
      width: '800px',
      height: '700px'
    });
  }

  getEnum(name) {
    return GameID[name];
  }

  signOut() {
    if (isPlatformBrowser(this.platformId)) {
      this.user.logOut();
      document.cookie = 'PuzzleHubToken=; Max-Age=0';
    }
  }

  ngOnInit() {
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
