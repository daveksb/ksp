import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { UserInfoFormType } from '@ksp/shared/constant';
import { SchoolInfoService } from '@ksp/shared/service';
import { untilDestroyed } from '@ngneat/until-destroy';
import { Observable } from 'rxjs';

@Component({
  selector: 'ksp-school-info-detail',
  templateUrl: './school-info-detail.component.html',
  styleUrls: ['./school-info-detail.component.scss'],
})
export class SchoolInfoDetailComponent implements OnInit {
  userInfoFormType: number = UserInfoFormType.thai;
  schoolId = '0010201056';
  prefixList$!: Observable<any>;

  form = this.fb.group({
    schoolAddrTh: [],
    schoolAddrEn: [],
    schManager: [],
    coordinator: [],
  });

  constructor(
    private fb: FormBuilder,
    private schoolInfoService: SchoolInfoService
  ) {}

  ngOnInit(): void {
    this.getSchoolAddress();
  }

  getSchoolAddress() {
    this.schoolInfoService
      .getSchoolInfo(this.schoolId)
      .subscribe((res: any) => {
        this.form.controls.schoolAddrTh.patchValue(res);
      });
  }
}
