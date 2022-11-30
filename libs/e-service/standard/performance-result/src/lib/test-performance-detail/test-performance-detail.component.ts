import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import {
  CompleteDialogComponent,
  ConfirmDialogComponent,
} from '@ksp/shared/dialog';
import { ListData } from '@ksp/shared/interface';
import { EUniService, LoaderService, UniInfoService } from '@ksp/shared/service';
import { getCookie, parseJson, stringToThaiDate } from '@ksp/shared/utility';
import _ from 'lodash';
import moment from 'moment';
import { map, Subject } from 'rxjs';
import * as XLSX from 'xlsx';

@Component({
  selector: 'ksp-test-performance-detail',
  templateUrl: './test-performance-detail.component.html',
  styleUrls: ['./test-performance-detail.component.scss'],
})
export class TestPerformanceDetailComponent implements OnInit {
  data: any = [data2];
  dataSource = new MatTableDataSource<any>();
  displayedColumns: string[] = displayedColumns;
  degreecertData: any;
  degreecertId: any;
  universityTypeList: ListData[] = [];
  degreeLevelList: ListData[] = [];
  sumalladmission: any;
  calendaryearList: ListData[] = [];
  exceltoJson: any;
  form = this.fb.group({
    calendaryear: [null, Validators.required]
  })
  isLoading: Subject<boolean> = this.loaderService.isLoading;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private eUniService: EUniService,
    private uniInfoService: UniInfoService,
    private loaderService: LoaderService) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((res) => {
      this.degreecertId = res.get('id');
    }); 
    this.getOptions();
    this.getDegreecert();
  }

  getOptions() {
    this.uniInfoService.getUniDegreelevel().pipe(
      map((res) => {
        return res?.datareturn?.map(({ id, name }: any) => ({
          value: id,
          label: name,
        }));
      })
    )
    .subscribe((data) => {
      this.degreeLevelList = data;
    });
    this.uniInfoService.getUniversityType().pipe(
      map((res) => {
        return res?.map(({ id, name }: any) => ({
          value: id,
          label: name,
        }));
      })
    )
    .subscribe((data) => {
      this.universityTypeList = data;
    });
    const currYear = new Date().getFullYear();
    for (let index = 0; index < 10; index++) {
      this.calendaryearList.push({
        value: ((currYear - index) + 543).toString(),
        label: ((currYear - index) + 543).toString()
      })
    }
  }

  getDegreecert() {
    this.eUniService.getUniDegreeCertById(this.degreecertId).subscribe(res => {
      if (res) {
        console.log(res);
        res.courseapprovedate = stringToThaiDate(res.courseapprovedate)
        const findType = this.universityTypeList.find(type => { return res.unitype == type.value });
        const findLevel = this.degreeLevelList.find(type => { return res.degreelevel == type.value });
        res.unitypename = findType ? findType.label : '';
        res.degreelevelname = findLevel ? findLevel.label: '';
        res.coursestructure = parseJson(res.coursestructure);
        this.sumalladmission = res.coursestructure.reduce((curr: any, next: any) => {
          return curr + next.student;
        }, 0);
        this.sumalladmission = this.sumalladmission.toLocaleString();
        this.degreecertData = res;
      }
    })
  }

  search() {
    for (let index = 0; index < 3; index++) {
      this.data = [...this.data, data2];
    }
    this.dataSource.data = this.data;
  }

  cancel() {
    this.router.navigate(['/', 'import-performance', 'list']);
  }

  save() {
    const confirmDialog = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: {
        title: `คุณต้องการยืนยันข้อมูลใช่หรือไม่? `,
        btnLabel: 'ยืนยัน',
      },
    });

    confirmDialog.componentInstance.confirmed.subscribe((res) => {
      if (res) {
        const getValiddata = _.filter(this.dataSource.data, ({ isValid }) =>
        _.isUndefined(isValid)
      )
        const payload = {
          userid: getCookie('userId'),
          unidegreecertid: this.degreecertId,
          importstatus: getValiddata.length == this.sumalladmission ? '1' : null,
          calendaryear: this.form.value.calendaryear,
          studentlist: JSON.stringify(getValiddata)
        }
        this.eUniService
          .insertUniPerformanceResult(payload)
          .subscribe(() => {
            this.onCompleted();
          });
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

  async onFileSelected(event: any) {
    this.exceltoJson = {};
    const target: DataTransfer = <DataTransfer>event.target;
    const reader: FileReader = new FileReader();
    reader.readAsBinaryString(target.files[0]);
    this.exceltoJson['filename'] = target.files[0].name;
    reader.onload = (e: any) => {
      const binarystr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(binarystr, { type: 'binary' });
      this.dataSource.data = wb.SheetNames?.reduce(
        (prev: any, curr: any, index: number) => {
          const wsname: string = wb.SheetNames[index];
          const ws: XLSX.WorkSheet = wb.Sheets[wsname];
          let data =
            XLSX.utils.sheet_to_json(ws, {
              header: 1,
              blankrows: false,
              raw: false,
            }) || {};
          data = _.slice(data, 2, _.size(data));
          return [...prev, ...this.otObject(data)];
        },
        []
      );
      console.log(this.dataSource.data)
    };
  }

  otObject(rowArr: any) {
    return _.map(rowArr, (row: any) => {
      const newOb: any = {
        checked: true,
        idcardno: _.get(row, '1', '') + '',
        prefixth: _.get(row, '2', '') + '',
        firstnameth: _.get(row, '3', '') + '',
        lastnameth: _.get(row, '4', '') + '',
        knowledgeavg: _.get(row, '5', '') + '',
        knowledgeresult: _.get(row, '6', '') + '',
        relationavg: _.get(row, '7', '') + '',
        relationresult: _.get(row, '8', '') + '',
        ethicavg: _.get(row, '9', '') + '',
        ethicresult: _.get(row, '10', '') + '',
        averageavg: _.get(row, '11', '') + '',
        averageresult: _.get(row, '12', '') + '',
        uniid: this.degreecertData.uniid,
        unitype: this.degreecertData.unitype,
        uniname: this.degreecertData.uniname,
        unitypename: this.degreecertData.unitypename,
        importdate: moment().format('DD/MM/YYYY'),
        importstatus: '1',
        coursemajor: this.degreecertData.coursemajor
      };
      console.log(newOb?.idcardno.length)
      if (
        _.isNaN(_.toNumber(newOb?.idcardno)) ||
        _.size(newOb?.idcardno) != 13 ||
        _.isEmpty(newOb?.firstnameth) ||
        _.isEmpty(newOb?.lastnameth)
      ) {
        console.log('yep')
        newOb.isValid = false;
        newOb.importstatus = '2'
      }
      return newOb;
    });
  }

  getFullName(element: any) {
    return [element?.prefixth, element?.firstnameth, element?.lastnameth]
      .filter((d: any) => d)
      .join(' ');
  }

  downloadfile() {
    window.open('/assets/file/Example_import_performance.xlsx', '_blank');
  }
}

const displayedColumns: string[] = [
  'checked',
  'idcardno',
  'fullname',
  'knowledgeavg',
  'knowledgeresult',
  'relationavg',
  'relationresult',
  'ethicavg',
  'ethicresult',
  'averageavg',
  'averageresult',
];

export const data2: any = {
  checked: false,
  idcardno: '3-1020-xXXXX-XX-1',
  prefixth: 'นางสาว',
  firstnameth: 'กนกวรรณ',
  lastnameth: 'คล้อยใจตาม',
  knowledgeavg: '5',
  relationavg: '5',
  ethicavg: '5',
  averageavg: '5',
  knowledgeresult: 'ดีมาก',
  relationresult: 'ดีมาก',
  ethicresult: 'ดีมาก',
  averageresult: 'ดีมาก',
};
