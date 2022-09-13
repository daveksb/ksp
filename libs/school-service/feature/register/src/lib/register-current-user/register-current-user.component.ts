import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { RequestLicenseService } from '@ksp/shared/service';

@Component({
  templateUrl: './register-current-user.component.html',
  styleUrls: ['./register-current-user.component.scss'],
})
export class RegisterCurrentUserComponent {
  /*   form = this.fb.group({
    selectUniversity: [],
  });
 */
  activeUser = '';
  schoolid = '';
  constructor(
    public router: Router,
    private fb: FormBuilder,
    private requestLicenseService: RequestLicenseService
  ) {}

  next() {
    this.router.navigate(['/register', 'requester', this.schoolid]);
  }

  back() {
    this.router.navigate(['/login']);
  }
  selectedUniversity(schoolid: any) {
    this.schoolid = schoolid;
    this.requestLicenseService
      .getActiveUserSchool({ schoolid })
      .subscribe((res) => {
        if (res?.returncode == 98) {
          if (res?.returnmessage == 'no data') this.next();
        }
      });
  }
}
