import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AddressService, GeneralInfoService } from '@ksp/shared/service';
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
    userInfo: [] /* this.fb.group({
      idCardNo: [null],
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
    }), */,
    addr1: this.fb.group({
      location: ['ทดสอบ'],
      houseNo: ['345'],
      moo: ['2'],
      alley: ['ทดสอบ'],
      road: ['ทดสอบ'],
      postCode: ['36'],
      province: ['33'],
      amphur: ['34'],
      tumbol: ['35'],
    }),
    addr2: this.fb.group({
      location: ['ทดสอบ'],
      houseNo: ['123'],
      moo: ['1'],
      alley: ['ทดสอบ'],
      road: ['ทดสอบ'],
      postCode: ['36'],
      province: ['33'],
      amphur: ['34'],
      tumbol: ['35'],
    }),
    edu1: this.fb.group({
      degreeLevel: ['1'],
      degreeName: ['sample'],
      isEducationDegree: [false],
      major: ['sample'],
      institution: ['sample'],
      country: ['36'],
      admissionDate: ['2022-08-22T10:17:01'],
      graduateDate: ['2022-08-22T10:17:01'],
      grade: ['3'],
      otherProperty: ['sample'],
      academicYear: ['sample'],
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
    private staffInfoService: StaffPersonInfoService,
    private addressService: AddressService,
    private generalInfoService: GeneralInfoService
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
    /* this.form.valueChanges.subscribe((res) => {
      //console.log('form valid = ', this.form.valid);
    }); */
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
    const formData: any = this.form.getRawValue();
    formData.userInfo.schoolId = '1234567';
    formData.userInfo.nationality = 'TH';
    formData.userInfo.createDate = new Date().toISOString().split('T')[0];

    console.log('formData = ', formData);
    this.staffInfoService.addStaff(formData).subscribe((res) => {
      console.log('add staff result = ', res);
      this.router.navigate(['/staff-management', 'staff-person-info', res.id]);
    });
  }

  getAddList() {
    this.addr1.province.valueChanges.subscribe((res: any) => {
      this.amphurs1$ = this.addressService.getAmphurs(res);
    });

    this.addr1.amphur.valueChanges.subscribe((res: any) => {
      this.tumbols1$ = this.addressService.getTumbols(res);
    });

    this.addr2.province.valueChanges.subscribe((res: any) => {
      this.amphurs2$ = this.addressService.getAmphurs(res);
    });

    this.addr2.amphur.valueChanges.subscribe((res: any) => {
      this.tumbols2$ = this.addressService.getTumbols(res);
    });

    this.prefixList$ = this.generalInfoService.getPrefix();
    this.provinces$ = this.addressService.getProvinces();
    this.countries$ = this.addressService.getCountry();
  }
}
