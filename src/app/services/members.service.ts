import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { MemberDto } from '../components/home/MemberDto';


@Injectable({
  providedIn: 'root'
})

export class MembersService {
  baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  getMembers() {
    return this.http.get<MemberDto[]>(this.baseUrl + 'members');
  }

  getMember() {
    return 'Takang';
    // return this.http.get<MemberDto[]>(this.baseUrl + 'members' + id);
  }
}


