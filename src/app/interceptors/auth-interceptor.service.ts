import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { AuthService } from './../services/auth.service';
import { Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})


export class AuthInterceptorService implements HttpInterceptor {
  urlsToNotUse: Array<string>;
  constructor(private authService: AuthService ) {
    this.urlsToNotUse = [
      'auth/register/.+',
      'auth/tryLogin/.+'
    ];
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Any code in here will run just before any request leaves the front-end to the backend.
    if (this.isValidRequestForInterceptor(request.url)) {
      const modifiedRequest = request.clone({
          withCredentials: true,
          responseType: 'json',
          setHeaders: {
            Authorization: 'Bearer ' + localStorage.getItem('eliteToken'),
            currentUser: this.authService.decodedToken ? this.authService.decodedToken.unique_name : ''
          }
      });

      // This would allow the request to continue it's journey after the interception, else the app breaks.
      return next.handle(modifiedRequest);
    }
    // Else let the request continue
    return next.handle(request);
  }


  private isValidRequestForInterceptor(requestUrl: string): boolean {
    const positionIndicator = 'api/';
    const position = requestUrl.indexOf(positionIndicator);
    if (position > 0) {
      const destination: string = requestUrl.substr(position + positionIndicator.length);
      for (const address of this.urlsToNotUse) {
        if (this.RegExpFxn(address).test(destination)) {
          return false;
        }
      }
    }
    return true;
  }

  private RegExpFxn(word) {
    return new RegExp('/' + word + '/', 'i');
  }

}
