import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { UserDto } from '../components/home/UserDto';
import { Subject } from 'rxjs';
import { Claim } from '../components/generic-modal/generic-modal.component';

export interface ClaimObject {
  id: string;
  claims: Claim[];
}

@Injectable({
  providedIn: 'root'
})

export class UserService {
  baseUrl = environment.apiUrl;

  public userDataSubjectEvent = new Subject<any>();

  constructor(private http: HttpClient) { }

  passClaimsChanges(obj) {
    this.userDataSubjectEvent.next(obj);
  }

  getUsers() {
    return this.http.get<UserDto[]>(this.baseUrl + 'users/getusers');
  }

  getUsersSuper() {
    return this.http.get<UserDto[]>(this.baseUrl + 'users/getuserssuper');
  }

  getUserClaims(id) {
    return this.http.get(this.baseUrl + 'users/getclaims/' + id);
  }

  setUserClaims(id, obj) {
    return this.http.put(this.baseUrl + 'users/updateclaims/' + id, obj);
  }

  getUser() {
     return 'Takang';
    // return this.http.get<UserDto>(this.baseUrl + 'members' + id);
  }
}


