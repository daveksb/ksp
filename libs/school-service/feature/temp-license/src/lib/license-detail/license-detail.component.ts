import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ForbiddenPropertyComponent } from '@ksp/school-service/ui/dialog';
import {
  CompleteDialogComponent,
  ConfirmDialogComponent,
} from '@ksp/shared/ui/dialog';

@Component({
  selector: 'school-service-license-detail',
  templateUrl: './license-detail.component.html',
  styleUrls: ['./license-detail.component.scss'],
})
export class LicenseDetailComponent implements OnInit {
  requestTypeLabel = '';
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.updateHeaderLabel();
  }

  updateHeaderLabel() {
    this.route.queryParams.subscribe((params) => {
      //console.log('params[type] = ', params['type']);
      if (params['type'] == 1) {
        this.requestTypeLabel = '(ชาวไทย)';
      } else if (params['type'] == 2) {
        this.requestTypeLabel = '(ผู้บริหารการศึกษา)';
      } else if (params['type'] == 3) {
        this.requestTypeLabel = '(ชาวต่างชาติ)';
      }
    });
  }

  back() {
    this.router.navigate(['/', 'temp-license', 'list']);
  }

  next() {
    const dialogRef = this.dialog.open(ForbiddenPropertyComponent, {
      height: '475px',
      width: '850px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });

    dialogRef.componentInstance.confirmed.subscribe((res) => {
      if (res) {
        this.onConfirmed();
      }
    });
  }

  onConfirmed() {
    const confirmDialog = this.dialog.open(ConfirmDialogComponent, {
      height: '200px',
      width: '350px',
      data: {
        title: `คุณต้องการยืนยันข้อมูลใช่หรือไม่? `,
        subTitle: `คุณยืนยันข้อมูลและส่งเรื่องเพื่อขออนุมัติ
        ใช่หรือไม่`,
      },
    });

    confirmDialog.componentInstance.confirmed.subscribe((res) => {
      if (res) {
        this.onCompleted();
      }
    });
  }

  onCompleted() {
    const completeDialog = this.dialog.open(CompleteDialogComponent, {
      height: '250px',
      width: '350px',
      data: {
        header: `ระบบทำการบันทึกเรียบร้อยแล้ว
        สามารถตรวจสอบสถานะภายใน
        3 - 15 วันทำการ`,

        buttonLabel: 'กลับสู่หน้าหลัก',
      },
    });

    completeDialog.componentInstance.completed.subscribe((res) => {
      if (res) {
        this.router.navigate(['/', 'temp-license', 'list']);
      }
    });
  }
}
