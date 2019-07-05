import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user/user.service';
import { TunnelService } from '../services/tunnel/tunnel.service';

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

  constructor(private userService: UserService,
              private tunnelService: TunnelService) { }

  ngOnInit() {
    for (var i = 0 ; i < this.numIcons ; i++) {
      this.iconPaths.push(
        {
          path: this.dirString + this.picturePrefix + i + '.png',
          iconNumber: i
        }
      );
    }
  }

  selectIcon(num) {
    let m = {
      PuzzlerIconID: num
    }

    this.tunnelService.setProfileIcon(m)
      .subscribe((data) => {
        this.userService.reloadAccountData();
      });
  }
}
