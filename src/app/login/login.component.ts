import { Component, OnInit } from '@angular/core';
// Import FormGroup and FormControl classes
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  //#region Variable declaration
  signinForm: FormGroup;
  loading = false;
  //#endregion

  constructor(private fb: FormBuilder, private _router: Router) {}

  formErrors = {
    Email: '',
    password: '',
    rememberme: '',
  };

  // This object contains all the validation messages for this form
  validationMessages = {
    Email: {
      required: 'Email is required.',
      email: 'Email must be valid one.',
    },
    password: {
      required: 'Password is required.',
      minlength: 'Password must be greater than 6 characters.',
    },
  };

  logValidationErrors(group: FormGroup = this.signinForm): void {
    Object.keys(group.controls).forEach((key: string) => {
      const abstractControl = group.get(key);
      if (
        abstractControl &&
        abstractControl.value &&
        abstractControl.value.length > 0 &&
        !abstractControl.value.replace(/\s/g, '').length
      ) {
        abstractControl.setValue('');
      }
      this.formErrors[key] = '';
      if (
        abstractControl &&
        !abstractControl.valid &&
        (abstractControl.touched || abstractControl.dirty)
      ) {
        const messages = this.validationMessages[key];
        for (const errorKey in abstractControl.errors) {
          if (errorKey) {
            this.formErrors[key] += messages[errorKey] + ' ';
          }
        }
      }
      if (abstractControl instanceof FormGroup) {
        this.logValidationErrors(abstractControl);
      }
    });
  }

  ngOnInit(): void {
    this.signinForm = this.fb.group({
      Email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rememberme: '',
    });
  }

  PageSignin(): void {
    if (this.signinForm.invalid) {
      return;
    } else {
      this._router.navigate(['/Articlelist']);
    }
  }
}
