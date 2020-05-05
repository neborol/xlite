import { Injectable } from '@angular/core';
import { ValidatorFn, AbstractControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class CustomvalidationService {

  patternValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      if (!control.value) {
        return null;
      }
      const regex = new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$');
      const valid = regex.test(control.value);
      return valid ? null : { invalidPassword: true };
    };
  }

  userNameValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      if (!control.value) {
        return null;
      }
      const regex = new RegExp('/^[0-9a-zA-Z]+$/');
      const valid = regex.test(control.value);
      return valid ? null : { invalidUsername: true };
    };
  }

  urlValidator(control: AbstractControl): { [key: string]: any } {
    if (!control.value.startsWith('https') || !control.value.includes('.io')) {
        return { validUrl: true }; // If Validation fails, we can reference "validUrl" at the formControl so as to show validation errors.
      }
    return null; // If validation passes, we return null.
  }

  MatchPassword(password: string, passwordConf: string) {
    return (formGroup: FormGroup) => {
      const passwordControl = formGroup.controls[password];
      const confirmPasswordControl = formGroup.controls[passwordConf];

      if (!passwordControl || !confirmPasswordControl) {
        return null;
      }

      if (confirmPasswordControl.errors && !confirmPasswordControl.errors.passwordMismatch) {
        return null;
      }

      if (passwordControl.value !== confirmPasswordControl.value) {
        confirmPasswordControl.setErrors({ passwordMismatch: true });
      } else {
        confirmPasswordControl.setErrors(null);
      }
    };
  }

  passwordMatchValidator(rForm: FormGroup) {
    return rForm.get('password').value === rForm.get('passwordConf').value ? null : {mismatch: true};
  }


//   userNameValidator(userControl: AbstractControl) {
//     return new Promise(resolve => {
//       setTimeout(() => {
//         if (this.validateUserName(userControl.value)) {
//           resolve({ userNameNotAvailable: true });
//         } else {
//           resolve(null);
//         }
//       }, 1000);
//     });
//   }

//   validateUserName(userName: string) {
//     const UserList = ['ankit', 'admin', 'user', 'superuser'];
//     return (UserList.indexOf(userName) > -1);
//   }
}
