import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'e-service-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.scss'],
})
export class VerifyComponent implements OnInit {
  titlesConsider = ['ผ่านการพิจารณา', 'ไม่ผ่านการพิจารณา'];
  titlesApprove = [
    'ผ่านการพิจารณา',
    'ไม่ผ่านการพิจารณา',
    'ให้สถาบันแก้ไข / เพิ่มเติม',
    'ส่งคืน',
    'ยกเลิกการรับรอง',
  ];
  processType = 1;
  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.paramMap.subscribe((res) => {
      this.processType = Number(res.get('type'));
      console.log('process type = ', this.processType);
    });
  }

  cancel() {
    this.router.navigate(['./', 'degree-cert', 'list', '2']);
  }

  prev() {
    if (this.processType === 2)
      this.router.navigate(['./', 'degree-cert', 'list', '2']);

    if (this.processType === 3)
      this.router.navigate(['./', 'degree-cert', 'list', '3']);
  }

  next() {
    if (this.processType === 2)
      this.router.navigate(['./', 'degree-cert', 'consider']);

    if (this.processType === 3)
      this.router.navigate(['./', 'degree-cert', 'approve']);
  }
}
