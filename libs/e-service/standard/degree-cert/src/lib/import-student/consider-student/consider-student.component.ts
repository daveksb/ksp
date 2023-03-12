import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import {
  CompleteDialogComponent,
  ConfirmDialogComponent,
} from '@ksp/shared/dialog';
import { EUniService, LoaderService } from '@ksp/shared/service';
import {
  formatDate,
  getCookie,
  parseJson,
  replaceEmptyWithNull,
  thaiDate,
} from '@ksp/shared/utility';
import localForage from 'localforage';
import { Location } from '@angular/common';
import { Subject } from 'rxjs';

@Component({
  selector: 'e-service-consider-student',
  templateUrl: './consider-student.component.html',
  styleUrls: ['./consider-student.component.scss'],
})
export class ConsiderStudentComponent implements OnInit {
  form = this.fb.group({
    result: [''],
    returndate: [''],
    nextprocess: [''],
  });
  payload: any;
  requestdate = null;
  requestno = '';
  historylist: Array<any> = [];

  choices = [
    'รับรอง',
    'ไม่รับรอง',
    'ให้สถาบันแก้ไข / เพิ่มเติม',
    'ส่งคืนหลักสูตร',
    'ยกเลิกการรับรอง',
  ];
  isLoading: Subject<boolean> = this.loaderService.isLoading;

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private fb: FormBuilder,
    private requestService: EUniService,
    private location: Location,
    private loaderService: LoaderService
  ) {}

  ngOnInit(): void {
    localForage.getItem('studentform').then((res: any) => {
      if (res) {
        this.payload = {
          requestid: res.requestid,
          process: '2',
          status: '',
          detail: null,
          systemtype: '3',
          userid: getCookie('userId'),
          pagetype: res.pagetype,
          studentlist: res.studentlist,
          total: res.total,
          payloaddetail: res.payload,
          allstudent: res.allstudent
        };
        this.requestdate = res.requestdate;
        this.requestno = res.requestno;
        this.payload.studentlist.forEach((student: any) => {
          student.addressinfo = JSON.stringify(student.address);
          student.subjects = JSON.stringify(student.subjects);
          student.unidegreecertid = this.payload.payloaddetail.unidegreecertid;
          student.unirequestadmissionid = this.payload.payloaddetail.id;
          student.planyear = this.payload.payloaddetail.planyear.toString();
          student.plancalendaryear =
            this.payload.payloaddetail.plancalendaryear;
          student.planname = this.payload.payloaddetail.planname;
          if (student.admissiondate) {
            const convertdate = new Date(student.admissiondate).toISOString();
            student.admissiondate = convertdate.split('.')[0];
          } else {
            student.admissiondate = null;
          }
          if (student.graduationdate) {
            const convertdate = new Date(student.graduationdate).toISOString();
            student.graduationdate = convertdate.split('.')[0];
          } else {
            student.graduationdate = null;
          }
          if (student.approvedate) {
            const convertdate = new Date(student.approvedate).toISOString();
            student.approvedate = convertdate.split('.')[0];
          } else {
            student.approvedate = null;
          }
          if (student.birthdate) {
            const convertdate = new Date(student.birthdate).toISOString();
            student.birthdate = convertdate.split('.')[0];
          } else {
            student.birthdate = null;
          }
          if (!student.approveno) student.approveno = null;
          delete student.middlenameen;
          delete student.address;
          delete student.checked;
          delete student.index;
          delete student.no;
        });
        if (this.payload.total > this.payload.studentlist.length) {
          this.form.patchValue({
            result: '2',
          });
          this.form.controls['result'].disable();
          this.form.controls['nextprocess'].disable();
          this.form.controls['returndate'].enable();
        }
      } else {
        this.form.patchValue({
          result: '2',
        });
        this.form.controls['result'].disable();
        this.form.controls['nextprocess'].disable();
        this.form.controls['returndate'].enable();
      }
      this.getProcessHistory();
    });
  }

  getProcessHistory() {
    this.requestService
      .getProcessHistory({ requestid: this.payload.requestid })
      .subscribe((res: any) => {
        if (res.datareturn) {
          this.historylist = res.datareturn.filter((data: any) => {
            return data.process == '3';
          }).map((data: any) => {
            data.createdate = thaiDate(new Date(data?.createdate));
            data.updatedate = data?.updatedate
              ? thaiDate(new Date(data?.updatedate))
              : '';
            return data;
          });
        }
      });
  }

  cancel() {
    this.router.navigate(['./', 'degree-cert', 'list', '2']);
  }

  prevPage() {
    this.location.back();
  }

  save() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: {
        title: `คุณต้องการยืนยันข้อมูลใช่หรือไม่? `,
        subTitle: `คุณยืนยันข้อมูลผลการตรวจสอบรายชื่อผู้เข้าศึกษาใช่หรือไม่`,
      },
    });

    dialogRef.componentInstance.confirmed.subscribe((res) => {
      if (res) {
        if (this.payload.total > this.payload.studentlist.length) {
          this.payload.status = '2';
        }
        let status = '1';
        let process = '2';
        const formvalue = this.form.value;
        if (formvalue.result === '1') {
          //ครบถ้วน และถูกต้อง
          if (formvalue.nextprocess === '1') {
            //ส่งเรื่องพิจารณา
            process = '3';
            status = '3';
          } else if (formvalue.nextprocess === '2') {
            //ยกเลิก
            process = '3';
            status = '0';
          }
        } else if (formvalue.result === '2') {
          //ขอแก้ไข / เพิ่มเติม
          process = '3';
          status = '2';
        }
        if (this.payload.total > this.payload.studentlist.length) {
          process = '3';
          status = '2';
        }

        this.payload.detail = JSON.stringify({
          returndate: this.form.value.returndate || null,
        });
        const realpayload = {
          requestid: this.payload.requestid,
          process: process,
          status: status,
          detail: this.payload.detail,
          systemtype: this.payload.systemtype,
          userid: this.payload.userid,
        };
        this.requestService
          .requestProcessInsert(realpayload)
          .subscribe((response: any) => {
            this.payload.studentlist.map((student: any) => {
              student = replaceEmptyWithNull(student);
              return student;
            })
            if (response) {
              if (
                this.form.value.result == '1' &&
                this.payload.pagetype == 'admissionList' &&
                this.payload.studentlist.length
              ) {
                this.requestService
                  .insertStudent({ data: this.payload.studentlist })
                  .subscribe((res: any) => {
                    this.onConfirmed();
                  });
              } else if (
                this.form.value.result == '1' &&
                this.payload.pagetype == 'graduateList' &&
                this.payload.studentlist.length
              ) {
                this.requestService
                  .updateStudent({ data: this.payload.studentlist })
                  .subscribe((res: any) => {
                    this.onConfirmed();
                  });
              } else {
                this.payloadUpdate();
                // this.onConfirmed();
              }
            }
          });
      }
    });
  }

  payloadUpdate() {
    const realpayload = {...this.payload.payloaddetail};
    console.log(realpayload)
    this.payload.allstudent.forEach((data : any)=>{
      if (data.checked) {
        data.passdata = true;
      }
    })
    if (this.payload.pagetype == 'admissionList') {
      const convertadmission = this.payload.allstudent.map((data: any) => {
        delete data.index;
        data.address = JSON.stringify(data.address.addressInfo);
        data.subjects = JSON.stringify(data.subjects);
        return data;
      });
      realpayload.admissionlist = JSON.stringify(convertadmission);
    } else {
      const convertgraduate = this.payload.allstudent.map((data: any) => {
        data.address = JSON.stringify(data.address.addressInfo);
        data.subjects = JSON.stringify(data.subjects);
        data.teachingpracticeschool = JSON.stringify(
          data.teachingpracticeschool
        );
        return data;
      });
      realpayload.graduatelist = JSON.stringify(convertgraduate);
    }
    console.log(realpayload, this.payload)
    this.requestService
      .updateRequestAdmission(replaceEmptyWithNull(realpayload))
      .subscribe((res: any) => {
        this.onConfirmed();
      });
  }

  onConfirmed() {
    const completeDialog = this.dialog.open(CompleteDialogComponent, {
      width: '350px',
      data: {
        header: 'บันทึกข้อมูลสำเร็จ',
      },
    });

    completeDialog.componentInstance.completed.subscribe((res) => {
      if (res) {
        this.router.navigate(['/', 'degree-cert', 'list-approved']);
      }
    });
  }

  changeprocess(event: any) {
    const process = event.target.value;
    if (process == '2') {
      this.form.patchValue({
        result: '2',
      });
      this.form.controls['returndate'].enable();
    } else {
      this.form.patchValue({
        returndate: '',
      });
      this.form.controls['returndate'].disable();
    }
  }
}
