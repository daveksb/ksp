import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

@Component({
  selector: 'ksp-create-license-id-list',
  templateUrl: './create-license-id-list.component.html',
  styleUrls: ['./create-license-id-list.component.scss'],
})
export class CreateLicenseIdListComponent {
  displayedColumns: string[] = column;
  dataSource = new MatTableDataSource<info>();

  constructor(private router: Router) {}

  search() {
    this.dataSource.data = data;
  }

  clear() {
    this.dataSource.data = [];
  }

  create() {
    this.router.navigate(['/create-license-id', 'detail']);
  }
}

const column = [
  'select',
  'group',
  'list',
  'rush',
  'number',
  'licenseType',
  'groupType',
  'status',
  'considerDate',
  'verifyDate',
  'approveDate',
];

interface info {
  group: string;
  list: string;
  number: string;
  licenseType: string;
  groupType: string;
  status: string;
  considerDate: string;
  verifyDate: string;
  approveDate: string;
}

const data: info[] = [
  {
    group: 'string',
    list: 'string',
    number: 'string',
    licenseType: 'string',
    groupType: 'string',
    status: 'string',
    considerDate: 'string',
    verifyDate: 'string',
    approveDate: 'string',
  },
];
