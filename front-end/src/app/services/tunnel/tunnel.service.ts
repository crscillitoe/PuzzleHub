import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TunnelService {
  private ipAddress = 'https://puzzle-hub.com/api';

  constructor(private http: HttpClient) { }

  changePasswordWithCode(model) {
    return this.http.post(this.ipAddress + '/changePasswordWithCode', model);
  }

  forgotPassword(model) {
    return this.http.post(this.ipAddress + '/requestPasswordReset', model);
  }

  getLevel() {
    return this.http.get(this.ipAddress + '/getLevel');
  }

  getMoreMatchHistory(model) {
    return this.http.post(this.ipAddress + '/getMoreMatchHistory', model);
  }

  getProfileData(model) {
    return this.http.post(this.ipAddress + '/getProfileData', model);
  }

  getUsername() {
    return this.http.get(this.ipAddress + '/getUsername');
  }

  addNumbers(model) {
    return this.http.post(this.ipAddress + '/addNumbers', model);
  }

  startTimer(model) {
    return this.http.post(this.ipAddress + '/startTimer', model);
  }

  stopTimer(model) {
    return this.http.post(this.ipAddress + '/stopTimer', model);
  }

  registerUser(model) {
    return this.http.post(this.ipAddress + '/registerUser', model);
  }

  verifyEmail(path) {
    return this.http.get(this.ipAddress + '/validateUser/' + path);
  }

  login(model) {
    return this.http.post(this.ipAddress + '/login', model);
  }

  sampleGetRequest() {
    return this.http.get(this.ipAddress + '/endpoint');
  }

  getLeaderboards(m) {
    return this.http.post(this.ipAddress + '/getLeaderboards', m);
  }

  getPersonalBest(m) {
    return this.http.post(this.ipAddress + '/getPersonalBest', m);
  }
}
