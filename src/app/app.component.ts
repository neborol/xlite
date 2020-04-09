import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Elite Force';
  jwtHelper = new JwtHelperService();

  constructor(public authService: AuthService) {}

  ngOnInit() {
    const currentToken = localStorage.getItem('eliteToken');
    // Make the decoded token available and show username even on page refresh.
    if (currentToken) {
      this.authService.decodedToken = this.jwtHelper.decodeToken(currentToken);
      this.authService.userName = this.jwtHelper.decodeToken(currentToken).unique_name;
    }
  }
}
