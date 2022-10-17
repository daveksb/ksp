import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FormMode,
  KspApprovePayload,
  KspRequest,
  Prefix,
  SchoolServiceUserPageType,
  SchUser,
} from '@ksp/shared/interface';
import {
  CompleteDialogComponent,
  ConfirmDialogComponent,
} from '@ksp/shared/dialog';
import { ERequestService, GeneralInfoService } from '@ksp/shared/service';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { parseJson } from '@ksp/shared/utility';

@Component({
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss'],
})
export class UserDetailComponent implements OnInit {
  approveTitles = ['ผลการตรวจสอบ', 'สถานะการใช้งาน'];
  approveChoices = approveChoices;
  headers = headers;

  requestId!: number | null;
  requestData = new KspRequest();
  prefixList$!: Observable<Prefix[]>;
  pageType = 0;
  setPassword = '';

  mode: FormMode = 'view';

  form = this.fb.group({
    userInfo: [],
    coordinatorInfo: [],
  });

  verifyForm = this.fb.group({
    result: [null, Validators.required],
  });

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
    this.eRequestService.getKspRequestById(id).subscribe((res) => {
      this.requestData = res;
      res.status === '1' ? (this.mode = 'edit') : (this.mode = 'view');
      console.log('status = ', res.status);
      console.log('mode = ', this.mode);
      if (res.birthdate) {
        res.birthdate = res.birthdate.split('T')[0];
      }

      this.form.controls.userInfo.patchValue(<any>res);
      const coordinator = parseJson(res.coordinatorinfo);
      //console.log('coordinator = ', coordinator);
      this.setPassword = coordinator.password;
      this.form.controls.coordinatorInfo.patchValue(coordinator.coordinator);
    });
  }

  approveUser() {
    // change process and status of SCH_REQUEST
    const newUser = new SchUser();
    newUser.idcardno = this.requestData.idcardno;
    newUser.prefixth = this.requestData.prefixth;
    newUser.schemail = this.requestData.email;
    newUser.position = this.requestData.position;
    newUser.firstnameth = this.requestData.firstnameth;
    newUser.lastnameth = this.requestData.lastnameth;
    newUser.schusername = this.requestData.schoolid;
    newUser.schoolid = this.requestData.schoolid;
    newUser.schpassword = this.setPassword;
    newUser.schuseractive = '1';

    const approvePayload: KspApprovePayload = {
      requestid: `${this.requestId}`,
      process: '1',
      status: '2',
      detail: null,
      systemtype: '2', // school
      userid: null,
      paymentstatus: null,
    };

    this.eRequestService.KspApproveRequest(approvePayload).subscribe((res) => {
      console.log('approve result = ', res);
    });

    this.eRequestService.createSchUser(newUser).subscribe(() => {
      this.completeDialog();
    });
  }

  unApproveUser() {
    console.log('un approve = ');
    const payload: KspApprovePayload = {
      requestid: `${this.requestId}`,
      process: '1',
      status: '3',
      detail: null,
      systemtype: '2', // school
      userid: null,
      paymentstatus: null,
    };

    this.eRequestService.KspApproveRequest(payload).subscribe((res) => {
      console.log('un approve result = ', res);
    });
  }

  viewUser() {
    this.router.navigate(['school', 'all-user']);
  }

  cancel() {
    if (this.pageType === SchoolServiceUserPageType.ApproveNewUser) {
      this.router.navigate(['/school', 'new-user']);
    } else if (this.pageType === SchoolServiceUserPageType.ManageCurrentUser) {
      this.router.navigate(['/manage-current-user']);
    }
  }

  confirm() {
    const confirmDialog = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: `คุณต้องการบันทึกข้อมูล
        ใช่หรือไม่? `,
      },
    });

    confirmDialog.componentInstance.confirmed.subscribe(() => {
      const form: any = this.verifyForm.controls.result.value;
      const result = +form.result;
      if (result) {
        this.approveUser();
      } else {
        this.unApproveUser();
      }
    });
  }

  completeDialog() {
    const dialog = this.dialog.open(CompleteDialogComponent, {
      data: {
        header: `บันทึกข้อมูลสำเร็จ`,
        buttonLabel: 'กลับสู่หน้าหลัก',
      },
    });

    dialog.componentInstance.completed.subscribe((res) => {
      if (res) {
        if (this.pageType === SchoolServiceUserPageType.ApproveNewUser) {
          this.router.navigate(['/school', 'new-user']);
        }
      }
    });
  }
}

const approveChoices = [
  [
    {
      name: 'อนุมัติ',
      value: 1,
    },
    {
      name: 'ไม่อนุมัติ',
      value: 0,
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

const headers = [
  [
    'ใบคำขอผู้ใช้งานระบบบริการหน่วยงานทางการศึกษา (School Service) ',
    'ตรวจสอบและอนุมัติใบคำขอรหัสเข้าใช้งาน',
  ],
  [
    'ผู้ใช้งานระบบบริการหน่วยงานทางการศึกษา (School Service)',
    'ข้อมูลผู้เข้าใช้งานระบบ School Service',
  ],
];
