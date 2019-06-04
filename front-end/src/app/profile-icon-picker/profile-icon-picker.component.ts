import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile-icon-picker',
  templateUrl: './profile-icon-picker.component.html',
  styleUrls: ['./profile-icon-picker.component.scss']
})
export class ProfileIconPickerComponent implements OnInit {

  private dirString: string = "/assets/images/puzzler-icons/";
  private picturePrefix: string = 'puzzle-hub-profile-';

  private numIcons: number = 8;

  public iconPaths = [];

  constructor() { }

  ngOnInit() {
    for (var i = 0 ; i < this.numIcons ; i++) {
      this.iconPaths.push(this.dirString + this.picturePrefix + i + '.png');
    }
  }
}
