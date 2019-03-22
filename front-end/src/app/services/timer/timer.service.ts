import { Injectable } from '@angular/core';
import { TunnelService } from '../tunnel/tunnel.service';

@Injectable({
  providedIn: 'root'
})
export class TimerService {
  constructor(private tunnel: TunnelService) {
  }

  startTimer(GameID, Difficulty) {
    const m = {
      'GameID': GameID,
      'Difficulty': Difficulty
    };
    return this.tunnel.startTimer(m);
  }

  stopTimer(Seed, GameID, Difficulty, Solution) {
    const m = {
      'Seed': Seed,
      'GameID': GameID,
      'Difficulty': Difficulty,
      'BoardSolution': Solution
    };
    return this.tunnel.stopTimer(m);
  }
}
