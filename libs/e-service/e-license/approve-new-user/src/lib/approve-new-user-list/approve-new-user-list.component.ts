import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { SchoolServiceUserPageType } from '@ksp/shared/interface';
import { RequestLicenseService } from '@ksp/shared/service';
import { replaceEmptyWithNull } from '@ksp/shared/utility';

@Component({
  templateUrl: './approve-new-user-list.component.html',
  styleUrls: ['./approve-new-user-list.component.scss'],
})
export class ApproveNewUserListComponent {
  form = this.fb.group({
    approveSearch: [],
  });

  displayedColumns: string[] = column;
  dataSource = new MatTableDataSource<any>();

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private requestService: RequestLicenseService
  ) {}

  selectedUniversity = '';

  search(params: any) {
    //const payload = replaceEmptyWithNull(params);
    //console.log('params = ', params);
    const payload = {
      currentprocess: null,
      idcardno: null,
      requestdatefrom: params.requestdatefrom,
      requestdateto: null,
      requestno: params.requestno,
      requeststatus: params.requeststatus,
      requesttype: '1',
      schoolid: '0010201056',
    };

    this.requestService.searchRequest(payload).subscribe((res: any) => {
      this.dataSource.data = res;
    });
  }

  clear() {
    this.dataSource.data = [];
  }

  onItemChange(universityCode: string) {
    this.selectedUniversity = universityCode;
    //console.log('universityCode = ', universityCode);
  }

  goToDetail() {
    this.router.navigate(['approve-new-user', 'detail'], {
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
