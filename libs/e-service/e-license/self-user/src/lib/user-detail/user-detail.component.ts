import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import {
  SchoolRequest,
  SchoolServiceUserPageType,
} from '@ksp/shared/interface';
import {
  CompleteDialogComponent,
  ConfirmDialogComponent,
} from '@ksp/shared/dialog';
import { ERequestService, GeneralInfoService } from '@ksp/shared/service';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { parseJson, thaiDate } from '@ksp/shared/utility';

@Component({
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss'],
})
export class UserDetailComponent implements OnInit {
  approveTitles = ['ผลการตรวจสอบ', 'สถานะการใช้งาน'];

  approveChoices = [
    [
      {
        name: 'อนุมัติ',
        value: 2,
      },
      {
        name: 'ไม่อนุมัติ',
        value: 3,
      },
    ],
    [
      {
        name: 'ใช้งาน',
        value: 1,
      },
      {
        name: 'ไม่ใช้งาน',
        value: 2,
      },
    ],
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

  requestId!: number | null;
  requestDate!: string | null;
  requestData!: SchoolRequest;
  prefixList$!: Observable<any>;

  requestNo: string | null = '';

  form = this.fb.group({
    userInfo: [],
    coordinatorInfo: [],
  });

  form2 = this.fb.group({
    verifyResult: [null, Validators.required],
  });

  verifySelected = 1;
  pageType = 0;

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private eRequestService: ERequestService,
    private generalInfoService: GeneralInfoService
  ) {}

  ngOnInit(): void {
    this.checkRequestId();

    this.form2.controls.verifyResult.valueChanges.subscribe((res: any) => {
      this.verifySelected = Number(res['result']);
      console.log(' //this.form.valid;', this.verifySelected);
    });

    this.route.queryParams.subscribe((res) => {
      this.pageType = Number(res['type']);
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
    this.eRequestService.getRequestById(id).subscribe((res) => {
      this.requestData = res;
      this.requestNo = res.requestno;
      this.requestDate = thaiDate(new Date(`${res.requestdate}`));

      if (res.birthdate) {
        res.birthdate = res.birthdate.split('T')[0];
      }

      const data: any = res;
      this.form.controls.userInfo.patchValue(data);

      const coordinator = parseJson(res.coordinatorinfo);
      //console.log('coordinator = ', res);
      this.form.controls.coordinatorInfo.patchValue(coordinator.coordinator);
    });
  }

  approveRequest() {
    const payload = {
      id: `${this.requestId}`,
      checksubresult: null,
      checkfinalresult: null,
      approveresult: null,
      currentprocess: 1,
      requeststatus: this.verifySelected,
    };

    /*     this.eRequestService.createSchUser(payload).subscribe((res) => {
      //console.log('Cancel request  = ', res);
      //create new user in sch_user
    }); */
  }

  cancel() {
    if (this.pageType === SchoolServiceUserPageType.ApproveNewUser) {
      this.router.navigate(['/approve-new-user']);
    } else if (this.pageType === SchoolServiceUserPageType.ManageCurrentUser) {
      this.router.navigate(['/manage-current-user']);
    }
  }

  confirm() {
    const confirmDialog = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: {
        title: `คุณต้องการบันทึกข้อมูล
        ใช่หรือไม่? `,
      },
    });

    confirmDialog.componentInstance.confirmed.subscribe((res) => {
      if (res) {
        this.approveRequest();
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
