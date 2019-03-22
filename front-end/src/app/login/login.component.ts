import { Component, OnInit } from '@angular/core';
import { LoaderService } from '../services/loading-service/loader.service';
import { TunnelService } from '../services/tunnel/tunnel.service';
import { UserService } from '../services/user/user.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  private username: string;
  private password: string;

  private registerUsername: string = "";
  private registerPass1: string = "";
  private registerPass2: string = "";
  private email1: string = "";
  private email2: string = "";

  private errorMessage: string = "Please enter a username";

  private selectedTab: string = "login";

  constructor(
    private loader: LoaderService,
    private tunnel: TunnelService,
    private router: Router,
    private user: UserService
  ) { }

  ngOnInit() {
  }

  canRegister() {
    if(this.registerUsername == "") {
      this.errorMessage = "Please enter a username";
      return false;
    }

    if(this.registerUsername.length > 16) {
      this.errorMessage = "Username length must be no greater than 16 characters"
      return false;
    }

    var emailTest = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if(!emailTest.test(this.email1)) {
      this.errorMessage = "Please enter a valid email";
      return false;
    }

    if(this.email1 != this.email2) {
      this.errorMessage = "Emails must match";
      return false;
    }

    if(this.registerPass1.length < 8) {
      this.errorMessage = "Password length must be at least 8 characters";
      return false;
    }

    if(this.registerPass1.length > 64) {
      this.errorMessage = "Password length must be no longer than 64 characters";
      return false;
    }

    var repeatTest = /^(.)\1\1\1\1\1/;
    if(repeatTest.test(this.registerPass1)) {
      this.errorMessage = "Password cannot contain repeating characters";
      return false;
    }

    if(this.registerPass1 != this.registerPass2) {
      this.errorMessage = "Passwords must match";
      return false;
    }


    this.errorMessage = "";
    return true;
  }

  register() {
    this.loader.startLoadingAnimation();
    let m = {
      Username: this.registerUsername,
      Password: this.registerPass1,
      Email: this.email1
    }

    this.tunnel.registerUser(m)
      .subscribe( (data) => {
        if(data['success']) {
          this.loader.stopLoadingAnimation();
          this.router.navigate(['EmailSuccess']);
        } else {
          this.loader.stopLoadingAnimation();
          this.errorMessage = data['message'];
        }
      });
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
