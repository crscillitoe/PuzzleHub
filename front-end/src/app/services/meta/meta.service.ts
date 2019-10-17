import { Injectable } from '@angular/core';
import { Title, Meta, MetaDefinition } from '@angular/platform-browser';
import { Observable, Subscription, of } from 'rxjs';
import { map, skip } from 'rxjs/operators';
import { Router } from '@angular/router';

import { GameID } from '../../enums/game-id.enum';
import { GameListAllService } from '../../services/games/game-list-all.service';
import { IconService } from '../../services/icons/icon.service';
import { ProfileData } from '../../classes/profile-data';

@Injectable({
  providedIn: 'root'
})
/**
 * Provides functions for applying SSR meta tags
 * for website previews when sharing links externally.
 */
export class MetaService {
  private subscription: Subscription

  constructor(
    private router: Router,
    private titleService: Title,
    private metaService: Meta,
    private iconService: IconService,
  ) { }

  /**
   * These are the default meta tags that will be applied to a page
   * if no tags are specified.
   */
  defaultTags() {
    this.allTypeTags();
    this.allUrlTags();
    this.allTitleTags('Puzzle Hub | Play Logic Puzzles Online')
    this.allIconTags(0);

    this.allDescriptionTags('Puzzle Hub is the one-stop site for competitive puzzle games! Here we offer a wide variety of logic puzzles, both popular and obscure.')
    this.addOrUpdateTag({name: 'keywords', content: this.getDefaultKeywords()})
    this.addOrUpdateTag({name: 'robots', content: 'index, follow'});
  }

  /**
   * Generates game specific meta tags for URLs such as
   * `https://puzzlehub.io/games/Hashi`
   * @param gameID The ID of the game to generate meta tags for
   */
  gameTags(gameID: GameID) {
    const game = GameListAllService.getGameById(gameID);

    this.allTypeTags();
    this.allUrlTags();
    this.allTitleTags(`Play ${game.name} Online | Puzzle Hub`)
    this.allImageTags(game.image);

    this.allDescriptionTags(game.desc)
    this.addOrUpdateTag({name: 'keywords', content: this.addDefaultKeywords(game.keywords)});
    this.addOrUpdateTag({name: 'robots', content: 'index, follow'});
  }

  /**
   * Generates tags for the leaderboards page of the given game ID
   * @param gameID The ID of the game to generate meta tags for
   */
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

  /**
   * Generate meta tags for the profile view. Also render the
   * users selected icon in the preview.
   * @param profileData User profile data from the API, includes
   *                    Puzzler Icon, XP, Games Played, Medals
   */
  profileTags(profileData: ProfileData): Observable<ProfileData> {
    this.allTypeTags();
    this.allUrlTags(`/profile?user=${profileData.Username}`);
    this.allTitleTags(`${profileData.Username}'s Profile | Puzzle Hub`);

    if (this.iconService.hasData) this.allIconTags(profileData.PuzzlerIcon);

    // Prevent SSR from loading route until icons are resolved
    let observable = this.iconService.hasData ? of(profileData)
    : this.iconService.iconDataObservable.pipe(skip(1)).pipe(map(_ => { // Skip initial empty value of iconData
      this.allIconTags(profileData.PuzzlerIcon);
      return profileData;
    }));

    const description = `Level: ${profileData.level} | ${profileData.currentXP} / ${profileData.levelUpXP}
    Gold Medals: ${profileData.DailyGoldMedals + profileData.WeeklyGoldMedals + profileData.MonthlyGoldMedals} \
    | Silver Medals: ${profileData.DailySilverMedals + profileData.WeeklySilverMedals + profileData.MonthlySilverMedals} \
    | Bronze Medals: ${profileData.DailyBronzeMedals + profileData.WeeklyBronzeMedals + profileData.MonthlySilverMedals}`

    this.allDescriptionTags(description);

    const keywords = `${profileData.Username} puzzle hub, ${profileData.Username} puzzles, ${profileData.Username} profile`
    this.addOrUpdateTag({name: 'keywords', content: this.addDefaultKeywords(keywords)});

    this.addOrUpdateTag({name: 'robots', content: 'index, follow'});
    return observable;
  }

  /* ------------------- HELPERS ------------------- */
  /* ----------------------------------------------- */
  /* ----------------------------------------------- */
  /* ----------------------------------------------- */

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

  /**
   * Places the given title as the appropriate meta tags
   * for different popular services.
   * @param title The title tag to display
   */
  private allTitleTags(title: string) {
    this.titleService.setTitle(title);
    this.addOrUpdateTag({property: 'og:title', content: title});
    this.addOrUpdateTag({property: 'twitter:title', content: title});
  }

  /**
   * Places the given description as the appropriate meta tags
   * for different popular services.
   * @param desc The description to display
   */
  private allDescriptionTags(desc: string) {
    this.addOrUpdateTag({name: 'description', content: desc})
    this.addOrUpdateTag({property: 'og:description', content: desc})
    this.addOrUpdateTag({property: 'twitter:description', content: desc})
  }

  private allTypeTags() {
    this.addOrUpdateTag({property: 'og:type', content: 'website'});
    this.addOrUpdateTag({property: 'twitter:type', content: 'website'});
  }

  private allUrlTags(path?: string) {
    if (!path) path = this.router.url
    const externalUrl = `https://puzzlehub.io${path}`;
    this.addOrUpdateTag({name: 'url', content: externalUrl});
    this.addOrUpdateTag({property: 'og:url', content: externalUrl});
    this.addOrUpdateTag({property: 'twitter:url', content: externalUrl});
  }

  private allIconTags(iconID: number) {
    const addTags = (() => {
      const imagePath = this.iconService.getIconImagePath(iconID);
      this.allImageTags(imagePath, "assets/images/puzzler-icons", "image/png");
    })

    addTags();
    this.subscription = this.iconService.iconDataObservable.subscribe(addTags);
  }

  private allImageTags(imagePath: string, folder?: string, imageType?: string) {
    this.unsubscribeAll(); // Icon tags will add a subscription that will change
                           // the value of the image tags if IconService updates.
                           // We want to clean this up here upon update of image tags.
    const baseUrl = "https://puzzlehub.io";
    if(folder !== undefined) imagePath = `${baseUrl}/${folder}/${imagePath}`;
    else imagePath = `${baseUrl}/${imagePath}`

    if(imageType === undefined) imageType = "image/svg+xml"

    this.addOrUpdateTag({property: 'og:image', content: imagePath});
    this.addOrUpdateTag({property: 'og:image:width', content: '240'});
    this.addOrUpdateTag({property: 'og:image:height', content: '240'});
    this.addOrUpdateTag({property: 'og:image:type', content: imageType});
    this.addOrUpdateTag({property: 'twitter:image', content: imagePath});
  }
}
