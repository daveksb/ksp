import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserInfoFormType } from '@ksp/shared/constant';
import { FormMode } from '@ksp/shared/interface';
import { GeneralInfoService, RequestLicenseService } from '@ksp/shared/service';
import { thaiDate } from '@ksp/shared/utility';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Observable, switchMap } from 'rxjs';
import localForage from 'localforage';

@UntilDestroy()
@Component({
  templateUrl: './register-requester.component.html',
  styleUrls: ['./register-requester.component.scss'],
})
export class RegisterRequesterComponent implements OnInit {
  grant = grants;
  requestNumber = '';
  requestDate = thaiDate(new Date());
  prefixList$!: Observable<any>;
  nationalitys$!: Observable<any>;
  mode: FormMode = 'edit';
  userInfoFormdisplayMode: number = UserInfoFormType.thai;
  school!: any;
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
    private generalInfoService: GeneralInfoService,
    private requestLicenseService: RequestLicenseService,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    //this.school = history?.state?.data ?? null;
    localForage.getItem('registerSelectedSchool').then((res) => {
      this.school = res;
      //console.log('school = ', this.school);
    });

    this.getListData();
    this.checkRequestId();
  }
  getListData() {
    this.prefixList$ = this.generalInfoService.getPrefix();
    this.nationalitys$ = this.generalInfoService.getNationality();
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
  next() {
    const data = this.form.getRawValue();
    const { requester, ...all } = data as any;
    const userpermission = JSON.stringify(all);
    const userInfo = {
      ...requester,
      userpermission,
      schoolid: this.school.schoolId,
    };

    localForage.setItem('registerUserInfoFormValue', userInfo);
    this.router.navigate(['/register', 'coordinator']);
    /*  this.router.navigate(['/register', 'coordinator'], {
      state: { data: userInfo },
    }); */
  }

  prevPage() {
    this.router.navigate(['/', 'register', 'current-user']);
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
