import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { IconService } from '../services/icons/icon.service';

@Component({
  selector: 'app-puzzler-icon',
  templateUrl: './puzzler-icon.component.html',
  styleUrls: ['./puzzler-icon.component.scss']
})
export class PuzzlerIconComponent implements OnInit, OnChanges {

  static basePuzzleIconDir = '/assets/images/puzzler-icons/';
  @Input() puzzlerIconID: number;

  constructor(
    private iconService: IconService
  ) {
  }

  ngOnInit() {
    this.iconService.iconDataObservable.subscribe(() => {
      this.updatePuzzlerIcon();
    })
  }

  ngOnChanges() {}

  updatePuzzlerIcon() {
    return PuzzlerIconComponent.basePuzzleIconDir + this.iconService.getIconImagePath(this.puzzlerIconID);
  }
}
