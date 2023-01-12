import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import {
  careerTypeList,
  SchoolRequestProcess,
  SchoolRequestType,
} from '@ksp/shared/constant';
import { SchRequestProcess, SchRequestStatus } from '@ksp/shared/interface';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'ksp-temp-license-report',
  templateUrl: './temp-license-report.component.html',
  styleUrls: ['./temp-license-report.component.scss'],
})
export class TempLicenseReportComponent implements OnInit {
  displayedColumns: string[] = column;
  dataSource = new MatTableDataSource<refundConfirmInfo>();

  requestTypeList = SchoolRequestType.filter((i) => i.id === 3);
  careerList = careerTypeList;

  processList: SchRequestProcess[] = [];
  statusList?: SchRequestStatus[] = [];

  form = this.fb.group({
    requesttype: [null, Validators.required],
    careertype: [null],
    process: [null],
    status: [null],
    requestdatefrom: [null],
    requestdateto: [null],
  });

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form.controls.requesttype.valueChanges
      .pipe(untilDestroyed(this))
      .subscribe((requestType) => {
        // update process list
        this.processList = SchoolRequestProcess.filter((i) => {
          return `${i.requestType}` === requestType;
        });
      });

    this.form.controls.process.valueChanges.subscribe((currentProcess) => {
      this.statusList = this.processList.find(
        (p) => `${p.processId}` === currentProcess
      )?.status;
      //console.log('status list = ', this.statusList);
    });
  }

  search() {
    this.dataSource.data = data;
  }

  clear() {
    this.dataSource.data = [];
    this.form.reset();
  }
}

interface refundConfirmInfo {
  order: string;
  receiptno: string;
  refid: string;
  idcardno: string;
  name: string;
  feetype: string;
  amount: string;
}

const data: refundConfirmInfo[] = [
  {
    order: '',
    receiptno: '-',
    refid: '-',
    idcardno: '-',
    name: '-',
    feetype: '-',
    amount: '-',
  },
];

const column = [
  'order',
  'name',
  'idcardno',
  'refid',
  'receiptno',
  'amount',
  'feetype',
];
