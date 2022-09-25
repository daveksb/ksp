import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { SelfServiceRequestSubType } from '@ksp/shared/constant';
import { SelfRequest } from '@ksp/shared/interface';
import { SelfRequestService } from '@ksp/shared/service';

@Component({
  selector: 'ksp-self-service-home-page',
  templateUrl: './self-service-home-page.component.html',
  styleUrls: ['./self-service-home-page.component.scss'],
})
export class SelfServiceHomePageComponent {
  badgeTitle = [
    `เลขที่ใบคำขอ : SF_010641000123 รายการขอขึ้นทะเบียนใบอนุญาต ถูกส่งคืน
  “ปรับแก้ไข / เพิ่มเติม” กดเพื่อตรวจสอบ`,
  ];

  dataSource = new MatTableDataSource<SelfRequest>();

  constructor(
    private router: Router,
    private requestService: SelfRequestService
  ) {}

  displayedColumns: string[] = column;

  search() {
    const payload = {
      staffid: '4',
      systemtype: '1',
      requesttype: null,
    };
    this.requestService.searchMyRequests(payload).subscribe((res) => {
      console.log('res= ', res);
      this.dataSource.data = res;
    });
  }

  clear() {
    this.dataSource.data = [];
  }

  thaiTeacher() {
    this.router.navigate(['/license', 'teacher']);
  }

  foreignTeacher(type: SelfServiceRequestSubType) {
    this.router.navigate(['/license', 'agreement'], {
      queryParams: { type },
    });
  }

  schoolManager() {
    this.router.navigate(['/license', 'school-manager']);
  }

  educationManager() {
    this.router.navigate(['/license', 'education-manager']);
  }

  //ศึกษานิเทศก์
  studySupervision() {
    this.router.navigate(['/license', 'study-supervision']);
  }

  teacherRenew() {
    this.router.navigate(['/renew-license', 'request']);
  }

  foreignRenew(type: SelfServiceRequestSubType) {
    this.router.navigate(['/renew-license', 'foreign'], {
      queryParams: { type },
    });
  }

  licenseEdit() {
    this.router.navigate(['/license', 'edit']);
  }

  schManagerRenew() {
    this.router.navigate(['/renew-license', 'school-manager']);
  }

  eduManagerRenew() {
    this.router.navigate(['/renew-license', 'education-manager']);
  }

  //ศึกษานิเทศก์
  supervisionRenew() {
    this.router.navigate(['/renew-license', 'study-supervision']);
  }

  reward() {
    this.router.navigate(['/reward', 'request']);
  }

  transfer() {
    this.router.navigate(['/transfer-knowledge', 'request']);
  }

  compare() {
    this.router.navigate(['/compare-knowledge', 'request']);
  }

  refundFee() {
    this.router.navigate(['/refund-fee', 'request']);
  }

  substituteLicense() {
    this.router.navigate(['/substitute-license', 'request']);
  }
}

export const column = [
  'order',
  'requestno',
  'requestdate',
  'name',
  'paymentStatus',
  'listStatus',
  'process',
  'edit',
  'print',
];
