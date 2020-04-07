import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../services/auth.service';
import { Router} from '@angular/router';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent implements OnInit {

  model: object = {};

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    // this.authService.isLoggedIn ? this.router.navigateByUrl('/text') : this.router.navigateByUrl('/login') ;
  }

  login() {
    this.authService.login(this.model).subscribe(next => {
      this.router.navigateByUrl('/home');
      console.log('Logged in successfully');
    }, error => {
      console.log('Failed to login');
    });
  }

}
