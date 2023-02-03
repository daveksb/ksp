import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { RequestPageType } from '@ksp/shared/constant';
import { FileGroup } from '@ksp/shared/interface';
import {
  CompleteDialogComponent,
  ConfirmDialogComponent,
} from '@ksp/shared/dialog';
import {
  GeneralInfoService,
  UniInfoService,
  UniRequestService,
} from '@ksp/shared/service';
import { getCookie, mapMultiFileInfo, thaiDate } from '@ksp/shared/utility';
import { EMPTY, Observable, switchMap } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'ksp-edit-student-detail',
  templateUrl: './edit-student-detail.component.html',
  styleUrls: ['./edit-student-detail.component.scss'],
})
export class EditStudentDetailComponent implements OnInit {
  requestDate = thaiDate(new Date());
  requestNo = '';
  formSearch = this.fb.group({
    idcardno: [],
    firstname: [],
    lastname: [],
  });
  oldValue: any;
  formData = this.fb.group({
    editStudent: [],
  });
  uniqueTimestamp: any = '';
  isNotFound = false;

  studentDetail = this.fb.group({
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
  prefixList$!: Observable<any>;
  nationalityList$!: Observable<any>;

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

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private fb: FormBuilder,
    private uniInfoService: UniInfoService,
    private generalInfoService: GeneralInfoService,
    private requestService: UniRequestService
  ) {}

  ngOnInit(): void {
    this.uniqueTimestamp = uuidv4();
    this.studentDetail.disable();
    this.prefixList$ = this.generalInfoService.getPrefix();
    this.nationalityList$ = this.generalInfoService.getNationality();
  }

  searchData() {
    const getForm = this.formSearch.value;
    if (getForm.idcardno || getForm.firstname || getForm.lastname) {
      const payload = {
        idcardno: this.formSearch.controls.idcardno.value,
        firstname: this.formSearch.controls.firstname.value,
        lastname: this.formSearch.controls.lastname.value,
        offset: 0,
        row: 10,
      };
      this.uniInfoService
        .uniAdmissionSearch2(payload)
        .subscribe((response: any) => {
          if (response.datareturn) {
            this.data = true;
            this.oldValue = response.datareturn[0];
            this.studentDetail.patchValue(response.datareturn[0]);
          } else {
            this.data = false;
            this.isNotFound = true;
            this.oldValue = [];
            this.studentDetail.reset();
          }
        });
    }
  }

  clearData() {
    this.data = false;
    this.isNotFound = false;
    this.formSearch.reset();
  }

  cancel() {
    this.router.navigate(['/', 'edit-student-list', 'list']);
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
            const userId = Number(getCookie('userId'));
            const file = mapMultiFileInfo(this.uploadFileList);
            const payload = {
              id: null,
              requestprocess: '2',
              requeststatus: '1',
              requesttype: '08',
              uniuserid: userId,
              systemtype: '3',
              subtype: '5',
              unidegreecertid: this.oldValue.unidegreecertid,
              unirequestadmissionid: this.oldValue.unirequestadmissionid,
              unirequestdegreecertid: this.oldValue.unidegreecertid,
              degreeapprovecode: this.oldValue.degreeapprovecode,
              planyear: this.oldValue.planyear,
              plancalendaryear: this.oldValue.plancalendaryear,
              planname: this.oldValue.planname,
              plantotalno: this.oldValue.plantotalno,
              ref1: '3',
              ref2: '08',
              ref3: '5',
              admissionlist: '',
              fileinfo: JSON.stringify({ file }),
            };
            const admissionlist = [];
            let formsave = {};
            const editStudent = this.formData.value.editStudent as any;
            const studentform = this.studentDetail.value as object;
            formsave = {
              ...editStudent,
              ...studentform,
            };
            admissionlist.push(formsave);
            payload.admissionlist = JSON.stringify(admissionlist);
            return this.requestService.createRequestAdmission(payload);
          }
          return EMPTY;
        })
      )
      .subscribe((res) => {
        if (res) {
          this.onCompleted(res?.requestno);
        }
      });
  }

  onCompleted(requestno: string) {
    const completeDialog = this.dialog.open(CompleteDialogComponent, {
      width: '350px',
      data: {
        header: `ยืนยันข้อมูลสำเร็จ`,
        content: `วันที่ : ${this.requestDate}
        เลขที่แบบคำขอ : ${requestno}`,
        subContent: `กรุณาตรวจสอบสถานะแบบคำขอหรือรหัสเข้าใช้งาน
        ผ่านทางอีเมลผู้ที่ลงทะเบียนภายใน 3 วันทำการ`,
      },
    });

    completeDialog.componentInstance.completed.subscribe((res) => {
      if (res) {
        this.cancel();
      }
    });
  }
}
