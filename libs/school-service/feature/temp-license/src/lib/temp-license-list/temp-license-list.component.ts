import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { RequestLicenseService, TempLicenseService } from '@ksp/shared/service';
import { replaceEmptyWithNull } from '@ksp/shared/utility';
import { Observable } from 'rxjs';

@Component({
  templateUrl: './temp-license-list.component.html',
  styleUrls: ['./temp-license-list.component.scss'],
})
export class SchoolTempLicenseListComponent implements OnInit {
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
    'currentprocess',
    'requeststatus',
    'updatedate',
    'requestdate',
    'requestdoc',
    'approvedoc',
  ];
  dataSource = new MatTableDataSource<TempLicenseInfo>();

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

  nextPage(requestType: number) {
    this.router.navigate(['/temp-license', 'request'], {
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

  checkType(input: string) {
    let result = '-';
    if (input === '1') {
      result = 'ครู';
    }
    if (input === '2') {
      result = 'ผู้บริหารสถานศึกษา';
    }
    return result;
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
