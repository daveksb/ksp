import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { SchoolInfoService } from '@ksp/shared/service';
import localForage from 'localforage';

@Component({
  selector: 'ksp-school-retired-search',
  templateUrl: './school-retired-search.component.html',
  styleUrls: ['./school-retired-search.component.scss'],
})
export class SchoolRetiredSearchComponent {
  school!: any;

  form = this.fb.group({
    userSearch: [],
    userSelect: [],
  });

  selectUser = '';

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private schoolInfoService: SchoolInfoService
  ) {}
  data: RetiredSchUser[] = [];

  onItemChange(userName: string) {
    this.selectUser = userName;
  }

  search(form: any) {
    //console.log(form);
    const payload = {
      schoolid: '0010201056',
    };
    this.schoolInfoService.searchUserLogin(payload).subscribe((res) => {
      this.data = res;
    });
  }

  selectedUniversity(school: any) {
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

  next() {
    this.router.navigate(['/retired-user', 'requester']);
  }

  cancel() {
    this.router.navigate(['/login']);
  }
}

export interface RetiredSchUser {
  position: string;
  firstnameth: string;
  lastnameth: string;
  schmobile: string;
  schmemberid: number;
}
