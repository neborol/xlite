import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = 'http://localhost:5001/api/auth/';

  constructor(private http: HttpClient, private router: Router) { }

  login(model: any) {
    return this.http.post(this.baseUrl + 'login', model)
      .pipe(map((response: any) => {
        const tokenObject = response;
        if (tokenObject) {
          localStorage.setItem('eliteToken', tokenObject.token);
        }
      }));
  }

  register(model: any) {
    return this.http.post(this.baseUrl + 'register', model);
  }

  isLoggedIn() {
    const token = localStorage.getItem('eliteToken');
    return !!token;
  }

  logOut() {
    localStorage.removeItem('eliteToken');
    this.router.navigateByUrl('/login');
    console.log('logged out');
  }
}
