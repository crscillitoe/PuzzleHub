import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TunnelService {
  private ipAddress = 'http://localhost:5000';

  constructor(private http: HttpClient) { }

  getNum() { 
    return this.http.get(this.ipAddress + '/getNum')
  }
}
