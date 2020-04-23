import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRoute, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { MemberDto } from '../components/home/MemberDto';
import { MembersService } from './../services/members.service';
import { AlertifyService } from 'src/app/services/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Location } from '@angular/common';
import { AuthService } from 'src/app/services/auth.service';

@Injectable()
// **Note: this resolver helps us to get our data ready before we navigate to the page we want
// to go to, but needs to be provided in out app.module just like our guards. This resolver is an
// alternative to the "safe navigation operator" or "Elvis operator" (?) or optional operator.

// export class MemberEditResolver implements Resolve<{ unique_name: string }> {
//     constructor(
//         private memberService: MembersService,
//         private router: Router,
//         private alertify: AlertifyService,
//         private location: Location,
//         private authService: AuthService
//     ) {}

//     // When this method gets called by Angular, angular will provide us the ActivatedRouteSnapshot and the RouterStateSnapShot
//        resolve(routeSnapShot: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<{ unique_name: string }> {
//         return this.memberService.getMember(this.authService.decodedToken.unique_name).pipe( // **Note: getMember is subcribed already, so all we can do is handle the errors:
//             catchError(error => {
//                 this.alertify.error('Problem retrieving member edit data');
//                 this.location.back(); // or this.router.navigate(['/members']) // probably coming from /members because this is member details
//                 return of(null);
//             })
//         );
//     }
// }


export class MemberEditResolver implements Resolve<string> {
    constructor(
        private memberService: MembersService,
        private router: Router,
        private alertify: AlertifyService,
        private location: Location,
        private authService: AuthService
    ) {}

    // When this method gets called by Angular, angular will provide us the ActivatedRouteSnapshot and the RouterStateSnapShot
       resolve(routeSnapShot: ActivatedRouteSnapshot, state: RouterStateSnapshot): string {
        return this.memberService.getMember();
    }
}
