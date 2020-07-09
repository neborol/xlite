import { Component, OnInit, Input, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { SpinnerService } from './../services/spinner.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: []
})
export class SpinnerComponent implements OnInit, OnDestroy {

  @Input() topPos: string;
  // @Input() leftPos: string;
  displayValue = 'none';
  subscrition: Subscription;

  constructor(private spinnerService: SpinnerService) { }

  ngOnInit() {
    this.subscrition = this.spinnerService.triggerSpinner.subscribe((value: string) => {
      if (value === 'off') {
        this.displayValue = 'none';
      } else if (value === 'on') {
        this.displayValue = 'block';
      }
    });
  }

  ngOnDestroy() {
    this.subscrition.unsubscribe();
  }

}
