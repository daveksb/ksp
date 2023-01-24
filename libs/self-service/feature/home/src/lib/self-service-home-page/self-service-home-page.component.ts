import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import {
  SelfServiceRequestSubType,
  SelfServiceRequestForType,
} from '@ksp/shared/constant';
import {
  KspRequest,
  KSPRequestSelfSearchFilter,
  SelfRequest,
} from '@ksp/shared/interface';
import {
  LoaderService,
  MyInfoService,
  SelfRequestService,
} from '@ksp/shared/service';
import {
  formatRequestNo,
  getCookie,
  hasRejectedRequest,
  replaceEmptyWithNull,
  SelfCheckProcess,
  SelfcheckStatus,
  SelfHasRejectedRequest,
  selfMapRequestType,
  thaiDate,
} from '@ksp/shared/utility';
import { Subject } from 'rxjs';

@Component({
  selector: 'ksp-self-service-home-page',
  templateUrl: './self-service-home-page.component.html',
  styleUrls: ['./self-service-home-page.component.scss'],
})
export class SelfServiceHomePageComponent implements AfterViewInit, OnInit {
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  isLoading: Subject<boolean> = this.loaderService.isLoading;
  checkStatus = SelfcheckStatus;
  checkProcess = SelfCheckProcess;
  selfMapRequestType = selfMapRequestType;
  dataSource = new MatTableDataSource<SelfRequest>();
  searchNotFound = false;
  displayedColumns: string[] = column;
  initialSearch = true;
  rejectedRequests: KspRequest[] = [];
  userType = '1';
  form = this.fb.group({
    requestno: [],
    requesttype: [],
    requestdate: [],
  });

  constructor(
    private router: Router,
    private requestService: SelfRequestService,
    private fb: FormBuilder,
    private loaderService: LoaderService,
    private myInfoService: MyInfoService
  ) {}

