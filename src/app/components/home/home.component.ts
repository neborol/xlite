import { Component, OnInit } from '@angular/core';
import { MembersService } from './../../services/members.service';
import { MemberDto } from './MemberDto';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  members: MemberDto[];
  constructor(private memberService: MembersService) { }

  ngOnInit() {
    this.getAllMembers();
  }

  getAllMembers() {
    this.memberService.getMembers().subscribe((zz: MemberDto[]) => {
      this.members = zz;
      console.log('Expecting');
      console.log(zz);
    }, error => console.error(error));
    // .pipe(map((response: any) => {
    //   const members = response;
    //   }))
  }
}
