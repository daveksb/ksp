import { SelectionModel } from '@angular/cdk/collections';
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { selfOccupyList } from '@ksp/shared/constant';
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
  licenseTypes = selfOccupyList.filter((i) => i.id < 5);
  form = this.fb.group({
    groupno: [],
    createdate: [],
    isforeign: ['1'],
    approvedatefrom: [],
    approvedateto: [],
  });

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private requestService: ERequestService
  ) {}

  search() {
    const form: any = this.form.value;
    const payload = {
      groupno: form.groupno,
      process: null, //params.process,
      status: null, //params.status,
      createdate: form.createdate,
      offset: '0',
      row: '500',
    };
    this.requestService.searchSelfApproveList(payload).subscribe((res) => {
      res = res.map((i) => {
        return { ...i, count: JSON.parse(i.requestlist || '').length };
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
