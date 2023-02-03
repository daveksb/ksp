import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { stringToThaiDate, thaiDate } from '@ksp/shared/utility';

@Component({
  selector: 'uni-service-print-request-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule],
  templateUrl: './print-request-dialog.component.html',
  styleUrls: ['./print-request-dialog.component.scss'],
})
export class PrintRequestDialogComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public dataSource: any) {}

  ngOnInit(): void {
    console.log(this.dataSource);
  }

  toDateTh(date: any) {
    try {
      return thaiDate(new Date(date));
    } catch (error) {
      return "-"
    }
  }
}
