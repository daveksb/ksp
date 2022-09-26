import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

@Component({
  selector: 'ksp-request-license-approve-list',
  templateUrl: './request-license-approve-list.component.html',
  styleUrls: ['./request-license-approve-list.component.scss'],
})
export class RequestLicenseApproveListComponent implements OnInit {
  displayedColumns: string[] = column;
  dataSource = new MatTableDataSource<any>();

  constructor(private router: Router) {}

  ngOnInit(): void {}

  view() {
    this.router.navigate(['/request-license', 'approve-detail']);
  }

  search() {
    this.dataSource.data = data;
  }

  clear() {
    this.dataSource.data = [];
  }
}

export const column = ['id', 'name', 'view'];

export interface PersonLicense {
  id: number;
  name: string;
  licenseType: string;
}

export const data: PersonLicense[] = [
  {
    id: 1,
    name: 'ครู',
    licenseType: 'license',
  },
  {
    id: 2,
    name: 'บริหารสถานศึกษา',
    licenseType: 'renew-license',
  },
  {
    id: 3,
    name: 'บริหารการศึกษา',
    licenseType: 'edit-license',
  },
  {
    id: 4,
    name: 'ศึกษานิเทศก์',
    licenseType: 'sub-license',
  },
  {
    id: 5,
    name: 'ชาวต่างชาติ',
    licenseType: 'knowledge-cert',
  },
];
