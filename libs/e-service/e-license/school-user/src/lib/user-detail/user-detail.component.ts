import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FormMode,
  KspApprovePayload,
  KspRequest,
  Prefix,
  SchoolUserPageType,
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
  pageType: SchoolUserPageType = SchoolUserPageType.CurrentUser;
  pageTypeEnum = SchoolUserPageType;
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
      //console.log('status = ', res.status);
      //console.log('mode = ', this.mode);
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

  retireUser() {
    const payload: KspApprovePayload = {
      requestid: `${this.requestId}`,
      process: '1',
      status: '2',
      detail: null,
      systemtype: '2', // school
      userid: null,
      paymentstatus: null,
    };

    this.eRequestService.KspUpdateRequestProcess(payload).subscribe((res) => {
      console.log('update result = ', res);
      this.completeDialog();
    });

    const retirePayload = {
      schmemberid: this.requestData.userid,
      schuseractive: '0',
    };

    this.eRequestService.retiredUser(retirePayload).subscribe((res) => {
      console.log('retired result = ', res);
    });
  }

  approveUser() {
    const payload: KspApprovePayload = {
      requestid: `${this.requestId}`,
      process: '1',
      status: '2',
      detail: null,
      systemtype: '2', // school
      userid: null,
      paymentstatus: null,
    };

    this.eRequestService.KspUpdateRequestProcess(payload).subscribe((res) => {
      console.log('approve result = ', res);
    });

    const user = new SchUser();
    user.idcardno = this.requestData.idcardno;
    user.prefixth = this.requestData.prefixth;
    user.schemail = this.requestData.email;
    user.position = this.requestData.position;
    user.firstnameth = this.requestData.firstnameth;
    user.lastnameth = this.requestData.lastnameth;
    user.schusername = this.requestData.schoolid;
    user.schoolid = this.requestData.schoolid;
    user.schpassword = this.setPassword;
    user.requestid = this.requestData.id;
    user.schuseractive = '1';

    this.eRequestService.createSchUser(user).subscribe(() => {
      this.completeDialog();
    });
  }

  unApproveUser() {
    const payload: KspApprovePayload = {
      requestid: `${this.requestId}`,
      process: '1',
      status: '3',
      detail: null,
      systemtype: '2', // school
      userid: null,
      paymentstatus: null,
    };

    this.eRequestService.KspUpdateRequestProcess(payload).subscribe((res) => {
      //console.log('un approve result = ', res);
    });
  }

  viewUser() {
    this.router.navigate(['school', 'all-user']);
  }

  cancel() {
    if (this.pageType === SchoolUserPageType.NewUser) {
      this.router.navigate(['/school', 'new-user']);
    } else if (this.pageType === SchoolUserPageType.CurrentUser) {
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
      const resultOk = +form.result;
      if (resultOk) {
        if (this.requestData.requesttype === '1') {
          this.approveUser();
        } else if (this.requestData.requesttype === '2') {
          this.retireUser();
        }
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
        if (this.pageType === SchoolUserPageType.NewUser) {
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
