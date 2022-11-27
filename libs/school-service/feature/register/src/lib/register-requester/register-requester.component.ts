import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { UserInfoFormType } from '@ksp/shared/constant';
import { FormMode, Nationality, Prefix } from '@ksp/shared/interface';
import { GeneralInfoService } from '@ksp/shared/service';
import { UntilDestroy } from '@ngneat/until-destroy';
import { Observable } from 'rxjs';
import localForage from 'localforage';

@UntilDestroy()
@Component({
  templateUrl: './register-requester.component.html',
  styleUrls: ['./register-requester.component.scss'],
})
export class RegisterRequesterComponent implements OnInit {
  requestNumber = '';
  prefixList$!: Observable<Prefix[]>;
  nationalitys$!: Observable<Nationality[]>;
  mode: FormMode = 'edit';
  userInfoFormdisplayMode: number = UserInfoFormType.thai;
  school!: any;
  address!: any;

  private _form = this.fb.group({
    grant1: [false],
    grant2: [false],
    grant3: [false],
    grant4: [false],
    grant5: [false],
    requester: [],
  });

  public get form() {
    return this._form;
  }
  public set form(value) {
    this._form = value;
  }

  constructor(
    private fb: FormBuilder,
    public router: Router,
    private generalInfoService: GeneralInfoService
  ) {}

  ngOnInit(): void {
    this.getListData();
    this.getStoredData();
  }

  getStoredData() {
    localForage.getItem('registerSelectedSchool').then((res: any) => {
      console.log('school data = ', res);
      this.school = res;
      this.address = `เลขที่ ${res.address} ซอย ${res?.street ?? '-'} หมู่ ${
        res?.moo ?? '-'
      } ถนน ${res?.road ?? '-'} ตำบล ${res.tumbon} อำเภอ ${
        res.amphurname
      } จังหวัด ${res.provincename} รหัสไปรษณีย์ ${res.zipcode}`;
    });

    localForage.getItem('registerUserInfo').then((res: any) => {
      if (res) this.form.controls.requester.patchValue(res);
    });
  }

  getListData() {
    this.prefixList$ = this.generalInfoService.getPrefix();
    this.nationalitys$ = this.generalInfoService.getNationality();
  }

  next() {
    const data: any = this.form.getRawValue();
    const { requester, ...all } = data;
    const userpermission = JSON.stringify(all);
    const userInfo = {
      ...requester,
      userpermission,
      schoolid: this.school.schoolId,
    };

    localForage.setItem('registerUserInfo', userInfo);
    this.router.navigate(['/register', 'coordinator']);
  }

  prevPage() {
    this.router.navigate(['/register', 'current-user']);
  }
}

/* export const grants = [
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
]; */
