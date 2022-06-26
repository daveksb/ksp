import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

@Component({
  selector: 'ksp-activity-list',
  templateUrl: './activity-list.component.html',
  styleUrls: ['./activity-list.component.scss'],
})
export class ActivityListComponent {
  form = this.fb.group({
    activitySearch: [],
  });

  displayedColumns: string[] = [
    'order',
    'licenseID',
    'ssn',
    'name',
    'releaseDate',
    'finishedDate',
    'startDate',
    'endDate',
    'edit',
    'view',
  ];
  dataSource = new MatTableDataSource<activityInfo>();

  constructor(public router: Router, private fb: FormBuilder) {}

  search() {
    this.dataSource.data = data;
  }

  clear() {
    this.dataSource.data = [];
  }

  view() {
    this.router.navigate(['/', 'activity', 'detail']);
  }
}

export interface activityInfo {
  order: number;
  licenseID: string;
  ssn: string;
  name: string;
  releaseDate: string;
  finishedDate: string;
  startDate: string;
  endDate: string;
  edit: string;
  view: string;
}

export const data: activityInfo[] = [
  {
    order: 1,
    licenseID: 'xx/25xx',
    ssn: 'x-xxxx-xxxx-xx-x',
    name: 'นายทักทาย สบายดี',
    releaseDate: 'วว/ดด/ปปปป',
    finishedDate: 'วว/ดด/ปปปป',
    startDate: 'วว/ดด/ปปปป',
    endDate: 'วว/ดด/ปปปป',
    edit: '',
    view: '',
  },
];
