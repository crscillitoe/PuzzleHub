import { Component, Input, OnInit } from '@angular/core';
import { TunnelService } from '../services/tunnel/tunnel.service';
import { SharedFunctionsService } from '../services/shared-functions/shared-functions.service';
import { GameListAllService } from '../services/games/game-list-all.service';
import { GameListService } from '../services/games/game-list.service';
import { ProfileData } from '../classes/profile-data';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-game-history',
  templateUrl: './game-history.component.html',
  styleUrls: ['./game-history.component.scss']
})
export class GameHistoryComponent implements OnInit {

  profileData: ProfileData;

  constructor(
    private tunnel: TunnelService,
    public games: GameListService,
    public dialogRef: MatDialogRef<GameHistoryComponent>,
  ) { }

  ngOnInit() {
  }

  loadMore() {
    const m = {
      'Username': this.profileData.Username,
      'Offset': this.profileData.MatchHistory.length
    };

    this.tunnel.getMoreMatchHistory(m)
      .subscribe( (data: any) => {
        for (let i = 0 ; i < data.length ; i++) {
          (data[i])['TimeElapsed'] = SharedFunctionsService.convertToDateString((data[i])['TimeElapsed']);
        }
        this.profileData.MatchHistory = this.profileData.MatchHistory.concat(data);
      });
  }

  convertDate(dateStr: string) {
    return new Date(dateStr + 'Z');
  }

  close() {
    this.dialogRef.close();
  }

}
