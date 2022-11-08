import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import {
  CompleteDialogComponent,
  ConfirmDialogComponent,
} from '@ksp/shared/dialog';
import { ERequestService } from '@ksp/shared/service';
import { getCookie } from '@ksp/shared/utility';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
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
  listNo!: number;

  form = this.fb.group({
    createNumber: [false],
  });

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private requestService: ERequestService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.requestService.getLastApproveList().subscribe((res) => {
      this.listNo = +res.listno + 1;
    });

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
        const payload = {
          listno: this.listNo.toString(),
          isurgent: this.form.controls.createNumber.value ? '1' : '2',
          requestlist: "{'field1':'data1','field2':'data2','field3':'data3'}",
          userid: `${getCookie('userId')}`,
        };
        this.requestService.createAprroveList(payload).subscribe((res) => {
          if (res?.status === 'success') {
            this.completeDialog();
          }
        });
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
