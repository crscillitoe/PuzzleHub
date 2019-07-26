import { UserService } from '../services/user/user.service';

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
}
