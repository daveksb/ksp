import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { StaffPersonInfoService } from './staff-person-info.service';

@Component({
  templateUrl: './staff-person-info.component.html',
  styleUrls: ['./staff-person-info.component.scss'],
})
export class StaffPersonInfoComponent implements OnInit {
  licenseButtons = [
    'ใบอนุญาตประกอบวิชาชีพ - ครู',
    'ใบอนุญาตประกอบวิชาชีพ - ผู้บริหารสถานศึกษา',
  ];

  prefixList$!: Observable<any>;
  provinces$!: Observable<any>;

  form = this.fb.group({
    personId: ['', Validators.required],
    passportNumber: [],
    generalInfo: [],
    address1: [],
    address2: [],
    education1: [],
    education2: [],
  });

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private service: StaffPersonInfoService
  ) {}

  ngOnInit(): void {
    /*     this.form.valueChanges.subscribe((res) => {
      console.log('res = ', res);
    }); */

    this.prefixList$ = this.service.getPrefix();
    this.provinces$ = this.service.getProvinces();
    /*     this.prefixList$.subscribe((res) => {
      console.log('res = ', res);
    }); */
  }

  useSameAddress(evt: any) {
    const checked = evt.target.checked;
    if (checked) {
      this.form.controls.address2.patchValue(this.form.controls.address1.value);
    }
  }

  next() {
    this.router.navigate(['/staff-management', 'staff-teaching-info']);
  }

  save() {}
}
