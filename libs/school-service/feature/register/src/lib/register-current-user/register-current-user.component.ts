import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SchInfo, SchUser } from '@ksp/shared/interface';
import { GeneralInfoService, SchoolInfoService } from '@ksp/shared/service';
import localForage from 'localforage';
import { Observable } from 'rxjs';

@Component({
  templateUrl: './register-current-user.component.html',
  styleUrls: ['./register-current-user.component.scss'],
})
export class RegisterCurrentUserComponent {
  activeUsers!: SchUser[];
  schoolInfo = new SchInfo();
  bureausList$!: Observable<any>;

  constructor(
    public router: Router,
    private schoolInfoService: SchoolInfoService,
    private generalInfoService: GeneralInfoService
  ) {
    this.bureausList$ = this.generalInfoService.getBureau();
  }

  next() {
    this.router.navigate(['/register', 'requester']);
  }

  back() {
    this.router.navigate(['/login']);
  }

  selectedUniversity(school: SchInfo) {
    this.schoolInfo = school;
    localForage.setItem('registerSelectedSchool', school);

    this.schoolInfoService
      .searchSchUsers({ schoolid: school.schoolid })
      .subscribe((res) => {
        this.activeUsers = res;
        console.log('activeUsers = ', this.activeUsers);
      });
  }
}
