import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ConfirmDialogComponent } from '@ksp/shared/dialog';
import { EUniService } from '@ksp/shared/service';
import { getCookie, thaiDate } from '@ksp/shared/utility';
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
    returndate: [{value: '', disabled: true}],
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
          total: res.total
        };
        this.requestdate = res.requestdate;
        this.requestno = res.requestno;
        if (this.payload.total > this.payload.studentlist.length) {
          this.form.patchValue({
            result: '2'
          })
          this.form.controls['result'].disable();
          this.form.controls['returndate'].enable();
        }
      } else {
        this.form.patchValue({
          result: '2'
        })
        this.form.controls['result'].disable();
        this.form.controls['returndate'].enable();
      }
      this.getProcessHistory();  
    });    
  }

  getProcessHistory() {
    this.requestService
      .getProcessHistory({ requestid: this.payload.requestid }).subscribe((res:any)=>{
        if (res) {
          console.log(res);
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
        this.payload.detail = { returndate: this.form.value.returndate };
        const realpayload = {
          requestid: this.payload.requestid,
          process: this.payload.process,
          status: this.payload.status,
          detail: this.payload.detail,
          systemtype: this.payload.systemtype,
          userid: this.payload.userid,
        }
        this.requestService.requestProcessInsert(realpayload).subscribe((response: any)=>{
          if (response) {
            if (this.form.value.result == '3' 
                && this.payload.pagetype == 'admissionList'
                && this.payload.studentlist.length) {
              this.payload.studentlist.forEach((student:any) => {
                this.requestService.requestProcessInsert(student);
              });
            }
          }
        })
        this.router.navigate(['/', 'degree-cert']);
      }
    });
  }

  
}
