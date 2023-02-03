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
  SchUser,
} from '@ksp/shared/interface';
import {
  CompleteDialogComponent,
  ConfirmDialogComponent,
} from '@ksp/shared/dialog';
import { ERequestService, GeneralInfoService } from '@ksp/shared/service';
import { FormBuilder, Validators } from '@angular/forms';
import { concatMap, forkJoin, Observable } from 'rxjs';
import { getCookie, jsonParse, parseJson } from '@ksp/shared/utility';
import localForage from 'localforage';
import moment from 'moment';

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
  checkedResult: any;
  files: FileGroup[] = [
    {
      name: 'หนังสือแต่งตั้งผู้ประสานงาน',
      files: [],
    },
    {
      name: 'สำเนาบัตรประชาชน',
      files: [],
    },
  ];
  form = this.fb.group({
    userInfo: [],
    coordinatorInfo: [],
  });
  form2 = this.fb.group({
    bureau: [''],
    schoolName: [''],
    schoolAddress: [''],
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
    this.route.queryParams.subscribe((res) => {
      this.pageType = Number(res['type']);
    });

    if (this.pageType === SchoolUserPageType.NewUser) {
      this.checkRequestId();
    }

    this.prefixList$ = this.generalInfoService.getPrefix();
    this.form2.disable();

    /* this.verifyForm.valueChanges.subscribe((res) => {
      const form: any = this.verifyForm.controls.result.value;
      const detail: string = form.detail;
    }); */
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
      //console.log('res = ', res.status);
      res.status === '1' ? (this.mode = 'edit') : (this.mode = 'view');
      //set value for checked approve result
      if (res.status === '2') {
        this.checkedResult = approveChoices[0][0].value;
      } else if (res.status === '3') {
        this.checkedResult = approveChoices[0][1].value;
      }
      //console.log('file = ', parseJson(res.fileinfo));
      const files = parseJson(res.fileinfo);

      if (files && Array.isArray(files)) {
        this.files.forEach((group, index) => {
          //console.log('group = ', group);
          return (group.files = files[index]);
        });
      }
      //console.log('mode = ', this.mode);
      if (res.birthdate) {
        res.birthdate = res.birthdate.split('T')[0];
      }

      this.form.controls.userInfo.patchValue(<any>res);
      const coordinator = parseJson(res.coordinatorinfo);

      this.setPassword = coordinator.password;
      this.form.controls.coordinatorInfo.patchValue(coordinator);

      this.form2.controls.bureau.patchValue(res.bureauname);
      this.form2.controls.schoolName.patchValue(res.schoolname);
      this.form2.controls.schoolAddress.patchValue(res.schooladdress);
    });
  }

  retireUser() {
    const payload: KspApprovePayload = {
      requestid: `${this.requestId}`,
      process: '1',
      status: '2',
      detail: null,
      systemtype: '4', //e-service
      userid: getCookie('userId'),
      paymentstatus: null,
    };

    this.eRequestService.KspUpdateRequestProcess(payload).subscribe((res) => {
      //console.log('update result = ', res);
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
    const deActivateAllUser = this.eRequestService.deActivateAllUser(
      this.requestData.schoolid ?? ''
    );

    const updatePayload: KspApprovePayload = {
      requestid: `${this.requestId}`,
      process: '1',
      status: '2',
      detail: null,
      systemtype: '4', //e-service
      userid: getCookie('userId'),
      paymentstatus: null,
    };
    const updateRequest =
      this.eRequestService.KspUpdateRequestProcess(updatePayload);

    const user = new SchUser();
    const coordinatorinfo = jsonParse(this.requestData.coordinatorinfo || '{}');

    user.idcardno = this.requestData.idcardno;
    user.prefixth = this.requestData.prefixth;
    user.schemail = this.requestData.email;
    user.position = this.requestData.position;
    user.firstnameth = this.requestData.firstnameth;
    user.lastnameth = this.requestData.lastnameth;
    user.schusername = this.requestData.schoolid;
    user.schoolid = this.requestData.schoolid;
    user.schmobile = this.requestData.contactphone;
    user.schpassword = this.setPassword;
    user.requestid = this.requestData.id;
    user.schuseractive = '1';
    user.schuserstartdate = moment().format('yyyy-MM-DD');
    user.coordinatorinfo = JSON.stringify(coordinatorinfo);
    //console.log('user = ', user);

    const createUser = this.eRequestService.createSchUser(user);
    const forkRequest = forkJoin([updateRequest, createUser]);
    deActivateAllUser.pipe(concatMap(() => forkRequest)).subscribe(() => {
      //console.log('res = ', res);
      this.completeDialog();
    });
  }

  unApproveUser() {
    const payload: KspApprovePayload = {
      requestid: `${this.requestId}`,
      process: '1',
      status: '3',
      detail: null,
      systemtype: '4', //e-service
      userid: getCookie('userId'),
      paymentstatus: null,
    };

    this.eRequestService.KspUpdateRequestProcess(payload).subscribe(() => {
      //console.log('un approve result = ', res);
      this.completeDialog();
    });
  }

  viewUser(schoolId: any) {
    localForage.setItem('schoolDetail', this.form2.value);
    this.router.navigate(['school', 'all-user'], {
      queryParams: { schoolId: schoolId },
    });
  }

  cancel() {
    if (this.pageType === SchoolUserPageType.NewUser) {
      this.router.navigate(['/school', 'new-user']);
    } else if (this.pageType === SchoolUserPageType.CurrentUser) {
      this.router.navigate(['/school', 'current-user']);
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
    'แบบคำขอผู้ใช้งานระบบบริการหน่วยงานทางการศึกษา (School Service) ',
    'ตรวจสอบและอนุมัติแบบคำขอรหัสเข้าใช้งาน',
  ],
  [
    'ผู้ใช้งานระบบบริการหน่วยงานทางการศึกษา (School Service)',
    'ข้อมูลผู้เข้าใช้งานระบบ School Service',
  ],
];
