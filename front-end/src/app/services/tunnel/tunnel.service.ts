import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProfileData } from '../../classes/profile-data';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TunnelService {
  private ipAddress = 'https://puzzlehub.io/api';

  constructor(private http: HttpClient) { }

  changePasswordWithCode(model: {Code: string, NewPassword: string}) {
    return this.http.post(this.ipAddress + '/changePasswordWithCode', model);
  }

  forgotPassword(model: {Email: string}) {
    return this.http.post(this.ipAddress + '/requestPasswordReset', model);
  }

  getLevel() {
    return this.http.get(this.ipAddress + '/getLevel');
  }

  setProfileIcon(model: {PuzzlerIconID: number}) {
    return this.http.post(this.ipAddress + '/setPuzzlerIcon', model);
  }

  completeDailyChallenge(model: {Difficulty: number}) {
    return this.http.post(this.ipAddress + '/completeDailyChallenge', model);
  }

  getCompletedDailyChallenges() {
    return this.http.get<number[]>(this.ipAddress + '/getCompletedDailyChallenges');
  }

  getDailyChallenges() {
    return this.http.get<{
      Difficulty: number,
      Length: number,
      Relay: string,
      XPReward: number
    }[]>(this.ipAddress + '/getDailyChallenges');
  }

  getPuzzlerIcons() {
    return this.http.get<{
      AccentColor: string,
      Color: string,
      Default: number,
      IconDescription: string,
      IconID: number,
      IconPath: string
    }[]>(this.ipAddress + '/getPuzzlerIcons');
  }  

  getUserData() {
    return this.http.get(this.ipAddress + '/getUserData');
  }

  getMoreMatchHistory(model: {Username: string, Offset: number}) {
    return this.http.post(this.ipAddress + '/getMoreMatchHistory', model);
  }

  getProfileData(model: {Username: string}) {
    return this.http.post(this.ipAddress + '/getProfileData', model);
  }

  getUsername() {
    return this.http.get(this.ipAddress + '/getUsername');
  }

  startTimer(model: {GameID: number, Difficulty: number}) {
    return this.http.post(this.ipAddress + '/startTimer', model);
  }

  stopTimer(model: {GameID: number, Difficulty: number}) {
    return this.http.post(this.ipAddress + '/stopTimer', model);
  }

  registerUser(model: {Username: string, Password: string, Email: string, Token: string}) {
    return this.http.post(this.ipAddress + '/registerUser', model);
  }

  verifyEmail(path: string) {
    return this.http.get(this.ipAddress + '/validateUser/' + path);
  }

  login(model: {Username: string, Password: string}) {
    return this.http.post(this.ipAddress + '/login', model);
  }

  getLeaderboards(m: {Position: number,
                      NumEntries: number,
                      GameID: number,
                      Difficulty: number,
                      Leaderboard: number}) {
    return this.http.post(this.ipAddress + '/getLeaderboards', m);
  }

  getPersonalBest(m: {GameID: number, Difficulty: number}) {
    return this.http.post(this.ipAddress + '/getPersonalBest', m);
  }

  getNumEntries(m: {GameID: number, Difficulty: number, Leaderboard: number}) {
    return this.http.post(this.ipAddress + '/getNumEntries', m);
  }

  getFooter(m: {GameID: number, Difficulty: number, Leaderboard: number}) {
    return this.http.post(this.ipAddress + '/getFooter', m);
  }
}
