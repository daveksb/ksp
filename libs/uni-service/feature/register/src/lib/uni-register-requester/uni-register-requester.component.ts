import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UserInfoFormType } from '@ksp/shared/constant';
import { UniversitySearchComponent } from '@ksp/shared/search';
import { GeneralInfoService, UniInfoService } from '@ksp/shared/service';
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
  uniData: any;
  form = this.fb.group({
    requester: []
  });

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private fb: FormBuilder,
    private generalInfoService: GeneralInfoService,
    private uniinfoService: UniInfoService
  ) {}

  ngOnInit(): void {
    localForage.getItem('registerSelectedUniversity').then((res: any) => {
      if (res) {
        this.uniData = res;
      }
    });
    localForage.getItem('registerUserForm').then((res:any) => {
      if (res) {
        this.form.patchValue({
          requester: res
        });
      }
    });
    this.prefixName$ = this.generalInfoService.getPrefix();
    this.uniType$ = this.uniinfoService.getUniversityType();
    this.occupyList$ = this.uniinfoService.getOccupy();
  }

  next() {
    const data = this.form.getRawValue();
    const { requester } = data as any;
    const userInfo = {
      ...requester,
      schoolid: this.uniData.schoolid,
      unitype: this.uniData.unitype,
      institution: this.uniData.institution,
      affiliation: this.uniData.affiliation
    };
    
    localForage.setItem('registerUserForm', userInfo);
    this.router.navigate(['/register', 'coordinator']);
  }

  back() {
    this.router.navigate(['/register', 'select-university']);
  }
}
