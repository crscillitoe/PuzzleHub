import { Component, OnInit } from '@angular/core';
import { LoaderService } from '../services/loading-service/loader.service';
import { TunnelService } from '../services/tunnel/tunnel.service';
import { UserService } from '../services/user/user.service';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

declare const grecaptcha: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public username: string;
  public password: string;

  public registerUsername = '';
  public registerPass1 = '';
  public registerPass2 = '';
  public email1 = '';
  public email2 = '';

  public forgotEmail = '';

  public errorMessage = 'Please enter a username';
  public forgotEmailErrorMessage = 'Please enter a valid email';
  public forgotSuccessMessage = '';

  public selectedTab = 'login';
  private captchaToken = '';

  constructor(
    private loader: LoaderService,
    private tunnel: TunnelService,
    private router: Router,
    private user: UserService,
    private titleService: Title
  ) { }

  ngOnInit() {
    this.titleService.setTitle('Login - Puzzle Hub');

  }

  canForgetPassword() {
    const emailTest = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(!emailTest.test(this.forgotEmail)) {
      this.forgotEmailErrorMessage = 'Please enter a valid email';
      return false;
    }

    this.forgotEmailErrorMessage = '';
    return true;
  }

  canRegister() {
    if (this.registerUsername === '') {
      this.errorMessage = 'Please enter a username';
      return false;
    }

    if (this.registerUsername.length > 12) {
      this.errorMessage = 'Username length must be no greater than 12 characters';
      return false;
    }

    const emailTest = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (!emailTest.test(this.email1)) {
      this.errorMessage = 'Please enter a valid email';
      return false;
    }

    if (this.email1 !== this.email2) {
      this.errorMessage = 'Emails must match';
      return false;
    }

    if (this.registerPass1.length < 8) {
      this.errorMessage = 'Password length must be at least 8 characters';
      return false;
    }

    if (this.registerPass1.length > 64) {
      this.errorMessage = 'Password length must be no longer than 64 characters';
      return false;
    }

    const repeatTest = /^(.)\1\1\1\1\1/;
    if (repeatTest.test(this.registerPass1)) {
      this.errorMessage = 'Password cannot contain repeating characters';
      return false;
    }

    if (this.registerPass1 !== this.registerPass2) {
      this.errorMessage = 'Passwords must match';
      return false;
    }


    this.errorMessage = '';
    return true;
  }

  register() {
    this.loader.startLoadingAnimation();
    var that = this;
    grecaptcha.ready(() => {
      grecaptcha.execute('6Ldx55wUAAAAAINcGTOjQDFatfUuCdZkrJKWZu8k', {action: 'register'})
        .then((token) => {
          that.captchaToken = token;

          const m = {
            Username: that.registerUsername,
            Password: that.registerPass1,
            Email: that.email1,
            Token: that.captchaToken
          };

          that.tunnel.registerUser(m)
            .subscribe( (data) => {
              if (data['success']) {
                that.loader.stopLoadingAnimation();
                that.router.navigate(['EmailSuccess']);
              } else {
                that.loader.stopLoadingAnimation();
                that.errorMessage = data['message'];
              }
            });
        });
    });
  }

  forgotPasswordSubmit() {
    this.loader.stopLoadingAnimation();
    const m = {
      Email: this.forgotEmail
    };
    this.tunnel.forgotPassword(m)
      .subscribe((data) => {
        this.forgotSuccessMessage = 'Please check your email';
        this.loader.stopLoadingAnimation();
      });
  }

  login() {
    this.loader.startLoadingAnimation();
    const m = {
      Username: this.username,
      Password: this.password
    };
    this.tunnel.login(m)
      .subscribe((data) => {
          if (data['Accept']) {
            document.cookie = 'PuzzleHubToken=' + data['Token'] + '; expires=Fri, 31 Dec 9999 23:59:59 GMT';
            this.tunnel.getUsername()
              .subscribe( (name) => {
                this.user.setUserName(name['username']);
                this.loader.stopLoadingAnimation();

                this.router.navigate(['/']);
              });
            this.tunnel.getLevel()
              .subscribe( (data2) => {
                this.user.setXp(data2['xp']);
              });
          } else {
              this.loader.stopLoadingAnimation();
          }

        });
  }
}
