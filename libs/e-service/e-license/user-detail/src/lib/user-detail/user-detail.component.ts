import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { SchoolServiceUserPageType } from '@ksp/shared/interface';
import {
  CompleteDialogComponent,
  ConfirmDialogComponent,
} from '@ksp/shared/dialog';
import { GeneralInfoService, RequestLicenseService } from '@ksp/shared/service';
import { FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { SchoolRequestProcess } from '@ksp/shared/constant';

@Component({
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss'],
})
export class UserDetailComponent implements OnInit {
  checkComponentTitles = ['ผลการตรวจสอบ', 'สถานะการใช้งาน'];
  checkComponentChoices = [
    ['อนุมัติ', 'ไม่อนุมัติ'],
    ['ใช้งาน', 'ไม่ใช้งาน'],
  ];
  headers = [
    [
      'ใบคำขอรหัสเข้าใช้งานระบบบริการหน่วยงานทางการศึกษา (School Service) ',
      'ตรวจสอบและอนุมัติใบคำขอรหัสเข้าใช้งาน',
    ],
    [
      'ผู้ใช้งานระบบบริการหน่วยงานทางการศึกษา (School Service)',
      'ข้อมูลผู้เข้าใช้งานระบบ School Service',
    ],
  ];

  requestId!: number;
  requestData!: any;
  prefixList$!: Observable<any>;

  form = this.fb.group({
    userInfo: [],
  });

  //thaiDate = thaiDate(new Date());

  pageType = 0;
  constructor(
    private router: Router,
    public dialog: MatDialog,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private requestService: RequestLicenseService,
    private generalInfoService: GeneralInfoService
  ) {}

  ngOnInit(): void {
    this.checkRequestId();
    this.route.queryParams.subscribe((res) => {
      this.pageType = Number(res['type']);
      //console.log('res = ', this.pageType);
    });

    this.prefixList$ = this.generalInfoService.getPrefix();
  }

  checkRequestId() {
    this.route.paramMap.subscribe((params) => {
      this.requestId = Number(params.get('id'));
      if (this.requestId) {
        this.loadRequestFromId(this.requestId);
      }
    });
  }

  loadRequestFromId(id: number) {
    this.requestService.getRequestById(id).subscribe((res: any) => {
      this.requestData = res;
      //this.pathUserInfo(res);
      //data.birthdate = data.birthdate.split('T')[0];
      this.form.controls.userInfo.patchValue(res);
    });
  }

  approveRequest() {
    const payload = {
      id: `${this.requestId}`,
      currentprocess: `${SchoolRequestProcess.ผ่านการตรวจสอบ}`,
    };
    this.requestService.changeRequestProcess(payload).subscribe((res) => {
      //console.log('Cancel request  = ', res);
      //create new user in sch_user
    });
  }

  cancel() {
    if (this.pageType === SchoolServiceUserPageType.ApproveNewUser) {
      this.router.navigate(['/approve-new-user']);
    } else if (this.pageType === SchoolServiceUserPageType.ManageCurrentUser) {
      this.router.navigate(['/manage-current-user']);
    }
  }

  save() {
    const confirmDialog = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: {
        title: `คุณต้องการบันทึกข้อมูล
        ใช่หรือไม่? `,
      },
    });

    confirmDialog.componentInstance.confirmed.subscribe((res) => {
      if (res) {
        this.onCompleted();
      }
    });
  }

  onCompleted() {
    const completeDialog = this.dialog.open(CompleteDialogComponent, {
      width: '350px',
      data: {
        header: `บันทึกข้อมูลสำเร็จ`,
        buttonLabel: 'กลับสู่หน้าหลัก',
      },
    });

    completeDialog.componentInstance.completed.subscribe((res) => {
      if (res) {
        if (this.pageType === SchoolServiceUserPageType.ApproveNewUser) {
          this.router.navigate(['/approve-new-user', 'list']);
        } else if (
          this.pageType === SchoolServiceUserPageType.ManageCurrentUser
        ) {
          this.router.navigate(['/manage-current-user', 'list']);
        }
      }
    });
  }
}
