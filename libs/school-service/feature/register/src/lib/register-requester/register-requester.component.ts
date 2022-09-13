import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  AddressService,
  GeneralInfoService,
  RequestLicenseService,
} from '@ksp/shared/service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { switchMap } from 'rxjs';

@UntilDestroy()
@Component({
  templateUrl: './register-requester.component.html',
  styleUrls: ['./register-requester.component.scss'],
})
export class RegisterRequesterComponent implements OnInit {
  grant = grants;

  form = this.fb.group({
    grant1: [false],
    grant2: [false],
    grant3: [false],
    grant4: [false],
    grant5: [false],
    requester: [],
  });
  constructor(
    private fb: FormBuilder,
    public router: Router,
    private generalInfoService: GeneralInfoService,
    private addressService: AddressService,
    private requestLicenseService: RequestLicenseService,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this
      .router; /* this.form.valueChanges.pipe(untilDestroyed(this)).subscribe((res) => {
      console.log('form valid  = ', this.form);
    }); */
    // this.getList();
    this.checkRequestId();
  }
  checkRequestId() {
    this.route.paramMap
      .pipe(
        switchMap((params: any) => {
          const schoolid = params.get('id');
          return this.requestLicenseService
            .getSchoolInfo(schoolid)
            .pipe(untilDestroyed(this));
        })
      )
      .subscribe((res) => console.log(res));
  }
  // getList() {
  //   this.requestLicenseService
  //     .getSchoolInfo(this.schoolId)
  //     .pipe(untilDestroyed(this))
  //     .subscribe((res: any) => {
  //       this.schoolName = res.schoolName;
  //       this.bureauName = res.bureauName;
  //       this.address = `บ้านเลขที่ ${res.address} ซอย ${
  //         res?.street ?? ''
  //       } หมู่ ${res?.moo ?? ''} ถนน ${res?.road ?? ''} ตำบล ${
  //         res.tumbon
  //       } อำเภอ ${res.amphurName} จังหวัด ${res.provinceName}`;
  //     });
  //   this.countries$ = this.addressService.getCountry();
  //   this.prefixList$ = this.generalInfoService.getPrefix();
  //   this.visaTypeList$ = this.generalInfoService.getVisaType();
  // }
  next() {
    this.router.navigate(['/register', 'coordinator']);
  }
}

export const grants = [
  {
    label: 'ยื่นแบบคำขออนุญาตให้ประกอบวิชาชีพ โดยไม่มีใบอนุญาต',
    name: 'grant1',
    value: false,
  },
  { label: 'ยื่นแบบคำขอหนังสือรับรองคุณวุฒิ', name: 'grant2', value: false },
  {
    label:
      'ยื่นแบบคำขอรับรางวัลหนึ่งโรงเรียนหนึ่งนวัตกรรม (One School One Innovation : OSOI) ',
    name: 'grant3',
    value: false,
  },
  {
    label: 'ทะเบียนหนังสืออนุญาตให้ประกอบวิชาชีพ โดยไม่มีใบอนุญาต',
    name: 'grant4',
    value: false,
  },
  {
    label: 'ทะเบียนข้อมูลครูและผู้บริหารศึกษา',
    name: 'grant5',
    value: false,
  },
];
