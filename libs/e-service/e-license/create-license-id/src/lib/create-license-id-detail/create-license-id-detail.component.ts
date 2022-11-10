import { Component, Input, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Prefix } from '@ksp/shared/interface';
import { ERequestService } from '@ksp/shared/service';

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
    const payload = {
      groupno: null, //params.groupno,
      process: null, //params.process,
      status: null, //params.status,
      createdate: null, //params.createdate,
      offset: '0',
      row: '100',
    };
    this.requestService.searchRequestList(payload).subscribe((res: any[]) => {
      res = res.map((i) => {
        return {
          ...i,
          ...{
            listcount: i.requestlist ? JSON.parse(i.requestlist).length : 0,
          },
        };
      });
      this.dataSource1.data = res;
      console.log('search res = ', res);
    });

    this.dataSource2.data = data2;
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
