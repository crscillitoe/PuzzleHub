import { Component, OnInit } from '@angular/core';
import { TunnelService } from '../services/tunnel/tunnel.service'
import { UserService } from '../services/user/user.service';
import { LoaderService } from '../services/loading-service/loader.service'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  username: any = "";

  constructor(
    private tunnelService: TunnelService,
    private loader: LoaderService,
    private user: UserService
  ) { 
    user.username
      .subscribe( (data) => {
        this.username = data;
      });

    tunnelService.getUsername()
      .subscribe( (data) => {
        user.setUserName(data['username']);
      });
  }

  signOut() {
    this.user.setUserName("");
    document.cookie = "PuzzleHubToken=; Max-Age=0";
  }

  ngOnInit() {
  }

}
