import { Component, OnInit, Output, TemplateRef } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ImagesService } from '../../../services/images.service';
import { AlertifyService } from '../../../services/alertify.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { IResponse } from 'src/app/interfaces/response.interface';
import { IEventPostObject } from 'src/app/interfaces/event-post.interface';
import { CockpitEventService } from 'src/app/services/cockpit-event.service';
import { IEventUpdateObject } from 'src/app/interfaces/event-update.interface';


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
  events2Display: IEventPostObject[];
  indexer = 1;


  constructor(
    private alertify: AlertifyService,
    public dialog: MatDialog,
    private cockpitEventService: CockpitEventService
  ) { }

  ngOnInit() {
    this.cockpitEventService.getEvents().subscribe((res: IEventUpdateObject[]) => {
      this.events2Display = res;
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


  creaeEvent = () => {
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
      }
    }, error => this.alertify.error('Event creation failed.'));
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
      }
    }, error => this.alertify.error('Event Update failed.'));
  }

  closeModal() {
    this.dialog.closeAll();
  }

  deleteSelectedEvent() {
    this.cockpitEventService.deleteEvent(this.currentSelectedEvent.eventId)
      .subscribe((res: IResponse) => {
          if (res.success) {
            this.alertify.success(res.message);
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

}

