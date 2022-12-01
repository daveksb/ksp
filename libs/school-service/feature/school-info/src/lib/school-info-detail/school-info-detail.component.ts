import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UserInfoFormType } from '@ksp/shared/constant';
import {
  CompleteDialogComponent,
  ConfirmDialogComponent,
} from '@ksp/shared/dialog';
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
  schoolid = getCookie('schoolId');
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
    private generalInfoService: GeneralInfoService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.prefixList$ = this.generalInfoService.getPrefix();
    this.getSchoolAddress();
    this.getSchoolManager();
    this.getCoordinatorInfo();
  }

  getSchoolAddress() {
    const payload = {
      schoolid: this.schoolid,
    };
    this.schoolInfoService
      .getSchoolInfo(payload)
      .pipe(untilDestroyed(this))
      .subscribe((res) => {
        //console.log('schoolinfo = ', res);
        if (res) {
          this.form.controls.schoolAddrTh.patchValue(<any>res);
          this.form.controls.schoolAddrEn.patchValue(<any>res);
        }
      });
  }

  getSchoolManager() {
    const payload = {
      schoolid: this.schoolid,
    };
    this.schoolInfoService
      .getSchoolInfo(payload)
      .pipe(untilDestroyed(this))
      .subscribe((res) => {
        //console.log('managerinfo = ', res);
        if (res) {
          const manager: any = {
            ...res,
            position: res.thposition,
            firstnameth: res.thname,
            lastnameth: res.thfamilyname,
            prefixth: res.thprefixid,
            idcardno: res.thkurusapan,
            email: res.schsendemail,
          };
          this.form.controls.schManager.patchValue(manager);
        }
      });
  }

  getCoordinatorInfo() {
    const payload = {
      schoolid: this.schoolid,
      offset: 0,
      row: 30,
    };
    this.schoolInfoService
      .getCoordinatorInfo(payload)
      .pipe(untilDestroyed(this))
      .subscribe((res) => {
        //console.log('res = ', res[0]);
        if (res) {
          const coordinator: any = JSON.parse(res[0].coordinatorinfo);
          //console.log('coordinator = ', coordinator);
          this.form.controls.coordinator.patchValue(coordinator);
        }
      });
  }

  cancel() {
    this.router.navigate(['/temp-license', 'list']);
  }

  confirmDialog() {
    const dialog = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: `คุณต้องการยืนยันข้อมูลใช่หรือไม่? `,
      },
    });

    dialog.componentInstance.confirmed.subscribe((res) => {
      if (res) {
        this.completeDialog();
        /*         if (this.saveData.requestData.process === '5') {
            this.considerRequest();
          } else {
            this.checkRequest();
          } */
      }
    });
  }

  completeDialog() {
    const dialog = this.dialog.open(CompleteDialogComponent, {
      data: {
        header: `บันทึกข้อมูลสำเร็จ`,
      },
    });

    dialog.componentInstance.completed.subscribe((res) => {
      if (res) {
        this.cancel();
      }
    });
  }
}
