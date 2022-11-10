import { SelectionModel } from '@angular/cdk/collections';
import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ERequestService } from '@ksp/shared/service';
import localForage from 'localforage';

@Component({
  selector: 'ksp-create-license-id-list',
  templateUrl: './create-license-id-list.component.html',
  styleUrls: ['./create-license-id-list.component.scss'],
})
export class CreateLicenseIdListComponent {
  displayedColumns: string[] = column;
  dataSource = new MatTableDataSource<info>();
  selection = new SelectionModel<any>(true, []);

  constructor(
    private router: Router,
    private requestService: ERequestService
  ) {}

  search() {
    //this.dataSource.data = data;
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
      this.dataSource.data = res;
      console.log('search res = ', res);
    });
  }

  clear() {
    this.dataSource.data = [];
  }

  create() {
    console.log('this.selection.selected = ', this.selection.selected);
    localForage.setItem('selected-for-create-license', this.selection.selected);
    this.router.navigate(['/create-license-id', 'detail']);
  }
}

const column = [
  'select',
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
