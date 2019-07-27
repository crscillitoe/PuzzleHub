import { Injectable } from '@angular/core';
import { Title, Meta, MetaDefinition } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

import { GameID } from '../enums/game-id.enum';
import { GameListAllService } from '../services/games/game-list-all.service';
import { IconService } from '../services/icons/icon.service';
import { ProfileData } from '../classes/profile-data';

@Injectable({
  providedIn: 'root'
})
export class MetaService {
  private subscription: Subscription

  constructor(
    private router: Router,
    private titleService: Title,
    private metaService: Meta,
    private iconService: IconService,
  ) { }

  private addOrUpdateTag(tag: MetaDefinition) {
    this.metaService.updateTag(tag)
  }

  private unsubscribeAll() {
    if (this.subscription)
      this.subscription.unsubscribe();
  }

  private getDefaultKeywords() {
    return 'logic puzzles online, puzzles online, logic puzzles, logic games online';
  }

  private addDefaultKeywords(keywords: string) {
    return keywords + ", " + this.getDefaultKeywords();
  }

  private allTitleTags(title: string) {
    this.titleService.setTitle(title);
    this.addOrUpdateTag({name: 'og:title', content: title});
    this.addOrUpdateTag({name: 'twitter:title', content: title});
  }

  private allDescriptionTags(desc: string) {
    this.addOrUpdateTag({name: 'description', content: desc})
    this.addOrUpdateTag({name: 'og:description', content: desc})
    this.addOrUpdateTag({name: 'twitter:description', content: desc})
  }

  private allTypeTags() {
    this.addOrUpdateTag({name: 'og:type', content: 'website'});
    this.addOrUpdateTag({name: 'twitter:type', content: 'website'});
  }

  private allUrlTags() {
    const externalUrl = `https://puzzlehub.io${this.router.url}`;
    this.addOrUpdateTag({name: 'url', content: externalUrl});
    this.addOrUpdateTag({name: 'og:url', content: externalUrl});
    this.addOrUpdateTag({name: 'twitter:url', content: externalUrl});
  }

  private allIconTags(iconID: number) {
    const addTags = (() => {
      const imagePath = this.iconService.getIconImagePath(iconID);
      this.allImageTags(imagePath);
    })

    addTags();
    this.subscription = this.iconService.iconDataObservable.subscribe(addTags);
  }

  private allImageTags(imagePath: string) {
    this.unsubscribeAll(); // Icon tags will add a subscription that will change
                           // the value of the image tags if IconService updates.
                           // We want to clean this up here upon update of image tags.
    this.addOrUpdateTag({name: 'og:image', content: imagePath});
    this.addOrUpdateTag({name: 'twitter:image', content: imagePath});
  }

  defaultTags() {
    this.allTypeTags();
    this.allUrlTags();
    this.allTitleTags('Puzzle Hub | Play Logic Puzzles Online')
    this.allIconTags(0);

    this.allDescriptionTags('Puzzle Hub is the one-stop site for competitive puzzle games! Here we offer a wide variety of logic puzzles, both popular and obscure.')
    this.addOrUpdateTag({name: 'keywords', content: this.getDefaultKeywords()})
    this.addOrUpdateTag({name: 'robots', content: 'index, follow'});
  }

  gameTags(gameID: GameID) {
    const game = GameListAllService.getGameById(gameID);

    this.allTypeTags();
    this.allUrlTags();
    this.allTitleTags(`Play ${game.name} Online | Puzzle Hub`)
    this.allImageTags(game.imagePath);

    this.allDescriptionTags(game.desc)
    this.addOrUpdateTag({name: 'keywords', content: this.addDefaultKeywords(game.keywords)});
    this.addOrUpdateTag({name: 'robots', content: 'index, follow'});
  }

  leaderboardsTags(gameID: GameID) {
    const game = GameListAllService.getGameById(gameID);

    this.allTypeTags();
    this.allUrlTags();
    this.allTitleTags(`${game.name} Leaderboards | Puzzle Hub`);
    this.allIconTags(0);

    this.allDescriptionTags(`See ${game.name} rankings with Puzzle Hub online leaderboards!`)

    const keywords = `${game.name} leaderboards, best ${game.name} players, ${game.name} rankings`;
    this.addOrUpdateTag({name: 'keywords', content: this.addDefaultKeywords(keywords)});

    this.addOrUpdateTag({name: 'robots', content: 'index, follow'});
  }

  profileTags(profileData: ProfileData) {
    this.allTypeTags();
    this.allUrlTags();
    this.allTitleTags(`${profileData.Username}'s Profile | Puzzle Hub`);
    this.allIconTags(profileData.PuzzlerIcon);

    const description = `Level: ${profileData.level} | ${profileData.currentXP} / ${profileData.levelUpXP}
    Total Games Played: ${profileData.totalGamesPlayed}
    Gold Medals: ${profileData.DailyGoldMedals + profileData.WeeklyGoldMedals + profileData.MonthlyGoldMedals} \
    | Silver Medals: ${profileData.DailySilverMedals + profileData.WeeklySilverMedals + profileData.MonthlySilverMedals} \
    | Bronze Medals: ${profileData.DailyBronzeMedals + profileData.WeeklyBronzeMedals + profileData.MonthlySilverMedals}`

    this.allDescriptionTags(description);

    const keywords = `${profileData.Username} puzzle hub, ${profileData.Username} puzzles, ${profileData.Username} profile`
    this.addOrUpdateTag({name: 'keywords', content: this.addDefaultKeywords(keywords)});

    this.addOrUpdateTag({name: 'robots', content: 'index, follow'});
  }
}
