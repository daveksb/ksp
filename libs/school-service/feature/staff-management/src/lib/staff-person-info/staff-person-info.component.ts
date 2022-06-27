import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  templateUrl: './staff-person-info.component.html',
  styleUrls: ['./staff-person-info.component.scss'],
})
export class StaffPersonInfoComponent {
  form = this.fb.group({
    personId: [],
    passportNumber: [],
    staff: [],
    address1: [],
    address2: [],
    education1: [],
    education2: [],
  });

  licenseButtons = [
    'ใบอนุญาตประกอบวิชาชีพ - ครู',
    'ใบอนุญาตประกอบวิชาชีพ - ผู้บริหารสถานศึกษา',
  ];

  constructor(private router: Router, private fb: FormBuilder) {}

  next() {
    this.router.navigate(['/staff-management', 'staff-teaching-info']);
  }
}
