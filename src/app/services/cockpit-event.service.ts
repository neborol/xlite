import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { IEventPostObject } from '../interfaces/event-post.interface';
import { IEventUpdateObject } from '../interfaces/event-update.interface';



@Injectable({
  providedIn: 'root'
})
export class CockpitEventService {

  baseUrl = environment.apiUrl;


  constructor(private http: HttpClient) { }


  postEvent(eventObj: IEventPostObject) {
    return this.http.post(this.baseUrl + 'CockpitEvents/createevent', eventObj);
  }

  getEvents() {
    return this.http.get(this.baseUrl + 'CockpitEvents/getevents');
  }

  deleteEvent(eventId: number) {
    return this.http.delete(this.baseUrl + 'CockpitEvents/deleteevent/' + eventId);
  }

  updateEvent(eventUpdateObj: IEventUpdateObject) {
    return this.http.put(this.baseUrl + 'CockpitEvents/updateevent', eventUpdateObj);
  }

}
