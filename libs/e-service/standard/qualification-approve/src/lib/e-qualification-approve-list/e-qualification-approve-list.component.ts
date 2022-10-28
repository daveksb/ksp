import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { SchoolRequestSubType, SchoolRequestType } from '@ksp/shared/constant';
import { EsSearchPayload, SchoolRequest } from '@ksp/shared/interface';
import { ERequestService } from '@ksp/shared/service';
import { checkProcess, checkStatus } from '@ksp/shared/utility';

@Component({
  selector: 'ksp-e-qualification-approve-list',
  templateUrl: './e-qualification-approve-list.component.html',
  styleUrls: ['./e-qualification-approve-list.component.scss'],
})
export class EQualificationApproveListComponent implements AfterViewInit {
  requestTypeList = SchoolRequestType.filter((i) => i.id > 2);
  checkProcess = checkProcess;
  checkStatus = checkStatus;
  SchoolRequestSubType = SchoolRequestSubType;

  form = this.fb.group({
    search: [{ requesttype: '6' }],
  });

  displayedColumns: string[] = column;
  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private eRequestService: ERequestService
  ) {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  search(params: any) {
    //console.log('params = ', params);
    const payload: EsSearchPayload = {
      systemtype: '2',
      requesttype: '6',
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

    this.eRequestService.KspSearchRequest(payload).subscribe((res) => {
      if (res) {
        this.dataSource.data = res;
        this.dataSource.sort = this.sort;
        const sortState: Sort = { active: 'id', direction: 'desc' };
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

  goToDetail(item: SchoolRequest) {
    this.router.navigate(['/qualification-approve', 'detail', item.id], {
      queryParams: { subtype: item.subtype },
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
  'approveDoc',
];
