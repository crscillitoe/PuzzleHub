import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TunnelService {
  private ipAddress = 'http://172.26.4.78/api';

  constructor(private http: HttpClient) { }

  addNumbers(model) {
    return this.http.post(this.ipAddress + '/addNumbers', model);
  }

  startTimer(model) {
    return this.http.post(this.ipAddress + '/startTimer', model);
  }

  stopTimer(model) {
    return this.http.post(this.ipAddress + '/stopTimer', model);
  }

  login(model) {
    return this.http.post(this.ipAddress + '/login', model);
  }

  sampleGetRequest() {
    return this.http.get(this.ipAddress + '/endpoint');
  }
}
