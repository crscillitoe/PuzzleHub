import { Game } from './game';
import { Difficulty } from '../interfaces/difficulty';

/*
 * "gotcha may aswell keep it around
 * who knows maybe we add some less puzzly games
 * that fall under a new category
 * although we are called puzzle hub.."
 * - Christian 
 */ 

export abstract class GameList {
  public static games: Game[];

  constructor() { }
}
