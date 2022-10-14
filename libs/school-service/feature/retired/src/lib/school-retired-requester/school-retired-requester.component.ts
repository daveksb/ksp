import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SchoolRetireReason } from '@ksp/shared/constant';
import localForage from 'localforage';
@Component({
  selector: 'ksp-school-retired-requester',
  templateUrl: './school-retired-requester.component.html',
  styleUrls: ['./school-retired-requester.component.scss'],
})
export class SchoolRetiredRequesterComponent {
  form = this.fb.group({
    retiredReason: [null, Validators.required],
    retiredDetail: [null],
  });

  SchoolRetireReason = SchoolRetireReason;
  requestNo = '';
  constructor(private router: Router, private fb: FormBuilder) {}

  userInfo = {
    university: 'วิทยาลัยอาชีวศึกษาชลบุรี',
    organisation: 'สำนักงานคณะกรรมการอาชีวศึกษา',
    nameTh: 'นางสาว สุภาพร สุขเกษม',
    address:
      'บ้านเลขที่ 123/4 ซอย 5 หมู่ 6 ถนน สุขสันต์ ตำบล ยิ้มแย้ม อำเภอ แจ่มใส จังหวัด ใจงาม ',
  };

  nextPage() {
    localForage.setItem('retireReasonInfoFormValue', this.form.value);
    this.router.navigate(['/retired-user', 'coordinator']);
  }

  prevPage() {
    this.router.navigate(['/retired-user', 'search']);
  }
}
