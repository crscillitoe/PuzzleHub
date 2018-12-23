import { Component, OnInit } from '@angular/core';
import { TimerService } from '../services/timer/timer.service'
import { TunnelService } from '../services/tunnel/tunnel.service'

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.css']
})
export class MainMenuComponent implements OnInit {


  sampleArray: any;
  sampleNumber: any;

  constructor(private timerService: TimerService,
              private tunnelService: TunnelService) { 
  }

  objectClicked(obj) {
    console.log(obj);
    let m = {
      num1: 5,
      num2: 10
    }
    this.tunnelService.addNumbers(m)
      .subscribe( (data) => {
        console.log(data);
      });
  }

  ngOnInit() {
    this.sampleNumber = this.timerService.startTimer();

    let a1 = {
      name: 'Monkey',
      num: 5,
      elemType: '<button></button>'
    }
    let a2 = {
      name: 'Elephant',
      num: 10,
      elemType: 'text-input'
    }
    let a3 = {
      name: 'Dolphin',
      num: 15,
      elemType: 'paragraph'
    }

    this.sampleArray = [a1, a2, a3];
  }

}
