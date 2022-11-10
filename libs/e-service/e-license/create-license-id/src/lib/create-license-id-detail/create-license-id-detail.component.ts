import { Component, Input, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Prefix } from '@ksp/shared/interface';
import { ERequestService } from '@ksp/shared/service';
import localForage from 'localforage';

@Component({
  selector: 'ksp-create-license-id-detail',
  templateUrl: './create-license-id-detail.component.html',
  styleUrls: ['./create-license-id-detail.component.scss'],
})
export class CreateLicenseIdDetailComponent implements OnInit {
  displayedColumns1: string[] = column1;
  dataSource1 = new MatTableDataSource<info1>();

  displayedColumns2: string[] = column2;
  dataSource2 = new MatTableDataSource<info2>();

  constructor(
    private router: Router,
    private requestService: ERequestService
  ) {}

  @Input() prefixList: Prefix[] | null = [];

  ngOnInit(): void {
    localForage.getItem('selected-for-create-license').then((res: any) => {
      //console.log('store data = ', res);
      if (res) {
        this.dataSource1.data = res;
      }
    });

    this.dataSource2.data = data2;
  }

  back() {
    this.router.navigate(['/create-license-id', 'list']);
  }
}

const column1 = [
  'group',
  'list',
  'rush',
  'listcount',
  'licenseType',
  'groupType',
  'status',
  'considerDate',
  'verifyDate',
  'approveDate',
];

interface info1 {
  order: string;
  orderNo: string;
  group: string;
  number: string;
  licenseType: string;
  licenseGroup: string;
  status: string;
  releasedDate: string;
  approveDate: string;
  verifyDate: string;
}

const data1: info1[] = [
  {
    order: 'string',
    orderNo: 'string',
    group: 'string',
    number: 'string',
    licenseType: 'string',
    licenseGroup: 'string',
    status: 'string',
    releasedDate: 'string',
    approveDate: 'string',
    verifyDate: 'string',
  },
];

const column2 = [
  'create',
  'order',
  'rush',
  'number',
  'personId',
  'licenseType',
  'name',
  'licenseGroup',
  'approveDate',
  'verifyDate',
];

interface info2 {
  order: string;
  number: string;
  personId: string;
  licenseType: string;
  name: string;
  licenseGroup: string;
  approveDate: string;
  verifyDate: string;
}

const data2: info2[] = [
  {
    order: 'string',
    number: 'string',
    personId: 'string',
    licenseType: 'string',
    name: 'string',
    licenseGroup: 'string',
    approveDate: 'string',
    verifyDate: 'string',
  },
];
