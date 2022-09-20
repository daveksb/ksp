import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { SchoolInfoService } from '@ksp/shared/service';
import { untilDestroyed } from '@ngneat/until-destroy';

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

/* export const data: RetiredInfo[] = [
  {
    retiredRole:
      'เจ้าหน้าที่ประสานงาน (รับรองปริญญาและประกาศนียบัตรทางการศึกษา)',
    retiredName: 'นาย พิชัย ชาญชัญ',
    retiredPhone: '081-9872676',
    value: 1,
  },
  {
    retiredRole:
      'เจ้าหน้าที่ประสานงาน (รับรองปริญญาและประกาศนียบัตรทางการศึกษา)',
    retiredName: 'นาย พิโรธ ชาญชัญ',
    retiredPhone: '081-9872676',
    value: 2,
  },
  {
    retiredRole:
      'เจ้าหน้าที่ประสานงาน (รับรองปริญญาและประกาศนียบัตรทางการศึกษา)',
    retiredName: 'นาย พิธา ชาญชัญ',
    retiredPhone: '081-9872676',
    value: 3,
  },
];
 */
