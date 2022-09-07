import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { TempLicenseService } from '@ksp/shared/service';

@Component({
  templateUrl: './school-temp-license-list.component.html',
  styleUrls: ['./school-temp-license-list.component.scss'],
})
export class SchoolTempLicenseListComponent {
  form = this.fb.group({
    licenseSearch: [],
  });

  schoolId = '0010201056';
  personSelected = false;
  displayedColumns: string[] = [
    'id',
    'requestNo',
    'idCardNo',
    'requestType',
    'requestProcess',
    'requestStatus',
    'updateDate',
    'requestDate',
    'requestDoc',
    'approveDoc',
  ];
  dataSource = new MatTableDataSource<TempLicenseInfo>();

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private tempLicenseService: TempLicenseService
  ) {}

  search() {
    const payload = {
      schoolid: `${this.schoolId}`,
      requestno: null,
      idcardno: null,
      requesttype: null,
      requestprocess: null,
      requeststatus: null,
      requestdatefrom: null,
      requestdateto: null,
    };

    this.tempLicenseService.searchRequest(payload).subscribe((res: any) => {
      //console.log('licenses = ', res);
      this.dataSource.data = res;
    });
  }

  clear() {
    this.dataSource.data = [];
  }

  nextPage(requestType: number) {
    this.router.navigate(['/temp-license', 'detail'], {
      queryParams: { type: requestType },
    });
  }

  foreignPage() {
    this.router.navigate(['/foreign-teacher', 'id-request']);
  }

  qualificationPage() {
    this.router.navigate(['/qualification-approve', 'detail']);
  }

  rewardPage() {
    this.router.navigate(['/request-reward', 'detail']);
  }
}

export interface TempLicenseInfo {
  id: number;
  requestNo: string;
  idCardNo: string;
  requestType: string;
  requestProcess: string;
  requestStatus: string;
  updateDate: string;
  requestDate: string;
}
