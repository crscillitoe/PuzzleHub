import { Component, OnInit } from '@angular/core';
import { LoaderService } from '../services/loading-service/loader.service';
import { TunnelService } from '../services/tunnel/tunnel.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private username: string;
  private password: string;

  constructor(
    private loader: LoaderService,
    private tunnel: TunnelService
  ) { }

  ngOnInit() {
  }

  login() {
    this.loader.startLoadingAnimation();
    let m = {
      Username: this.username,
      Password: this.password
    }
    this.tunnel.login(m)
      .subscribe((data) => {
          if(data['Accept']) {
            document.cookie = 'PuzzleHubToken=' + data['Token'];
          }

          this.loader.stopLoadingAnimation();
        });
  }
}
