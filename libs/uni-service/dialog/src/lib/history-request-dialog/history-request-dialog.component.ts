import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { stringToThaiDate } from '@ksp/shared/utility';
@Component({
  selector: 'uni-service-history-request-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule],
  templateUrl: './history-request-dialog.component.html',
  styleUrls: ['./history-request-dialog.component.scss'],
})
export class HistoryRequestDialogComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public dataSource: any) {}

  ngOnInit(): void {
    console.log(this.dataSource);
  }
  toDateTh(date: any) {
    try {
      return stringToThaiDate(date);
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
}
