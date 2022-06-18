import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ConfirmDialogComponent } from '@ksp/shared/ui/dialog';

@Component({
  selector: 'e-service-consider',
  templateUrl: './consider.component.html',
  styleUrls: ['./consider.component.scss'],
})
export class ConsiderComponent {
  choices = [
    'เห็นควรพิจารณาให้การรับรอง',
    'เห็นควรพิจารณาไม่ให้การรับรอง',
    'ให้สถาบันแก้ไข / เพิ่มเติม',
    'ส่งคืนหลักสูตร',
  ];
  constructor(public dialog: MatDialog, private router: Router) {}

  cancel() {
    this.router.navigate(['./', 'degree-cert', 'list', '2']);
  }

  prevPage() {
    this.router.navigate(['./', 'degree-cert', 'verify', '2']);
  }

  save() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: {
        title: `คุณต้องการยืนยันข้อมูลใช่หรือไม่? `,
        subTitle: `คุณยืนยันข้อมูลผลการพิจารณาหลักสูตร
        ใช่หรือไม่`,
      },
    });

    dialogRef.componentInstance.confirmed.subscribe((res) => {
      if (res) {
        this.router.navigate(['/', 'degree-cert', 'list', '2']);
      }
    });
  }
}
