import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent implements OnInit {

  Roles: any = ['Admin', 'Author', 'Reader'];
  model: any = {};

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() {
  }

  register() {
    this.authService.register(this.model).subscribe((data: any) => {
      console.log('Registration Successful');
      if (data.success) {
        this.router.navigateByUrl('/login');
      }
    }, error => {
      console.log('Registration failed');
    });
  }

  cancel() {
    this.router.navigateByUrl('/login');
  }

}
