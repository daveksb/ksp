import { FormBuilder } from '@angular/forms';
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
import { thaiDate, isIdCard } from '@ksp/shared/utility';
import { map, zip } from 'rxjs';
const MAX_UPLOAD_DATA = 2000;
const otDate = (sDate: any) => {
  try {
    return _.size(sDate) ? moment(sDate, 'DD MMM YY').format('YYYY-MM-DD') : '';
  } catch (error) {
    return '';
  }
};
const covertToObject = (rowArr: any) =>
  _.map(rowArr, (row: any) => ({
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
    annoucedate: otDate(_.get(row, '12', '')),
    expiredate: otDate(_.get(row, '13', '')),
  }));
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
  courseNameOption: ListData[] = [];
  form = this.fb.group({
    calendaryear: [],
    subjectname: [],
  });
  constructor(
    private router: Router,
    public dialog: MatDialog,
    private eUniService: EUniService,
    private fb: FormBuilder
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
  getCourseNameOption() {
    this.eUniService
      .getUniExamCourse()
      .pipe(
        map((res: any): any => {
          return (
            res?.datareturn?.map((op: any) => ({
              value: op?.id,
              label: op?.coursename,
            })) || []
          );
        })
      )
      .subscribe((res: any) => {
        this.courseNameOption = res;
      });
  }
  ngOnInit(): void {
    this.getCourseNameOption();
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
        this.eUniService
          .insertUniExamInfo({
            uniuserid: null,
            examcount: null,
            subjectid: null,
            subjectcode: this.subjectCode,
            subjectname: this.subjectName,
            calendaryear: this.form.value?.calendaryear,
          })
          .subscribe((res) => {
            if (res?.id) {
              let collection2000: any = _.chunk(
                _.filter(this.importData, ({ isValid }) =>
                  _.isUndefined(isValid)
                ),
                MAX_UPLOAD_DATA
              );
              collection2000 = collection2000.map((rows: any) => {
                return this.eUniService.insertUniExamResult(
                  rows?.map((row: any) => {
                    return {
                      ...row,
                      uniexaminfoid: res?.id,
                      fullname: [
                        row?.firstname || '',
                        row?.lastname || '',
                      ].join(' '),
                    };
                  })
                );
              });
              zip(collection2000).subscribe((res) => {
                this.onCompleted()
              });
            }
          });
        //   let uploadData = this.importData;
        //   if (_.size(uploadData) > MAX_UPLOAD_DATA) {
        //     this.importData = _.slice(uploadData, 2000);
        //     uploadData = _.slice(uploadData, 0, 1999);
        //     this.dataSource.data = _.slice(this.importData, 0, 24);
        //   } else {
        //     this.importData = [];
        //     this.dataSource.data = [];
        //   }

        // .subscribe(() => {
        //   this.onCompleted();
        // });
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
  toThaiDate(sDate: any) {
    return thaiDate(moment(sDate, 'YYYY-MM-DD').toDate());
  }
  otObject(rowArr: any) {
    let mappingColumn = covertToObject(rowArr);
    mappingColumn = _.map(mappingColumn, (row: any) => {
      if (
        !isIdCard(row?.idcardno) ||
        _.some(
          _.keys(row),
          (key: any) =>
            _.size(row[key]) === 0 ||
            _.size(_.filter(mappingColumn, { idcardno: row?.idcardno })) > 1
        ) ||
        _.isNaN(_.toNumber(row?.examscore)) ||
        _.isNaN(_.toNumber(row?.userscore))
      ) {
        row.isValid = false;
      }
      return row;
    });

    return mappingColumn;
  }
  get exportDataSize() {
    return _.size(this.importData);
  }
  get isValidSize() {
    return _.size(this.importData) - this.inValidSize;
  }
  get inValidSize() {
    return _.filter(this.importData, ({ isValid }) => isValid === false).length;
  }
  get disableSaveButton() {
    return (
      this.exportDataSize === 0 ||
      this.inValidSize === this.exportDataSize ||
      !this.form.controls.calendaryear.value ||
      !this.subjectCode
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
    this.dataSource.data = _.slice(
      this.importData,
      24 * e.pageIndex,
      24 * e.pageIndex + 24
    );
  }
  getFullName(element: any) {
    return [element?.subjectcode, element?.firstname, element?.lastname]
      .filter((d: any) => d)
      .join(' ');
  }
  get subjectName() {
    let value: any = this.form.controls.subjectname.value;
    value = _.find(this.courseNameOption, {
      value,
    })?.label;
    return value;
  }

  get subjectCode() {
    return this.form.controls.subjectname.value;
  }

  downloadfile() {
    window.open('/assets/file/Example_import_result.xls', '_blank');
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
