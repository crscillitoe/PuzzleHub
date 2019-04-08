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

  errorMessage = 'Please enter a new password.';
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
          this.errorMessage = data['message'];
        }
      });
  }

  canSubmit() {
    const repeatTest = /^(.)\1\1\1\1\1/;

    if (this.password1.length < 8) {
      this.errorMessage = 'Password length must be at least 8 characters';
    } else if (this.password1.length > 64) {
      this.errorMessage = 'Password length must be no longer than 64 characters';
    } else if (repeatTest.test(this.password1)) {
      this.errorMessage = 'Password cannot contain repeating characters';
    } else if (this.password1 !== this.password2) {
      this.errorMessage = 'Passwords must match';
    } else {
      this.errorMessage = '';
      return true;
    }

    console.log(this.errorMessage);
    return false;
  }

  changePassword() {
  }
}
