import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { UserDto } from '../components/home/UserDto';


@Injectable({
  providedIn: 'root'
})

export class MembersService {
  baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  getUsers() {
    return this.http.get<UserDto[]>(this.baseUrl + 'users');
  }

  getUser() {
     return 'Takang';
    // return this.http.get<UserDto>(this.baseUrl + 'members' + id);
  }
}


