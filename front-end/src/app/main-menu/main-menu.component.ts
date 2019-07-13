import { Component, OnInit, OnDestroy } from '@angular/core';
import { TimerService } from '../services/timer/timer.service';
import { TunnelService } from '../services/tunnel/tunnel.service';
import { LoaderService } from '../services/loading-service/loader.service';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../services/user/user.service';
import { Router } from '@angular/router';
import { GameListAllService } from '../services/games/game-list-all.service';
import { Subscription } from 'rxjs/Subscription';
import { Title } from '@angular/platform-browser';
import { RelayTrackerService } from '../services/relay/relay-tracker.service';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.scss']
})
export class MainMenuComponent implements OnInit, OnDestroy {

  games: any = GameListAllService.games;
  level = 0;
  subscription: Subscription;

  constructor(
    private timerService: TimerService,
    private tunnelService: TunnelService,
    private router: Router,
    private route: ActivatedRoute,
    private user: UserService,
    private loader: LoaderService,
    private titleService: Title
  ) { }

  ngOnInit() {
    const index = window.location.href.indexOf('?refer=');
    if (index !== -1) {
      document.cookie = 'Referral=' + window.location.href.substr(index) + '; expires=Fri, 31 Dec 9999 23:59:59 GMT';
    }

    this.titleService.setTitle('Puzzle Hub');

    this.subscription = this.user.accountData
      .subscribe ( (data) => {
        if (data) {
          this.level = data.level;
        }
      });
  }

  isLoggedIn() {
    return this.user.isLoggedIn();
  }

  playGame(route, diff) {
    const m = {
      diff: diff
    };

    RelayTrackerService.playingQueue = false;

    this.router.navigate([route, m]);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
