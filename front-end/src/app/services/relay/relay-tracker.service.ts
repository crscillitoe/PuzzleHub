import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable({
  providedIn: 'root'
})
export class RelayTrackerService {
  public static playingQueue: boolean = false;
  public static queue: any;
  public static index: any;
  public static timeElapsed: number = 0;
  public static queueTimes: any;
  public static challengeMode: number = 0;

  constructor() {}
}