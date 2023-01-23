import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SelfRequestService } from '@ksp/shared/service';
import localForage from 'localforage';
@Component({
  //selector: 'ksp-register-foreign',
  templateUrl: './register-foreign.component.html',
  styleUrls: ['./register-foreign.component.scss'],
})
export class RegisterForeignComponent {
  searchSubmit = false;
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
    const kspNo = this.form.value.kuruspano;
    if (kspNo) {
      this.requestService.searchKuruspano(kspNo).subscribe((res) => {
        if (res && res.returncode && res.returncode === '98') {
          //not found
          this.searchSubmit = true;
          console.log('not found !!');
        } else {
          console.log('res xx = ', res);
          localForage.setItem('registerForeigner', res);
          this.router.navigate(['/register', 'en-step-1']);
        }
      });
    }
  }

  loginPage() {
    this.router.navigate(['/login']);
  }
}
