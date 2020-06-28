import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { IUser } from '../../../interfaces/User-creation.interface';
import { UserService } from 'src/app/services/users.service';
import { MatDialog } from '@angular/material';
import { CockpitUserService } from './../../../services/cockpit-users.service';
import { IResponse } from 'src/app/interfaces/response.interface';
import { AlertifyService } from 'src/app/services/alertify.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import { CockpitContributionsService } from './../../../services/cockpit-contributions.service';

// Depending on whether rollup is used, moment needs to be imported differently.
// Since Moment.js doesn't have a default export, we normally need to import using the `* as`
// syntax. However, rollup creates a synthetic default module and we thus need to import it using
// the `default as` syntax.
import * as moment from 'moment';
import { Moment } from 'moment';
import 'moment/locale/pt-br';
import { CockpitFinanceService } from 'src/app/services/cockpit-finance.service';

import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { environment } from 'src/environments/environment';


export interface IAmountDto {
  dateEntered: Date;
  month: string;
  year: string;
  amount: number;
  userId: string;
  comment?: string;
}

// tslint:disable-next-line:no-duplicate-imports
// import {default as _rollupMoment, Moment} from 'moment';
// const moment = _rollupMoment || _moment;

// See the Moment.js docs for the meaning of these formats:
// https://momentjs.com/docs/#/displaying/format/
export const MY_FORMATS = {
  parse: {
    dateInput: 'MM/YYYY',
  },
  display: {
    dateInput: 'MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};


@Component({
  selector: 'app-editfinance',
  templateUrl: './editFinances.component.html',
  styleUrls: ['./editFinances.component.scss'],
  providers: [
    // `MomentDateAdapter` can be automatically provided by importing `MomentDateModule` in your
    // application's root module. We provide it at the component level here, due to limitations of
    // our example generation script.
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ]
})

export class EditFinancesComponent implements OnInit {
  members: IUser[];
  selectedUser: IUser;
  deleteRequested = false;
  activateRequested = false;
  value = 'Clear me';
  searchTerm = '';
  selectedMonth = 'None';
  contributionsForm: FormGroup;
  numberRegex = '^[0-9]+$';
  alphaNRegex = environment.alphaNRegex;
  // date = new FormControl(moment());
  userSubscriptions: IAmountDto[];


  initial = new FormControl(new Date());
  shouldbe = null;

  grandTotal: number;



  displayedColumns: string[] = ['id', 'name', 'amount', 'comment'];
  dataSource = new MatTableDataSource(this.userSubscriptions);

  @ViewChild(MatSort, {static: true}) sort: MatSort;


  constructor(
    private userService: UserService,
    public dialog: MatDialog,
    private cockpituserService: CockpitUserService,
    private alertify: AlertifyService,
    private contributionsService: CockpitContributionsService,
    private financeService: CockpitFinanceService
  ) { }


  ngOnInit() {
    this.dataSource.sort = this.sort;
    this.getAllMembers();
    this.financeService.getTotalContributions().subscribe((resp: number) => {
      this.grandTotal = resp;
      console.log('tag', resp);
    });

    this.contributionsForm = new FormGroup({
      'date': new FormControl(new Date(''), [Validators.required]),
      'amount': new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(4), Validators.pattern(this.numberRegex)]),
      'comments': new FormControl('', [Validators.minLength(5), Validators.maxLength(600), Validators.pattern(this.alphaNRegex)]),
    });
  }

  getAllMembers(search?) {
    this.userService.getUsers().subscribe((allUsers: IUser[]) => {
      this.members = allUsers;

      // If there is a search object, this.members above will be overridden by the filter bellow.
      if (search) {
        this.members = allUsers.filter(u => {
          return u.codeNr === search.value;
        });
      }
    });
  }

  searchMember(searchTerm): void {
    this.getAllMembers(searchTerm);
  }

  resetSearchResult(query) {
    query.value = '';
    this.searchMember('');
  }

  addAMonthlyContributions(templateRef: TemplateRef<any>, data) {
    this.selectedUser = data;
    this.dialog.open(templateRef);
  }

  getUserContributions(templateRef: TemplateRef<any>, data) {
    this.selectedUser = data;
    this.financeService.getFinancialSubscriptions(this.selectedUser.id).subscribe((subsc: IAmountDto[]) => {
      this.userSubscriptions = subsc;
      console.log('subs', subsc);

      this.dialog.open(templateRef);
    }, error => this.alertify.error('User subscriptions can not be retrieved'));
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

  sumbmitMonthlyContribution() {
    const amountObj: IAmountDto = {
      dateEntered: this.contributionsForm.get('date').value,
      month: moment(this.contributionsForm.get('date').value).format('MMM'),
      year: moment(this.contributionsForm.get('date').value).format('YYYY'),
      amount: +this.contributionsForm.get('amount').value,
      comment: this.contributionsForm.get('comments').value,
      userId: this.selectedUser.id
    };

    this.contributionsService.addContributions(amountObj).subscribe((res: IResponse) => {
      if (res.success) {
        this.alertify.success('Contribution for ' + this.selectedUser.firstName + ' was updated.');
      }
    }, error => this.alertify.error('Contribution for ' + this.selectedUser.firstName + ' was not updated.'));
    this.contributionsForm.reset();
    this.closeModal();
  }

}

