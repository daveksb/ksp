import { EUniService } from '@ksp/shared/service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import * as XLSX from 'xlsx';
import {
  CompleteDialogComponent,
  ConfirmDialogComponent,
} from '@ksp/shared/dialog';
import _ from 'lodash';
import { PageEvent } from '@angular/material/paginator';
import { ListData } from '@ksp/shared/interface';
import moment from 'moment';
import { thaiDate } from '@ksp/shared/utility';
@Component({
  selector: 'ksp-test-data-detail',
  templateUrl: './test-data-detail.component.html',
  styleUrls: ['./test-data-detail.component.scss'],
})
export class TestDataDetailComponent implements OnInit {
  dataSource = new MatTableDataSource<ImportTest>();
  displayedColumns: string[] = displayedColumns;
  importData: any = [];
  yearOption: ListData[] = [];
  constructor(
    private router: Router,
    public dialog: MatDialog,
    private eUniService: EUniService
  ) {}
  getYear() {
    const year = new Date().getFullYear() + 543;
    this.yearOption = new Array(11).fill(null).map((data, i) => {
      const value = year - i + '';
      return {
        label: value,
        value: value,
      };
    });
  }
  ngOnInit(): void {
    this.getYear();
  }

  search() {
    console.log('search');
  }

  cancel() {
    this.router.navigate(['/', 'import-test']);
  }

  save() {
    const confirmDialog = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: {
        title: `คุณต้องการยืนยันข้อมูลใช่หรือไม่? `,
      },
    });

    confirmDialog.componentInstance.confirmed.subscribe((res) => {
      if (res) {
        // this.eUniService
        //   .insertUniExamResult(
        //     _.filter(this.dataSource.data, ({ isValid }) =>
        //       _.isUndefined(isValid)
        //     )
        //   )
        //   .subscribe(() => {
        //     this.onCompleted();
        //   });
      }
    });
  }

  onCompleted() {
    const completeDialog = this.dialog.open(CompleteDialogComponent, {
      width: '350px',
      data: {
        header: `บันทึกข้อมูลสำเร็จ`,
      },
    });

    completeDialog.componentInstance.completed.subscribe((res) => {
      if (res) {
        this.cancel();
      }
    });
  }
  validateRow(row: any): boolean {
    _.some(_.keys(row), () => {
      return;
    });
    return false;
  }
  otDate(sDate: any) {
    try {
      return _.size(sDate)
        ? moment(sDate, 'DD MMM YY').format('YYYY-MM-DD')
        : '';
    } catch (error) {
      return '';
    }
  }
  toThaiDate(sDate: any) {
    return thaiDate(moment(sDate, 'YYYY-MM-DD').toDate());
  }
  otObject(rowArr: any) {
    return _.map(rowArr, (row: any) => {
      const newOb: any = {
        examcount: _.get(row, '0', '') + '',
        calendaryear: _.get(row, '1', '') + '',
        subjectid: _.get(row, '2', '') + '',
        subjectname: _.get(row, '3', '') + '',
        idcardno: _.get(row, '4', '') + '',
        subjectcode: _.get(row, '5', '') + '',
        firstname: _.get(row, '6', ''),
        lastname: _.get(row, '7', ''),
        userscore: _.get(row, '8', '') + '',
        examscore: _.get(row, '9', '') + '',
        examresult: _.get(row, '10', '') + '',
        examstatus: _.get(row, '11', '') + '',
        annoucedate: this.otDate(_.get(row, '12', '')),
        expiredate: this.otDate(_.get(row, '13', '')),
      };
      if (
        _.some(_.keys(newOb), (key: any) => _.size(newOb[key]) === 0) ||
        _.isNaN(_.toNumber(newOb?.idcardno)) ||
        _.size(newOb?.idcardno) != 13 ||
        _.isNaN(_.toNumber(newOb?.examscore)) ||
        _.isNaN(_.toNumber(newOb?.userscore))
      ) {
        newOb.isValid = false;
      }
      return newOb;
    });
  }
  get exportDataSize() {
    return _.size(this.importData);
  }
  get isValidSize() {
    return _.size(this.importData) - this.inValidSize;
  }
  get inValidSize() {
    return _.filter(
      this.importData,
      ({ isValid }) => isValid === false
    ).length;
  }
  get disableSaveButton() {
    return (
      this.exportDataSize === 0 || this.inValidSize === this.exportDataSize
    );
  }
  async onFileSelected(event: any) {
    const target: DataTransfer = <DataTransfer>event.target;
    const reader: FileReader = new FileReader();
    reader.readAsBinaryString(target.files[0]);
    reader.onload = (e: any) => {
      try {
        const binarystr: string = e.target.result;
        const wb: XLSX.WorkBook = XLSX.read(binarystr, { type: 'binary' });
        this.importData = wb.SheetNames?.reduce(
          (prev: any, curr: any, index: number) => {
            const wsname: string = wb.SheetNames[index];
            const ws: XLSX.WorkSheet = wb.Sheets[wsname];
            let data =
              XLSX.utils.sheet_to_json(ws, {
                header: 1,
                blankrows: false,
                raw: false,
              }) || {};
            data = _.slice(data, 1, _.size(data));
            return [...prev, ...this.otObject(data)];
          },
          []
        ) as ImportTest[];
        this.dataSource.data = _.slice(this.importData, 0, 24);
      } catch (error) {
        console.log('error', error);
      }
    };
  }
  onPaginatorEvent(e: PageEvent) {
   this.dataSource.data = _.slice(this.importData, 24 * e.pageIndex , (24 * e.pageIndex)+ 24)
  }
  getFullName(element: any) {
    return [element?.subjectcode, element?.firstname, element?.lastname]
      .filter((d: any) => d)
      .join(' ');
  }
}

const displayedColumns: string[] = [
  'select',
  // 'examcount',
  'calendaryear',
  'subjectid',
  'subjectname',
  'idcardno',
  'fullname',
  'userscore',
  'examresult',
  'examscore',
  'annoucedate',
  'expiredate',
];
export interface ImportTest {
  select: string;
  // examcount:string;
  calendaryear: string;
  subjectid: string;
  subjectname: string;
  idcardno: string;
  subjectcode: string;
  fullname: string;
  userscore: string;
  examresult: string;
  examscore: string;
  annoucedate: string;
  expiredate: string;
  isValid?: boolean;
}

// export const data2: ImportTest = {
//   year: '2564',
//   subjectCode: '101',
//   subjectName: 'วิชาชีพครู',
//   personId: '3-1020-xXXXX-XX-1',
//   name: 'นางสาวมาลัย ซ่อนกลิ่น',
//   fullScore: '70',
//   score: '70',
//   testResult: 'ผ่าน',
//   testStatus: 'มาสอบ',
//   annouceDate: '01/02/2564',
//   validDate: '01/02/2568',
// };
