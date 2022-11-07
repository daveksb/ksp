import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { stringToThaiDate, thaiDate } from '@ksp/shared/utility';
@Component({
  selector: 'uni-service-history-request-admission-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule],
  templateUrl: './history-request-admission-dialog.component.html',
  styleUrls: ['./history-request-admission-dialog.component.scss'],
})
export class HistoryRequestAdmissionDialogComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public dataSource: any) {}

  ngOnInit(): void {
    this.dataSource.data.map((data:any)=>{
      if (this.dataSource.system == 'uniservice') {
        data.statusname = this.mapStatusUniserviceProcess(data.requeststatus, data.requestprocess);
      } else {
        data.statusname = this.mapStatusEServiceProcess(data.requeststatus, data.requestprocess);
      }
      return data;
    })
  }
  toDateTh(date: any) {
    try {
      return thaiDate(new Date(date));
    } catch (error) {
      return "-"
    }
   
  }
  otStatus(data: any) {
    const status: any = {
      '1': 'ยื่น',
      '2': 'รับข้อมูล',
    };

    return data ? status[data] : '-';
  }

  mapStatusUniserviceProcess(status: string, process: string) {
    if (status == '1' && process == '1') {
      return 'สร้าง';
    } else if (process == '2' && status == '1') {
      return 'ยื่นเรียบร้อย';
    } else if (process == '3' && status == '0') {
      return 'ส่งคืนและยกเลิก';
    } else if (process == '3' && status == '2') {
      return 'แก้ไข';
    } else if (process == '3' && status == '3') {
      return 'รับข้อมูล';
    } else {
      return '';
    }
  }

  mapStatusEServiceProcess(status: string, process: string) {
    if (process == '2' && status == '1') {
      return 'รอตรวจสอบ';
    } else if (process == '3' && status == '0') {
      return 'ส่งคืนและยกเลิก';
    } else if (process == '3' && status == '2') {
      return 'แก้ไข';
    } else if (process == '3' && status == '3') {
      return 'ตรวจสอบเรียบร้อย';
    } else {
      return '';
    }
  }
}
