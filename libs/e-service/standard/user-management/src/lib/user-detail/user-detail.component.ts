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
  UniUser,
} from '@ksp/shared/interface';
import {
  CompleteDialogComponent,
  ConfirmDialogComponent,
} from '@ksp/shared/dialog';
import {
  ERequestService,
  EUniService,
  GeneralInfoService,
  LoaderService,
  UniInfoService,
} from '@ksp/shared/service';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import {
  getCookie,
  parseJson,
  replaceEmptyWithNull,
} from '@ksp/shared/utility';
import localForage from 'localforage';
import { SchoolRetireReason } from '@ksp/shared/constant';

@Component({
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss'],
})
export class UserDetailComponent implements OnInit {
  approveTitles = ['ผลการตรวจสอบ', 'สถานะการใช้งาน'];
  approveChoices = approveChoices;
  headers = headers;
  requestId!: number | null;
  requestData: any;
  prefixList$!: Observable<Prefix[]>;
  occupyList$!: Observable<Prefix[]>;
  pageType: any;
  pageTypeEnum = SchoolUserPageType;
  setPassword = '';
  mode: FormMode = 'view';
  permissionRight = null;
  requestType = 0;

  form = this.fb.group({
    userInfo: [],
    coordinatorInfo: [],
    retiredReason: [],
    retiredDetail: [],
  });

  verifyForm = this.fb.group({
    result: [
      {
        result: '',
        reason: '',
        detail: '',
      },
      Validators.required,
    ],
  });

  uploadFileList: FileGroup[] = [
    {
      name: 'หนังสือแต่งตั้งผู้ประสานงาน',
      files: [],
    },
    {
      name: 'สำเนาบัตรประชาชน',
      files: [],
    },
  ] as FileGroup[];

  requestTypeList = ['', 'ยื่นผู้ประสานงาน', 'ยื่นถอดถอนผู้ประสานงาน'];
  headerRequest = [
    '',
    'ข้อมูลผู้ขอเข้ารหัสสำหรับเข้าใช้งานระบบ (ผู้ประสานงาน)',
    'ข้อมูลผู้ขอถอดถอนสำหรับเข้าใช้งานระบบ',
  ];
  isLoading: Subject<boolean> = this.loaderService.isLoading;

