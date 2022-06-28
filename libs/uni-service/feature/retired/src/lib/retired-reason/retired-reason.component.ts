import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'uni-service-retired-reason',
  templateUrl: './retired-reason.component.html',
  styleUrls: ['./retired-reason.component.scss'],
})
export class RetiredReasonComponent {
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

  constructor(private router: Router) {}

  next() {
    this.router.navigate(['/retired', 'attachment']);
  }
}
