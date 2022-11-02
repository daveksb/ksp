import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FileGroup,
  FormMode,
  KspApprovePayload,
  KspRequest,
  Prefix,
  SchoolUserPageType,
  UniUser
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
  permissionRight = null;
  requestType = 0;

  form = this.fb.group({
    userInfo: [],
    coordinatorInfo: [],
  });

  verifyForm = this.fb.group({
    result: [null, Validators.required],
  });

  uploadFileList: FileGroup[] = [
    {
      name: 'หนังสือแต่งตั้งผู้ประสานงาน',
      files: []
    },
    {
      name: 'สำเนาบัตรประชาชน',
      files: []
    },
  ] as FileGroup[];

  requestTypeList = [
    "",
    "ยื่นผู้ประสานงาน",
    "ยื่นถอดถอนผู้ประสานงาน"
  ]

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
      const fileInfo = parseJson(res.fileinfo);
      if (fileInfo && fileInfo.fileUpload && Array.isArray(fileInfo.fileUpload)) {
        this.uploadFileList.forEach(
          (group, index) => (group.files = fileInfo.fileUpload[index])
        );
      }
      const education = parseJson(res.educationoccupy);
      this.requestData.bureauname = education.affiliation || '';
      this.requestData.schoolname = education.uniname || '';
      // this.requestData.schooladdress = education;
      this.permissionRight = education.permission || null;
      this.requestType = this.requestData.requesttype ? parseInt(this.requestData.requesttype) : 0;

      res.status === '1' ? (this.mode = 'edit') : (this.mode = 'view');
      if (res.birthdate) {
        res.birthdate = res.birthdate.split('T')[0];
      }

      this.form.controls.userInfo.patchValue(<any>res);
      const coordinator = parseJson(res.coordinatorinfo);
      this.setPassword = coordinator.password;
      this.form.controls.coordinatorInfo.patchValue(coordinator);
    });
  }

  approveUser() {
    // change process and status of SCH_REQUEST
    const newUser = new UniUser();
    newUser.idcardno = this.requestData.idcardno;
    newUser.firstnameth = this.requestData.firstnameth;
    newUser.lastnameth = this.requestData.lastnameth;
    newUser.email = this.requestData.email;
    newUser.phone = this.requestData.contactphone;
    newUser.birthdate = this.requestData.birthdate === "" ? null : this.requestData.birthdate;
    newUser.username = this.requestData.idcardno;
    newUser.password = this.setPassword;
    newUser.isuseractive = "1"
    newUser.position = this.requestData.position;
    newUser.prefixth = this.requestData.prefixth;
    newUser.prefixen = this.requestData.prefixen;
    newUser.firstnameen = this.requestData.firstnameen;
    newUser.lastnameen = this.requestData.lastnameen;
    // newUser.coordinatorinfo = this.requestData.coordinatorinfo;
    newUser.unitype = this.requestData.unitype;
    newUser.requestno = this.requestData.requestno;
    newUser.permissionright = this.permissionRight;

    const approvePayload: KspApprovePayload = {
      requestid: `${this.requestId}`,
      process: '1',
      status: '2',
      detail: null,
      systemtype: '3', // uni
      userid: null,
      paymentstatus: null,
    };

    this.eRequestService
      .KspUpdateRequestProcess(approvePayload)
      .subscribe((res) => {
        console.log('approve result = ', res);
      });

    this.eRequestService.createUniUser(newUser).subscribe(() => {
      this.completeDialog();
    });
  }

  unApproveUser() {
    const payload: KspApprovePayload = {
      requestid: `${this.requestId}`,
      process: '1',
      status: '3',
      detail: null,
      systemtype: '3', // uni
      userid: null,
      paymentstatus: null,
    };

    this.eRequestService.KspUpdateRequestProcess(payload).subscribe((res) => {
      //console.log('un approve result = ', res);
    });
  }

  viewUser() {
    this.router.navigate(['uni', 'all-user']);
  }

  cancel() {
    if (this.pageType === SchoolUserPageType.NewUser) {
      this.router.navigate(['/uni', 'new-user']);
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
        if (this.pageType === SchoolUserPageType.NewUser) {
          this.router.navigate(['/uni', 'new-user']);
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
    'ใบคำขอรหัสเข้าใช้งานระบบบริการสถาบันผลิตครู (Uni Service)',
    'ตรวจสอบและอนุมัติใบคำขอรหัสเข้าใช้งาน',
  ],
  [
    'ใบคำขอรหัสเข้าใช้งานระบบบริการสถาบันผลิตครู (Uni Service)',
    'ข้อมูลผู้เข้าใช้งานระบบ Uni Service',
  ],
];
