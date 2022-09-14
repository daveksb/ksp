import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RequestLicenseService } from '@ksp/shared/service';
import localForage from 'localforage';

@Component({
  templateUrl: './register-current-user.component.html',
  styleUrls: ['./register-current-user.component.scss'],
})
export class RegisterCurrentUserComponent {
  activeUser = '';
  school!: any;
  constructor(
    public router: Router,
    private requestLicenseService: RequestLicenseService
  ) {}

  next() {
    /* this.router.navigate(['/register', 'requester'], {
      state: { data: this.school },
    }); */

    this.router.navigate(['/register', 'requester']);
  }

  back() {
    this.router.navigate(['/login']);
  }

  selectedUniversity(school: any) {
    this.school = school;
    localForage.setItem('registerSelectedSchool', school);

    this.requestLicenseService
      .getActiveUserSchool({ schoolid: school.schoolId })
      .subscribe((res) => {
        if (res?.returncode == 98) {
          if (res?.returnmessage == 'no data') this.next();
        }
      });
  }
}
