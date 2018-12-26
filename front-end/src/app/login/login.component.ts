import { Component, OnInit } from '@angular/core';
import { LoaderService } from '../services/loading-service/loader.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private loader: LoaderService
  ) { }

  ngOnInit() {
  }

  async testLoading() {
    this.loader.startLoadingAnimation();
    await this.delay(2000);
    this.loader.stopLoadingAnimation();
  }

  async delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }
}
