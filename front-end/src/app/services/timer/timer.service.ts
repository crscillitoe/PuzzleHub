import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TimerService {
  /*
   *
   */
  constructor() { 
  }

  /*
   * 1 - Success
   * 0 - Failure
   */
  startTimer(): number  { return 0; }
  pauseTimer(): number  { return 0; }
  stopTimer(): number   { return 0; }
}
