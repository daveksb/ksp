import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import {
  KspRequest,
  SchoolRequest,
  SchoolServiceUserPageType,
  SchoolUser,
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
  approveChoices = approveChoices;
  headers = headers;

  requestId!: number | null;
  requestData = new KspRequest();
  prefixList$!: Observable<any>;
  pageType = 0;

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
      if (res.birthdate) {
        res.birthdate = res.birthdate.split('T')[0];
      }

      this.form.controls.userInfo.patchValue(<any>res);

      const coordinator = parseJson(res.coordinatorinfo);
      //console.log('coordinator = ', res);
      this.form.controls.coordinatorInfo.patchValue(coordinator.coordinator);
    });
  }

  /* {
      idcardno: '1',
      firstnameth: '2',
      lastnameth: '3',
      schemail: '4',
      schmobile: '5',
      schbirthdate: '2022-09-06T00:20:13',
      schusername: '6',
      schpassword: '7',
      schuseractive: this.verifySelected,
      schuserenddate: '2022-09-06T00:20:13',
      schlastlogintime: '2022-09-06T00:20:13',
      schlastlogouttime: '2022-09-06T00:20:13',
      schoolid: '9',
      position: '10',
      prefixth: '11',
      prefixen: '12',
      firstnameen: '13',
      lastnameen: '144',
      permissionright: { field1: 'data1', field2: 'data2', field3: 'data3' },
      coordinatorinfo: { field1: 'data1', field2: 'data2', field3: 'data3' },
    }; */

  approveUser() {
    // change process and status of SCH_REQUEST

    const newUser = new SchoolUser();

    newUser.idcardno = this.requestData.idcardno;
    newUser.firstnameth = this.requestData.firstnameth;
    newUser.lastnameth = this.requestData.lastnameth;
    newUser.schusername = this.requestData.schoolid;
    newUser.schpassword = '1234';
    newUser.schuseractive = '1';

    this.eRequestService.createSchUser(newUser).subscribe((res) => {
      console.log('new user result = ', res.returnmessage);
      this.completeDialog();
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
      width: '350px',
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

  unApproveUser() {
    console.log('un approve = ');
    // change process and status of SCH_REQUEST
  }

  completeDialog() {
    const dialog = this.dialog.open(CompleteDialogComponent, {
      width: '350px',
      data: {
        header: `บันทึกข้อมูลสำเร็จ`,
        buttonLabel: 'กลับสู่หน้าหลัก',
      },
    });

    dialog.componentInstance.completed.subscribe((res) => {
      if (res) {
        if (this.pageType === SchoolServiceUserPageType.ApproveNewUser) {
          this.router.navigate(['/school', 'new-user']);
        } else if (
          this.pageType === SchoolServiceUserPageType.ManageCurrentUser
        ) {
          //this.router.navigate(['/manage-current-user', 'list']);
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
    'ใบคำขอรหัสเข้าใช้งานระบบบริการหน่วยงานทางการศึกษา (School Service) ',
    'ตรวจสอบและอนุมัติใบคำขอรหัสเข้าใช้งาน',
  ],
  [
    'ผู้ใช้งานระบบบริการหน่วยงานทางการศึกษา (School Service)',
    'ข้อมูลผู้เข้าใช้งานระบบ School Service',
  ],
];
