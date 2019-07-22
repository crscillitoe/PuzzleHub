import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TunnelService } from '../services/tunnel/tunnel.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.css']
})
export class VerifyEmailComponent implements OnInit {

  serverMessage: string = "";

  constructor(
    private route: ActivatedRoute,
    private tunnel: TunnelService,
    private titleService: Title
  ) {
  }

  ngOnInit() {
    this.titleService.setTitle('Email Verification - Puzzle Hub');

    var code = this.route.snapshot.paramMap.get('code')
    if(code != null) {
      this.tunnel.verifyEmail(code)
        .subscribe( (data) => {
          if(data['validated']) {
            this.serverMessage = 
              "Thank you, your email address has been verified! You can now log in.";
          } else {
            this.serverMessage = 
              "Thank you, your email address has been verified! You can now log in.";
          }
        });
    }
  }

}
