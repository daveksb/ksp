import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SelfRequestService } from '@ksp/shared/service';
import localForage from 'localforage';
@Component({
  templateUrl: './register-foreign.component.html',
  styleUrls: ['./register-foreign.component.scss'],
})
export class RegisterForeignComponent {
  searchNotFound = false;
  form = this.fb.group({
    kuruspano: [null, [Validators.required]],
    passportno: [null, [Validators.required]],
  });

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private requestService: SelfRequestService
  ) {}

  submit() {
    const personId = this.form.value.kuruspano || this.form.value.passportno;
    if (personId) {
      this.requestService.searchKuruspano(personId).subscribe((res) => {
        if (res && res.returncode && res.returncode === '98') {
          //not found
          this.searchNotFound = true;
        } else {
          localForage.setItem('registerForeigner', res);
          setTimeout(() => {
            this.router.navigate(['/register', 'en-step-1']);
          }, 500);
        }
      });
    }
  }

  loginPage() {
    this.router.navigate(['/login']);
  }
}
