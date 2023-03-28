import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { RequestPageType } from '@ksp/shared/constant';
import { FileGroup } from '@ksp/shared/interface';
import {
  CompleteDialogComponent,
  ConfirmDialogComponent,
} from '@ksp/shared/dialog';
import {
  EUniService,
  GeneralInfoService,
  UniInfoService,
  UniRequestService,
} from '@ksp/shared/service';
import { getCookie, mapMultiFileInfo, parseJson, thaiDate } from '@ksp/shared/utility';
import { EMPTY, Observable, switchMap } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'e-service-edit-student-detail',
  templateUrl: './edit-student-detail.component.html',
  styleUrls: ['./edit-student-detail.component.scss'],
})
export class EserviceEditStudentDetailComponent implements OnInit {
  requestDate: any;
  requestNo = '';
  formSearch = this.fb.group({
    idcardno: [],
    firstname: [],
    lastname: [],
  });
  oldValue: any;
  formData = this.fb.group({
    editStudent: [],
    verify: [
      {
        detail: null,
        reason: null,
        result: null,
      },
    ]
  });
  uniqueTimestamp: any = '';
  isNotFound = false;

  studentDetail = this.fb.group({
    id: [],
    prefixth: [],
    firstnameth: [],
    lastnameth: [],
    prefixen: [],
    firstnameen: [],
    lastnameen: [],
    nationality: [],
    idcardno: [],
    passportno: [],
    email: [],
    phone: [],
  });
  prefixList: Array<any> = [];
  nationalityList: Array<any> = [];
  choices = [
    { name: 'อนุมัติ', value: 2 },
    { name: 'ไม่อนุมัติ', value: 3 },
  ];

  uploadFileList: FileGroup[] = [
    {
      name: 'สำเนาหนังสือสำคัญการเปลี่ยนชื่อ / ชื่อสกุล / เปลี่ยนหรือเพิ่มคำนำหน้าชื่อ',
      files: [],
    },
    {
      name: 'สำเนาหลักฐานการสมรส หรือการสิ้นสุดการสมรส (ถ้ามี)',
      files: [],
    },
    {
      name: 'สำเนาหนังสือรับรองการใช้คำหน้านามหญิง (ถ้ามี)',
      files: [],
    },
  ] as FileGroup[];
  data = false;
  pageType = RequestPageType;
  requesttype = 8;
  requestid = '';
  systemtype: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private fb: FormBuilder,
    private uniInfoService: UniInfoService,
    private generalInfoService: GeneralInfoService,
    private requestService: EUniService
  ) {}

  ngOnInit() {
    this.uniqueTimestamp = uuidv4();
    this.studentDetail.disable();
    this.generalInfoService.getPrefix().subscribe((res: any) => { this.prefixList = res; });
    this.generalInfoService.getNationality().subscribe((res: any) => { this.nationalityList = res; });
    this.route.paramMap.subscribe((res) => {
      this.requestid = res.get('id') || '';
    });
    this.getRequestById();
  }

  getRequestById() {
    this.requestService
      .getRequestEditAdmissionById({id: this.requestid})
      .subscribe((response: any) => {
        if (response) {
          this.requestDate = thaiDate(new Date(response.requestdata));
          this.requestNo = response.requestno;
          this.requestid = response.id;
          this.systemtype = response.systemtype;
          const requestdata = parseJson(response.admissionlist);
          this.studentDetail.patchValue(requestdata.studentdetail);
          this.uploadFileList = JSON.parse(requestdata.files);
          this.formData.controls.editStudent.patchValue(requestdata.editform)
        } else {
          this.data = false;
          this.isNotFound = true;
          this.oldValue = [];
          this.studentDetail.reset();
        }
      });
  }

  clearData() {
    this.data = false;
    this.isNotFound = false;
    this.formSearch.reset();
  }

  cancel() {
    this.router.navigate(['/', 'degree-cert', 'edit-student-list']);
  }

  save() {
    const confirmDialog = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: {
        title: `คุณต้องการยืนยันข้อมูลใช่หรือไม่? `,
        subTitle: `คุณยืนยันข้อมูลและส่งเรื่องเพื่อขอนุมัติ
        ใช่หรือไม่`,
        btnLabel: 'ยืนยัน',
      },
    });

    confirmDialog.componentInstance.confirmed
      .pipe(
        switchMap((res) => {
          if (res) {
            const verifyform = this.formData.controls.verify.value as any;
            const payloadKspUpdate = {
              requestid: this.requestid,
              process: '2',
              status: verifyform.result,
              detail: verifyform.detail,
              systemtype: this.systemtype,
              userid: getCookie('userId'),
            };
            this.requestService
            .requestProcessInsert(payloadKspUpdate)
            .subscribe((response: any) => {
              if (verifyform.result == "2") {
                this.updateAdmission();
              } else {
                this.onCompleted(this.requestNo);
                return;
              }
            });
          }
          return EMPTY;
        })
      )
      .subscribe((res) => {
        console.log(res)
        if (res) {
          this.onCompleted(this.requestNo);
        }
      });
  }

  updateAdmission() {
    const studentdata = this.studentDetail.value;
    const editdetail = this.formData.controls.editStudent.value as any;
    const payloadUpdateData = {
      id: studentdata.id,
      prefixth: editdetail.prefixTh ? editdetail.prefixTh : editdetail.oldPrefixTh,
      prefixen: editdetail.prefixEn ? editdetail.prefixEn : editdetail.oldPrefixEn,
      firstnameth: editdetail.firstnameTh ? editdetail.firstnameTh : editdetail.oldFirstnameTh,
      firstnameen: editdetail.firstnameEn ? editdetail.firstnameEn : editdetail.oldFirstnameEn,
      lastnameth: editdetail.lastnameTh ? editdetail.lastnameTh : editdetail.oldLastnameTh,
      lastnameen: editdetail.lastnameEn ? editdetail.lastnameEn : editdetail.oldLastnameEn,
      passportno: editdetail.passportNo ? editdetail.passportNo : editdetail.oldPassportNo
    }
    this.requestService.updateAdmission(payloadUpdateData).subscribe((res: any) => {
      this.onCompleted(this.requestNo);
    });
  }

  onCompleted(requestno: string) {
    const completeDialog = this.dialog.open(CompleteDialogComponent, {
      width: '350px',
      data: {
        header: `บันทึกข้อมูลสำเร็จ`,
      },
    });

    completeDialog.componentInstance.completed.subscribe((res) => {
      if (res) {
        this.cancel();
      }
    });
  }
}
