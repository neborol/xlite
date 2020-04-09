import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = 'http://localhost:5001/api/auth/';
  jwtHelper = new JwtHelperService();
  decodedToken: any;
  userName: string;

  constructor(private http: HttpClient, private router: Router) { }

  login(model: any) {
    return this.http.post(this.baseUrl + 'login', model)
      .pipe(map((response: any) => {
        const tokenObject = response;
        if (tokenObject) {
          let uniqueName;
          localStorage.setItem('eliteToken', tokenObject.token);
          this.decodedToken = this.jwtHelper.decodeToken(tokenObject.token);
          uniqueName = this.decodedToken.unique_name;
          if (uniqueName) {
            this.userName = uniqueName;
          }
          // this.userName = this.userName.charAt(0).toUpperCase() + this.userName.substr(1);
        }
      }));
  }

  register(model: any) {
    return this.http.post(this.baseUrl + 'register', model);
  }

  isLoggedIn() {
    // Get the token and then check if it has expired.
    const token = localStorage.getItem('eliteToken');
    return !this.jwtHelper.isTokenExpired(token);
  }

  logOut() {
    localStorage.removeItem('eliteToken');
    this.router.navigateByUrl('/');
    console.log('logged out');
  }
}
