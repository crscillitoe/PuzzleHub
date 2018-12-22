import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TunnelService {
  private ipAddress = 'http://localhost:5000';

  constructor(private http: HttpClient) { }

  getCookie(cookieName) {
    var name = cookieName + '=';
    var cookies = document.cookie.split(';');
    for(var i = 0; i < cookies.length; i++) {
      var cookie = cookies[i];
      while(cookie.charAt(0) === ' ') {
        cookie = cookie.substring(1);
      }

      if(cookie.indexOf(cookieName) === 0) {
        return cookie.substring(cookieName.length, cookie.length);
      }
    }

    return "";
  }

  createHeader() {
    var token = this.getCookie('PuzzleHubToken');
    var headers = new HttpHeaders;
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    headers.append('Authorization', token);
    return headers;
  }

  getNum() { 
    return this.http.get(this.ipAddress + '/getNum')
  }

  sampleGetRequest() {
    return this.http.get(this.ipAddress + '/endpoint' , {
      headers: this.createHeader()
    });
  }
}
