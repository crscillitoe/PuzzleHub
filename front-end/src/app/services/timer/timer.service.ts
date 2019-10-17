import { Injectable } from '@angular/core';
import { TunnelService } from '../tunnel/tunnel.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TimerService {
  constructor(private tunnel: TunnelService) {}

  /**
   * Tells the API to start the timer for the currently logged in
   * client for the given GameID and Difficulty.
   * @param GameID Game to start the timer for
   * @param Difficulty Difficulty to start the timer for
   */
  startTimer(GameID: number, Difficulty: number): Observable<{seed: number}> {
    const m = {
      'GameID':GameID,
      'Difficulty':Difficulty
    }

    return this.tunnel.startTimer(m);
  }

  /**
   * Requests for the API to stop the timer for the user, logs the users
   * solution/seed for future verification. XP will be awarded.
   * @param Seed
   * @param GameID
   * @param Difficulty
   * @param Solution
   */
  stopTimer(Seed: number, GameID: number, Difficulty: number, Solution: any): Observable<{
    TimeElapsed: number,
    XPGain: number
  }> {
    const m = {
      'Seed': Seed,
      'GameID': GameID,
      'Difficulty': Difficulty,
      'BoardSolution': Solution
    }

    return this.tunnel.stopTimer(m);
  }
}
