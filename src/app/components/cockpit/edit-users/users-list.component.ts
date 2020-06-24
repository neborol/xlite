import { Component, OnInit, TemplateRef } from '@angular/core';
import { IUser } from '../../../interfaces/User-creation.interface';
import { UserService } from 'src/app/services/users.service';
import { MatDialog } from '@angular/material';
import { CockpitUserService } from './../../../services/cockpit-users.service';
import { IResponse } from 'src/app/interfaces/response.interface';
import { AlertifyService } from 'src/app/services/alertify.service';
import { FormControl} from '@angular/forms';
import 'moment/locale/pt-br';


@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
})
export class UsersListComponent implements OnInit {
  members: IUser[];
  selectedUser: IUser;
  deleteRequested = false;
  activateRequested = false;
  value = 'Clear me';
  searchTerm = '';
  selectedMonth = 'None';
  numberRegex = '^[0-9]+$';
  alphaNRegex = '^[0-9a-zA-Z \. \\ \-_,\t\r\n\'\"]+$';
  // date = new FormControl(moment());


  initial = new FormControl(new Date());
  shouldbe = null;


  constructor(
    private userService: UserService,
    public dialog: MatDialog,
    private cockpituserService: CockpitUserService,
    private alertify: AlertifyService
  ) { }


  ngOnInit() {
    this.getAllMembers();
  }

  getAllMembers(search?) {
    this.userService.getUsers().subscribe((allUsers: IUser[]) => {
      this.members = allUsers.filter(u => {
        if (search) {
          return u.codeNr === search.value;
        } else {
          return true;
        }
      });
    });
  }

  searchMember(searchTerm): void {
    this.getAllMembers(searchTerm);
  }

  reactToEnterKey(v) {
    this.searchMember(v);
  }

  editSelectedUser(templateRef: TemplateRef<any>, data) {
      this.selectedUser = data;
      this.dialog.open(templateRef);
  }

  closeModal() {
    this.dialog.closeAll();
  }

  deleteRequestDialogue() {
    this.deleteRequested = !this.deleteRequested;
  }

  activateRequestDialogue() {
    this.activateRequested = !this.activateRequested;
  }

  UpdateStatusActive() {
    this.cockpituserService.UpdateStatusActive(this.selectedUser.email).subscribe((res: IResponse) => {
      if (res.success) {
        this.alertify.success(res.message);
        this.closeModal();
      }
    }, error => this.alertify.error('User was not updated.'));
  }

  UpdateStatusInActive() {
    this.cockpituserService.UpdateStatusInActive(this.selectedUser.email).subscribe((res: IResponse) => {
      if (res.success) {
        this.alertify.success(res.message);
        this.closeModal();
      }
    }, error => this.alertify.error('User was not updated.'));
  }

  deleteSelectedUser() {
    this.cockpituserService.deleteSelectedUser(this.selectedUser.email).subscribe((res: any) => {
      if (res.success) {
        this.alertify.success(res.message);
        this.closeModal();
      }
    }, error => this.alertify.error('User was not deleted.'));

    this.closeModal();
  }



}
