import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { GameListAllService } from '../services/games/game-list-all.service';
import { UserService } from '../services/user/user.service';
import { Game } from '../classes/game';
import { RelayTrackerService } from '../services/relay/relay-tracker.service';

@Component({
  selector: 'app-game-description',
  templateUrl: './game-description.component.html',
  styleUrls: ['./game-description.component.scss']
})
export class GameDescriptionComponent implements OnInit {

  game: Game

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private user: UserService,
    private titleService: Title
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      let gameName = params.get('gameName').toLowerCase()
      this.game = GameListAllService.getGameByName(gameName)
      this.titleService.setTitle(`Puzzle Hub | Play ${this.game.name} Online`)
    }
    );
  }

  playGame(route, diff) {
    const m = {
      diff: diff
    };

    RelayTrackerService.playingQueue = false;

    this.router.navigate([route, m]);
  }

  isLoggedIn() {
    return this.user.isLoggedIn();
  }
}