  retireReason = SchoolRetireReason;

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private eRequestService: ERequestService,
    private eUniService: EUniService,
    private generalInfoService: GeneralInfoService,
    private uniInfoService: UniInfoService,
    private loaderService: LoaderService
  ) {}

  ngOnInit(): void {
    this.checkRequestId();

    this.route.queryParams.subscribe((res) => {
      this.pageType = Number(res['type']);
    });

    this.prefixList$ = this.generalInfoService.getPrefix();
    this.occupyList$ = this.uniInfoService.getOccupy();
  }

  checkRequestId() {
    this.route.queryParams.subscribe((res) => {
      this.pageType = Number(res['type']);
    });
    this.route.paramMap.subscribe((params) => {
      this.requestId = Number(params.get('id'));
      if (this.pageType == 0) {
        this.loadRequestFromId(this.requestId);
      } else {
        this.loadUniUserFromId(this.requestId);
      }
    });
  }

  loadUniUserFromId(id: number) {
    this.eUniService.getUserById({id: id}).subscribe((res) => {
      this.requestData = res as any;
      this.mode = 'edit';
      this.requestData.userid = this.requestData?.userid || null;
      this.requestData.uniid = this.requestData?.uniid || null;
      this.requestData.bureauname = this.requestData?.unitypename || '';
      this.requestData.schoolname = this.requestData?.uniname || '';
      this.requestData.schooladdress = `${this.requestData?.address ? this.requestData?.address + ' ' : ''}` +
                                      `หมู่ ${this.requestData.moo} ` +
                                      `${this.requestData.road ? 'ถนน' + this.requestData.road + ' ' : ''}` +
                                      `ตำบล${this.requestData.tumbon} อำเภอ${this.requestData.amphur} ` +
                                      `จังหวัด${this.requestData.province} ${this.requestData.zipcode}`
      this.form.controls.userInfo.patchValue(<any>res);
      const coordinator = parseJson(res.coordinatorinfo);
      this.form.controls.coordinatorInfo.patchValue(coordinator);
      const resultDetail = parseJson(res.approvestatus);
      this.verifyForm.controls.result.patchValue({
        result: this.requestData?.isuseractive === '1' ? '1' : '2',
        reason: resultDetail.detail?.reason,
        detail: resultDetail.detail?.detail,
      });
    })
  }

  loadRequestFromId(id: number) {
    console.log(id)
    this.eRequestService.getKspRequestByIdUni(id).subscribe((res) => {
      this.requestData = res as any;
      const fileInfo = parseJson(res.fileinfo);
      const approvedetail = res.detail ? parseJson(res.detail) : null;
      if (
        fileInfo &&
        fileInfo.fileUpload &&
        Array.isArray(fileInfo.fileUpload)
      ) {
        if (res.status != '1') {
          if (approvedetail && approvedetail.file) {
            this.uploadFileList.forEach(
              (group, index) => (group.files = approvedetail.file[index].files,
                group.checkresult = approvedetail.file[index].checkresult)
            );
          } else {
            this.uploadFileList.forEach(
              (group, index) => (group.files = fileInfo.fileUpload[index])
            ); 
          }
        } else {
          this.uploadFileList.forEach(
            (group, index) => (group.files = fileInfo.fileUpload[index])
          );
        }
      }
      const education = parseJson(res.educationoccupy);
      this.requestData.userid = education?.userid || null;
      this.requestData.uniid = education?.uniid || null;
      this.requestData.bureauname = education?.affiliation || '';
      this.requestData.schoolname = education?.uniname || '';
      this.requestData.schooladdress = `${this.requestData?.address} ` +
                                      `หมู่ ${this.requestData.moo} ` +
                                      `${this.requestData.road ? 'ถนน' + this.requestData.road + ' ' : ''}` +
                                      `ตำบล${this.requestData.tumbon} อำเภอ${this.requestData.amphur} ` +
                                      `จังหวัด${this.requestData.province} ${this.requestData.zipcode}`
      // this.requestData.schooladdress = education;
      this.permissionRight = education?.permission || null;
      this.requestType = this.requestData.requesttype
        ? parseInt(this.requestData.requesttype)
        : 0;

      res.status === '1' ? (this.mode = 'edit') : (this.mode = 'view');
      this.verifyForm.controls.result.patchValue({
        result: res?.status === '1' ? '' : res?.status === '2' ? '1' : '0',
        reason: approvedetail?.reason || '',
        detail: approvedetail?.reason || '',
      });
      if (res.birthdate) {
        res.birthdate = res.birthdate.split('T')[0];
      }

      if (res.requesttype == '2') {
        const reasoninfo = parseJson(res.reasoninfo);
        this.form.patchValue({
          retiredReason: reasoninfo.retiredReason,
          retiredDetail: reasoninfo.retiredDetail,
        });
      }

      this.form.controls.userInfo.patchValue(<any>res);
      const coordinator = parseJson(res.coordinatorinfo);
      this.requestData.coordinatorinfo = coordinator;
      this.setPassword = coordinator.password;
      this.form.controls.coordinatorInfo.patchValue(coordinator);
    });
  }

  retireUser() {
    const form: any = this.verifyForm.controls.result.value;
    const payload: KspApprovePayload = {
      requestid: `${this.requestId}`,
      process: '1',
      status: '2',
      detail: JSON.stringify({ reason: form.detail, file: this.uploadFileList }),
      systemtype: '3', // uni
      userid: null,
      paymentstatus: null,
    };

    this.eRequestService.KspUpdateRequestProcess(payload).subscribe((res) => {
      console.log('update result = ', res);
      const retirePayload = {
        id: this.requestData.userid,
        isuseractive: '0',
      };

      this.eRequestService.retiredUniUser(retirePayload).subscribe((res) => {
        console.log('retired result = ', res);
        this.updateClosed();
        this.completeDialog();
      });
    });
  }

  updateClosed() {
    this.eRequestService
      .updateRequestClosed(this.requestId, '1')
      .subscribe((res) => {
        console.log('close request result = ', res);
      });
  }

  approveUser() {
    // change process and status of SCH_REQUEST
    let newUser = new UniUser();
    newUser.uniid = this.requestData.uniid;
    newUser.idcardno = this.requestData.idcardno;
    newUser.firstnameth = this.requestData.firstnameth;
    newUser.lastnameth = this.requestData.lastnameth;
    newUser.email = this.requestData.email;
    newUser.phone = this.requestData.contactphone;
    newUser.workphone = this.requestData.workphone;
    newUser.birthdate =
      this.requestData.birthdate === '' ? null : this.requestData.birthdate;
    newUser.username = this.requestData.idcardno;
    newUser.password = this.setPassword;
    newUser.isuseractive = '1';
    newUser.position = this.requestData.position;
    newUser.prefixth = this.requestData.prefixth;
    newUser.prefixen = this.requestData.prefixen;
    newUser.firstnameen = this.requestData.firstnameen;
    newUser.lastnameen = this.requestData.lastnameen;
    newUser.coordinatorinfo = JSON.stringify(this.requestData.coordinatorinfo);
    newUser.unitype = this.requestData.unitype;
    newUser.requestno = this.requestData.requestno;
    newUser.permissionright = this.permissionRight;
    newUser = replaceEmptyWithNull(newUser);
    const form: any = this.verifyForm.controls.result.value;
    const approvePayload: KspApprovePayload = {
      requestid: `${this.requestId}`,
      process: '1',
      status: '2',
      detail: JSON.stringify({ reason: form.detail, file: this.uploadFileList }),
      systemtype: '3', // uni
      userid: getCookie('userId'),
      paymentstatus: null,
    };

    this.eRequestService
      .KspUpdateRequestProcess(approvePayload)
      .subscribe((res) => {
        console.log('approve result = ', res);
        this.eRequestService.createUniUser(newUser).subscribe(() => {
          this.updateClosed();
          this.completeDialog();
        });
      });
  }

  unApproveUser() {
    const form: any = this.verifyForm.controls.result.value;
    const payload: KspApprovePayload = {
      requestid: `${this.requestId}`,
      process: '1',
      status: '3',
      detail: JSON.stringify({ reason: form.detail, file: this.uploadFileList }),
      systemtype: '3', // uni
      userid: getCookie('userId'),
      paymentstatus: null,
    };

    this.eRequestService.KspUpdateRequestProcess(payload).subscribe((res) => {
      console.log('un approve result = ', res);
      this.updateClosed();
      this.completeDialog();
    });
  }

  viewUser() {
    console.log(this.requestData);
    localForage.setItem('uniseleced', this.requestData).then(() => {
      this.router.navigate(['uni', 'all-user']);
    });
  }

  cancel() {
    if (this.pageType === SchoolUserPageType.NewUser) {
      this.router.navigate(['/uni', 'new-user']);
    } else if (this.pageType === SchoolUserPageType.CurrentUser) {
      this.router.navigate(['/manage-current-user']);
    }
  }

  confirm() {
    const form: any = this.verifyForm.controls.result.value;
      const result = +form.result;
    console.log(result)
    const confirmDialog = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: `คุณต้องการบันทึกข้อมูล
        ใช่หรือไม่? `,
      },
    });

    confirmDialog.componentInstance.confirmed.subscribe(() => {
      const form: any = this.verifyForm.controls.result.value;
      const result = +form.result;
      if (this.pageType == 0) {
        if (result) {
          if (this.requestData.requesttype === '1') {
            this.approveUser();
          } else if (this.requestData.requesttype === '2') {
            this.retireUser();
          }
        } else {
          this.unApproveUser();
        }
      } else {
        this.setActiveUser(form);
      }
    });
  }

  setActiveUser(form: any) {
    const result = +form.result
    const payload = {
      id: this.requestData.id,
      isuseractive: result == 1 ? 1 : 0,
      approvestatus: JSON.stringify({ detail: form })
    }
    this.eUniService.updateActiveUser(payload).subscribe(() => {
      this.completeDialog();
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
        if (this.pageType === SchoolUserPageType.NewUser) {
          this.router.navigate(['/uni', 'new-user']);
        } else {
          this.router.navigate(['/uni', 'current-user']);
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
    'แบบคำขอรหัสเข้าใช้งานระบบบริการสถาบันผลิตครู (Uni Service)',
    'ตรวจสอบและอนุมัติแบบคำขอรหัสเข้าใช้งาน',
  ],
  [
    'แบบคำขอรหัสเข้าใช้งานระบบบริการสถาบันผลิตครู (Uni Service)',
    'ข้อมูลผู้เข้าใช้งานระบบ Uni Service',
  ],
];
