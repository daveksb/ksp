import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SchoolRetireReason } from '@ksp/shared/constant';
import { thaiDate } from '@ksp/shared/utility';
import localForage from 'localforage';
@Component({
  selector: 'ksp-school-retired-requester',
  templateUrl: './school-retired-requester.component.html',
  styleUrls: ['./school-retired-requester.component.scss'],
})
export class SchoolRetiredRequesterComponent {
  form = this.fb.group({
    retiredReason: [null, Validators.required],
    retiredDetail: [],
  });
  SchoolRetireReason = SchoolRetireReason;
  requestNo = '';
  today = thaiDate(new Date());
  constructor(private router: Router, private fb: FormBuilder) {}

  userInfo = {
    university: 'วิทยาลัยอาชีวศึกษาชลบุรี',
    organisation: 'สำนักงานคณะกรรมการอาชีวศึกษา',
    userRight: 'เจ้าหน้าที่ประสานงาน (รับรองปริญญาและประกาศนียบัตรทางการศึกษา)',
    personId: '1 1234 23456 78 9',
    nameTh: 'นางสาว สุภาพร สุขเกษม',
    nameEn: 'MISS SUPAPORN SUKKASAME',
    managementPosition: 'ไม่มี',
    workPhone: '038-9087654',
    phone: '081-9872678',
    email: 'suoaporn.sss@gmail.com',
  };

  nextPage() {
    localForage.setItem('retireReasonInfoFormValue', this.form.value);
    this.router.navigate(['/retired-user', 'coordinator']);
  }

  prevPage() {
    this.router.navigate(['/retired-user', 'search']);
  }
}
