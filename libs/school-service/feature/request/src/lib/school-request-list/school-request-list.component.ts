import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import {
  careerTypeList,
  SchoolLangMapping,
  SchoolRequestSubType,
  SchoolRequestType,
} from '@ksp/shared/constant';
import { PdfRenderComponent } from '@ksp/shared/dialog';
import { KspRequest, SchRequestSearchFilter } from '@ksp/shared/interface';
import { SchoolInfoService, SchoolRequestService } from '@ksp/shared/service';
import {
  checkProcess,
  schoolMapRequestType,
  checkStatus,
  getCookie,
  thaiDate,
  hasRejectedRequest,
  addDate,
  changeToThaiNumber,
  changeToEnglishMonth,
} from '@ksp/shared/utility';

@Component({
  templateUrl: './school-request-list.component.html',
  styleUrls: ['./school-request-list.component.scss'],
})
export class SchoolRequestListComponent implements AfterViewInit, OnInit {
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
  initialSearch = true;
  rejectedRequests: KspRequest[] = [];

  defaultForm = {
    requesttype: '3',
    careertype: '1',
  };

  form = this.fb.group({
    licenseSearch: [this.defaultForm],
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

  ngOnInit(): void {
    const filters: Partial<SchRequestSearchFilter> = {
      requesttype: '3',
    };
    this.search(filters);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  genAlertMessage(req: KspRequest) {
    const detail: any = JSON.parse(req.detail || '');
    //console.log('return date = ', detail.returndate);
    return `แจ้งเตือน เลขที่คำขอ: ${
      req.requestno
    } ถูกส่งคืน "ปรับแก้ไข/เพิ่มเติม"
    กรุณาส่งกลับภายในวันที่ ${thaiDate(
      new Date(detail.returndate)
    )} มิฉะนั้นใบคำขอจะถูกยกเลิก `;
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
      // search without showing result do automatically after load
      if (this.initialSearch) {
        this.rejectedRequests = hasRejectedRequest(res);
        //console.log('has reject = ', hasReject);
      }

      if (res && res.length && !this.initialSearch) {
        //console.log('res = ', res);
        this.searchNotFound = false;
        this.dataSource.data = res;
        this.dataSource.sort = this.sort;
        const sortState: Sort = { active: 'id', direction: 'desc' };
        this.sort.active = sortState.active;
        this.sort.direction = sortState.direction;
        this.sort.sortChange.emit(sortState);
        this.initialSearch = false;
      } else {
        this.dataSource.data = [];
        this.searchNotFound = true;
        this.initialSearch = false;
      }
    });
  }

  isLicenseApproved(req: KspRequest) {
    const tempRequestApproved =
      req.requesttype === '3' && req.process === '5' && req.status === '2';
    const kuruNoApproved =
      req.requesttype === '4' && req.process === '2' && req.status === '2';
    const qualificationApproved =
      req.requesttype === '6' && req.process === '3' && req.status === '2';
    if (tempRequestApproved || kuruNoApproved || qualificationApproved) {
      return true;
    } else {
      return false;
    }
  }

  getTempLicense(requestId: string | null) {
    this.requestService.getTempLicense(requestId).subscribe((res) => {
      console.log('temp license = ', res);
    });
  }

  licensePdf(element: KspRequest) {
    this.getTempLicense(element.id);

    const position = element?.position;
    const startDate = new Date(element.processupdatedate || '');
    const endDate = addDate(
      new Date(element?.processupdatedate || '') ?? new Date(),
      0,
      0,
      2
    );
    const date = new Date(element.requestdate || '');
    const thai = thaiDate(date);
    const [day, month, year] = thai.split(' ');
    const fulldateth = `${changeToThaiNumber(day)} เดือน ${month} พ.ศ. ${year}`;
    const fulldateen = `${day} Day of ${changeToEnglishMonth(month)} B.E. ${
      parseInt(year) - 543
    }`;
    const name = element.firstnameth + ' ' + element.lastnameth;
    const nameen = element.firstnameen + ' ' + element.lastnameen;
    const start = thaiDate(startDate);
    const end = thaiDate(endDate);
    const startth = changeToThaiNumber(start);
    const endth = changeToThaiNumber(end);
    const starten = changeToEnglishMonth(start);
    const enden = changeToEnglishMonth(end);
    const careertype = SchoolRequestSubType[+(element?.careertype ?? '1')];
    const careertypeen = SchoolLangMapping[careertype ?? 'ครู'] ?? '';
    //const requestno = element.requestno ?? '';
    const requestno = '14/2565';
    this.schoolInfoService
      .getSchoolInfo(this.schoolId)
      .subscribe((res: any) => {
        const schoolname = res.schoolName;
        const bureauname = res.bureauName;

        const schoolapprovename = 'ผู้อํานวยการสถานศึกษา';
        const schoolapprovenameen = 'director of the educational institution';
        this.dialog.open(PdfRenderComponent, {
          width: '1200px',
          height: '100vh',
          data: {
            pdfType: 99,
            pdfSubType: element.requesttype,
            input: {
              schoolapprovename,
              schoolapprovenameen,
              requestno,
              careertype,
              careertypeen,
              name,
              nameen,
              startth,
              endth,
              starten,
              enden,
              schoolname,
              bureauname,
              day,
              month,
              year,
              position,
              fulldateth,
              fulldateen,
            },
          },
        });
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

  viewRequest(
    requestType: string | null,
    subType: string | null,
    requestId: string | null
  ) {
    switch (requestType) {
      case '4':
        return this.foreignPage(`${requestId}`);

      case '6':
        return this.qualificationPage(Number(requestId), Number(subType));

      case '40':
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

  requestPdf(element: KspRequest) {
    const pdfType = element.requesttype;
    const pdfSubType = element.careertype;
    const date = new Date(element.requestdate || '');
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
    ] = element?.idcardno?.split('') ?? [];
    const eduinfo = JSON.parse(element.eduinfo || '');
    const edu1 = eduinfo.find((item: any) => {
      if (item?.degreeLevel) {
        return item.degreeLevel === '1';
      }
      return false;
    });
    const degreename1 = edu1?.degreeName ?? '';
    const institution1 = edu1?.institution ?? '';
    const major1 = edu1?.major ?? '';
    const nameen = element.firstnameen + ' ' + element.lastnameen;
    let checkbox1 = false;
    if (degreename1) {
      checkbox1 = true;
    }
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
        console.log(id12);
        this.dialog.open(PdfRenderComponent, {
          width: '1200px',
          height: '100vh',
          data: {
            pdfType,
            pdfSubType,
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
              checkbox1,
              nameen,
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
  'requestpdf',
  'licensepdf',
];
