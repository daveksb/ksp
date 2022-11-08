import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'ksp-request-license-approve-search-list',
  templateUrl: './request-license-approve-search-list.component.html',
  styleUrls: ['./request-license-approve-search-list.component.scss'],
})
export class RequestLicenseApproveSearchListComponent implements OnInit {
  displayedColumns = [
    'select',
    'resolution',
    'resolution2',
    'group',
    'account',
    'count',
    'licenseType',
    'licenseGroup',
    'process',
    'status',
    'screenDate',
    'guaranteeDate',
  ];
  dataSource = new MatTableDataSource<any>();
  mode: 'create' | 'guarantee' = 'create';

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.dataSource.data = [
      {
        select: true,
        resolution: '01/2564',
        resolution2: '01/2564',

        group: '1',
        account: '7020',
        count: 100,
        licenseType: 'ครู',
        licenseGroup: 'ชาวไทย',
        process: 'จัดทำกลุ่มบัญชีรายชื่อ',
        status: 'ระหว่างดำเนินการ',
        screenDate: '01 มิ.ย. 2564',
        guaranteeDate: '01 มิ.ย. 2564',
      },
      {
        select: true,
        resolution: '01/2564',
        resolution2: '01/2564',

        group: '2',
        account: '7020',
        count: 100,
        licenseType: 'ผู้บริหารสถานศึกษา',
        licenseGroup: 'ชาวไทย',
        process: 'จัดทำกลุ่มบัญชีรายชื่อ',
        status: 'เรียบร้อยแล้ว',
        screenDate: '01 มิ.ย. 2564',
        guaranteeDate: '01 มิ.ย. 2564',
      },
    ];

    this.route.url.subscribe((url) => {
      if (url[0].path === 'guarantee') {
        this.mode = 'guarantee';
      }
    });
  }

  editGroup() {
    this.router.navigate(['/request-license', 'create-group-list']);
  }

  createGroup() {
    this.router.navigate(['/request-license', 'create-group']);
  }

  kmv() {
    this.router.navigate(['/request-license', 'kmv']);
  }

  guarantee() {
    this.router.navigate(['/request-license', 'guarantee-confirm']);
  }

  print() {
    this.router.navigate(['/request-license', 'print']);
  }

  saveResult() {
    this.router.navigate(['/request-license', 'save-result']);
  }
}