  ngOnInit(): void {
    this.defaultSearch();
    this.myInfoService.getMyInfo().subscribe((res) => {
      if (res && res.usertype) {
        this.userType = res.usertype;
      }
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  defaultSearch() {
    const payload = new KSPRequestSelfSearchFilter();
    payload.idcardno = getCookie('idCardNo');
    this.requestService.searchMyRequests(payload).subscribe((res) => {
      //console.log('res  = ', res);
      this.rejectedRequests = SelfHasRejectedRequest(res);
      //console.log('has reject = ', this.rejectedRequests);
    });
  }

  search() {
    let payload: KSPRequestSelfSearchFilter = {
      requesttype: this.form.controls.requesttype.value,
      requestno: this.form.controls.requestno.value,
      requestdate: this.form.controls.requestdate.value,
      status: null,
      process: null,
      paymentstatus: null,
      idcardno: getCookie('idCardNo'),
      kuruspano: getCookie('kuruspaNo'),
      offset: '0',
      row: '200',
    };

    payload = replaceEmptyWithNull(payload);

    this.requestService.searchMyRequests(payload).subscribe((res) => {
      if (this.initialSearch) {
        this.rejectedRequests = hasRejectedRequest(res);
      }

      if (res && res.length) {
        //console.log('res xx = ', res);
        this.searchNotFound = false;
        this.dataSource.data = res.filter((item) => item.process !== '0');
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

  goToDetail(input: SelfRequest) {
    //console.log('self request = ', input);
    const requestType = Number(input.requesttype);
    const subType = Number(input.careertype);
    const isForeign = Number(input.isforeign);
    const id = Number(input.id);
    //console.log('subType ', subType);

    if (requestType >= 40) {
      this.reward(id);
    } else if (requestType === 30) {
      this.refundFee(id);
    } else if (requestType === 6) {
      this.compare(id);
    } else if (requestType === 5) {
      this.transfer(id);
    } else if (requestType === 4) {
      this.substituteLicense(id);
    } else if (requestType === 3) {
      this.licenseEdit(id);
    } else if (requestType === 2) {
      // renew
      this.checkRenewRedirect(subType, isForeign, id);
    } else if (requestType === 1) {
      // new

      this.checkRequestRedirect(subType, isForeign, id);
    }
  }

  checkRequestRedirect(
    subtype: SelfServiceRequestSubType,
    isForeign: SelfServiceRequestForType,
    id: number
  ) {
    switch (subtype) {
      case SelfServiceRequestSubType.ครู: {
        if (isForeign === SelfServiceRequestForType.ชาวไทย) {
          this.thaiTeacher(id);
        } else {
          this.foreignTeacher(subtype, id);
        }
        break;
      }
      case SelfServiceRequestSubType.ผู้บริหารสถานศึกษา: {
        if (isForeign === SelfServiceRequestForType.ชาวไทย) {
          this.schoolManager(id);
        } else {
          this.foreignTeacher(subtype, id);
        }
        break;
      }
      case SelfServiceRequestSubType.ผู้บริหารการศึกษา:
        this.eduManagerRequest(id);
        break;
      case SelfServiceRequestSubType.ศึกษานิเทศก์:
        this.studySupervision(id);
        break;
    }
  }

  checkRenewRedirect(
    subtype: SelfServiceRequestSubType,
    isForeign: SelfServiceRequestForType,
    id: number
  ) {
    switch (subtype) {
      case SelfServiceRequestSubType.ครู: {
        if (isForeign === SelfServiceRequestForType.ชาวไทย) {
          this.teacherRenew(id);
        } else {
          this.foreignRenew(subtype, id);
        }
        break;
      }
      case SelfServiceRequestSubType.ผู้บริหารสถานศึกษา: {
        if (isForeign === SelfServiceRequestForType.ชาวไทย) {
          this.schManagerRenew(id);
        } else {
          this.foreignRenew(subtype, id);
        }
        break;
      }
      case SelfServiceRequestSubType.ผู้บริหารการศึกษา:
        this.eduManagerRenew(id);
        break;
      case SelfServiceRequestSubType.ศึกษานิเทศก์:
        this.supervisionRenew(id);
        break;
    }
  }

  clear() {
    this.form.reset();
    this.dataSource.data = [];
    this.searchNotFound = false;
  }

  // ครูไทย
  thaiTeacher(id?: number) {
    this.router.navigate(['/license', 'teacher', ...(id ? [`${id}`] : [])]);
  }
  //ครู + ผู้บริหหาร ต่างชาติ
  foreignTeacher(type: SelfServiceRequestSubType, id?: number) {
    if (id) {
      this.router.navigate(
        ['/license', 'foreign-teacher', ...(id ? [`${id}`] : [])],
        {
          queryParams: { type },
        }
      );
    } else {
      this.router.navigate(['/license', 'agreement'], {
        queryParams: { type },
      });
    }
  }
  // ผู้บริหารสถานศึกษา
  schoolManager(id?: number) {
    this.router.navigate([
      '/license',
      'school-manager',
      ...(id ? [`${id}`] : []),
    ]);
  }
  // ผู้บริหารการศึกษา
  eduManagerRequest(id?: number) {
    this.router.navigate([
      '/license',
      'education-manager',
      ...(id ? [`${id}`] : []),
    ]);
  }
  //ศึกษานิเทศก์
  studySupervision(id?: number) {
    this.router.navigate([
      '/license',
      'study-supervision',
      ...(id ? [`${id}`] : []),
    ]);
  }
  // ครูไทย
  teacherRenew(id?: number) {
    this.router.navigate([
      '/renew-license',
      'request',
      ...(id ? [`${id}`] : []),
    ]);
  }
  //ครู + ผู้บริหาร ต่างชาติ
  foreignRenew(type: SelfServiceRequestSubType, id?: number) {
    this.router.navigate(
      ['/renew-license', 'foreign', ...(id ? [`${id}`] : [])],
      {
        queryParams: { type },
      }
    );
  }
  // ผู้บริหารสถานศึกษา
  schManagerRenew(id?: number) {
    this.router.navigate([
      '/renew-license',
      'school-manager',
      ...(id ? [`${id}`] : []),
    ]);
  }
  // ผู้บริหารการศึกษา
  eduManagerRenew(id?: number) {
    this.router.navigate([
      '/renew-license',
      'education-manager',
      ...(id ? [`${id}`] : []),
    ]);
  }
  //ศึกษานิเทศก์
  supervisionRenew(id?: number) {
    this.router.navigate([
      '/renew-license',
      'study-supervision',
      ...(id ? [`${id}`] : []),
    ]);
  }

  //ขอเปลี่ยนแปลง/แก้ไขหนังสืออนุญาตประกอบวิชาชีพ
  licenseEdit(id?: number) {
    this.router.navigate(['/license', 'edit', ...(id ? [`${id}`] : [])]);
  }

  //ขอรับรางวัล
  reward(id?: number) {
    this.router.navigate(['/reward', 'request', ...(id ? [`${id}`] : [])]);
  }

  // ขอหนังสือรับรองความรู้
  transfer(id?: number) {
    this.router.navigate([
      '/transfer-knowledge',
      'request',
      ...(id ? [`${id}`] : []),
    ]);
  }

  // เทียบเคียง
  compare(id?: number) {
    this.router.navigate([
      '/compare-knowledge',
      'request',
      ...(id ? [`${id}`] : []),
    ]);
  }

  // คืนเงินค่าธรรมเนียม
  refundFee(id?: number) {
    this.router.navigate(['/refund-fee', 'request', ...(id ? [`${id}`] : [])]);
  }

  //ขอใบแทนหนังสืออนุญาตประกอบวิชาชีพ
  substituteLicense(id?: number) {
    this.router.navigate([
      '/substitute-license',
      'request',
      ...(id ? [`${id}`] : []),
    ]);
  }

  genAlertMessage(req: KspRequest) {
    const detail: any = JSON.parse(req.detail || '');
    //console.log('return date = ', detail.returndate);
    return `แจ้งเตือน เลขที่คำขอ: ${formatRequestNo(
      req.requestno || ''
    )} ถูกส่งคืน "ปรับแก้ไข/เพิ่มเติม"
    กรุณาส่งกลับภายในวันที่ ${thaiDate(
      new Date(detail.returndate)
    )} มิฉะนั้นแบบคำขอจะถูกยกเลิก `;
  }
}

export const column = [
  'order',
  'requestno',
  'requesttype',
  'requestdate',
  'name',
  'paymentStatus',
  'process',
  'listStatus',
  'editDate',
  'edit',
  'print',
];
