import {Injectable} from '@angular/core';

@Injectable()
export class CommonFunctions {


    // check if mobile device
  isMobile(): boolean {
    let isMobile = false;
    if (window.screen.width <= 700) { isMobile = true; }
    return isMobile;
  }

}
