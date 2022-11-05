import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import {
  CompleteDialogComponent,
  ConfirmDialogComponent,
} from '@ksp/shared/dialog';

@Component({
  selector: 'ksp-request-license-approve-guaruntee',
  templateUrl: './request-license-approve-guaruntee.component.html',
  styleUrls: ['./request-license-approve-guaruntee.component.scss'],
})
export class RequestLicenseApproveGuarunteeComponent implements OnInit {
  displayedColumns = [
    'select',
    'order',
    'idCardNo',
    'name',
    'educationLevel',
    'experience',
    'prohibitType',
    'urgent',
    'payDate',
    'requestDate',
    'licenseNo',
  ];
  dataSource = new MatTableDataSource<any>();

  constructor(private dialog: MatDialog, private router: Router) {}

  ngOnInit(): void {
    this.dataSource.data = [
      {
        select: true,
        order: 1,
        idCardNo: '3-6406-00004-00-1',
        name: 'นายสมชาย สมบัติ',
        educationLevel: 'ศิลปศาสตร์บัณฑิต',
        experience: true,
        prohibitType: 'รับรอง',
        urgent: true,
        payDate: '01 มิ.ย. 2564',
        requestDate: '01 มิ.ย. 2564',
        licenseNo: 'SF_TR640600004',
      },
      {
        select: true,
        order: 2,
        idCardNo: '3-6406-00004-00-1',
        name: 'นางสาวพรทิพย์ นาคปรก',
        educationLevel: 'วิทยาศาสตร์บัณฑิต',
        experience: true,
        prohibitType: 'รับรอง',
        urgent: true,
        payDate: '01 มิ.ย. 2564',

        requestDate: '01 มิ.ย. 2564',
        licenseNo: 'SF_TR640600004',
      },
    ];
  }

  confirmDialog() {
    const dialog = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: `คุณยืนยันบัญชีรายชื่อเพื่อออกใบอนุญาตประกอบวิชาชีพใช่หรือไม่? `,
        btnLabel: `ยืนยัน`,
        // cancelBtnLabel: 'ไม่ใช่',
      },
    });

    dialog.componentInstance.confirmed.subscribe((res) => {
      if (res) {
        this.router.navigate(['/request-license', 'guarantee']);
      }
    });
  }
}
