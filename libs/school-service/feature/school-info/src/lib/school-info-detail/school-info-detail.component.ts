import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { UserInfoFormType } from '@ksp/shared/constant';
import { Prefix } from '@ksp/shared/interface';
import { GeneralInfoService, SchoolInfoService } from '@ksp/shared/service';
import { getCookie } from '@ksp/shared/utility';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Observable } from 'rxjs';

@UntilDestroy()
@Component({
  selector: 'ksp-school-info-detail',
  templateUrl: './school-info-detail.component.html',
  styleUrls: ['./school-info-detail.component.scss'],
})
export class SchoolInfoDetailComponent implements OnInit {
  userInfoFormType: number = UserInfoFormType.thai;
  schoolId = getCookie('schoolId');
  prefixList$!: Observable<Prefix[]>;

  form = this.fb.group({
    schoolAddrTh: [],
    schoolAddrEn: [],
    schManager: [],
    coordinator: [],
  });

  constructor(
    private fb: FormBuilder,
    private schoolInfoService: SchoolInfoService,
    private generalInfoService: GeneralInfoService
  ) {}

  ngOnInit(): void {
    this.prefixList$ = this.generalInfoService.getPrefix();
    this.getSchoolAddress();
    this.getCoordinatorInfo();
  }

  getSchoolAddress() {
    this.schoolInfoService
      .getSchoolInfo(this.schoolId)
      .pipe(untilDestroyed(this))
      .subscribe((res) => {
        console.log('schoolinfo = ', res);
        this.form.controls.schoolAddrTh.patchValue(<any>res);
      });
  }

  getCoordinatorInfo() {
    const payload = {
      schoolid: this.schoolId,
      offset: 0,
      row: 30,
    };
    this.schoolInfoService
      .getCoordinatorInfo(payload)
      .pipe(untilDestroyed(this))
      .subscribe((res) => {
        //console.log('res = ', res[0]);
        if (res) {
          /*  const coordinator: any = {
            ...res[0],
            contactphone: res[0].schmobile,
            email: res[0].schemail,
          }; */
          const coordinator: any = JSON.parse(res[0].coordinatorinfo);
          console.log('coordinator = ', coordinator);
          this.form.controls.coordinator.patchValue(coordinator);
        }
      });
  }
}
