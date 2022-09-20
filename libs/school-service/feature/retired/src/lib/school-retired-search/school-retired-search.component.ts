import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { SchoolInfoService } from '@ksp/shared/service';

@Component({
  selector: 'ksp-school-retired-search',
  templateUrl: './school-retired-search.component.html',
  styleUrls: ['./school-retired-search.component.scss'],
})
export class SchoolRetiredSearchComponent {
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
  data: SchUser[] = [];

  onItemChange(userName: string) {
    this.selectUser = userName;
  }

  search(form: any) {
    //console.log(form);
    const payload = {
      schoolid: '0010201056',
    };
    this.schoolInfoService.searchUserLogin(payload).subscribe((res) => {
      console.log('res = ', res);
      this.data = res;
    });
  }

  confirm() {
    this.router.navigate(['/retired-user', 'requester']);
  }

  cancel() {
    this.router.navigate(['/login']);
  }
}

export interface SchUser {
  position: string;
  firstnameth: string;
  lastnameth: string;
  schmobile: string;
  value: number;
}
