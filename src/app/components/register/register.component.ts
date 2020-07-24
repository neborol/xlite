import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { AlertifyService } from './../../services/alertify.service';
import { FormGroup, FormControl, Validators, FormBuilder, AbstractControl} from '@angular/forms';
import { IUser } from '../../interfaces/User-creation.interface';
import { CustomvalidationService } from './../../services/custom-validation.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent implements OnInit {

  Roles: any = ['Admin', 'Author', 'Reader'];
  user: IUser;
  registerMembersForm: FormGroup;
  emailRegex = '[a-zA-Z0-9.-]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{3,}';
  alphaNRegex = '^[0-9a-zA-Z]+$';
  phonenoRegex = '^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$';

  constructor(
    private router: Router,
    private authService: AuthService,
    private alertify: AlertifyService,
    private customValService: CustomvalidationService,
    private fb: FormBuilder
  ) { }

  get userName() {
    return this.registerMembersForm.get('userName');
  }

  get userEmail() {
    return this.registerMembersForm.get('userEmail');
  }

  get password() {
    return this.registerMembersForm.get('password');
  }



  get firstName() {
    return this.registerMembersForm.get('firstName');
  }

  get lastName() {
    return this.registerMembersForm.get('lastName');
  }

  get phone() {
    return this.registerMembersForm.get('phone');
  }

  get city() {
    return this.registerMembersForm.get('city');
  }

  ngOnInit() {
    this.registerMembersForm = new FormGroup({
      'userName': new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20), Validators.pattern(this.alphaNRegex)]),
      'password': new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]),
      'passwordConf': new FormControl('', Validators.required),
      'userEmail': new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(25),
        Validators.pattern(this.emailRegex)]),
      'firstName': new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20), Validators.pattern(this.alphaNRegex)]),
      'lastName': new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20), Validators.pattern(this.alphaNRegex)]),
      'phone': new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(15), Validators.pattern(this.phonenoRegex)]),
      'city': new FormControl('', [Validators.minLength(4), Validators.maxLength(25), Validators.pattern(this.alphaNRegex)])
    }, this.passwordMatchValidator);
  }



  passwordMatchValidator(rForm: FormGroup) {
    const confirmPswrdCtrl = rForm.get('passwordConf');
    if (confirmPswrdCtrl.errors === null || 'mismatch' in confirmPswrdCtrl.errors) {
      if (rForm.get('password').value !== confirmPswrdCtrl.value) {
        confirmPswrdCtrl.setErrors({mismatch: true});
        return {mismatch: true};
      } else {
        confirmPswrdCtrl.setErrors(null);
        return null;
      }
    }
  }



  register() {
    this.user = Object.assign({}, this.registerMembersForm.value);
    this.authService.register(this.user).subscribe((data: any) => {
      if (data.success) {
        this.alertify.message(data.message);
        this.router.navigateByUrl('/');
      }
    }, error => {
      this.alertify.error('Registration failed');
      console.error(error);
    });
  }


  cancel() {
    this.router.navigateByUrl('/');
  }

}
