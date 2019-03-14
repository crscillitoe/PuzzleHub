import { Injectable } from '@angular/core';
import { Options } from '../../interfaces/options';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class OptionsService {
  private _gameID = new BehaviorSubject<number>(0);
  public gameID = this._gameID.asObservable();
  private _seed = new BehaviorSubject<number>(0);
  public seed = this._seed.asObservable();
  private _difficulty = new BehaviorSubject<number>(0);
  public difficulty = this._difficulty.asObservable();

  private _hotkeys = new BehaviorSubject<any>(null);
  public hotkeys = this._hotkeys.asObservable();
  private _options = new BehaviorSubject<any>(null);
  public options = this._options.asObservable();

  private _takingNotesMode = new BehaviorSubject<boolean>(false);
  public takingNotesMode = this._takingNotesMode.asObservable();
  private _takingNotes = new BehaviorSubject<boolean>(false);
  public takingNotes = this._takingNotes.asObservable();

  private _personalBestMonthly = new BehaviorSubject<string>('');
  public personalBestMonthly = this._personalBestMonthly.asObservable();
  private _personalBestWeekly = new BehaviorSubject<string>('');
  public personalBestWeekly = this._personalBestWeekly.asObservable();
  private _personalBestDaily = new BehaviorSubject<string>('');
  public personalBestDaily = this._personalBestDaily.asObservable();

  constructor() { }

  public setGameID(gameID: number) {
    this._gameID.next(gameID);
  }

  public setSeed(seed: number) {
    this._seed.next(seed);
  }

  public setDifficulty(difficulty: number) {
    this._difficulty.next(difficulty);
  }

  public setHotkeys(hotkeys: any) {
    this._hotkeys.next(hotkeys);
  }

  public setOptions(options: any) {
    this._options.next(options);
  }

  public setTakingNotesMode(takingNotesMode: boolean) {
    this._takingNotesMode.next(takingNotesMode);
  }

  public setTakingNotes(takingNotes: boolean) {
    this._takingNotes.next(takingNotes);
  }

  public setPersonalBestMonthly(personalBestMonthly: string) {
    this._personalBestMonthly.next(personalBestMonthly);
  }

  public setPersonalBestWeekly(personalBestWeekly: string) {
    this._personalBestWeekly.next(personalBestWeekly);
  }

  public setPersonalBestDaily(personalBestDaily: string) {
    this._personalBestDaily.next(personalBestDaily);
  }
}
