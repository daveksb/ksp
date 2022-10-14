import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SchoolInfo } from '@ksp/shared/interface';
import { SchoolInfoService } from '@ksp/shared/service';
import localForage from 'localforage';

@Component({
  templateUrl: './register-current-user.component.html',
  styleUrls: ['./register-current-user.component.scss'],
})
export class RegisterCurrentUserComponent {
  activeUser = '';
  school!: SchoolInfo;
  constructor(
    public router: Router,
    private schoolInfoService: SchoolInfoService
  ) {}

  next() {
    this.router.navigate(['/register', 'requester']);
  }

  back() {
    this.router.navigate(['/login']);
  }

  selectedUniversity(school: SchoolInfo) {
    this.school = school;
    localForage.setItem('registerSelectedSchool', school);

    this.schoolInfoService
      .searchUserLogin({ schoolid: school.schoolid })
      .subscribe((res) => {
        if (res == undefined) {
          this.next();
        }
      });
  }
}
