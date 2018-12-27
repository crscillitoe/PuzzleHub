import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ColorService {

  constructor() { }

  getColorScheme() {
    // TODO - check user preferred theme
    if(true) {
      let m = {
        BACKGROUND:  '#2C2C2C',
        GRID:        '#A89984',
        FOREGROUND:  '#FFF2AD',
        COLOR_0:     '#4DB93B',

        COLOR_1:     '#AAD46D',
        COLOR_1_ALT: '#D1F898',

        COLOR_2:     '#80DAAF',
        COLOR_2_ALT: '#A5FAD1',

        COLOR_3:     '#4BB5AC',
        COLOR_3_ALT: '#84E8DE',

        COLOR_4:     '#FFBA53',
        COLOR_4_ALT: '#FFD79D',

        COLOR_5:     '#D88799',
        COLOR_5_ALT: '#F8ABBD',

        COLOR_6:     '#F24B3E',
        COLOR_6_ALT: '#FF9289',

        COLOR_7:     '#DC1D2B',
        COLOR_7_ALT: '#F86872',

        COLOR_8:     '#EC2474',
        COLOR_8_ALT: '#FF77AD'
      }

      return m;
    } 
    
    // Colorblind
    else {
      let m = {
        BACKGROUND:  '#2C2C2C',
        GRID:        '#A89984',
        FOREGROUND:  '#FFF2AD',
        COLOR_0:     '#144DF7',

        COLOR_1:     '#117733',
        COLOR_1_ALT: '#5DA274',

        COLOR_2:     '#88CCEE',
        COLOR_2_ALT: '#AEDCF3',

        COLOR_3:     '#44AA99',
        COLOR_3_ALT: '#7FC5B9',

        COLOR_4:     '#DDCC77',
        COLOR_4_ALT: '#E8DCA2',

        COLOR_5:     '#FF9933',
        COLOR_5_ALT: '#FFCC99',

        COLOR_6:     '#FF4A38',
        COLOR_6_ALT: '#FF9085',

        COLOR_7:     '#FF5EF1',
        COLOR_7_ALT: '#FF9DF6',

        COLOR_8:     '#851F53',
        COLOR_8_ALT: '#B47696'
      }

      return m;
    }
  }
}
