import { SelectionModel } from '@angular/cdk/collections';
import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { SelfApproveList } from '@ksp/shared/interface';
import { ERequestService } from '@ksp/shared/service';
import localForage from 'localforage';

@Component({
  selector: 'ksp-create-license-id-list',
  templateUrl: './create-license-id-list.component.html',
  styleUrls: ['./create-license-id-list.component.scss'],
})
export class CreateLicenseIdListComponent {
  displayedColumns: string[] = column;
  dataSource = new MatTableDataSource<SelfApproveList>();
  selection = new SelectionModel<any>(true, []);

  constructor(
    private router: Router,
    private requestService: ERequestService
  ) {}

  search() {
    const payload = {
      groupno: null, //params.groupno,
      process: null, //params.process,
      status: null, //params.status,
      createdate: null, //params.createdate,
      offset: '0',
      row: '500',
    };
    this.requestService.searchSelfApproveList(payload).subscribe((res) => {
      res = res.map((i) => {
        return {
          ...i,
          ...{
            listcount: i.requestlist ? JSON.parse(i.requestlist).length : 0,
          },
        };
      });
      this.dataSource.data = res;
    });
  }

  clear() {
    this.dataSource.data = [];
  }

  create() {
    //console.log('this.selection.selected = ', this.selection.selected);
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
