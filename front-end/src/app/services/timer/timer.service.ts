import { Injectable } from '@angular/core';
import { TunnelService } from '../tunnel/tunnel.service';

@Injectable({
  providedIn: 'root'
})
export class TimerService {
  constructor(private tunnel: TunnelService) { 
  }

  startTimer(GameID, Difficulty) { 
    let m = {
      'GameID':GameID,
      'Difficulty':Difficulty
    }
    return this.tunnel.startTimer(m);
  }

  stopTimer(GameID, Difficulty, Solution) {
    let m = {
      'GameID':GameID,
      'Difficulty':Difficulty,
      'BoardSolution':Solution
    }
    return this.tunnel.stopTimer(m);
  }
}
