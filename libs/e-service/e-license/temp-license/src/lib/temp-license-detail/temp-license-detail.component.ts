import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'e-service-temp-license-detail',
  templateUrl: './temp-license-detail.component.html',
  styleUrls: ['./temp-license-detail.component.scss'],
})
export class TempLicenseDetailComponent implements OnInit {
  reason: string[][] = [];

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.reason[0] = ['เลขบัตรประชาชนไม่ถูกต้อง', 'gkshgks', 'sgusoguos'];
    this.reason[1] = ['aaa', 'bbb', 'ccc'];
  }

  next() {
    this.router.navigate(['/', 'forbidden']);
  }

  back() {
    this.router.navigate(['/', 'temp-license-list']);
  }
}
