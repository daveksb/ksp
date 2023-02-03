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
  teachingSubjects,
  teachingLevels,
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
  requestTypeList = SchoolRequestType.filter((i) => i.id > 2 && i.id !== 5);
  careerTypeList = careerTypeList;
  initialSearch = true;
  rejectedRequests: KspRequest[] = [];
  tempLicenseHistory: SchTempLicense[] = [];
  tempLicenseRequestTimes: any;
  reqTypeStatus = false;
  viewMoreClicked = false;
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

  getColumnLabel() {
    if (this.form.controls.licenseSearch.value?.requesttype !== '3') {
      return 'หนังสือแจ้งผล';
    } else return 'หนังสืออนุญาตฯ';
  }

  genAlertMessage(req: KspRequest) {
    const detail: any = JSON.parse(req.detail || '');
    return `แจ้งเตือน เลขที่คำขอ : ${req.requestno} ใบคำ${schoolMapRequestType(
      +Number(req.requesttype)
    )} ถูกส่งคืน "ปรับแก้ไข/เพิ่มเติม"
    กรุณาส่งกลับภายในวันที่ ${thaiDate(
      new Date(detail.returndate)
    )} มิฉะนั้นแบบคำขอจะถูกยกเลิก `;
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
      }

      // กรณีเลือกใบคำขอ 4 displayColumn จะไม่แสดง column สุดท้าย
      if (payload.requesttype === '4' || payload.requesttype === '40') {
        this.displayedColumns = displayedColumnsKSP;
      } else {
        this.displayedColumns = displayedColumns;
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
    if (req.requesttype !== '4') {
      this.reqTypeStatus = true;
    } else {
      this.reqTypeStatus = false;
    }

    const tempRequestApproved =
      req.requesttype === '3' && req.process === '5' && req.status === '2';
    const qualificationApproved =
      req.requesttype === '6' && req.process === '3' && req.status === '2';
    const rewardApprove =
      req.requesttype === '40' && req.process === '4' && req.status === '2';
    if (tempRequestApproved || rewardApprove || qualificationApproved) {
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

  getStatusColor(status: number, process: number, requestType: number) {
    //console.log(process, status, requestType);
    if (requestType === 3) {
      if (status === 0 && process !== 5) {
        return 'border-secondary text-secondary';
      }
      if (status === 1) {
        return 'border-orange text-orange';
      }
      if (
        (status === 3 && process === 3) ||
        (status === 3 && process === 4) ||
        (status === 2 && process === 5)
      ) {
        return 'border-success text-success';
      }
      if (
        (status === 2 && process === 3) ||
        (status === 4 && process === 3) ||
        (status === 5 && process === 3) ||
        (status === 2 && process === 4) ||
        (status === 4 && process === 4) ||
        (status === 5 && process === 4) ||
        (status === 3 && process === 5)
      ) {
        return 'border-danger text-danger';
      } else {
        return '';
      }
    } else if (requestType === 4) {
      if (status === 0) {
        return 'border-secondary text-secondary';
      }
      if (status === 1) {
        return 'border-orange text-orange';
      }
      if (status === 2 && process === 2) {
        return 'border-success text-success';
      }
      if (status === 3 && process === 2) {
        return 'border-danger text-danger';
      } else {
        return '';
      }
    } else if (requestType === 6) {
      if (status === 0 || (status === 5 && process === 2)) {
        return 'border-secondary text-secondary';
      }
      if (status === 1) {
        return 'border-orange text-orange';
      }
      if (
        (status === 3 && process === 2) ||
        (status === 3 && process === 3) ||
        (status === 5 && process === 3)
      ) {
        return 'border-success text-success';
      }
      if (
        (status === 2 && process === 2) ||
        (status === 4 && process === 2) ||
        (status === 3 && process === 3) ||
        (status === 4 && process === 3) ||
        (status === 6 && process === 3)
      ) {
        return 'border-danger text-danger';
      } else {
        return '';
      }
    } else if (requestType === 40) {
      if (status === 0 || (status === 5 && process === 2)) {
        return 'border-secondary text-secondary';
      }
      if (status === 1) {
        return 'border-orange text-orange';
      }
      if ((status === 3 && process === 3) || (status === 2 && process === 4)) {
        return 'border-success text-success';
      }
      if (
        (status === 2 && process === 3) ||
        (status === 4 && process === 3) ||
        (status === 6 && process === 3) ||
        (status === 3 && process === 4) ||
        (status === 4 && process === 4)
      ) {
        return 'border-danger text-danger';
      } else {
        return '';
      }
    } else {
      return '';
    }
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

    let approve1 = false;
    let approve2 = false;
    let approve3 = false;

    this.requestService
      .getTempLicenseHistory(element.idcardno)
      .subscribe((res) => {
        this.tempLicenseHistory = res;
        this.tempLicenseRequestTimes =
          (this.tempLicenseHistory?.length || 0) + 1;

        if (Number(this.tempLicenseRequestTimes) === 1) {
          approve1 = true;
        } else if (Number(this.tempLicenseRequestTimes) === 2) {
          approve2 = true;
        } else if (Number(this.tempLicenseRequestTimes) === 3) {
          approve3 = true;
        }
      });

    const position = element.position;
    const eduinfo = JSON.parse(element.eduinfo || '');
    const email = element.email;
    const nationality = element.nationality;
    const birthdate = element.birthdate;
    const passportno = element.passportno;

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
    const grade1 = edu1?.grade ?? '';

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
    const grade2 = edu2?.grade ?? '';

    let degree2 = false;
    if (degreename2) {
      degree2 = true;
    }

    const edu3 = eduinfo.find((item: any) => {
      if (item?.degreeLevel) {
        return item.degreeLevel === '3';
      }
      return false;
    });

    const degreename3 = edu3?.degreeName ?? '';
    const institution3 = edu3?.institution ?? '';
    const major3 = edu3?.major ?? '';
    const graduateDate3 = edu3?.graduateDate ?? '';
    const grade3 = edu3?.grade ?? '';

    let degree3 = false;
    if (degreename3) {
      degree3 = true;
    }

    const admission1 = edu1?.admissionDate ?? '';
    const country1 = edu1?.country ?? '';

    const teachinginfo = JSON.parse(element.teachinginfo || '');

    let subject: any;
    let subjectName = '';
    let otherSubject = '';

    for (const index in teachinginfo.teachingSubjects) {
      subject = teachingSubjects(teachinginfo.teachingSubjects[index]);
      subjectName += subject + ' ';
    }

    if (teachinginfo.teachingSubjectOther !== null) {
      otherSubject = teachinginfo.teachingSubjectOther;
      subjectName = subjectName + otherSubject;
    }

    let lv1 = false;
    let lv2 = false;
    let lv3 = false;
    let lv4 = false;
    let lv5 = false;
    let lv6 = false;
    let lv7 = false;
    let level: any;
    let levelName = '';

    for (const index in teachinginfo.teachingLevel) {
      level = teachingLevels(teachinginfo.teachingLevel[index]);
      levelName += level + ' ';

      if (teachinginfo.teachingLevel[index] === 'level1') {
        lv1 = true;
      }
      if (teachinginfo.teachingLevel[index] === 'level2') {
        lv2 = true;
      }
      if (teachinginfo.teachingLevel[index] === 'level3') {
        lv3 = true;
      }
      if (teachinginfo.teachingLevel[index] === 'level4') {
        lv4 = true;
      }
      if (teachinginfo.teachingLevel[index] === 'level5') {
        lv5 = true;
      }
      if (teachinginfo.teachingLevel[index] === 'level6') {
        lv6 = true;
      }
      if (teachinginfo.teachingLevel[index] === 'level7') {
        lv7 = true;
      }
    }

    const nameen = element.firstnameen + ' ' + element.lastnameen;

    let hiringStartDate = '';
    let hiringEndDate = '';

    const hiring = JSON.parse(element.hiringinfo || '');

    if (hiring) {
      hiringStartDate = hiring.startDate;
      hiringEndDate = hiring.endDate;
    }

    const payload = {
      schoolid: this.schoolId,
    };

    let label1 = '';
    let label2 = '';
    let label3 = '';
    let label4 = '';
    let reasonDetail = '';
    let reasonDetail2 = '';
    let reasonDetail3 = '';

    const reason = JSON.parse(element.reasoninfo || '');

    if (reason) {
      const schReason = reason.schoolReasons;
      if (schReason[0] === true) {
        if (element.careertype === '2') {
          label1 =
            'ผู้ขอประกอบวิชาชีพผู้บริหารสถานศึกษา เป็นผู้มีความรู้ ความสามารถในการบริหารสถานศึกษา ';
        } else {
          label1 = 'ผู้ขอประกอบวิชาชีพครูเป็นผู้มีความรู้ ความสามารถในการสอน ';
        }
      }
      if (schReason[1] === true) {
        if (element.careertype === '2') {
          label2 =
            'ผู้ขอประกอบวิชาชีพผู้บริหารสถานศึกษา เป็นผู้มีประสบการณ์ในการบริหารสถานศึกษา ';
        } else {
          label2 = 'ผู้ขอประกอบวิชาชีพครูเป็นผู้มีประสบการณ์ ในการสอน ';
        }
      }
      if (schReason[2] === true) {
        if (element.careertype === '2') {
          label3 = 'ขาดแคลนผู้บริหารสถานศึกษาที่มีหนังสืออนุญาตประกอบวิชาชีพ ';
        } else {
          label3 = 'ขาดแคลนครูผู้สอนที่มีหนังสืออนุญาตประกอบวิชาชีพ ';
        }
      }
      if (schReason[3] === true) {
        label4 = 'และ' + reason.schoolOtherDetail;
      }
      reasonDetail = label1;
      if (element.careertype !== '5') {
        reasonDetail2 = label2;
        reasonDetail3 = label3 + label4;
      } else {
        reasonDetail2 = label2 + label3 + label4;
      }
    }

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

    const file3_th = tab6[6];

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

    const file13_th = tab6[6];

    //manager
    const file7_mgr = tab6[6];

    const file8_mgr = tab4[1];
    let file8_manager = false;
    if (file8_mgr.length > 0) {
      file8_manager = true;
    }

    const file10_mgr = tab6[6];
    const file11_mgr = tab6[6];
    const file12_mgr = tab6[6];

    const file13_mgr = tab6[5];
    let file13_manager = false;
    if (file13_mgr.length > 0) {
      file13_manager = true;
    }

    const file14_mgr = tab6[6];

    //foreign
    const file2_frgn = tab3[0];
    let file2_foreign = false;
    if (file2_frgn.length > 0) {
      file2_foreign = true;
    }

    const file3_frgn = tab3[1];
    let file3_foreign = false;
    if (file3_frgn.length > 0) {
      file3_foreign = true;
    }

    const file4_frgn = tab6[6];

    const file5_frgn = tab3[4];
    let file5_foreign = false;
    if (file5_frgn.length > 0) {
      file5_foreign = true;
    }

    const file6_frgn = tab6[6];

    const file7_frgn = tab4[1];
    let file7_foreign = false;
    if (file7_frgn.length > 0) {
      file7_foreign = true;
    }

    const file8_frgn = tab6[5];
    let file8_foreign = false;
    if (file8_frgn.length > 0) {
      file8_foreign = true;
    }

    let forbid1_1 = false;
    let forbid1_2 = false;
    let forbid2_1 = false;
    let forbid2_2 = false;
    let forbid3_1 = false;
    let forbid3_2 = false;
    let forbid3 = '';
    let prisonDetail = '';

    if (element.prohibitproperty) {
      const prohibit = JSON.parse(element.prohibitproperty || '');

      if (prohibit) {
        const immoral = prohibit.immoral;
        const incompetent = prohibit.incompetent;
        const prison = prohibit.prison;

        if (element.careertype !== '5') {
          if (immoral === '2') {
            forbid1_1 = true;
          } else {
            forbid1_2 = true;
          }
        } else {
          if (immoral === '2') {
            forbid1_2 = true;
          } else {
            forbid1_1 = true;
          }
        }

        if (element.careertype !== '5') {
          if (incompetent === '2') {
            forbid2_1 = true;
          } else {
            forbid2_2 = true;
          }
        } else {
          if (immoral === '2') {
            forbid2_2 = true;
          } else {
            forbid2_1 = true;
          }
        }

        if (element.careertype !== '5') {
          if (prison === '2') {
            forbid3_1 = true;
          } else {
            forbid3_2 = true;
            prisonDetail = prohibit.prisonReason;
          }
        } else {
          if (immoral === '2') {
            forbid3 = 'No';
          } else {
            forbid3 = 'Yes' + ' ' + prohibit.prisonReason;
          }
        }
      }
    }

    this.schoolInfoService.getSchoolInfo(payload).subscribe((res: any) => {
      const schoolname = res.schoolname;
      const bureauname = res.bureauname;
      const { address, moo, street, road, tumbon, fax } = res;
      const amphurname = res.amphurname;
      const provincename = res.provincename;
      const zipcode = res.zipcode;
      const telphone = res.telphone;
      const schoolemail = res.email;
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
            email,
            schoolemail,
            nationality,
            birthdate,
            passportno,
            position,
            hiringStartDate,
            hiringEndDate,
            country1,
            admission1,
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
            approve1,
            approve2,
            approve3,
            degreename1,
            institution1,
            major1,
            degree1,
            graduateDate1,
            grade1,
            degreename2,
            institution2,
            major2,
            degree2,
            graduateDate2,
            grade2,
            degreename3,
            institution3,
            major3,
            degree3,
            graduateDate3,
            grade3,
            nameen,
            subjectName,
            lv1,
            lv2,
            lv3,
            lv4,
            lv5,
            lv6,
            lv7,
            levelName,
            reasonDetail,
            reasonDetail2,
            reasonDetail3,
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
            file8_manager,
            file13_manager,
            file2_foreign,
            file3_foreign,
            file5_foreign,
            file7_foreign,
            file8_foreign,
            forbid1_1,
            forbid2_1,
            forbid3_1,
            forbid1_2,
            forbid2_2,
            forbid3_2,
            forbid3,
            prisonDetail,
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

export const displayedColumnsKSP = [
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
];
