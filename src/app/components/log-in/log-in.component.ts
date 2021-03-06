import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../services/auth.service';
import { Router} from '@angular/router';
import { AlertifyService } from 'src/app/services/alertify.service';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent implements OnInit {

  model = {userEmail: '', password: ''};
  isStatusActive = false;
  isSuper = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private alertify: AlertifyService,
    public dialog: MatDialog,
  ) { }

  ngOnInit() {
    const rights =  JSON.parse(localStorage.getItem('eliteFuncs'));
    if (rights.isSuper) {
      this.isSuper = true;
    }
    // this.authService.isLoggedIn ? this.router.navigateByUrl('/text') : this.router.navigateByUrl('/login') ;
  }

  login() {
    // if (this.authService.decodedToken.unique_name) {
    //   this.model.username = this.authService.decodedToken.unique_name;
    // }
    this.authService.login(this.model).subscribe(next => {
      this.router.navigateByUrl('/home');
      this.alertify.success('Logged in successfully');
    }, error => {
      this.alertify.error('Failed to login');
    });
  }


  // getEmailForReset() {
  //   this.router.navigateByUrl('/pwreset');
  // }

  closeModal() {
    this.dialog.closeAll();
    this.router.navigateByUrl('/home');
  }

}
