import { Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CockpitUserService {

  baseUrl = environment.apiUrl;


  constructor(private http: HttpClient) { }


  UpdateStatusActive(userEmail: string) {
    return this.http.put(this.baseUrl + 'CockpitUsers/updateStatusActive/' + userEmail, {});
  }

  UpdateStatusInActive(userEmail: string) {
    return this.http.put(this.baseUrl + 'CockpitUsers/updateStatusInActive/' + userEmail, {});
  }

  deleteSelectedUser(userEmail: string) {
    return this.http.delete(this.baseUrl + 'CockpitUsers/deleteUser/' + userEmail);
  }

}







