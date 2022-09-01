import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { StaffPersonInfoService } from './staff-person-info.service';

@Component({
  templateUrl: './staff-person-info.component.html',
  styleUrls: ['./staff-person-info.component.scss'],
})
export class StaffPersonInfoComponent implements OnInit {
  staffId!: number;

  licenseButtons = [
    'ใบอนุญาตประกอบวิชาชีพ - ครู',
    'ใบอนุญาตประกอบวิชาชีพ - ผู้บริหารสถานศึกษา',
  ];

  countries$!: Observable<any>;
  provinces$!: Observable<any>;
  amphurs1$!: Observable<any>;
  tumbols1$!: Observable<any>;
  amphurs2$!: Observable<any>;
  tumbols2$!: Observable<any>;
  prefixList$!: Observable<any>;

  form = this.fb.group({
    userInfo: this.fb.group({
      idCardNo: [''],
      passportNo: [''],
      prefixTh: [''],
      firstNameTh: [''],
      lastNameTh: [''],
      prefixEn: [''],
      firstNameEn: [''],
      lastNameEn: [''],
      sex: [''],
      birthDate: [''],
      email: [''],
      contactPhone: [''],
      workPhone: [''],
      nationality: [null],
      schoolId: ['1234567'],
      createDate: ['2022-08-22T10:17:01'],
    }),
    addr1: this.fb.group({
      location: ['36'],
      houseNo: ['36'],
      moo: ['36'],
      alley: ['36'],
      road: ['36'],
      postCode: ['36'],
      province: ['33'],
      amphur: ['34'],
      tumbol: ['35'],
    }),
    addr2: this.fb.group({
      location: ['36'],
      houseNo: ['36'],
      moo: ['36'],
      alley: ['36'],
      road: ['36'],
      postCode: ['36'],
      province: ['33'],
      amphur: ['34'],
      tumbol: ['35'],
    }),
    edu1: this.fb.group({
      degreeLevel: ['36'],
      degreeName: ['36'],
      isEducationDegree: [false],
      major: ['36'],
      institution: ['36'],
      country: ['36'],
      admissionDate: ['2022-08-22T10:17:01'],
      graduateDate: ['2022-08-22T10:17:01'],
      grade: ['36'],
      otherProperty: ['36'],
      academicYear: ['36'],
    }),
    edu2: this.fb.group({
      degreeLevel: [null],
      degreeName: [null],
      isEducationDegree: [false],
      major: [null],
      institution: [null],
      country: [null],
      admissionDate: [null],
      graduateDate: [null],
      grade: [null],
      otherProperty: [null],
      academicYear: [null],
    }),
  });

  constructor(
    private router: Router,
    private activatedroute: ActivatedRoute,
    private fb: FormBuilder,
    private service: StaffPersonInfoService
  ) {}

  get addr1() {
    return this.form.controls.addr1.controls;
  }

  get addr2() {
    return this.form.controls.addr2.controls;
  }

  ngOnInit(): void {
    this.activatedroute.paramMap.subscribe((params) => {
      this.staffId = Number(params.get('id'));
    });

    this.getAddList();
    this.form.valueChanges.subscribe((res) => {
      console.log('form value = ', res);
    });
  }

  useSameAddress(evt: any) {
    const checked = evt.target.checked;

    if (checked) {
      this.form.controls.addr2.patchValue(this.form.controls.addr1.value);
      //console.log('form addr 2 value = ', this.form.controls.addr2.value);
    }
  }

  next() {
    this.router.navigate(['/staff-management', 'staff-teaching-info']);
  }

  save() {
    const formData = this.form.getRawValue();

    /*     formData.userInfo = {
      ...formData.userInfo,
      ...{ schoolId: '1010720030', createDate: null },
    };
  */

    console.log('formData = ', formData);
    this.service.addStaff(formData).subscribe((res) => {
      console.log('add staff result = ', res);
      this.router.navigate(['/staff-management', 'staff-person-info', res.id]);
    });
  }

  getAddList() {
    this.addr1.province.valueChanges.subscribe((res: any) => {
      this.amphurs1$ = this.service.getAmphurs(res);
    });

    this.addr1.amphur.valueChanges.subscribe((res: any) => {
      this.tumbols1$ = this.service.getTumbols(res);
    });

    this.addr2.province.valueChanges.subscribe((res: any) => {
      this.amphurs2$ = this.service.getAmphurs(res);
    });

    this.addr2.amphur.valueChanges.subscribe((res: any) => {
      this.tumbols2$ = this.service.getTumbols(res);
    });

    this.prefixList$ = this.service.getPrefix();
    this.provinces$ = this.service.getProvinces();
    this.countries$ = this.service.getCountry();
  }
}
