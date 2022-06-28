import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'uni-service-retired-reason',
  templateUrl: './retired-reason.component.html',
  styleUrls: ['./retired-reason.component.scss'],
})
export class RetiredReasonComponent {
  organizations = [
    {
      label: 'สถาบัน / มหาวิทยาลัย',
      value: 'วิทยาลัยอาชีวศึกษาชลบุรี',
    },
    {
      label: 'สังกัด',
      value: 'สำนักงานคณะกรรมการอาชีวศึกษา',
    },
  ];
  /* userInfo = [
    [
      'สิทธิ์สำหรับการเข้าใช้งาน',
      'เจ้าหน้าที่ประสานงาน (รับรองปริญญาและประกาศนียบัตรทางการศึกษา)',
    ],
    ['หมายเลขบัตรประชาชน', '1 1234 23456 78 9'],
    ['ชื่อ-นามสกุลภาษาไทย', 'นางสาว สุภาพร สุขเกษม'],
    ['ชื่อ-นามสกุลภาษาอังกฤษ', 'MISS SUPAPORN SUKKASAME'],
    ['ตำแหน่งทางการบริหาร', 'ไม่มี'],
    ['สังกัด', 'สำนักงานคณะกรรมการอาชีวศึกษา'],
    ['เบอร์โทรศัพท์ (ที่ทำงาน)', '038-9087654'],
    ['เบอร์โทรศัพท์ (ที่ติดต่อได้)', '081-9872678'],
    ['อีเมล', 'suoaporn.sss@gmail.com'],
  ];
 */
  userInfo = {
    userRight: 'เจ้าหน้าที่ประสานงาน (รับรองปริญญาและประกาศนียบัตรทางการศึกษา)',
    personId: '1 1234 23456 78 9',
    nameTh: 'นางสาว สุภาพร สุขเกษม',
    nameEn: 'MISS SUPAPORN SUKKASAME',
    managementPosition: 'ไม่มี',
    organisation: 'สำนักงานคณะกรรมการอาชีวศึกษา',
    workPhone: '038-9087654',
    phone: '081-9872678',
    email: 'suoaporn.sss@gmail.com',
  };

  constructor(private router: Router) {}

  next() {
    this.router.navigate(['/', 'retired', 'attachment']);
  }
}
