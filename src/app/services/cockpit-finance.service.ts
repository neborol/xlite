import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';



@Injectable({
  providedIn: 'root'
})
export class CockpitFinanceService {

  baseUrl = environment.apiUrl;


  constructor(private http: HttpClient) { }


  getFinancialSubscriptions(userId: string) {
    return this.http.get(this.baseUrl + 'CockpitFinances/getSubscriptions/' + userId);
  }

  getTotalContributions() {
    return this.http.get(this.baseUrl + 'CockpitFinances/contributions');
  }

}
