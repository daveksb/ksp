import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

@Component({
  selector: 'ksp-license-approve-list',
  templateUrl: './license-approve-list.component.html',
  styleUrls: ['./license-approve-list.component.scss'],
})
export class LicenseApproveListComponent implements OnInit {
  displayedColumns: string[] = column;
  dataSource = new MatTableDataSource<any>();

  constructor(private router: Router,) {}

  ngOnInit(): void {}

  view() {
    this.router.navigate(['/', 'license', 'approve-de'])
  }

  search() {
    this.dataSource.data = data;
  }

  clear() {
    this.dataSource.data = [];
  }
}

export const column = ['id', 'licenseType', 'view'];

export interface PersonLicense {
  id: number;
  licenseType: string;
}

export const data: PersonLicense[] = [
  {
    id: 1,
    licenseType: 'ขึ้นทะเบียน',
  },
  {
    id: 2,
    licenseType: 'ต่ออายุ',
  },
  {
    id: 3,
    licenseType: 'เปลี่ยนแปลง/แก้ไข',
  },
  {
    id: 4,
    licenseType: 'ใบแทน',
  },
  {
    id: 5,
    licenseType: 'รับรองความรู้',
  },
];
