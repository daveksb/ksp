import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

export interface DegreeCertInfo {
  degreeId: string;
  date: string;
  uni: string;
  major: string;
  verifyStatus: string;
  considerStatus: string;
  approveStatus: string;
  approveDate: string;
  editDate: string;
  verify: string;
  consider: string;
}

export const data: DegreeCertInfo[] = [
  {
    degreeId: 'UNI_VC_64120009',
    date: '10 ธ.ค. 2564',
    uni: 'มหาวิทยาลัยภูเก็ต',
    major: 'คุรุศาสตร์',
    verifyStatus: 'รับข้อมูล',
    considerStatus: 'พิจารณา',
    approveStatus: 'พิจารณา',
    approveDate: '30 ส.ค. 2564',
    editDate: '30 ส.ค. 2564',
    verify: 'ตรวจสอบแล้ว',
    consider: 'ตรวจสอบแล้ว',
  },
  {
    degreeId: 'UNI_VC_64120009',
    date: '10 ธ.ค. 2564',
    uni: 'มหาวิทยาลัยภูเก็ต',
    major: 'คุรุศาสตร์',
    verifyStatus: 'รับข้อมูล',
    considerStatus: 'พิจารณา',
    approveStatus: 'พิจารณา',
    approveDate: '30 ส.ค. 2564',
    editDate: '30 ส.ค. 2564',
    verify: 'ตรวจสอบแล้ว',
    consider: 'ตรวจสอบแล้ว',
  },
  {
    degreeId: 'UNI_VC_64120009',
    date: '10 ธ.ค. 2564',
    uni: 'มหาวิทยาลัยภูเก็ต',
    major: 'คุรุศาสตร์',
    verifyStatus: 'รับข้อมูล',
    considerStatus: 'พิจารณา',
    approveStatus: 'พิจารณา',
    approveDate: '30 ส.ค. 2564',
    editDate: '30 ส.ค. 2564',
    verify: 'ตรวจสอบแล้ว',
    consider: 'ตรวจสอบแล้ว',
  },
];

@Component({
  selector: 'e-service-degree-cert-list',
  templateUrl: './degree-cert-list.component.html',
  styleUrls: ['./degree-cert-list.component.scss'],
})
export class DegreeCertListComponent implements OnInit {
  data: DegreeCertInfo[] = [];
  processType = 1;
  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.paramMap.subscribe((res) => {
      this.processType = Number(res.get('type'));
      console.log('process type = ', this.processType);
    });
  }

  onSearch() {
    this.data = data;
  }

  onSelect() {
    this.router.navigate(['/', 'degree-cert', 'step-1']);
  }

  onClear() {
    this.data = [];
  }

  consider() {
    this.router.navigate(['./', 'degree-cert', 'verify']);
  }
  approve() {
    this.router.navigate(['./', 'degree-cert', 'verify']);
  }

}
