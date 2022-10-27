import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import {
  careerTypeList,
  SchoolRequestSubType,
  SchoolRequestType,
} from '@ksp/shared/constant';
import { PdfViewerComponent } from '@ksp/shared/dialog';
import { KspRequest, SchRequestSearchFilter } from '@ksp/shared/interface';
import { SchoolInfoService, SchoolRequestService } from '@ksp/shared/service';
import {
  checkProcess,
  schoolMapRequestType,
  checkStatus,
  getCookie,
  thaiDate,
} from '@ksp/shared/utility';

@Component({
  templateUrl: './school-request-list.component.html',
  styleUrls: ['./school-request-list.component.scss'],
})
export class SchoolRequestListComponent implements AfterViewInit {
  schoolId = getCookie('schoolId');
  displayedColumns: string[] = displayedColumns;
  dataSource = new MatTableDataSource<KspRequest>();
  SchoolRequestSubType = SchoolRequestSubType;
  searchNotFound = false;
  checkProcess = checkProcess;
  checkRequestType = schoolMapRequestType;
  checkStatus = checkStatus;
  requestTypeList = SchoolRequestType.filter((i) => i.id > 2);
  careerTypeList = careerTypeList;

  form = this.fb.group({
    licenseSearch: [],
  });

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private requestService: SchoolRequestService,
    public dialog: MatDialog,
    private schoolInfoService: SchoolInfoService
  ) {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  search(filters: Partial<SchRequestSearchFilter>) {
    //console.log('filters = ', filters);
    const payload: SchRequestSearchFilter = {
      schoolid: `${this.schoolId}`,
      requesttype: `${filters.requesttype}`,
      requestno: filters.requestno,
      careertype: filters.careertype,
      name: filters.name,
      idcardno: filters.idcardno,
      passportno: filters.passportno,
      process: filters.process,
      status: filters.status,
      requestdatefrom: filters.requestdatefrom,
      requestdateto: filters.requestdateto,
      offset: '0',
      row: '500',
    };

    this.requestService.schSearchRequest(payload).subscribe((res) => {
      if (res && res.length) {
        //console.log('res = ', res);
        this.searchNotFound = false;
        this.dataSource.data = res;
        this.dataSource.sort = this.sort;

        const sortState: Sort = { active: 'id', direction: 'desc' };
        this.sort.active = sortState.active;
        this.sort.direction = sortState.direction;
        this.sort.sortChange.emit(sortState);
      } else {
        this.dataSource.data = [];
        this.searchNotFound = true;
      }
    });
  }

  clear() {
    this.form.reset();
    this.searchNotFound = false;
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
        return this.foreignPage(`${requestId}`);

      case 6:
        return this.qualificationPage(requestId, subType);

      case 40:
        return this.rewardPage(`${requestId}`);
    }

    this.router.navigate(['/temp-license', 'request', requestId], {
      queryParams: { subtype: subType },
    });
  }

  foreignPage(id = '') {
    this.router.navigate(['/foreign-teacher', 'id-request', id]);
  }

  qualificationPage(id: number | null, subType: number) {
    if (id) {
      this.router.navigate(['/qualification-approve', 'detail', id], {
        queryParams: { subtype: subType },
      });
    } else {
      this.router.navigate(['/qualification-approve', 'detail'], {
        queryParams: { subtype: subType },
      });
    }
  }

  rewardPage(id = '') {
    this.router.navigate(['/request-reward', 'detail', id]);
  }

  renderPdf(element: any) {
    const date = new Date(element.requestdate);
    const thai = thaiDate(date);
    const [day, month, year] = thai.split(' ');
    const name = element.firstnameth + ' ' + element.lastnameth;
    const phone = element.contactphone;
    const [
      id1,
      id2,
      id3,
      id4,
      id5,
      id6,
      id7,
      id8,
      id9,
      id10,
      id11,
      id12,
      id13,
    ] = element.idcardno.split('');
    const eduinfo = JSON.parse(element.eduinfo);
    const edu1 = eduinfo.find((item: any) => (item.degreeLevel = '1'));
    const degreename1 = edu1.degreeName;
    const institution1 = edu1.institution;
    const major1 = edu1.major;
    this.schoolInfoService
      .getSchoolInfo(this.schoolId)
      .subscribe((res: any) => {
        //console.log('res xx = ', res);
        const schoolname = res.schoolName;
        const bureauname = res.bureauName;
        const { address, moo, street, road, tumbon, fax } = res;
        const amphurname = res.amphurName;
        const provincename = res.provinceName;
        const zipcode = res.zipCode;
        const telphone = res.telphone;
        this.dialog.open(PdfViewerComponent, {
          width: '1200px',
          height: '100vh',
          data: {
            pdfType: 1,
            input: {
              day,
              month,
              year,
              schoolname,
              bureauname,
              address,
              moo,
              street,
              road,
              tumbon,
              amphurname,
              provincename,
              zipcode,
              fax,
              name,
              phone,
              telphone,
              id1,
              id2,
              id3,
              id4,
              id5,
              id6,
              id7,
              id8,
              id9,
              id10,
              id11,
              id12,
              id13,
              degreename1,
              institution1,
              major1,
            },
          },
        });
      });
  }
}

export interface TempLicenseInfo {
  order: number;
  requestno: string;
  idcardno: string;
  requesttype: string;
  process: string;
  status: string;
  updatedate: string;
  requestdate: string;
}

export const displayedColumns = [
  'order',
  'requestno',
  'idcardno',
  'name',
  'requesttype',
  'careertype',
  'process',
  'status',
  'updatedate',
  'requestdate',
  'requestdoc',
  'approvedoc',
];
