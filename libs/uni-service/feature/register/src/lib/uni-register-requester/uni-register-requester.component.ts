import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UserInfoFormType } from '@ksp/shared/constant';
import { UniversitySearchComponent } from '@ksp/shared/search';
import { GeneralInfoService } from '@ksp/shared/service';
import { thaiDate } from '@ksp/shared/utility';
import localForage from 'localforage';
import { Observable } from 'rxjs';

@Component({
  templateUrl: './uni-register-requester.component.html',
  styleUrls: ['./uni-register-requester.component.scss'],
})
export class UniRegisterRequesterComponent implements OnInit {

  requestDate = thaiDate(new Date());
  requestNo = '';
  university: any;
  prefixName$!: Observable<any>;
  uniType$!: Observable<any>;
  occupyList$!: Observable<any>;
  userInfoFormdisplayMode: number = UserInfoFormType.thai;
  form = this.fb.group({
    universityInfo: [{}],
    requester: [],
  });

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private fb: FormBuilder,
    private generalInfoService: GeneralInfoService
  ) {}

  ngOnInit(): void {
      localForage.getItem('registerUserForm').then((res:any) => {
        if (res) {
          this.form.patchValue({
            requester: res,
            universityInfo: {
              schoolid: res.schoolid,
              unitype: res.unitype,
              institution: res.institution,
              affiliation: res.affiliation
            }
          });
        }
      });
      this.prefixName$ = this.generalInfoService.getPrefix();
      this.uniType$ = this.generalInfoService.getUniversityType();
      this.occupyList$ = this.generalInfoService.getOccupy();
  }

  selectedUniversity(university: any) {
    this.university = university;
    this.form.patchValue({
      universityInfo: {
        schoolid: university.id,
        unitype: university.typeid,
        institution: university.name,
        affiliation: university.nametype
      }
    })
  }

  next() {
    const data = this.form.getRawValue();
    console.log(this.form)
    const { requester, universityInfo } = data as any;
    const userInfo = {
      ...requester,
      schoolid: universityInfo.schoolid,
      unitype: universityInfo.unitype,
      institution: universityInfo.institution,
      affiliation: universityInfo.affiliation
    };
    
    localForage.setItem('registerUserForm', userInfo);
    this.router.navigate(['/register', 'coordinator']);
  }
}
