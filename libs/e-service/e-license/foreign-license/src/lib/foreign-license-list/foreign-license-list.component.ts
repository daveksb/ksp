import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { SchoolRequestSubType, SchoolRequestType } from '@ksp/shared/constant';
import {
  EsSearchPayload,
  KspRequest,
  SchRequestSearchFilter,
} from '@ksp/shared/interface';
import { ERequestService, LoaderService } from '@ksp/shared/service';
import {
  checkProcess,
  schoolMapRequestType,
  checkStatus,
} from '@ksp/shared/utility';
import { Subject } from 'rxjs';

@Component({
  selector: 'ksp-foreign-license-list',
  templateUrl: './foreign-license-list.component.html',
  styleUrls: ['./foreign-license-list.component.scss'],
})
export class ForeignLicenseListComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  form = this.fb.group({
    search: [{ requesttype: '4' }],
  });

  isLoading: Subject<boolean> = this.loaderService.isLoading;
  displayedColumns: string[] = column;
  dataSource = new MatTableDataSource<KspRequest>();
  checkProcess = checkProcess;
  checkRequestType = schoolMapRequestType;
  checkStatus = checkStatus;
  requestTypeList = SchoolRequestType.filter((i) => i.id > 2);
  SchoolRequestSubType = SchoolRequestSubType;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private eRequestService: ERequestService,
    private loaderService: LoaderService
  ) {}

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  search(p: Partial<SchRequestSearchFilter>) {
    //console.log('params = ', params);
    const payload: EsSearchPayload = {
      systemtype: null,
      requesttype: '4',
      requestno: p.requestno,
      careertype: p.careertype,
      name: p.name,
      idcardno: null,
      passportno: null,
      process: p.process,
      status: p.status,
      schoolid: null,
      schoolname: null,
      bureauid: null,
      requestdatefrom: p.requestdatefrom,
      requestdateto: p.requestdateto,
      offset: '0',
      row: '2000',
    };

    this.eRequestService.KspSearchRequest(payload).subscribe((res) => {
      if (res && res.length) {
        this.dataSource.data = res;
        this.dataSource.sort = this.sort;
        const sortState: Sort = { active: 'requestdate', direction: 'asc' };
        this.sort.active = sortState.active;
        this.sort.direction = sortState.direction;
        this.sort.sortChange.emit(sortState);
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

  goToDetail(item: KspRequest) {
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
  'careertype',
  'process',
  'status',
  'updatedate',
  'requestdate',
  'reqDoc',
  //'approveDoc',
];
