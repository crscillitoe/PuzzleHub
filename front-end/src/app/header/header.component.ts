import { Inject, PLATFORM_ID, Component, OnInit } from '@angular/core';
import { TunnelService } from '../services/tunnel/tunnel.service';
import { UserService } from '../services/user/user.service';
import { LoaderService } from '../services/loading-service/loader.service';
import { GameID } from '../enums/game-id.enum';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  username: any = '';

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private tunnelService: TunnelService,
    private loader: LoaderService,
    private user: UserService
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

  getEnum(name) {
    return GameID[name];
  }

  signOut() {
    if(isPlatformBrowser(this.platformId)) {
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
  }

  isElectron() {
    if(isPlatformBrowser(this.platformId)) {
      // Renderer process
      if (typeof window !== 'undefined' && typeof window['process'] === 'object' && window['process'].type === 'renderer') {
          return true;
      }

      // Main process
      if (typeof window['process'] !== 'undefined' && typeof window['process'].versions === 'object' && !!window['process'].versions.electron) {
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
