import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { AlertifyService } from 'src/app/services/alertify.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private authService: AuthService, private alertify: AlertifyService) { }

  ngOnInit() {}

  logout() {
    this.authService.logOut();
    this.alertify.warning('You are currently not logged in.');
  }
}
