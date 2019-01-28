import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TunnelService } from '../services/tunnel/tunnel.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  username: string;

  profileData: any;

  constructor(
    private route: ActivatedRoute,
    private tunnel: TunnelService
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.username = params['user'];

      let m = {
        'Username':this.username
      }

      this.tunnel.getProfileData(m)
        .subscribe( (data) => {
          this.profileData = data;
          console.log(this.profileData);
        });
    });
  }
}
