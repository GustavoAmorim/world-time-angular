import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  readonly DAYS_SHORT = [
    'MON',
    'TUE',
    'WED',
    'THU',
    'FRI',
    'SAT',
    'SUN'
  ];

  readonly DAYS_LONG = [
    'MONDAY',
    'TUESDAY',
    'WEDNESDAY',
    'THURSDAY',
    'FRIDAY',
    'SATURDAY',
    'SUNDAY'
  ];

  readonly CLASS_LIST = {
    0 : 'zero',
    1 : 'one',
    2 : 'two',
    3 : 'three',
    4 : 'four',
    5 : 'five',
    6 : 'six',
    7 : 'seven',
    8 : 'eight',
    9 : 'nine',
    ':' : 'dots',
    'dots': ':'
  };


  constructor() { }

   public to2Digit(str: string): string | undefined {

    if (!str) {

      return undefined;
    }

    const isString: boolean = (typeof str == 'string');
    if (isString && str.length == 1) {

      str = 0 + str;
    }

    return str;
  }
}
