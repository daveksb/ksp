import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DegreeCertProcessType } from '@ksp/shared/interface';

@Component({
  selector: 'e-service-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.scss'],
})
export class VerifyComponent implements OnInit {
  titles = ['', 'พิจารณาประเมินหลักสูตร', 'พิจารณารับรองหลักสูตร'];

  choices = [
    [],
    ['ผ่านการพิจารณา', 'ไม่ผ่านการพิจารณา'],
    [
      'รับรอง',
      'ไม่รับรอง',
      'ให้สถาบันแก้ไข / เพิ่มเติม',
      'ส่งคืน',
      'ยกเลิกการรับรอง',
    ],
  ];

  processType: DegreeCertProcessType = DegreeCertProcessType.check;
  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.paramMap.subscribe((res) => {
      this.processType = Number(res.get('type'));
      //console.log('process type = ', this.processType);
    });
  }

  cancel() {
    this.router.navigate(['./degree-cert', 'list', this.processType]);
  }

  next() {
    this.router.navigate([
      './degree-cert',
      DegreeCertProcessType[this.processType],
    ]);
  }
}
