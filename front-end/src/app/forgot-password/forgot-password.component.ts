import { Component, OnInit } from '@angular/core';
import { LoaderService } from '../services/loading-service/loader.service';
import { ActivatedRoute } from '@angular/router';
import { TunnelService } from '../services/tunnel/tunnel.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  code: string = '';

  password1: string = '';
  password2: string = '';

  errorMessage: string = 'Please enter a new password';
  successMessage: string = '';

  constructor(
    private loader: LoaderService,
    private route: ActivatedRoute,
    private tunnel: TunnelService
  ) { }

  ngOnInit() {
    this.code = this.route.snapshot.paramMap.get('code');
  }

  submitNewPassword() {
    this.loader.startLoadingAnimation();
    let m = {
      Code: this.code,
      NewPassword: this.password1
    }

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
    if(this.password1.length < 8) {
      this.errorMessage = 'Password length must be at least 8 characters';
      return false;
    }

    if(this.password1.length > 64) {
      this.errorMessage = 'Password length must be no longer than 64 characters';
      return false;
    }

    const repeatTest = /^(.)\1\1\1\1\1/;
    if (repeatTest.test(this.password1)) {
      this.errorMessage = 'Password cannot contain repeating characters';
      return false;
    }

    if(this.password1 !== this.password2) {
      this.errorMessage = 'Passwords must match';
      return false;
    }

    this.errorMessage = '';
    return true;
  }

  changePassword() {
  }
}
