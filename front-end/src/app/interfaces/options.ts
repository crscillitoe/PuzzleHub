import { EventEmitter } from '@angular/core';

export interface Options {
  gameID: number;
  seed: number;
  difficulty: number;

  rules: string;
  controls: string;
  hotkeys: any;
  options: any;
  takingNotesMode: boolean;
  takingNotes: boolean;

  personalBestMonthly: string;
  personalBestWeekly: string;
  personalBestDaily: string;
}
