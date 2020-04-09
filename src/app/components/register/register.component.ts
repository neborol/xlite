import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { AlertifyService } from './../../services/alertify.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent implements OnInit {

  Roles: any = ['Admin', 'Author', 'Reader'];
  model: any = {};

  constructor(private router: Router, private authService: AuthService, private alertify: AlertifyService) { }

  ngOnInit() {
  }

  register() {
    this.authService.register(this.model).subscribe((data: any) => {
      console.log('Registration Successful');
      if (data.success) {
        this.alertify.success('Great! You are now registered');
        this.router.navigateByUrl('/login');
      }
    }, error => {
      this.alertify.error('Registration failed');
    });
  }

  cancel() {
    this.router.navigateByUrl('/login');
  }

}
