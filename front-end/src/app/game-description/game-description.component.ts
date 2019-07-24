import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { GameListAllService } from '../services/games/game-list-all.service';
import { UserService } from '../services/user/user.service';
import { Game } from '../classes/game';

@Component({
  selector: 'app-game-description',
  templateUrl: './game-description.component.html',
  styleUrls: ['./game-description.component.scss']
})
export class GameDescriptionComponent implements OnInit {

  game: Game

  constructor(
    private route: ActivatedRoute,
    private user: UserService,
    private titleService: Title
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      let gameName = params.get('gameName')
      this.game = GameListAllService.getGameByName(gameName)
      this.titleService.setTitle(`Puzzle Hub | Play ${this.game.name} Online`)
    }
    );
  }

  isLoggedIn() {
    return this.user.isLoggedIn();
  }
}
