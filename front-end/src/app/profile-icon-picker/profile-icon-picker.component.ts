import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user/user.service';
import { MatDialogRef } from '@angular/material/dialog';
import { TunnelService } from '../services/tunnel/tunnel.service';
import { LoaderService } from '../services/loading-service/loader.service';

@Component({
  selector: 'app-profile-icon-picker',
  templateUrl: './profile-icon-picker.component.html',
  styleUrls: ['./profile-icon-picker.component.scss']
})
export class ProfileIconPickerComponent implements OnInit {

  private dirString: string = "/assets/images/puzzler-icons/";
  private picturePrefix: string = 'puzzle-hub-profile-';

  public icons = [];

  constructor(private userService: UserService,
              private loader: LoaderService,
              private dialogRef: MatDialogRef<ProfileIconPickerComponent>,
              private tunnelService: TunnelService) { }

  ngOnInit() {
    this.userService.accountData.subscribe(accountData => {
      this.icons = accountData.unlockedIcons;
    });
  }

  selectIcon(num) {
    let m = {
      PuzzlerIconID: num
    }

    this.tunnelService.setProfileIcon(m)
      .subscribe((data) => {
        this.dialogRef.close();
        this.userService.reloadAccountData();
      });
  }
}
