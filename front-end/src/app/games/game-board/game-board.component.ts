import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { OptionsComponent } from '../../options/options.component';

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.css']
})
export class GameBoardComponent implements OnInit, AfterViewInit {

  @ViewChild('optionsPanel')
  optionsPanel: OptionsComponent;

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.optionsPanel.initializeOptionsFromService();
  }

}
