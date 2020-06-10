import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = environment.apiUrl;
  jwtHelper = new JwtHelperService();
  decodedToken: any;
  userName: string;
  currentToken: string;

  functions = {
    isNews: 'false',
    isPilot: 'false',
    isManager: 'false',
    isSuper: 'false'
  };


  constructor(private http: HttpClient, private router: Router) { }

  login(model: any) {
    return this.http.post(this.baseUrl + 'auth/tryLogin', model)
      .pipe(map((response: any) => {
        const tokenObject = response;
        this.currentToken = tokenObject.token;
        if (tokenObject.success) {
          let uniqueName;
          localStorage.setItem('eliteToken', tokenObject.token);
          this.decodedToken = this.jwtHelper.decodeToken(tokenObject.token);
          console.log('TDecodedToken', this.decodedToken);
          uniqueName = this.decodedToken.unique_name;
          this.functions.isNews = this.decodedToken.news;
          this.functions.isPilot = this.decodedToken.pilot;
          this.functions.isManager = this.decodedToken.manager;
          this.functions.isSuper = this.decodedToken.superAdmin;
          localStorage.setItem('eliteFuncs', JSON.stringify(this.functions));
          if (uniqueName) {
            this.userName = uniqueName;
          }
          // this.userName = this.userName.charAt(0).toUpperCase() + this.userName.substr(1);
        }
      }));
  }

  // login(model: any) {
  //   return this.http.post(this.baseUrl + 'auth/login', model)
  //     .pipe(map((response: any) => {
  //       const tokenObject = response;
  //       if (tokenObject) {
  //         let uniqueName;
  //         localStorage.setItem('eliteToken', tokenObject.token);
  //         this.decodedToken = this.jwtHelper.decodeToken(tokenObject.token);
  //         uniqueName = this.decodedToken.unique_name;
  //         if (uniqueName) {
  //           this.userName = uniqueName;
  //         }
  //         // this.userName = this.userName.charAt(0).toUpperCase() + this.userName.substr(1);
  //       }
  //     }));
  // }

  register(model: any) {
    return this.http.post(this.baseUrl + 'auth/register', model);
  }

  isLoggedIn() {
    // Get the token and then check if it has expired.
    const token = localStorage.getItem('eliteToken');
    return !this.jwtHelper.isTokenExpired(token);
  }

  logOut() {
    localStorage.removeItem('eliteToken');
    localStorage.removeItem('eliteFuncs');
    this.router.navigateByUrl('/');
    console.log('logged out');
  }

}
