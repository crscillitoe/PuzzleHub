import { Inject, PLATFORM_ID, Input, Component, OnInit, OnChanges } from '@angular/core';
import { TunnelService } from '../services/tunnel/tunnel.service';
import { UserService } from '../services/user/user.service';
import { LoaderService } from '../services/loading-service/loader.service';
import { GameID } from '../enums/game-id.enum';
import { isPlatformBrowser } from '@angular/common';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PuzzleRelayPopupComponent } from '../puzzle-relay-popup/puzzle-relay-popup.component';
import { ProfileIconPickerComponent } from '../profile-icon-picker/profile-icon-picker.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  level: number;
  username: any = '';

  first = true;
  xpToNextLevel: number = 0;

  displayXpGain = false;
  xpGain = '';
  progress = 0;
  puzzlerIcon = '';

  basePuzzleIconDir = '/assets/images/puzzler-icons/puzzle-hub-profile-';

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private tunnelService: TunnelService,
    private loader: LoaderService,
    private user: UserService,
    public dialog: MatDialog
  ) {
    user.accountData.subscribe(data => {
      if (data) {
        this.username = data.username;
        this.level = data.level;
        this.xpToNextLevel = data.xpToNextLevel;
        this.puzzlerIcon = this.basePuzzleIconDir + data.puzzlerIcon + '.png';
        this.progress = (data.xpToNextLevel / user.xpPerLevel) * 100;
      } else {
        this.username = '';
      }
    });
  }

  isMainMenu() {
    return document.getElementById('mainmenu') != null;
  }

  openIconPicker() {
    const dialogRed = this.dialog.open(ProfileIconPickerComponent, {
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
