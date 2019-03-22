import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TunnelService } from '../services/tunnel/tunnel.service';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.css']
})
export class VerifyEmailComponent implements OnInit {

  serverMessage = '';

  constructor(
    private route: ActivatedRoute,
    private tunnel: TunnelService
  ) {
  }

  ngOnInit() {
    let code = this.route.snapshot.paramMap.get('code');
    if (code != null) {
      this.tunnel.verifyEmail(code)
        .subscribe( (data) => {
          if (data['validated']) {
            this.serverMessage =
              'Thank you, your email address has been verified! You can now log in.';
          } else {
            this.serverMessage =
              'Invalid verification link.';
          }
        });
    }
  }

}
