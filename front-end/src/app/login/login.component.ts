import { Component, OnInit } from '@angular/core';
import { LoaderService } from '../services/loading-service/loader.service';
import { TunnelService } from '../services/tunnel/tunnel.service';
import { UserService } from '../services/user/user.service';
import { Router } from "@angular/router";

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
    private tunnel: TunnelService,
    private router: Router,
    private user: UserService
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
            document.cookie = 'PuzzleHubToken=' + data['Token'] + '; expires=Fri, 31 Dec 9999 23:59:59 GMT';
            this.tunnel.getUsername()
              .subscribe( (name) => {
                this.user.setUserName(name['username']);
                this.loader.stopLoadingAnimation();

                this.router.navigate(['/']);
              });
          } else {
              this.loader.stopLoadingAnimation();
          }

        });
  }
}
