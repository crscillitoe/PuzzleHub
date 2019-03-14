import { Injectable } from '@angular/core';
import { Options } from '../../interfaces/options';

@Injectable({
  providedIn: 'root'
})
export class OptionsService {
  options: Options;

  constructor() { }

  getOptions() {
    return this.options;
  }

  setOptions(options: Options) {
    this.options = options;
  }
}
