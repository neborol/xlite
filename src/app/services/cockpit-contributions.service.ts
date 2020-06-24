import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { IAmountDto } from '../components/cockpit/editFinances/editFinances.component';



@Injectable({
  providedIn: 'root'
})
export class CockpitContributionsService {

  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  addContributions(obj: IAmountDto) {
    return this.http.post(this.baseUrl + 'CockpitContributions/addContribution', obj);
  }

}
