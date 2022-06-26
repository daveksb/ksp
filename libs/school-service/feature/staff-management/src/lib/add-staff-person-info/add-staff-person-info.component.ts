import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'school-service-add-staff-person-info',
  templateUrl: './add-staff-person-info.component.html',
  styleUrls: ['./add-staff-person-info.component.scss'],
})
export class AddStaffPersonInfoComponent {
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
    this.router.navigate(['./', 'staff-management', 'staff-teaching-info']);
  }
}
