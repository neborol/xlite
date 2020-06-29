import { Component, OnInit } from '@angular/core';
import { CockpitEventService } from './../../services/cockpit-event.service';
import { IEventUpdateObject } from './../../interfaces/event-update.interface';
import { AlertifyService } from './../../services/alertify.service';
import { SpinnerService } from './../../services/spinner.service';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.scss']
})
export class ActivitiesComponent implements OnInit {

  events2Display: IEventUpdateObject[];

  constructor(
    private cockpitEventService: CockpitEventService,
    private alertify: AlertifyService,
    private spinnerService: SpinnerService
  ) { }

  ngOnInit() {
    this.spinnerService.showSpinner();
    this.cockpitEventService.getEvents().subscribe((res: IEventUpdateObject[]) => {
      this.events2Display = res.sort((b: any, a: any) => {
        return (new Date(b.eventDate) as any) - (new Date(a.eventDate) as any);
      });
      this.spinnerService.hideSpinner();
    }, error => {
      this.alertify.error('Events could not be retrieved');
    });
  }
}
