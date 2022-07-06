import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'ksp-school-retired-requester',
  templateUrl: './school-retired-requester.component.html',
  styleUrls: ['./school-retired-requester.component.scss'],
})
export class SchoolRetiredRequesterComponent {
  constructor(private router: Router) {}

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
    this.router.navigate(['/', 'retired-user', 'coordinator']);
  }
}
