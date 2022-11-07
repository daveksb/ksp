import { Component, Input, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'ksp-request-license-approve-license-table',
  templateUrl: './request-license-approve-license-table.component.html',
  styleUrls: ['./request-license-approve-license-table.component.scss'],
})
export class RequestLicenseApproveLicenseTableComponent implements OnInit {
  @Input() isKmv = false;
  @Input() data = [
    {
      order: 1,
      licenseType: 'ครู',
      count: 0,
      approve: 10,
      unApprove: 0,
      urgent: 1,
    },
    {
      order: 2,
      licenseType: 'ครูชาวต่างชาติ',
      count: 0,
      approve: 0,
      unApprove: 0,
      urgent: 0,
    },
    {
      order: 3,
      licenseType: 'KSP Bundit',
      count: 1,
      approve: 67,
      unApprove: 0,
      urgent: 0,
    },
    {
      order: 4,
      licenseType: 'ผู้บริหารสถานศึกษา',
      count: 1,
      approve: 22,
      unApprove: 0,
      urgent: 1,
    },
    {
      order: 5,
      licenseType: 'ผู้บริหารการศึกษา',
      count: 0,
      approve: 0,
      unApprove: 1,
      urgent: 0,
    },
    {
      order: 6,
      licenseType: 'ศึกษานิเทศก์',
      count: 0,
      approve: 1,
      unApprove: 0,
      urgent: 0,
    },
  ];
  displayedColumns: string[] = [];
  dataSource = new MatTableDataSource<any>();

  constructor() {}

  ngOnInit(): void {
    this.dataSource.data = this.data;
    this.isKmv
      ? (this.displayedColumns = [
          'order',
          'licenseType',
          'count',
          'viewDetail',
          'approve',
          'unApprove',
          'urgent',
        ])
      : (this.displayedColumns = ['order', 'licenseType', 'count']);
  }
}
