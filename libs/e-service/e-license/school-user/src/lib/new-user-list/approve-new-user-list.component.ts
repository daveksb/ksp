import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { SchoolServiceUserPageType } from '@ksp/shared/interface';
import { ERequestService } from '@ksp/shared/service';

@Component({
  templateUrl: './approve-new-user-list.component.html',
  styleUrls: ['./approve-new-user-list.component.scss'],
})
export class ApproveNewUserListComponent implements AfterViewInit {
  displayedColumns: string[] = column;
  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  selectedUniversity = '';

  constructor(
    private router: Router,
    private eRequestService: ERequestService
  ) {}

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  search(params: any) {
    console.log('params  = ', params);
    const payload = {
      systemtype: '2',
      requesttype: '1',
      schoolid: '0010201056',
      // params.institution?.schoolid,
      bureauid: null,
    };

    this.eRequestService.searchRequest(payload).subscribe((res: any) => {
      //console.log('res = ', res);
      this.dataSource.data = res;
    });
  }

  clear() {
    this.dataSource.data = [];
  }

  onItemChange(universityCode: string) {
    this.selectedUniversity = universityCode;
  }

  goToDetail(id: number) {
    this.router.navigate(['approve-new-user', 'detail', id], {
      queryParams: { type: SchoolServiceUserPageType.ApproveNewUser },
    });
  }
}

export const column: string[] = [
  'id',
  'view',
  'requestno',
  //'idcardno',
  'name',
  'contactphone',
  //'coordinatorname',
  'schoolname',
  //'provience',
  'requeststatus',
  'requestdate',
];
