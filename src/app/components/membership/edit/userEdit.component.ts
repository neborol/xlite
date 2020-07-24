import { Component, OnInit } from '@angular/core';
import { IUser } from '../../../interfaces/User-creation.interface';
import { ActivatedRoute, Data } from '@angular/router';

@Component({
  selector: 'app-member-edit',
  templateUrl: './memberEdit.component.html',
  styleUrls: ['./memberEdit.component.scss']
})
export class MemberEditComponent implements OnInit {
  member: any;
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    // The data(this.member) needed by this component, would be passed by the resolve guard before this component loads.
    //    which is a ways to prevent lapses in data load
    this.route.data.subscribe(
      (data: Data) => {
        this.member = data.uniqueXX; // This uniqueXX must match the name used in the route as the resolve object property
      }
    );
    // this.route.data.subscribe(data => {
    //   const member = 'member';
    //   console.log('Data-2-test', data);

    //   this.member = data[member];
    // });
  }

}
