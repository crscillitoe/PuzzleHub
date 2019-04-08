import { Component, OnInit } from '@angular/core';
import { LoaderService } from '../services/loading-service/loader.service';
import { ActivatedRoute } from '@angular/router';
import { TunnelService } from '../services/tunnel/tunnel.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  code = '';

  password1 = '';
  password2 = '';
  hide1 = true;
  hide2 = true;

  errorMessage1 = '';
  errorMessage2 = '';
  successMessage = '';

  constructor(
    private loader: LoaderService,
    private route: ActivatedRoute,
    private tunnel: TunnelService,
    private titleService: Title
  ) { }

  ngOnInit() {
    this.titleService.setTitle('Password Recovery - Puzzle Hub');
    this.code = this.route.snapshot.paramMap.get('code');
  }

  submitNewPassword() {
    this.loader.startLoadingAnimation();
    const m = {
      Code: this.code,
      NewPassword: this.password1
    };

    this.tunnel.changePasswordWithCode(m)
      .subscribe((data) => {
        this.loader.stopLoadingAnimation();
        if (data['success']) {
          this.successMessage = 'Success! Your password has been updated. You can now log in.';
        } else {
          this.errorMessage1 = data['message'];
        }
      });
  }

  canSubmit1() {
    if (this.password1.length < 8) {
      this.errorMessage1 = 'Password length must be at least 8 characters';
      console.log(this.errorMessage1);
      return false;
    }

    if (this.password1.length > 64) {
      this.errorMessage1 = 'Password length must be no longer than 64 characters';
      console.log(this.errorMessage1);
      return false;
    }

    const repeatTest = /^(.)\1\1\1\1\1/;
    if (repeatTest.test(this.password1)) {
      this.errorMessage1 = 'Password cannot contain repeating characters';
      console.log(this.errorMessage1);
      return false;
    }

    this.errorMessage1 = '';
    console.log(this.errorMessage1);
    return true;
  }

  canSubmit2() {
    if (this.password1 !== this.password2) {
      this.errorMessage2 = 'Passwords must match';
      console.log(this.errorMessage2);
      return false;
    }

    this.errorMessage2 = '';
    console.log(this.errorMessage2);
    return true;
  }

  changePassword() {
  }
}
