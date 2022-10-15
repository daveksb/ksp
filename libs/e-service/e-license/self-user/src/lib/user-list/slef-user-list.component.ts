import { AfterViewInit, Component, Input, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import {
  EsSearchPayload,
  SchoolServiceUserPageType,
} from '@ksp/shared/interface';
import { ERequestService } from '@ksp/shared/service';

@Component({
  templateUrl: './self-user-list.component.html',
  styleUrls: ['./self-user-list.component.scss'],
})
export class SelfUserListComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  form = this.fb.group({
    manageSearch: [],
  });

  displayedColumns: string[] = column;
  dataSource = new MatTableDataSource<any>();
  selectedUniversity = '';
  @Input() statusList: any[] | undefined = [];

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private eRequestService: ERequestService
  ) {}

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  onItemChange(universityCode: string) {
    this.selectedUniversity = universityCode;
    //console.log('universityCode = ', universityCode);
  }

  search(params: any) {
    //console.log('params = ', params);

    const payload: EsSearchPayload = {
      systemtype: '1',
      requesttype: '1',
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

    this.eRequestService.EsSearchRequest(payload).subscribe((res: any) => {
      this.dataSource.data = res;
    });
  }

  clear() {
    this.dataSource.data = [];
  }

  goToDetail(id: number) {
    this.router.navigate(['/self', 'user-detail', id], {
      queryParams: { type: SchoolServiceUserPageType.ManageCurrentUser },
    });
  }
}

export const column = [
  'id',
  'view',
  'idcardno',
  'name',
  //schoolname',
  //'province',
  'requeststatus',
  'requestdate',
  'updatedate',
];
