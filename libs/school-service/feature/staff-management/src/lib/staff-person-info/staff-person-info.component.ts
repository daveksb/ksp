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
  amphurs$!: Observable<any>;
  tumbols$!: Observable<any>;

  form = this.fb.group({
    userInfo: [],
    addr1: this.fb.group({
      location: [''],
      houseNo: [''],
      moo: [''],
      alley: [''],
      road: [''],
      postCode: [''],
      province: [null],
      amphur: [null],
      tumbol: [null],
    }),
    addr2: this.fb.group({
      location: [''],
      houseNo: [''],
      moo: [''],
      alley: [''],
      road: [''],
      postCode: [''],
      province: [null],
      amphur: [null],
      tumbol: [null],
    }),
    edu1: [],
    edu2: [],
  });

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private service: StaffPersonInfoService
  ) {}

  ngOnInit(): void {
    this.form.controls.addr1.controls.province.valueChanges.subscribe(
      (res: any) => {
        this.amphurs$ = this.service.getAmphurs(res);
      }
    );

    this.form.controls.addr1.controls.amphur.valueChanges.subscribe(
      (res: any) => {
        this.tumbols$ = this.service.getTumbols(res);
      }
    );

    this.prefixList$ = this.service.getPrefix();
    this.provinces$ = this.service.getProvinces();
  }

  useSameAddress(evt: any) {
    const checked = evt.target.checked;
    if (checked) {
      this.form.controls.addr2.patchValue(this.form.controls.addr1.value);
    }
  }

  next() {
    this.router.navigate(['/staff-management', 'staff-teaching-info']);
  }

  save() {
    //console.log('form controls = ', this.form.getRawValue());
    const formData = this.form.value;
    console.log('formData = ', formData);

    this.service.addStaff(formData).subscribe((res) => {
      console.log('add staff result = ', res);
    });
  }
}
