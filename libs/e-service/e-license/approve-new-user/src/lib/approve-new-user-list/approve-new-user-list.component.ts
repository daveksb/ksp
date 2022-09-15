import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { SchoolServiceUserPageType } from '@ksp/shared/interface';
import { RequestLicenseService } from '@ksp/shared/service';

@Component({
  templateUrl: './approve-new-user-list.component.html',
  styleUrls: ['./approve-new-user-list.component.scss'],
})
export class ApproveNewUserListComponent {
  displayedColumns: string[] = column;
  dataSource = new MatTableDataSource<any>();

  constructor(
    private router: Router,
    private requestService: RequestLicenseService
  ) {}

  selectedUniversity = '';

  search(params: any) {
    console.log('params = ', params);
    /* const payload = {
      schoolid: params.institution?.schoolid,
      requestno: params.requestno,
      firstnameth: params.name,
      lastnameth: null,
      requestdate: null,
      requeststatus: null,
      currentprocess: null,
      schoolname: null,
      bureauname: null,
    }; */

    const payload = {
      schoolid: params.institution?.schoolid,
      requestno: params.requestno,
      firstnameth: params.name,
      lastnameth: null,
      requestdate: null,
      requesttype: '1',
      requeststatus: null,
      currentprocess: null,
      schoolname: null,
      bureauid: null,
      offset: '0',
      row: '10',
    };

    /* const payload = {
      schoolid: null,
      requestno: null,
      firstnameth: 'มานะ',
      lastnameth: null,
      requestdate: null,
      requesttype: null,
      requeststatus: null,
      currentprocess: null,
      schoolname: null,
      bureauid: null,
      offset: '0',
      row: '10',
    }; */

    this.requestService.searchRegisterRequest(payload).subscribe((res: any) => {
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
  'requestno',
  //'idcardno',
  'name',
  'contactphone',
  'requeststatus',
  'requestdate',
  'view',
];
