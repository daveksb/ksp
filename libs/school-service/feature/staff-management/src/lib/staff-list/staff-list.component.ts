import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

@Component({
  selector: 'school-service-staff-list',
  templateUrl: './staff-list.component.html',
  styleUrls: ['./staff-list.component.scss'],
})
export class StaffListComponent {
  form = this.fb.group({
    staffSearch: [],
  });

  personSelected = false;
  displayedColumns: string[] = [
    'order',
    'ssn',
    'name',
    'startDate',
    'endDate',
    'profession',
    'teaching',
    'tempLicense',
    'edit',
    'view',
  ];
  dataSource = new MatTableDataSource<staffInfo>();

  constructor(private router: Router, private fb: FormBuilder) {}

  search() {
    this.dataSource.data = data;
  }

  clear() {
    this.dataSource.data = [];
  }

  goToDetail() {
    this.router.navigate(['./', 'staff-management', 'license-search']);
  }

  addStaff() {
    this.router.navigate(['./', 'staff-management', 'staff-person-info']);
  }
}

export interface staffInfo {
  order: number;
  ssn: string;
  name: string;
  startDate: string;
  endDate: string;
  profession: boolean;
  teaching: boolean;
  tempLicense: boolean;
  edit: string;
  view: string;
}

export const data: staffInfo[] = [
  {
    order: 1,
    ssn: 'x-xxxx-xxxx-xx-x',
    name: 'นายธนารักษ์ ใจสะอาด',
    startDate: 'วว/ดด/ปปปป',
    endDate: 'วว/ดด/ปปปป',
    profession: true,
    teaching: false,
    tempLicense: false,
    edit: '',
    view: '',
  },
  {
    order: 2,
    ssn: 'x-xxxx-xxxx-xx-x',
    name: 'นายธนารักษ์ ใจสะอาด',
    startDate: 'วว/ดด/ปปปป',
    endDate: 'วว/ดด/ปปปป',
    profession: false,
    teaching: true,
    tempLicense: false,
    edit: '',
    view: '',
  },
  {
    order: 2,
    ssn: 'x-xxxx-xxxx-xx-x',
    name: 'นายธนารักษ์ ใจสะอาด',
    startDate: 'วว/ดด/ปปปป',
    endDate: 'วว/ดด/ปปปป',
    profession: true,
    teaching: false,
    tempLicense: true,
    edit: '',
    view: '',
  },
];
