import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import {
  careerTypeList,
  SchoolLangMapping,
  SchoolRequestSubType,
  SchoolRequestType,
} from '@ksp/shared/constant';
import { PdfRenderComponent } from '@ksp/shared/dialog';
import {
  EsSearchPayload,
  KspRequest,
  Province,
  SchRequestSearchFilter,
  SchTempLicense,
} from '@ksp/shared/interface';
import {
  AddressService,
  ERequestService,
  LoaderService,
} from '@ksp/shared/service';
import {
  checkProcess,
  schoolMapRequestType,
  checkStatus,
  processFilter,
  thaiDate,
  teachingLevels,
  teachingSubjects,
  changeToThaiNumber,
  changeToEnglishMonth,
} from '@ksp/shared/utility';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'e-service-temp-license-list',
  templateUrl: './temp-license-list.component.html',
  styleUrls: ['./temp-license-list.component.scss'],
})
export class ETempLicenseListComponent implements AfterViewInit {
  isLoading: Subject<boolean> = this.loaderService.isLoading;
  form!: any;
  defaultForm: any;
  displayedColumns: string[] = column;
  dataSource = new MatTableDataSource<KspRequest>();
  SchoolRequestSubType = SchoolRequestSubType;
  checkProcess = checkProcess;
  checkRequestType = schoolMapRequestType;
  checkStatus = checkStatus;
  requestTypeList = SchoolRequestType.filter((i) => i.id > 2);
  careerType = 1;
  careerTypeList: any[] = [];
  requestLabel = '';
  provinces$!: Observable<Province[]>;
  searchNotFound = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    public dialog: MatDialog,
    private eRequestService: ERequestService,
    private loaderService: LoaderService,
    private addressService: AddressService
  ) {
    this.checkCareerType();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.provinces$ = this.addressService.getProvinces();
  }

  checkCareerType() {
    this.route.paramMap.subscribe((params) => {
      this.defaultForm = {
        requesttype: '3',
        careertype: params.get('careertype'),
      };
      this.form = this.fb.group({
        search: [this.defaultForm],
      });

      if (params.get('careertype') === '5') {
        this.careerType = Number(params.get('careertype'));
        this.careerTypeList = careerTypeList.filter((i) => i.id === 5);
        this.requestLabel = 'ชาวต่างชาติ';
        //console.log('career type = ', this.careerType);
      } else {
        this.careerTypeList = careerTypeList.filter((i) => i.id < 3);
        this.requestLabel = 'ชาวไทย';
        //console.log('no career type ');
      }
    });
  }

  search(params: Partial<SchRequestSearchFilter>) {
    //console.log('params = ', params);
    const payload: EsSearchPayload = {
      systemtype: '2',
      //systemtype: null,
      requesttype: '3',
      requestno: params.requestno,
      careertype: params.careertype,
      name: params.name,
      idcardno: params.idcardno,
      passportno: params.passportno,
      provinceid: params.provinceid,
      process: params.process,
      status: params.status,
      schoolid: null,
      schoolname: null,
      bureauid: null,
      requestdatefrom: params.requestdatefrom,
      requestdateto: params.requestdateto,
      offset: '0',
      row: '500',
    };

    this.eRequestService.KspSearchRequest(payload).subscribe((res) => {
      if (res && res.length) {
        //this.dataSource.data = res;
        this.dataSource.data = processFilter(res);

        this.dataSource.sort = this.sort;
        const sortState: Sort = {
          active: 'requestdate',
          direction: 'asc',
        };
        this.sort.active = sortState.active;
        this.sort.direction = sortState.direction;
        this.sort.sortChange.emit(sortState);

        this.searchNotFound = false;
      } else {
        this.clearData();
        this.searchNotFound = true;
      }
    });
  }

  genPdf(element: any) {
    const position = element?.position;
    const startDate = new Date(element.licensestartdate || '');
    const endDate = new Date(element.licenseenddate || '');
    const date = new Date(element.licensestartdate || '');
    const thai = thaiDate(date);
    const [day, month, year] = thai.split(' ');
    const fulldateth = `${changeToThaiNumber(
      day
    )} เดือน ${month} พ.ศ. ${changeToThaiNumber(year)}`;
    const fulldateen = `${day} Day of ${changeToEnglishMonth(month)} B.E. ${
      parseInt(year) - 543
    }`;

    let prefixen = '';
    let prefixth = '';

    if (element.prefixen === '1') {
      prefixen = 'MR.';
    } else if (element.prefixen === '2') {
      prefixen = 'MRS.';
    } else if (element.prefixen === '3') {
      prefixen = 'MISS.';
    } else if (element.prefixen === '4') {
      prefixen = 'MS.';
    } else if (element.prefixen === '5') {
      prefixen = 'LADY';
    } else if (element.prefixen === '6') {
      prefixen = 'M.L.';
    } else if (element.prefixen === '7') {
      prefixen = 'M.R.';
    } else if (element.prefixen === '8') {
      prefixen = 'M.C.';
    } else {
      prefixen = 'Not Indentified';
    }
    const nameen =
      prefixen + ' ' + element.firstnameen + ' ' + element.lastnameen;

    if (element.prefixth === '1') {
      prefixth = 'นาย';
    } else if (element.prefixth === '2') {
      prefixth = 'นาง';
    } else if (element.prefixth === '3') {
      prefixth = 'นางสาว';
    } else if (element.prefixth === '4') {
      prefixth = 'นางหรือนางสาว';
    } else if (element.prefixth === '5') {
      prefixth = 'ท่านผู้หญิง';
    } else if (element.prefixth === '6') {
      prefixth = 'หม่อมหลวง';
    } else if (element.prefixth === '7') {
      prefixth = 'หม่อมราชวงศ์';
    } else if (element.prefixth === '8') {
      prefixth = 'หม่อมเจ้า';
    } else {
      prefixth = 'ไม่ระบุ';
    }
    const name =
      prefixth + ' ' + element.firstnameth + ' ' + element.lastnameth;

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

    const schoolname = element.schoolname;
    const bureauname = element.bureauname;
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
  }

  renderPdf(request: KspRequest) {
    //console.log('request = ', request);
    const pdfType = request.requesttype;
    const pdfSubType = request.careertype;
    const date = new Date(request.requestdate || '');
    const thai = thaiDate(date);
    const [day, month, year] = thai.split(' ');
    const name = request.firstnameth + ' ' + request.lastnameth;
    const phone = request.contactphone;
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
    ] = request?.idcardno?.split('') ?? [];

    const approvetimes = '';

    const email = request.email;
    const nationality = request.nationality;
    const birthdate = thaiDate(new Date(request.birthdate || ''));
    const passportno = request.passportno;

    const eduinfo = JSON.parse(request.eduinfo || '');

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

    const teachinginfo = JSON.parse(request.teachinginfo || '');

    let lv1 = false;
    let lv2 = false;
    let lv3 = false;
    let lv4 = false;
    let lv5 = false;
    let lv6 = false;
    let lv7 = false;
    let level: any;
    let levelName = '';

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

    const nameen = request.firstnameen + ' ' + request.lastnameen;
    //console.log('request.schooladdrinfo = ', request.schooladdrinfo);
    const school = JSON.parse(request.schooladdrinfo || '');
    const { address, moo, street, road, tumbon, fax } = school;
    const schoolname = school.schoolname;
    const bureauname = school.bureauname;
    const amphurname = school.amphurname;
    const provincename = school.provincename;
    const zipcode = school.zipcode;
    const telphone = school.telphone;
    const schoolemail = school.email;
    const managername =
      school.thprefixname + ' ' + school.thname + ' ' + school.thfamilyname;
    const managerposition = school.thposition;
    const hiring = JSON.parse(request.hiringinfo || '');
    const hiringStartDate = thaiDate(new Date(hiring.startDate));
    const hiringEndDate = thaiDate(new Date(hiring.endDate));
    const position = hiring.position;

    const prohibit = JSON.parse(request.prohibitproperty || '');

    const immoral = prohibit.immoral;
    const incompetent = prohibit.incompetent;
    const prison = prohibit.prison;

    let forbid1_1 = false;
    let forbid1_2 = false;
    if (request.careertype !== '5') {
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

    let forbid2_1 = false;
    let forbid2_2 = false;
    if (request.careertype !== '5') {
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

    let forbid3_1 = false;
    let forbid3_2 = false;
    let forbid3 = '';
    let prisonDetail = '';
    if (request.careertype !== '5') {
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

    let label1 = '';
    let label2 = '';
    let label3 = '';
    let label4 = '';

    let reasonDetail = '';
    let reasonDetail2 = '';
    /* let reasonDetail3 = ''; */

    const reason = JSON.parse(request.reasoninfo || '');
    if (reason) {
      const schReason = reason.schoolReasons;

      if (schReason[0] === true) {
        if (request.careertype === '2') {
          label1 =
            'ผู้ขอประกอบวิชาชีพผู้บริหารสถานศึกษา เป็นผู้มีความรู้ ความสามารถในการบริหารสถานศึกษา ';
        } else {
          label1 = 'ผู้ขอประกอบวิชาชีพครูเป็นผู้มีความรู้ ความสามารถในการสอน ';
        }
      }
      if (schReason[1] === true) {
        if (request.careertype === '2') {
          label2 =
            'ผู้ขอประกอบวิชาชีพผู้บริหารสถานศึกษา เป็นผู้มีประสบการณ์ในการบริหารสถานศึกษา ';
        } else {
          label2 = 'ผู้ขอประกอบวิชาชีพครูเป็นผู้มีประสบการณ์ ในการสอน ';
        }
      }
      if (schReason[2] === true) {
        if (request.careertype === '2') {
          label3 = 'ขาดแคลนผู้บริหารสถานศึกษาที่มีหนังสืออนุญาตประกอบวิชาชีพ ';
        } else {
          label3 = 'ขาดแคลนครูผู้สอนที่มีหนังสืออนุญาตประกอบวิชาชีพ ';
        }
      }
      if (schReason[3] === true) {
        label4 = 'และ' + reason.schoolOtherDetail;
      }

      reasonDetail = label1 + label2;
      reasonDetail2 = label3 + label4;
      /*  if (request.careertype !== '5') {
        reasonDetail2 = label2;
        reasonDetail3 = label3 + label4;
      } else {
        reasonDetail2 = label2 + label3 + label4;
      } */
    }

    const fileinfo = JSON.parse(request.fileinfo || '');

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

    let prefixen = '';

    if (request.prefixen === '1') {
      prefixen = 'MR.';
    } else if (request.prefixen === '2') {
      prefixen = 'MRS.';
    } else if (request.prefixen === '3') {
      prefixen = 'MISS.';
    } else if (request.prefixen === '4') {
      prefixen = 'MS.';
    } else if (request.prefixen === '5') {
      prefixen = 'LADY';
    } else if (request.prefixen === '6') {
      prefixen = 'M.L.';
    } else if (request.prefixen === '7') {
      prefixen = 'M.R.';
    } else if (request.prefixen === '8') {
      prefixen = 'M.C.';
    } else {
      prefixen = 'Not Indentified';
    }

    const nameen_full =
      prefixen + ' ' + request.firstnameen + ' ' + request.lastnameen;

    let prefixth = '';
    //console.log(' request.prefixth= ', request.prefixth);
    if (request.prefixth === '1') {
      prefixth = 'นาย';
    } else if (request.prefixth === '2') {
      prefixth = 'นาง';
    } else if (request.prefixth === '3') {
      prefixth = 'นางสาว';
    } else if (request.prefixth === '4') {
      prefixth = 'นางหรือนางสาว';
    } else if (request.prefixth === '5') {
      prefixth = 'ท่านผู้หญิง';
    } else if (request.prefixth === '6') {
      prefixth = 'หม่อมหลวง';
    } else if (request.prefixth === '7') {
      prefixth = 'หม่อมราชวงศ์';
    } else if (request.prefixth === '8') {
      prefixth = 'หม่อมเจ้า';
    } else {
      prefixth = 'ไม่ระบุ';
    }

    const name_full =
      prefixth + ' ' + request.firstnameth + ' ' + request.lastnameth;

    //console.log('res = ', schReason[0]);

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
          approvetimes,
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
          nameen_full,
          name_full,
          managername,
          managerposition,
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
  }

  clearData() {
    this.searchNotFound = false;
    this.dataSource.data = [];
    this.form.reset();
    this.form.controls.search.patchValue(this.defaultForm);
  }

  goToDetail(item: KspRequest) {
    //console.log('item = ', item);
    this.router.navigate(['/temp-license', 'detail', item.id], {
      queryParams: { subtype: item.careertype },
    });
  }
}

export const column = [
  'id',
  'edit',
  'requestno',
  'idcardno',
  'name',
  'subtype',
  'currentprocess',
  'requeststatus',
  'updatedate',
  'requestdate',
  'reqDoc',
  'license',
];
