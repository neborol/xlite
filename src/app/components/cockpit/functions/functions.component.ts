import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService, ClaimObject } from './../../../services/users.service';
import { IUser } from '../../../interfaces/User-creation.interface';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { GenericModalComponent } from '../../generic-modal/generic-modal.component';
import { AlertifyService } from './../../../services/alertify.service';
import { Subscription } from 'rxjs';

export interface StdResponseObject {
  success: boolean;
  message: string;
}


@Component({
  selector: 'app-functions',
  templateUrl: './functions.component.html',
  styleUrls: ['./functions.component.scss']
})
export class FunctionsComponent implements OnInit, OnDestroy {
  users: IUser[];
  claimsSubscription: Subscription;


  constructor(private userService: UserService, public dialog: MatDialog, private alertify: AlertifyService) { }

  ngOnInit() {
    this.getAllMembers();
    this.claimsSubscription = this.userService.userDataSubjectEvent.subscribe((claimsData: ClaimObject) => {
      // Since the user claims have been changed, submit the data to the back-end
      this.userService.setUserClaims(claimsData.id, claimsData.claims).subscribe((resp: StdResponseObject) => {
        if (resp.success) {
          this.alertify.success(resp.message);
        }
      }, error => {
        this.alertify.error('Claims Update Failed');
      });
    });
  }

  getAllMembers() {
    this.userService.getUsersSuper().subscribe((usersList: IUser[]) => {
      this.users = usersList;
    }, error => console.error(error));
  }

  getUserClaims(obj) {
    this.userService.getUserClaims(obj.id).subscribe((claims: any) => {
      obj.claims = claims;
      this.openDialog(obj);
    }, error => {
      this.alertify.error('Sorry, something went wrong with the claims retrieval');
    });
  }

  openDialog(obj) {
    const config = new MatDialogConfig();
    config.data = obj;
    const dialogRef = this.dialog.open(GenericModalComponent, config);

    dialogRef.afterClosed().subscribe(result => {
      // console.log(`Dialog result: ${result}`);
    });
  }

  ngOnDestroy() {
    // Unsubscribe to ensure no memory leaks occur.
    this.claimsSubscription.unsubscribe();
  }
}
