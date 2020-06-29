import { Injectable, EventEmitter } from '@angular/core';



@Injectable({
  providedIn: 'root'
})
export class SpinnerService {

  triggerSpinner: EventEmitter<string> = new EventEmitter();

  constructor() { }


  showSpinner() {
    this.triggerSpinner.next('on');
  }

  hideSpinner() {
    this.triggerSpinner.next('off');
  }
}
