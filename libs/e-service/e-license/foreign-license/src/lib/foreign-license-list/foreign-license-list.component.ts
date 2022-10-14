import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { SchoolRequestSubType, SchoolRequestType } from '@ksp/shared/constant';
import { EsSearchPayload, SchoolRequest } from '@ksp/shared/interface';
import { ERequestService } from '@ksp/shared/service';
import {
  checkProcess,
  checkRequestType,
  checkStatus,
} from '@ksp/shared/utility';

@Component({
  selector: 'ksp-foreign-license-list',
  templateUrl: './foreign-license-list.component.html',
  styleUrls: ['./foreign-license-list.component.scss'],
})
export class ForeignLicenseListComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  form = this.fb.group({
    search: [{ requesttype: '4' }],
  });

  displayedColumns: string[] = column;
  dataSource = new MatTableDataSource<any>();
  checkProcess = checkProcess;
  checkRequestType = checkRequestType;
  checkStatus = checkStatus;
  requestTypeList = SchoolRequestType.filter((i) => i.id > 2);
  SchoolRequestSubType = SchoolRequestSubType;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private eRequestService: ERequestService
  ) {}

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  search(params: any) {
    //console.log('params = ', params);
    const payload: EsSearchPayload = {
      systemtype: '2',
      requesttype: '4',
      requestno: null,
      careertype: null,
      name: null,
      idcardno: null,
      passportno: null,
      process: null,
      status: null,
      schoolid: null,
      schoolname: null,
      bureauid: null,
      requestdatefrom: null,
      requestdateto: null,
      offset: '0',
      row: '500',
    };

    this.eRequestService.EsSearchRequest(payload).subscribe((res) => {
      if (res) {
        this.dataSource.data = res;
      } else {
        this.clear();
      }
    });
  }

  clear() {
    this.dataSource.data = [];
    this.form.reset();
    this.form.controls.search.patchValue({ requesttype: '3' });
  }

  goToDetail(item: SchoolRequest) {
    this.router.navigate(['/foreign-license', 'detail', item.id], {
      queryParams: { type: 0 },
    });
  }
}

export const column = [
  'id',
  'edit',
  'requestno',
  'idcardno',
  'name',
  'subtype',
  'currentprocess',
  'requeststatus',
  'updatedate',
  'requestdate',
  'reqDoc',
  'approveDoc',
];
