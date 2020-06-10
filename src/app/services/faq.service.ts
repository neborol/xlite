import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { UserDto } from '../components/home/UserDto';
import { Subject } from 'rxjs';
import { Claim } from '../components/generic-modal/generic-modal.component';
import { IFaqGet } from '../interfaces/faqs-get.interface';


@Injectable({
  providedIn: 'root'
})

export class FaqService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getFaqs() {
    return this.http.get<IFaqGet[]>(this.baseUrl + 'CockpitFaq/getfaqs');
  }

  editAnFaq(obj) {
    return this.http.put<IFaqGet>(this.baseUrl + 'CockpitFaq/getfaqs', obj);
  }

}


