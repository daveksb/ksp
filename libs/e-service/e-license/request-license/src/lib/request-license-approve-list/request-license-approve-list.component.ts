import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import {
  SchoolRequestType,
  SelfServiceRequestSubType,
  SelfServiceRequestType,
} from '@ksp/shared/constant';
import {
  EsSearchPayload,
  KspRequest,
  Province,
  SelfRequest,
} from '@ksp/shared/interface';
import {
  AddressService,
  ERequestService,
  LoaderService,
} from '@ksp/shared/service';
import {
  eSelfCheckProcess,
  eSelfCheckStatus,
  formatDatePayload,
  formatRequestNo,
  getCookie,
  hasLevel2RejectedRequest,
  processFilter,
  replaceEmptyWithNull,
  thaiDate,
} from '@ksp/shared/utility';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'ksp-request-license-approve-list',
  templateUrl: './request-license-approve-list.component.html',
  styleUrls: ['./request-license-approve-list.component.scss'],
})
export class RequestLicenseApproveListComponent
  implements AfterViewInit, OnInit
{
  isLoading: Subject<boolean> = this.loaderService.isLoading;
  displayedColumns: string[] = column;
  dataSource = new MatTableDataSource<SelfRequest>();
  SchoolRequestSubType = SelfServiceRequestSubType;
  requestTypeList = SchoolRequestType.filter((i) => i.id > 2);
  checkProcess = eSelfCheckProcess;
  checkStatus = eSelfCheckStatus;
  provinces$!: Observable<Province[]>;
  searchNotFound = false;
  rejectedRequests: KspRequest[] = [];
  form = this.fb.group({
    search: [{ requesttype: '3' }],
  });

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private router: Router,
    private requestService: ERequestService,
    private fb: FormBuilder,
    private loaderService: LoaderService,
    private addressService: AddressService
  ) {}

  ngOnInit(): void {
    // เฉพาะกรณี จนท. ส่วนภูมิภาค
    if (getCookie('permissionRight') === '2') {
      this.defaultSearch();
    }
  }

  defaultSearch() {
    console.log('run default search for school temp request');
    const payload: EsSearchPayload = {
      systemtype: '2',
      provinceid: null,
      requesttype: '3',
      requestno: null,
      careertype: null,
      name: null,
      idcardno: null,
      passportno: null,
      process: '4', //ตรวจสอบเอกสาร ลำดับที่ 2
      status: null,
      schoolid: null,
      schoolname: null,
      bureauid: null,
      requestdatefrom: null,
      requestdateto: null,
      isurgent: null,
      offset: '0',
      row: '1000',
    };

    this.requestService.KspSearchRequest(payload).subscribe((res) => {
      this.rejectedRequests = hasLevel2RejectedRequest(res);
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.provinces$ = this.addressService.getProvinces();
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

  search(params: any) {
    let payload: EsSearchPayload = {
      systemtype: null,
      provinceid: params.province,
      requesttype:
        SelfServiceRequestType.ขอขึ้นทะเบียนหนังสืออนุญาตประกอบวิชาชีพ,
      requestno: params.requestno?.replace(/-/g, '').replace(/\s/g, ''),
      careertype: params.careertype,
      name: null,
      idcardno: params.idcardno?.replace(/-/g, '').replace(/\s/g, ''),
      passportno: null,
      process: params.process,
      status: params.status,
      schoolid: null,
      schoolname: null,
      bureauid: null,
      requestdatefrom: params.requestdatefrom,
      requestdateto: params.requestdateto,
      isurgent: params.isurgent ? '1' : null,
      offset: '0',
      row: '1000',
    };

    payload = replaceEmptyWithNull(payload);
    payload = formatDatePayload(payload);

    this.requestService.KspSearchRequest(payload).subscribe((res) => {
      if (res) {
        this.dataSource.data = res;
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
        this.clear();
        this.searchNotFound = true;
      }
    });
  }

  goToDetail(id: number) {
    this.router.navigate(['/request-license', 'approve-detail', id]);
  }

  clear() {
    this.searchNotFound = false;
    this.dataSource.data = [];
  }

  createGroup() {
    this.router.navigate(['/request-license', 'create-group']);
  }
}

export const column = [
  'id',
  'edit',
  'isurgent',
  'requestno',
  'idcardno',
  'name',
  'subtype',
  'currentprocess',
  'requeststatus',
  'updatedate',
  'requestdate',
  'reqDoc',
  //'approveDoc',
];
