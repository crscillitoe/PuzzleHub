import { Component, OnInit } from '@angular/core';
import { TimerService } from '../services/timer/timer.service'
import { TunnelService } from '../services/tunnel/tunnel.service'

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.css']
})
export class MainMenuComponent implements OnInit {

  constructor(private timerService: TimerService,
              private tunnelService: TunnelService) { 
  }

  ngOnInit() {
    this.timerService.startTimer(2, 1)
      .subscribe( (seed) => {
        console.log(seed);
      });
  }

}
