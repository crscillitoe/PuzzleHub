import { UserService } from '../services/user/user.service';
import { GameListAllService } from '../services/games/game-list-all.service';

export class ProfileData {
  DailyBronzeMedals: number;
  DailyGoldMedals: number;
  DailySilverMedals: number;
  EasyDailies: number;
  ExtremeDailies: number;
  GamesPlayed: {
    Difficulty: number;
    GameID: number;
    GamesPlayed: number;
  }[];
  HardDailies: number;
  MatchHistory: {
    Difficulty: number;
    GameID: number;
    Seed: number;
    TimeCompleted: string;
    TimeElapsed: any;
  }[];
  MediumDailies: number;
  MonthlyBronzeMedals: number;
  MonthlyGoldMedals: number;
  MonthlySilverMedals: number;
  PuzzlerIcon: number;
  Role: string;
  Username: string;
  WeeklyBronzeMedals: number;
  WeeklyGoldMedals: number;
  WeeklySilverMedals: number;
  XP: number;

  constructor(
    private user: UserService
  ) { }

  get level(): number {
    return this.user.calculateLevelFromXp(this.XP);
  }

  get currentXP(): number {
    return this.XP % this.user.xpPerLevel;
  }

  get levelUpXP(): number {
    return this.user.xpPerLevel;
  }

  get progress(): number {
    return Math.floor((this.currentXP / this.levelUpXP) * 100);
  }

  get totalGamesPlayed(): number {
    let total = 0;
    for (let i = 0 ; i < this.GamesPlayed.length ; i++) {
      total += this.GamesPlayed[i].GamesPlayed;
    }

    return total;
  }

  get favoriteGame(): string {
    let max = 0;
    let gameChosen = 'None';

    for (let i = 0 ; i < this.GamesPlayed.length ; i++) {
      if (this.GamesPlayed[i].GamesPlayed > max) {
        max = this.GamesPlayed[i].GamesPlayed;
        gameChosen = GameListAllService.getGameById(this.GamesPlayed[i].GameID).name;
      }
    }

    return gameChosen;
  }
}
