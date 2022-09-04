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

  countries$!: Observable<any>;
  provinces$!: Observable<any>;
  amphurs1$!: Observable<any>;
  tumbols1$!: Observable<any>;
  amphurs2$!: Observable<any>;
  tumbols2$!: Observable<any>;
  prefixList$!: Observable<any>;

  form = this.fb.group({
    userInfo: [],
    addr1: [],
    addr2: [],
    /* addr1: this.fb.group({
      //addressType: [1],
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
      //addressType: [2],
      location: ['ทดสอบ'],
      houseNo: ['123'],
      moo: ['1'],
      alley: ['ทดสอบ'],
      road: ['ทดสอบ'],
      postCode: ['36'],
      province: ['33'],
      amphur: ['34'],
      tumbol: ['35'],
    }), */
    edu1: this.fb.group({
      degreeLevel: ['1'],
      degreeName: ['sample'],
      isEducationDegree: ['1'],
      major: ['sample'],
      institution: ['sample'],
      country: ['36'],
      admissionDate: ['2022-08-22T10:17:01'],
      graduateDate: ['2022-08-22T10:17:01'],
      grade: ['3'],
      otherProperty: ['sample'],
      academicYear: ['2565'],
    }),
    edu2: this.fb.group({
      degreeLevel: [null],
      degreeName: [null],
      isEducationDegree: [null],
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
    private staffService: StaffPersonInfoService,
    private addressService: AddressService,
    private generalInfoService: GeneralInfoService
  ) {}

  get addr1(): any {
    return this.form.controls.addr1; //.controls;
  }

  get addr2(): any {
    return this.form.controls.addr2; //.controls;
  }

  ngOnInit(): void {
    this.activatedroute.paramMap.subscribe((params) => {
      this.staffId = Number(params.get('id'));

      if (this.staffId) {
        this.staffService.getStaffUserInfo(this.staffId).subscribe((res) => {
          const { id, schoolId, createDate, ...formData } = res;
          this.form.controls.userInfo.patchValue(formData);
        });

        this.staffService
          .getStaffAddress(this.staffId)
          .subscribe((res: any[]) => {
            //array of address
            res.map((addr, i) => {
              const { id, schStaffId, addressType, ...formData } = addr;
              if (i === 0) {
                this.amphurs1$ = this.addressService.getAmphurs(addr.province);
                this.tumbols1$ = this.addressService.getTumbols(addr.amphur);
                this.form.controls.addr1.patchValue(formData);
              }
              if (i === 1) {
                this.amphurs2$ = this.addressService.getAmphurs(addr.province);
                this.tumbols2$ = this.addressService.getTumbols(addr.amphur);
                this.form.controls.addr2.patchValue(formData);
              }
            });
          });

        this.staffService.getStaffEdu(this.staffId).subscribe((res) => {
          //console.log('edu = ', res);
          //this.form.controls.userInfo.patchValue(formData);
        });
      }
    });

    this.getListData();
  }

  save() {
    const formData: any = this.form.getRawValue();
    formData.userInfo.schoolId = '1234567';
    formData.userInfo.nationality = 'TH';
    formData.userInfo.createDate = new Date().toISOString();
    formData.addr1.addressType = 1;
    formData.addr2.addressType = 2;

    console.log('formData = ', formData);
    this.staffService.addStaff(formData).subscribe((res) => {
      console.log('add staff result = ', res);
      this.router.navigate(['/staff-management', 'staff-person-info', res.id]);
    });
  }

  useSameAddress(evt: any) {
    const checked = evt.target.checked;
    this.amphurs2$ = this.amphurs1$;
    this.tumbols2$ = this.tumbols1$;

    if (checked) {
      this.form.controls.addr2.patchValue(this.form.controls.addr1.value);
    }
  }

  nextPage() {
    this.router.navigate([
      '/staff-management',
      'staff-teaching-info',
      this.staffId,
    ]);
  }

  provinceChanged(type: number, evt: any) {
    const province = evt.target?.value;
    console.log('province = ', province);
    if (province) {
      if (type === 1) {
        this.amphurs1$ = this.addressService.getAmphurs(province);
      } else if (type === 2) {
        this.amphurs2$ = this.addressService.getAmphurs(province);
      }
    }
  }

  amphurChanged(type: number, evt: any) {
    const amphur = evt.target?.value;
    console.log('amphur = ', amphur);
    if (amphur) {
      if (type === 1) {
        this.tumbols1$ = this.addressService.getTumbols(amphur);
      } else if (type === 2) {
        this.tumbols2$ = this.addressService.getTumbols(amphur);
      }
    }
  }

  getListData() {
    this.prefixList$ = this.generalInfoService.getPrefix();
    this.provinces$ = this.addressService.getProvinces();
    this.countries$ = this.addressService.getCountry();
  }
}
