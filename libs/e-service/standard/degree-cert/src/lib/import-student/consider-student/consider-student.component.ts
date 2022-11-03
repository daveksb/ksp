import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ConfirmDialogComponent } from '@ksp/shared/dialog';
import { EUniService } from '@ksp/shared/service';
import { formatDate, getCookie, parseJson, thaiDate } from '@ksp/shared/utility';
import localForage from 'localforage';
import { Location } from '@angular/common'

@Component({
  selector: 'e-service-consider-student',
  templateUrl: './consider-student.component.html',
  styleUrls: ['./consider-student.component.scss'],
})
export class ConsiderStudentComponent implements OnInit {
  form = this.fb.group({
    result: [''],
    returndate: [''],
    nextprocess: ['']
  });
  payload: any;
  requestdate= null;
  requestno= '';
  historylist: Array<any> = [];

  choices = [
    'รับรอง',
    'ไม่รับรอง',
    'ให้สถาบันแก้ไข / เพิ่มเติม',
    'ส่งคืนหลักสูตร',
    'ยกเลิกการรับรอง',
  ];

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private fb: FormBuilder,
    private requestService: EUniService,
    private location: Location
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
          payloaddetail: res.payload
        };
        this.requestdate = res.requestdate;
        this.requestno = res.requestno;
        if (this.payload.total > this.payload.studentlist.length) {
          this.form.patchValue({
            result: '2'
          })
          this.form.controls['result'].disable();
          this.form.controls['nextprocess'].disable();
          this.form.controls['returndate'].enable();
        }
      } else {
        this.form.patchValue({
          result: '2'
        })
        this.form.controls['result'].disable();
        this.form.controls['nextprocess'].disable();
        this.form.controls['returndate'].enable();
      }
      this.getProcessHistory();  
    });    
  }

  getProcessHistory() {
    this.requestService
      .getProcessHistory({ requestid: this.payload.requestid }).subscribe((res:any)=>{
        if (res.datareturn) {
          this.historylist = res.datareturn.map((data: any)=>{
            data.createdate = thaiDate(new Date(data?.createdate))
            data.updatedate = data?.updatedate ? thaiDate(new Date(data?.updatedate)) : ''
            return data;
          });
        }
      });
  }

  cancel() {
    this.router.navigate(['./', 'degree-cert', 'list', '2']);
  }

  prevPage() {
    this.location.back()
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
          this.payload.status = '2'
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

        this.payload.detail = JSON.stringify({ returndate: this.form.value.returndate || null });
        const realpayload = {
          requestid: this.payload.requestid,
          process: process,
          status: status,
          detail: this.payload.detail,
          systemtype: this.payload.systemtype,
          userid: this.payload.userid,
        }
        this.requestService.requestProcessInsert(realpayload).subscribe((response: any)=>{
          if (response) {
            if (this.form.value.result == '1' 
                && this.payload.pagetype == 'admissionList'
                && this.payload.studentlist.length) {
                  this.payload.studentlist.forEach((student:any) => {
                    student.addressinfo = JSON.stringify(student.address);
                    student.subjects = JSON.stringify(student.subjects);
                    student.unidegreecertid = this.payload.payloaddetail.unidegreecertid;
                    student.unirequestadmissionid = this.payload.payloaddetail.id;
                    student.planyear = this.payload.payloaddetail.planyear.toString();
                    student.plancalendaryear = this.payload.payloaddetail.plancalendaryear;
                    student.planname = this.payload.payloaddetail.planname;
                    const date1 = new Date().toISOString();
                    const date2 = new Date(student.birthdate).toISOString();
                    const date3 = new Date(student.admissiondate).toISOString();
                    student.approvedate = date1.split('.')[0];
                    student.birthdate = date2.split('.')[0];
                    student.admissiondate = date3.split('.')[0];
                    if (!student.approveno) student.approveno = null;
                    if (!student.graduationdate) student.graduationdate = null;
                    delete student.middlenameen;
                    delete student.address;
                    delete student.checked;
                    delete student.index;
                    delete student.no;
                    this.requestService.insertStudent(student).subscribe((res: any) => {
                      console.log('done')
                    });
                  });
            }
          }
        })
        this.router.navigate(['/', 'degree-cert', 'list-approved']);
      }
    });
  }

  changeprocess(event: any) {
    const process = event.target.value;
    if (process == '2') {
      this.form.patchValue({
        result: '2'
      });
      this.form.controls['returndate'].enable();
    } else {
      this.form.patchValue({
        returndate: ''
      });
      this.form.controls['returndate'].disable();
    }
  }
}
