import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';

import { GameListAllService } from '../services/games/game-list-all.service';
import { MetaService } from '../services/meta.service';
import { UserService } from '../services/user/user.service';
import { Game } from '../classes/game';
import { RelayTrackerService } from '../services/relay/relay-tracker.service';

@Component({
  selector: 'app-game-description',
  templateUrl: './game-description.component.html',
  styleUrls: ['./game-description.component.scss']
})
export class GameDescriptionComponent implements OnInit, OnDestroy {

  game: Game

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private user: UserService,
    private meta: MetaService
  ) { }

  ngOnInit() {
      this.route.paramMap.subscribe((params: ParamMap) => {
        let gameName = params.get('gameName').toLowerCase()
        this.game = GameListAllService.getGameByName(gameName)
        this.meta.gameTags(this.game.id)
      }
    );
  }

  playGame(route: ActivatedRoute, diff: number) {
    const m = {
      diff: diff
    };

    RelayTrackerService.playingQueue = false;

    this.router.navigate([route, m]);
  }

  ngOnDestroy() {
    this.meta.defaultTags()
  }

  isLoggedIn() {
    return this.user.isLoggedIn();
  }
}
