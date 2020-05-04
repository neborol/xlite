import { Component, OnInit } from '@angular/core';
import { MembersService } from '../../services/users.service';
import { UserDto } from './UserDto';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  users: UserDto[];
  constructor(private userService: MembersService) { }

  ngOnInit() {
    this.getAllMembers();
  }

  getAllMembers() {
    this.userService.getUsers().subscribe((zz: UserDto[]) => {
      this.users = zz;
      console.log('Expecting');
      console.log(zz);
    }, error => console.error(error));
    // .pipe(map((response: any) => {
    //   const members = response;
    //   }))
  }
}
