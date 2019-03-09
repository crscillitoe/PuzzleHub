import { Game } from './game';
import { Difficulty } from '../interfaces/difficulty';

export abstract class GameList {
  public abstract static games: Game[];

  constructor() { }
}
