import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import {
  SchoolRequestProcess,
  SchoolRequestSubType,
  SchoolRequestType,
} from '@ksp/shared/constant';
import { RequestLicenseService, SchoolInfoService } from '@ksp/shared/service';
import { replaceEmptyWithNull } from '@ksp/shared/utility';
import { Observable } from 'rxjs';

@Component({
  templateUrl: './request-list.component.html',
  styleUrls: ['./request-list.component.scss'],
})
export class SchoolRequestListComponent implements OnInit {
  eduOccupyList$!: Observable<any>;

  schoolId = '0010201056';
  personSelected = false;

  displayedColumns: string[] = [
    'id',
    'requestno',
    'idcardno',
    'name',
    'requesttype',
    'subtype',
    'currentprocess',
    'requeststatus',
    'updatedate',
    'requestdate',
    'requestdoc',
    'approvedoc',
  ];
  dataSource = new MatTableDataSource<TempLicenseInfo>();
  SchoolRequestProcess = SchoolRequestProcess;
  SchoolRequestType = SchoolRequestType;
  SchoolRequestSubType = SchoolRequestSubType;

  form = this.fb.group({
    licenseSearch: [],
  });

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private schoolInfoService: SchoolInfoService,
    private requestService: RequestLicenseService
  ) {}

  ngOnInit(): void {
    this.eduOccupyList$ = this.schoolInfoService.getSchoolEduOccupy();
  }

  search(params: any) {
    /*
    {
  "requestno" : "1-01-1-650908-00024",
  "idcardno" : null,
  "requesttype" : null,
  "currentprocess" : null,
  "requeststatus" : null,
  "requestdatefrom" : null,
  "requestdateto" : null,
  "schoolid" : "9",
   "subtype" : null,
   "firsnameth" :null,
   "passportno" :null,
   "offset" : "0",
   "row" : "5",
  "tokenkey" : "abcdjbtswWVuiFxOlK4aHOK6AvcDlK6bBfCnQEHvanYkhuWAWQS6WQx6n4uVmZTxCYi4JEJ9ysLo2h6WLvjHaeHpAx2C3bt3LGjq"
} */
    console.log('params = ', params);
    const data = {
      ...params,
      ...{ schoolid: `${this.schoolId}`, offset: '0', row: '10' },
    };
    const payload = replaceEmptyWithNull(data);
    this.requestService.searchRequest(payload).subscribe((res: any) => {
      this.dataSource.data = res;
    });
  }

  clear() {
    this.dataSource.data = [];
  }

  goToRequestPage(subType: number) {
    this.router.navigate(['/temp-license', 'request'], {
      queryParams: { subtype: subType },
    });
  }

  viewRequest(requestType: number, subType: number, requestId: number) {
    switch (requestType) {
      case 4:
        return this.foreignPage(requestId.toString());

      case 6:
        return this.qualificationPage(requestId.toString());

      case 40:
        return this.rewardPage(requestId);
    }

    this.router.navigate(['/temp-license', 'request', requestId], {
      queryParams: { subtype: subType },
    });
  }

  foreignPage(id = '') {
    this.router.navigate(['/foreign-teacher', 'id-request', id]);
  }

  qualificationPage(id = '') {
    this.router.navigate(['/qualification-approve', 'detail', id]);
  }

  rewardPage(id: number) {
    if (id) {
      this.router.navigate(['/request-reward', 'detail', id]);
    } else {
      this.router.navigate(['/request-reward', 'detail']);
    }
  }
}

export interface TempLicenseInfo {
  id: number;
  requestno: string;
  idcardno: string;
  requesttype: string;
  currentprocess: string;
  requeststatus: string;
  updatedate: string;
  requestdate: string;
}
