import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { SchoolRequestSubType, SchoolRequestType } from '@ksp/shared/constant';
import { RequestService, SchoolInfoService } from '@ksp/shared/service';
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
  //SchoolRequestProcess = SchoolRequestProcess;
  SchoolRequestType = SchoolRequestType;
  SchoolRequestSubType = SchoolRequestSubType;
  currentPage = 0;
  isLastPage = false;
  pageRow = 10;
  searchParams: any;

  form = this.fb.group({
    licenseSearch: [],
  });

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private schoolInfoService: SchoolInfoService,
    private requestService: RequestService
  ) {}

  ngOnInit(): void {
    this.eduOccupyList$ = this.schoolInfoService.getSchoolEduOccupy();
  }

  search(params: any) {
    console.log('params = ', params);
    const data = {
      ...params,
      ...{ schoolid: `${this.schoolId}`, offset: '0', row: `${this.pageRow}` },
    };
    const payload = replaceEmptyWithNull(data);

    this.searchParams = payload;
    this.isLastPage = false;

    this.requestService.searchRequest(payload).subscribe((res: any) => {
      const mapData = res.map((i: any) => {
        return {
          ...i,
          ...{
            mapRequestType: SchoolRequestType.find(
              (j) => j.id === +i.requesttype
            )?.name,
          },
        };
      });
      this.dataSource.data = mapData;
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

  goPrevious() {
    if (this.currentPage == 0) {
      this.isLastPage = false;
      return;
    }
    this.currentPage -= 1;
    const offset = this.pageRow * this.currentPage;
    const params = {
      ...this.searchParams,
      ...{ offset: `${offset}` },
    };
    this.requestService.searchRequest(params).subscribe((res: any) => {
      this.dataSource.data = res;
    });
  }

  goNext() {
    if (this.isLastPage) {
      return;
    }
    this.currentPage += 1;
    const offset = this.pageRow * this.currentPage;
    const params = {
      ...this.searchParams,
      ...{ offset: `${offset + 1}` },
    };
    this.requestService.searchRequest(params).subscribe((res: any) => {
      if (res.length < this.pageRow) {
        this.isLastPage = true;
      }
      this.dataSource.data = res;
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
