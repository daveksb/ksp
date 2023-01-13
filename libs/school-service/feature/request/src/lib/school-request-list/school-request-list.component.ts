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
import {
  KspRequest,
  SchRequestSearchFilter,
  SchTempLicense,
} from '@ksp/shared/interface';
import {
  LoaderService,
  SchoolInfoService,
  SchoolRequestService,
} from '@ksp/shared/service';
import {
  checkProcess,
  schoolMapRequestType,
  checkStatus,
  getCookie,
  thaiDate,
  hasRejectedRequest,
  changeToThaiNumber,
  changeToEnglishMonth,
} from '@ksp/shared/utility';
import { Subject } from 'rxjs';

@Component({
  templateUrl: './school-request-list.component.html',
  styleUrls: ['./school-request-list.component.scss'],
})
export class SchoolRequestListComponent implements AfterViewInit, OnInit {
  isLoading: Subject<boolean> = this.loaderService.isLoading;
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
    private schoolInfoService: SchoolInfoService,
    private loaderService: LoaderService
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
    return `แจ้งเตือน เลขที่คำขอ : ${req.requestno} ใบคำ${schoolMapRequestType(
      +Number(req.requesttype)
    )} ถูกส่งคืน "ปรับแก้ไข/เพิ่มเติม"
    กรุณาส่งกลับภายในวันที่ ${thaiDate(
      new Date(detail.returndate)
    )} มิฉะนั้นใบคำขอจะถูกยกเลิก `;
  }

  search(f: Partial<SchRequestSearchFilter>) {
    //console.log('filters = ', filters);
    const payload: SchRequestSearchFilter = {
      schoolid: `${this.schoolId}`,
      requesttype: `${f.requesttype}`,
      requestno: f.requestno,
      careertype: f.careertype,
      name: f.name,
      idcardno: f.idcardno,
      passportno: f.passportno,
      process: f.process,
      status: f.status,
      requestdatefrom: f.requestdatefrom,
      requestdateto: f.requestdateto,
      offset: '0',
      row: '500',
    };

    this.requestService.schSearchRequest(payload).subscribe((res) => {
      // search without showing result do automatically after load
      if (this.initialSearch) {
        this.rejectedRequests = hasRejectedRequest(res);
        //console.log('has reject = ', this.rejectedRequests);
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

  getTempLicense(request: KspRequest) {
    this.requestService.getTempLicense(request.id).subscribe((res) => {
      //console.log('temp license = ', res);
      this.genPdf(res);
    });
  }

  genPdf(element: SchTempLicense) {
    console.log('element = ', element);
    const position = element?.position;
    const startDate = new Date(element.licensestartdate || '');
    const endDate = new Date(element.licenseenddate || '');
    const date = new Date(element.licensestartdate || '');
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
    const careertype = SchoolRequestSubType[+(element?.licensetype ?? '1')];
    const careertypeen = SchoolLangMapping[careertype ?? 'ครู'] ?? '';
    const requestno = element.licenseno ?? '';
    const prefix = element.licensetype == '1' ? 'ท.' : 'อ.';
    const payload = {
      schoolid: this.schoolId,
    };

    this.schoolInfoService.getSchoolInfo(payload).subscribe((res: any) => {
      const schoolname = res.schoolname;
      const bureauname = res.bureauname;
      const schoolapprovename = 'ผู้อํานวยการสถานศึกษา';
      const schoolapprovenameen = 'director of the educational institution';
      this.dialog.open(PdfRenderComponent, {
        width: '1200px',
        height: '100vh',
        data: {
          pdfType: element.licensetype,
          pdfSubType: 3,
          input: {
            prefix,
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

    const position = element.position;
    const eduinfo = JSON.parse(element.eduinfo || '');
    const degreelevel = eduinfo[0].degreeLevel;

    let checkbox1 = false;
    if (degreelevel === 1) {
      checkbox1 = true;
    }

    const edu1 = eduinfo.find((item: any) => {
      if (item?.degreeLevel) {
        return item.degreeLevel === '1';
      }
      return false;
    });

    const degreename1 = edu1?.degreeName ?? '';
    const institution1 = edu1?.institution ?? '';
    const major1 = edu1?.major ?? '';
    const graduateDate1 = edu1?.graduateDate ?? '';

    let degree1 = false;
    if (degreename1) {
      degree1 = true;
    }

    const edu2 = eduinfo.find((item: any) => {
      if (item?.degreeLevel) {
        return item.degreeLevel === '2';
      }
      return false;
    });

    const degreename2 = edu2?.degreeName ?? '';
    const institution2 = edu2?.institution ?? '';
    const major2 = edu2?.major ?? '';
    const graduateDate2 = edu2?.graduateDate ?? '';

    let degree2 = false;
    if (degreename2) {
      degree2 = true;
    }

    const nameen = element.firstnameen + ' ' + element.lastnameen;

    /* const hiring = JSON.parse(element.hiringinfo || '');
    const position = hiring.position; */

    const payload = {
      schoolid: this.schoolId,
    };

    const fileinfo = JSON.parse(element.fileinfo || '');
    const tab3 = fileinfo['tab3'];
    const tab4 = fileinfo['tab4'];
    const tab5 = fileinfo['tab5'];
    const tab6 = fileinfo['tab6'];

    //teacher
    const file1_th = tab6[0];
    let file1_thai = false;
    if (file1_th.length > 0) {
      file1_thai = true;
    }

    const file2_thai = true;

    const file3_th = tab6[0];

    const file4_th = tab3[2];
    let file4_thai = false;
    if (file4_th.length > 0) {
      file4_thai = true;
    }

    const file5_th = tab3[0];
    let file5_thai = false;
    if (file5_th.length > 0) {
      file5_thai = true;
    }

    const file6_th = tab3[1];
    let file6_thai = false;
    if (file6_th.length > 0) {
      file6_thai = true;
    }

    const file7_1_th = tab3[3];
    let file7_1_thai = false;
    if (file7_1_th.length > 0) {
      file7_1_thai = true;
    }

    const file7_2_th = tab3[4];
    let file7_2_thai = false;
    if (file7_2_th.length > 0) {
      file7_2_thai = true;
    }

    const file8_th = tab4[1];
    let file8_thai = false;
    if (file8_th.length > 0) {
      file8_thai = true;
    }

    const file9_th = tab4[2];
    let file9_thai = false;
    if (file9_th.length > 0) {
      file9_thai = true;
    }

    const file10_th = tab4[0];
    let file10_thai = false;
    if (file10_th.length > 0) {
      file10_thai = true;
    }

    const file11_th = tab6[1];
    let file11_thai = false;
    if (file11_th.length > 0) {
      file11_thai = true;
    }

    const file12_th = tab6[5];
    let file12_thai = false;
    if (file12_th.length > 0) {
      file12_thai = true;
    }

    const file13_th = tab6[0];

    //manager
    const file7_mgr = tab3[3];
    const file8_mgr = tab4[1];
    const file10_mgr = tab4[0];
    const file11_mgr = tab6[1];
    const file12_mgr = tab6[5];
    const file13_mgr = tab6[5];
    const file14_mgr = tab6[0];

    //foreign
    const file2_frgn = tab3[3];
    const file3_frgn = tab4[1];
    const file4_frgn = tab4[0];
    const file5_frgn = tab6[1];
    const file6_frgn = tab6[5];
    const file7_frgn = tab6[5];
    const file8_frgn = tab6[0];

    console.log('fileinfo = ', file1_th);
    //console.log('fileid = ', file1[0].fileid);

    this.schoolInfoService.getSchoolInfo(payload).subscribe((res: any) => {
      const schoolname = res.schoolname;
      const bureauname = res.bureauname;
      const { address, moo, street, road, tumbon, fax } = res;
      const amphurname = res.amphurname;
      const provincename = res.provincename;
      const zipcode = res.zipcode;
      const telphone = res.telphone;

      //console.log(id12);
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
            position,
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
            degree1,
            graduateDate1,
            degreename2,
            institution2,
            major2,
            degree2,
            graduateDate2,
            nameen,
            checkbox1,
            file1_thai,
            file2_thai,
            file4_thai,
            file5_thai,
            file6_thai,
            file7_1_thai,
            file7_2_thai,
            file8_thai,
            file9_thai,
            file10_thai,
            file11_thai,
            file12_thai,
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
