import { Component, OnInit, Inject, Input } from '@angular/core';
import { MatDialogConfig } from '@angular/material';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { normalizePassiveListenerOptions } from '@angular/cdk/platform';
import { FormGroup, FormBuilder } from '@angular/forms';
import { UserService } from 'src/app/services/users.service';


export interface Claim {
  type: string;
  value: any;
}

@Component({
  selector: 'app-generic-modal',
  templateUrl: './generic-modal.component.html',
  styleUrls: ['./generic-modal.component.scss']
})
export class GenericModalComponent implements OnInit {
  claims: Claim[];
  details;
  checked = false;

  claimsForm: FormGroup;


  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<GenericModalComponent>,
    private userService: UserService
    ) {
      this.data.claims.forEach((elt: Claim) => {
        if (elt.value === 'true') {
          elt.value = true;
        } else {
          elt.value = false;
        }
      });

      this.claims = this.data.claims;
    }

  ngOnInit() {
    this.details = this.data;
  }

  submitClaims() {
    this.claims.forEach(element => {
      if (element.value === true) {
        element.value = 'true';
      } else {
        element.value = 'false';
      }
    });

    this.userService.passClaimsChanges(this.details);
  }

}
