import { Component, Input, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'ksp-request-license-approve-license-table',
  templateUrl: './request-license-approve-license-table.component.html',
  styleUrls: ['./request-license-approve-license-table.component.scss'],
})
export class RequestLicenseApproveLicenseTableComponent implements OnInit {
  @Input() data = [
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
      licenseType: 'KSP Bundit',
      count: 1,
    },
    {
      order: 4,
      licenseType: 'ผู้บริหารสถานศึกษา',
      count: 1,
    },
    {
      order: 5,
      licenseType: 'ผู้บริหารการศึกษา',
      count: 0,
    },
    {
      order: 6,
      licenseType: 'ศึกษานิเทศก์',
      count: 0,
    },
  ];
  displayedColumns = ['order', 'licenseType', 'count'];
  dataSource = new MatTableDataSource<any>();

  constructor() {}

  ngOnInit(): void {
    this.dataSource.data = this.data;
  }
}
