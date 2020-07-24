import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { AlertifyService } from './../../services/alertify.service';
import { IResponse } from 'src/app/interfaces/response.interface';

@Component({
  selector: 'app-pwreset',
  templateUrl: './pwreset.component.html',
  styleUrls: ['./pwreset.component.scss']
})
export class PwresetComponent implements OnInit {

  resetModel = {userEmail: '', password: '', passwordConf: ''};

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private authService: AuthService,
    private alertify: AlertifyService
  ) { }

  ngOnInit() {
  }

  closeModal() {
    this.dialog.closeAll();
    this.router.navigateByUrl('/home');
  }

  startPasswReset() {
    const regex = /[<>"']/g;
    // /^               : Start
    // (?=.{8,})        : Length
    // (?=.*[a-zA-Z])   : Letters
    // (?=.*\d)         : Digits
    // (?=.*[!#$%&? "]) : Special characters
    // $/               : End
    const passRegex = /^(?=.{8,})(?=.*[a-zA-Z])(?=.*\d)(?=.*[!#$%&? "])$/;
    let okStatus = true;

    if (this.resetModel.password !== this.resetModel.passwordConf) {
      this.alertify.error('Both passwords do not match');
      okStatus = false;
    }

    if (regex.test(this.resetModel.userEmail)) {
      this.alertify.error('Remove the bad characters from the email');
      okStatus = false;
    }

    if (passRegex.test(this.resetModel.passwordConf)) {
      this.alertify.error('Password is not up to standard');
      okStatus = false;
    }


    // check the length
    Object.keys(this.resetModel).forEach((item) => {
      if (this.resetModel[item].length > 40) {
        this.alertify.error('Max-length of 40 exceeded');
        okStatus = false;
      }
    });

    if (okStatus) {
      this.authService.resetPassWord(this.resetModel).subscribe((resp: IResponse) => {
        if (resp.success) {
          this.alertify.success('Password reset successfully');
          this.router.navigateByUrl('/login');
        }

      }, error => {
        this.alertify.error('Failed to reset password');
      });
    }
  }

}
