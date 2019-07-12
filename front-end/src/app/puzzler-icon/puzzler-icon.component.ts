import { Component, OnInit, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-puzzler-icon',
  templateUrl: './puzzler-icon.component.html',
  styleUrls: ['./puzzler-icon.component.scss']
})
export class PuzzlerIconComponent implements OnInit, OnChanges {

  static basePuzzleIconDir = '/assets/images/puzzler-icons/puzzle-hub-profile-';
  @Input() puzzlerIconID: number;
  puzzlerIcon: string;


  constructor() { }

  ngOnInit() {
    this.updatePuzzlerIcon();
  }

  ngOnChanges() {
    this.updatePuzzlerIcon();
  }

  updatePuzzlerIcon() {
    this.puzzlerIcon = PuzzlerIconComponent.basePuzzleIconDir + this.puzzlerIconID + '.png';
  }

}
