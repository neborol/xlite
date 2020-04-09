import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../services/auth.service';
import { Router} from '@angular/router';
import { AlertifyService } from 'src/app/services/alertify.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent implements OnInit {

  model: object = {};

  constructor(private authService: AuthService, private router: Router, private alertify: AlertifyService) { }

  ngOnInit() {
    // this.authService.isLoggedIn ? this.router.navigateByUrl('/text') : this.router.navigateByUrl('/login') ;
  }

  login() {
    this.authService.login(this.model).subscribe(next => {
      this.router.navigateByUrl('/home');
      this.alertify.success('Logged in successfully');
    }, error => {
      this.alertify.error('Failed to login');
    });
  }

}
