import { Component } from '@angular/core';
import { LoaderService } from './services/loading-service/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  loading: boolean = false;

  constructor(
    private loader: LoaderService
  ) {
    loader.loading
      .subscribe( (data) => {
        console.log(data);
        this.loading = data;
      });
  }
}
