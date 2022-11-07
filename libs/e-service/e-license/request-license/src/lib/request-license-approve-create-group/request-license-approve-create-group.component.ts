import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import {
  CompleteDialogComponent,
  ConfirmDialogComponent,
} from '@ksp/shared/dialog';

@Component({
  selector: 'ksp-request-license-approve-create-group',
  templateUrl: './request-license-approve-create-group.component.html',
  styleUrls: ['./request-license-approve-create-group.component.scss'],
})
export class RequestLicenseApproveCreateGroupComponent implements OnInit {
  displayedColumns2 = [
    'check',
    'order',
    'urgent',
    'licenseNo',
    'licenseType',
    'licenseGroup',
    'idCardNo',
    'name',
    'approveDate',
    'requestDate',
  ];
  dataSource2 = new MatTableDataSource<any>();
  licenseData: any;

  constructor(private router: Router, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.licenseData = [
      {
        order: 1,
        licenseType: 'ครู',
        count: 0,
      },
      {
        order: 2,
        licenseType: 'ครูชาวต่างชาติ',
        count: 0,
      },
      {
        order: 3,
        licenseType: 'ผู้บริหารสถานศึกษา',
        count: 1,
      },
      {
        order: 4,
        licenseType: 'ผู้บริหารการศึกษา',
        count: 0,
      },
      {
        order: 5,
        licenseType: 'ศึกษานิเทศก์',
        count: 0,
      },
    ];

    this.dataSource2.data = [
      {
        check: true,
        order: 1,
        urgent: true,
        licenseNo: '1234567890123',
        licenseType: 'ครู',
        licenseGroup: 'กลุ่ม 1',
        idCardNo: '1234567890123',
        name: 'นาย สมชาย สมบัติ',
        approveDate: '01/01/2564',
        requestDate: '01/01/2564',
      },
      {
        check: true,
        order: 2,
        urgent: true,
        licenseNo: '1234567890123',
        licenseType: 'ครู',
        licenseGroup: 'กลุ่ม 1',
        idCardNo: '1234567890123',
        name: 'นาย สมชาย สมบัติ',
        approveDate: '01/01/2564',
        requestDate: '01/01/2564',
      },
    ];
  }

  prev() {
    this.router.navigate(['/request-license', 'search-list']);
    //this.router.navigate(['/request-license', 'create-group-list']);
  }

  confirmDialog() {
    const dialog = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: `คุณต้องการยืนยันข้อมูล
        ใช่หรือไม่? `,
      },
    });

    dialog.componentInstance.confirmed.subscribe((res) => {
      if (res) {
        this.completeDialog();
      }
    });
  }

  completeDialog() {
    const dialog = this.dialog.open(CompleteDialogComponent, {
      data: {
        header: `บันทึกข้อมูลสำเร็จ`,
      },
    });

    dialog.componentInstance.completed.subscribe((res) => {
      if (res) {
        this.router.navigate(['/request-license', 'search-list']);
      }
    });
  }
}