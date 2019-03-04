import { Component, OnInit } from '@angular/core';
import { TimerService } from '../services/timer/timer.service'
import { TunnelService } from '../services/tunnel/tunnel.service'
import { LoaderService } from '../services/loading-service/loader.service'
import { UserService } from '../services/user/user.service';
import { Router } from '@angular/router';
import { GameID } from '../enums/game-id.enum';
import { GameDataService } from '../services/games/game-data.service';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.css']
})
export class MainMenuComponent implements OnInit {

  games: any = GameDataService.games;

  constructor(
    private timerService: TimerService,
    private tunnelService: TunnelService,
    private router: Router,
    private user: UserService,
    private loader: LoaderService
  ) { 
  }

  isLoggedIn() {
    return this.user.isLoggedIn();
  }

  playGame(route, diff) {
    let m = {
      diff: diff
    }

    this.router.navigate([route, m]);
  }

  ngOnInit() {
  }
}
