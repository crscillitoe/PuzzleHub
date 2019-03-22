import { Component, OnInit } from '@angular/core';
import { TimerService } from '../services/timer/timer.service';
import { TunnelService } from '../services/tunnel/tunnel.service';
import { LoaderService } from '../services/loading-service/loader.service';
import { UserService } from '../services/user/user.service';
import { Router } from '@angular/router';
import { GameListAllService } from '../services/games/game-list-all.service';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.scss']
})
export class MainMenuComponent implements OnInit {

  games: any = GameListAllService.games;

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

  getLevel() {
    return UserService.calculateLevel();
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
