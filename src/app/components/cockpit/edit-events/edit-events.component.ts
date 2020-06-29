import { Component, OnInit, Output, TemplateRef, ViewChild, OnDestroy } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ImagesService } from '../../../services/images.service';
import { AlertifyService } from '../../../services/alertify.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog, MatTabGroup } from '@angular/material';
import { IResponse } from 'src/app/interfaces/response.interface';
import { IEventPostObject } from 'src/app/interfaces/event-post.interface';
import { CockpitEventService } from 'src/app/services/cockpit-event.service';
import { IEventUpdateObject } from 'src/app/interfaces/event-update.interface';
import { SpinnerService } from './../../../services/spinner.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-edit-events',
  templateUrl: './edit-events.component.html',
  styleUrls: ['./edit-events.component.scss']
})
export class EditEventsComponent implements OnInit {
  addEventsForm: FormGroup;
  editEventsForm: FormGroup;
  currentSelectedEvent: IEventUpdateObject;
  alphaNRegex = environment.alphaNRegex;
  editAlphaNRegex = environment.editAlphaNRegex;
  events2Display: IEventUpdateObject[];

  addEvent = true;
  editEvent = false;

  idx = 0;
  subscr: Subscription;
  @ViewChild('eventEditTab', {static: true}) tabGroup: MatTabGroup;



  constructor(
    private alertify: AlertifyService,
    public dialog: MatDialog,
    private cockpitEventService: CockpitEventService,
    private spinnerService: SpinnerService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.spinnerService.showSpinner();
    this.cockpitEventService.getEvents().subscribe((res: IEventUpdateObject[]) => {
      this.events2Display = res;
      this.editEvent = true;
      this.spinnerService.hideSpinner();
    }, error => {
      this.alertify.error('Events can not be retrieved.');
      this.spinnerService.hideSpinner();
    });

    this.addEventsForm = new FormGroup({
      'title': new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(60), Validators.pattern(this.alphaNRegex)]),
      'description': new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(250), Validators.pattern(this.alphaNRegex)]),
      'eventDate': new FormControl(new Date(''), [Validators.required]),
      'time': new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(60), Validators.pattern(this.alphaNRegex)]),
      'venue': new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(140), Validators.pattern(this.alphaNRegex)]),
      'comment': new FormControl('', [Validators.minLength(3), Validators.maxLength(200), Validators.pattern(this.alphaNRegex)])
    });
  }


  createEvent = () => {
    this.spinnerService.showSpinner();
    const eventObj: IEventPostObject = {
      title: this.addEventsForm.get('title').value,
      description: this.addEventsForm.get('description').value,
      time: this.addEventsForm.get('time').value,
      eventDate: this.addEventsForm.get('eventDate').value,
      venue: this.addEventsForm.get('venue').value,
      comment: this.addEventsForm.get('comment').value
    };

    this.cockpitEventService.postEvent(eventObj).subscribe((resp: IResponse) => {
      if (resp.success) {
        this.alertify.success(resp.message);
        this.addEventsForm.reset();
        this.spinnerService.hideSpinner();
        this.router.navigate(['cockpit/editevents/', 1]);
        this.ngOnInit();
        this.subscr = this.route.params.subscribe(p => {
          // grab the selected index from the url and pass it to the tab.
          this.tabGroup.selectedIndex = +p['idx'];
        });
      }
    }, error => {
      this.alertify.error('Event creation failed.');
    });
  }


  editSelectedEvent(templateRef: TemplateRef<any>, data) {
    this.currentSelectedEvent = data;

    this.editEventsForm = new FormGroup({
      'title': new FormControl(data.title, [Validators.required, Validators.minLength(5), Validators.maxLength(60), Validators.pattern(this.alphaNRegex)]),
      'description': new FormControl(data.description, [Validators.required, Validators.minLength(3), Validators.maxLength(250), Validators.pattern(this.alphaNRegex)]),
      'eventDate': new FormControl(data.eventDate, [Validators.required]),
      'time': new FormControl(data.time, [Validators.required, Validators.minLength(3), Validators.maxLength(60), Validators.pattern(this.alphaNRegex)]),
      'venue': new FormControl(data.venue, [Validators.required, Validators.minLength(3), Validators.maxLength(140), Validators.pattern(this.alphaNRegex)]),
      'comment': new FormControl(data.comment, [Validators.minLength(3), Validators.maxLength(200), Validators.pattern(this.alphaNRegex)])
    });

    this.dialog.open(templateRef);
  }

  updateAnEventItem() {
    this.spinnerService.showSpinner();
    const eventUpdateObj: IEventUpdateObject = {
      eventId: this.currentSelectedEvent.eventId,
      title: this.editEventsForm.get('title').value,
      description: this.editEventsForm.get('description').value,
      time: this.editEventsForm.get('time').value,
      eventDate: this.editEventsForm.get('eventDate').value,
      venue: this.editEventsForm.get('venue').value,
      comment: this.editEventsForm.get('comment').value
    };

    this.cockpitEventService.updateEvent(eventUpdateObj).subscribe((resp: IResponse) => {
      if (resp.success) {
        this.alertify.success(resp.message);
        this.spinnerService.hideSpinner();
        this.router.navigate(['cockpit/editevents/', 1]);
      }
    }, error => this.alertify.error('Event Update failed.'));
  }

  closeModal() {
    this.dialog.closeAll();
  }

  deleteSelectedEvent() {
    this.spinnerService.showSpinner();
    this.cockpitEventService.deleteEvent(this.currentSelectedEvent.eventId)
      .subscribe((res: IResponse) => {
          if (res.success) {
            this.alertify.success(res.message);
            this.spinnerService.hideSpinner();
            // Redirect to tab index number 1 in the following route.
            this.router.navigate(['cockpit/editevents/', 1]);
            // Load the updated user interface
            this.ngOnInit();
            this.subscr = this.route.params.subscribe(p => {
              // grab the selected index from the url and pass it to the tab.
              this.tabGroup.selectedIndex = +p['idx'];
            });
          }
      }, error => this.alertify.error('Image was not deleted.'));

    this.closeModal();
  }

  deleteAnEventItem() {
    this.alertify
      .confirm('Are you really sure you want to delete this event?', () => {
       this.deleteSelectedEvent();
    });
  }

  tabchange(evt) {
    switch (evt.index) {
      case 0: this.addEvent = true;
              break;
      case 1: this.editEvent = true;
              break;
    }
  }
}

