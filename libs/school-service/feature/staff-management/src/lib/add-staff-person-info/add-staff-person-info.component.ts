import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'school-service-add-staff-person-info',
  templateUrl: './add-staff-person-info.component.html',
  styleUrls: ['./add-staff-person-info.component.scss'],
})
export class AddStaffPersonInfoComponent {
  licenseButtons = [
    'ใบอนุญาตประกอบวิชาชีพ - ครู',
    'ใบอนุญาตประกอบวิชาชีพ - ผู้บริหารสถานศึกษา',
  ];

  constructor(private router: Router) {}

  next() {
    this.router.navigate(['./', 'staff-management', 'staff-teaching-info']);
  }
}
