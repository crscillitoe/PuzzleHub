import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedFunctionsService {

  constructor() { }

  static convertToDateString(seconds): string {
    if (seconds == 'N/A') return 'N/A';

    let secondsEditable = seconds;

    const hours = Math.floor(secondsEditable / 3600);
    secondsEditable -= (hours * 3600);

    const minutes = Math.floor(secondsEditable / 60);
    secondsEditable -= (minutes * 60);

    const millis = Math.floor(1000 * (secondsEditable - Math.floor(secondsEditable)));

    const hourString = hours.toString();
    const minuteString = minutes.toString().padStart(2, '0');

    const secondString = Math.floor(secondsEditable).toString().padStart(2, '0');
    const milliString = millis.toString().padStart(3, '0');

    if (hours > 0) {
      return hourString + ':' + minuteString + ':' + secondString + '.' + milliString;
    }

    return minuteString + ':' + secondString + '.' + milliString;
  }
}
