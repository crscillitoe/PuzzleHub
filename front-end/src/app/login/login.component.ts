import { Inject, PLATFORM_ID, Component, OnInit, Directive, Output, EventEmitter, HostListener } from '@angular/core';
import { LoaderService } from '../services/loading-service/loader.service';
import { TunnelService } from '../services/tunnel/tunnel.service';
import { UserService } from '../services/user/user.service';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { isPlatformBrowser } from '@angular/common';

declare const grecaptcha: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public capsLock: boolean;

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

  public loginError = '';

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private loader: LoaderService,
    private tunnel: TunnelService,
    private router: Router,
    private user: UserService,
    private titleService: Title
  ) {
  }

  ngOnInit() {
    grecaptcha.ready(() => {
      console.log('reCAPTCHA loaded');
    });

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

    if (!/^[a-z0-9]+$/i.test(this.registerUsername)) {
      this.errorMessage = 'Username cannot contain non alpha-numeric characters';
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

    if (this.email1.toLowerCase() !== this.email2.toLowerCase()) {
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

  getCookie(cookieName) {
    if(isPlatformBrowser(this.platformId)) {
      var name = cookieName + '=';
      var cookies = document.cookie.split(';');
      for(var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        while(cookie.charAt(0) === ' ') {
          cookie = cookie.substring(1);
        }

        if(cookie.indexOf(cookieName) === 0) {
          return cookie.substring(cookieName.length + 1, cookie.length);
        }
      }
    }

    return "";
  }

  register() {
    this.loader.startLoadingAnimation();
    var that = this;
      grecaptcha.execute('6Ldx55wUAAAAAINcGTOjQDFatfUuCdZkrJKWZu8k', {action: 'register'})
        .then((token) => {
          that.captchaToken = token;

          const m = {
            Username: that.registerUsername,
            Password: that.registerPass1,
            Email: that.email1.toLowerCase(),
            Token: that.captchaToken,
            Refer: that.getCookie('Referral')
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
    if(isPlatformBrowser(this.platformId)) {
      this.loader.startLoadingAnimation();
      const m = {
        Username: this.username,
        Password: this.password
      };
      this.tunnel.login(m)
        .subscribe((data) => {
            if (data['Accept']) {
              document.cookie = 'PuzzleHubToken=' + data['Token'] + '; expires=Fri, 31 Dec 9999 23:59:59 GMT';
              this.user.reloadAccountData();
              this.loader.stopLoadingAnimation();
              this.router.navigate(['/']);
            } else {
              this.loginError = 'Invalid login credentials, please try again.';
              this.loader.stopLoadingAnimation();
            }

          });
    }
  }

  @HostListener('window:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent): void {
    const capsOn = event.getModifierState && event.getModifierState('CapsLock');
    this.capsLock = capsOn;
  }
  @HostListener('window:keyup', ['$event'])
  onKeyUp(event: KeyboardEvent): void {
    const capsOn = event.getModifierState && event.getModifierState('CapsLock');
    this.capsLock = capsOn;
  }
}