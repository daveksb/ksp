import { Component, Input, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import {
  EsSearchPayload,
  Prefix,
  SchRequestSearchFilter,
} from '@ksp/shared/interface';
import { ERequestService } from '@ksp/shared/service';
import { replaceEmptyWithNull } from '@ksp/shared/utility';
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
  dataSource2 = new MatTableDataSource<any>();

  constructor(
    private router: Router,
    private requestService: ERequestService
  ) {}

  @Input() prefixList: Prefix[] | null = [];

  ngOnInit(): void {
    localForage.getItem('selected-for-create-license').then((res: any) => {
      if (res) {
        this.dataSource1.data = res;
      }
    });

    this.search({});
  }

  search(params: Partial<SchRequestSearchFilter>) {
    let payload: EsSearchPayload = {
      systemtype: '1',
      requesttype: '1',
      requestno: params.requestno,
      careertype: null,
      name: params.name,
      idcardno: params.idcardno,
      passportno: null,
      process: '4',
      status: '3',
      schoolid: null,
      schoolname: null,
      bureauid: null,
      requestdatefrom: null,
      requestdateto: null,
      offset: '0',
      row: '10',
    };

    payload = replaceEmptyWithNull(payload);

    this.requestService.KspSearchRequest(payload).subscribe((res) => {
      console.log('ds2 = ', res);
      this.dataSource2.data = res;
    });
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
