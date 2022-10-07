import { AfterViewInit, Component, ViewChild } from '@angular/core';
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
  templateUrl: './manage-current-user-list.component.html',
  styleUrls: ['./manage-current-user-list.component.scss'],
})
export class ManageCurrentUserListComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  form = this.fb.group({
    manageSearch: [],
  });

  displayedColumns: string[] = column;
  dataSource = new MatTableDataSource<any>();

  selectedUniversity = '';

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
    console.log('params = ', params);

    const payload: EsSearchPayload = {
      systemtype: '2',
      requesttype: '1',
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
    this.router.navigate(['/school', 'user-detail', id], {
      queryParams: { type: SchoolServiceUserPageType.ManageCurrentUser },
    });
  }
}

export const column = [
  'id',
  'view',
  'idcardno',
  'name',
  'schoolname',
  //'province',
  'requeststatus',
  'requestdate',
  'updatedate',
];
