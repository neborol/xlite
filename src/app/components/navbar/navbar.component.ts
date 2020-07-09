import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { AlertifyService } from 'src/app/services/alertify.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  // Routes that if navigated to, would highlight the main menu button.
  mainMenuRoutes: string[] = ['about', 'news', 'donations', 'activities', 'relieve', 'faq', 'videos', 'other'];

  inMainMenu = false;


  constructor(public authService: AuthService, private alertify: AlertifyService, private router: Router) {}

  ngOnInit() {
    this.router.events.subscribe(() => {
      if (this.mainMenuRoutes.includes(location.pathname.substr(1))) {
        this.inMainMenu = true;
      } else {
        this.inMainMenu = false;
      }
    });
  }

  logout() {
    this.authService.logOut();
    this.alertify.warning('You are currently logged out.');
  }
}
