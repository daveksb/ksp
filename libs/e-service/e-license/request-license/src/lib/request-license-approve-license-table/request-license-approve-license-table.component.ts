import { Component, Input, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'ksp-request-license-approve-license-table',
  templateUrl: './request-license-approve-license-table.component.html',
  styleUrls: ['./request-license-approve-license-table.component.scss'],
})
export class RequestLicenseApproveLicenseTableComponent implements OnInit {
  @Input() data: any;
  displayedColumns = ['order', 'licenseType', 'count'];
  dataSource = new MatTableDataSource<any>();

  constructor() {}

  ngOnInit(): void {
    this.dataSource.data = this.data;
  }
}
