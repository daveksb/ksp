import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import {
  SchoolRequestProcess,
  SchoolRequestSubType,
  SchoolRequestType,
} from '@ksp/shared/constant';
import { RequestLicenseService, TempLicenseService } from '@ksp/shared/service';
import { replaceEmptyWithNull } from '@ksp/shared/utility';
import { Observable } from 'rxjs';

@Component({
  templateUrl: './request-list.component.html',
  styleUrls: ['./request-list.component.scss'],
})
export class SchoolRequestListComponent implements OnInit {
  form = this.fb.group({
    licenseSearch: [],
  });
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
  RequestProcessEnum = SchoolRequestProcess;
  RequestTypeEnum = SchoolRequestType;
  RequestSubTypeEnum = SchoolRequestSubType;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private tempLicenseService: TempLicenseService,
    private requestService: RequestLicenseService
  ) {}

  ngOnInit(): void {
    this.eduOccupyList$ = this.tempLicenseService.getSchoolEduOccupy();
  }

  search(searchParams: any) {
    const data = { ...searchParams, ...{ schoolid: `${this.schoolId}` } };
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

  viewRequest(subType: number, requestId: number) {
    this.router.navigate(['/temp-license', 'request', requestId], {
      queryParams: { subtype: subType },
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
  requestno: string;
  idcardno: string;
  requesttype: string;
  currentprocess: string;
  requeststatus: string;
  updatedate: string;
  requestdate: string;
}
