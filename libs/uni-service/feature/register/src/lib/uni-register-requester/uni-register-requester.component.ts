import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
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
          console.log(res)
          this.form.patchValue({
            requester: res,
            universityInfo: {
              uniid: res.uniid,
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
    console.log(university)
    this.university = university;
    this.form.patchValue({
      universityInfo: {
        uniid: university.id,
        unitype: university.typeid,
        institution: university.name,
        affiliation: university.nametype
      }
    })
  }

  next() {
    const data = this.form.getRawValue();
    const { requester, universityInfo } = data as any;
    const userInfo = {
      ...requester,
      uniid: universityInfo.uniid,
      unitype: universityInfo.unitype,
      institution: universityInfo.institution,
      affiliation: universityInfo.affiliation
    };
    
    localForage.setItem('registerUserForm', userInfo);
    this.router.navigate(['/register', 'coordinator']);
  }
}
