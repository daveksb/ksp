import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import {
  SelfServiceRequestSubType,
  RefundReason,
  SelfServiceRequestType,
} from '@ksp/shared/constant';
import { SelfRequest, EsSearchPayload } from '@ksp/shared/interface';
import { ERequestService, LoaderService } from '@ksp/shared/service';
import {
  eSelfCheckProcess,
  eSelfCheckStatus,
  replaceEmptyWithNull,
} from '@ksp/shared/utility';
import { Subject } from 'rxjs';

@Component({
  selector: 'ksp-e-fee-refund-create-roster',
  templateUrl: './e-fee-refund-create-roster.component.html',
  styleUrls: ['./e-fee-refund-create-roster.component.scss'],
})
export class EFeeRefundCreateRosterComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  isLoading: Subject<boolean> = this.loaderService.isLoading;
  displayedColumns: string[] = column2;
  dataSource = new MatTableDataSource<SelfRequest>();
  checkProcess = eSelfCheckProcess;
  checkStatus = eSelfCheckStatus;
  SchoolRequestSubType = SelfServiceRequestSubType;
  JSON = JSON;
  RefundReason = RefundReason;
  searchNotFound = false;

  form = this.fb.group({
    licenseno: [],
    idcardno: [],
    name: [],
    requestdatefrom: [],
    requestdateto: [],
  });

  constructor(
    private router: Router,
    private requestService: ERequestService,
    private loaderService: LoaderService,
    private fb: FormBuilder
  ) {}
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }
  search() {
    let payload: EsSearchPayload = {
      systemtype: '1',
      requesttype: SelfServiceRequestType.ขอคืนเงินค่าธรรมเนียม,
      requestno: this.form.controls.licenseno.value,
      careertype: null,
      name: this.form.controls.name.value,
      idcardno: this.form.controls.idcardno.value,
      passportno: null,
      process: '3',
      status: null,
      schoolid: null,
      schoolname: null,
      bureauid: null,
      requestdatefrom: this.form.controls.requestdatefrom.value,
      requestdateto: this.form.controls.requestdateto.value,
      offset: '0',
      row: '1000',
    };

    payload = replaceEmptyWithNull(payload);

    this.requestService.KspSearchRequest(payload).subscribe((res) => {
      if (res) {
        //console.log(res);
        this.dataSource.data = res;
        this.searchNotFound = false;
      } else {
        this.clear();
        this.searchNotFound = true;
      }
      // this.dataSource.data = res;
      // this.dataSource.sort = this.sort;

      // const sortState: Sort = { active: 'id', direction: 'desc' };
      // this.sort.active = sortState.active;
      // this.sort.direction = sortState.direction;
      // this.sort.sortChange.emit(sortState);
    });
  }

  clear() {
    this.searchNotFound = false;
    this.form.reset();
    this.dataSource.data = [];
  }

  create() {
    this.router.navigate(['/refund-fee', 'roster-detail']);
  }

  verify(id: number) {
    this.router.navigate(['/refund-fee', 'detail', id]);
  }
}

export interface refundInfo2 {
  order: string;
  ssn: string;
  name: string;
  feeType: string;
  profession: string;
  reason: string;
  process: string;
  status: string;
  submitDate: string;
  approveDate: string;
  refundDate: string;
}

export const column2 = [
  'select',
  'order',
  'ssn',
  'name',
  'feeType',
  'profession',
  'reason',
  'process',
  'status',
  'submitDate',
  'approveDate',
  'refundDate',
  'verify',
  'approve',
];
