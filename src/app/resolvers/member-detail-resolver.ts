// import { Injectable } from '@angular/core';
// import { Resolve, Router, ActivatedRoute } from '@angular/router';
// import { MemberDto } from './MemberDto';
// import { MembersService } from './../../services/members.service';
// import { AlertifyService } from 'src/app/services/alertify.service';
// import { Observable, of } from 'rxjs';
// import { catchError } from 'rxjs/operators';
// import { Location } from '@angular/common';

// @Injectable()
// // **Note: this resolver helps us to get our data ready before we navigate to the page we want
// // to go to, but needs to be provided in out app.module just like our guards. This resolver is an
// // alternative to the "safe navigation operator" or "Elvis operator" (?) or optional operator.
// export class MemberDetailResolver implements Resolve<MemberDto> {
//     constructor(
//         private memberServ: MembersService,
//         private router: Router,
//         private alertify: AlertifyService,
//         private location: Location
//     ) {}

//     resolve(route: ActivatedRoute): Observable<MemberDto> {
//         return this.memberServ.getMember(route.params['id']).pipe( // **Note: getMember is subcribed
// //already, so all we can do is handle the errors:
//             catchError(error => {
//                 this.alertify.error('Problem retrieving data');
//                 this.location.back(); // or this.router.navigate(['/members']) // probably coming
// // from /members because this is member details
//                 return of(null);
//             })
//         );
//     }
// }
