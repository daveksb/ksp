import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import {
  CompleteDialogComponent,
  ConfirmDialogComponent,
} from '@ksp/shared/dialog';
import { ListData } from '@ksp/shared/interface';
import { EUniService, UniInfoService } from '@ksp/shared/service';
import { parseJson, stringToThaiDate } from '@ksp/shared/utility';
import { map } from 'rxjs';
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

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private eUniService: EUniService,
    private uniInfoService: UniInfoService) {}

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
        value: currYear - index,
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
        this.onCompleted();
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
    const newdata = [];
    reader.onload = (e: any) => {
      const binarystr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(binarystr, { type: 'binary' });
      let newsarr: any[];
      for (let i = 0; i < wb.SheetNames.length; ++i) {
        const wsname: string = wb.SheetNames[i];
        const ws: XLSX.WorkSheet = wb.Sheets[wsname];
        const data = XLSX.utils.sheet_to_json(ws,
          {
            header: 1,
            blankrows: false,
            raw: false,
          }) || {};
        delete data[0];
        delete data[1];
        console.log(data)
        data.forEach((newdata: any) => {
          if (newdata && newdata.length) {
            this.dataSource.data.push({
              idcardno: newdata[1],
              prefixth: newdata[2],
              firstnameth: newdata[3],
              lastnameth: newdata[4],
              knowledgeavg: newdata[5],
              knowledgeresult: newdata[6],
              relationavg: newdata[7],
              relationresult: newdata[8],
              ethicavg: newdata[9],
              ethicresult: newdata[10],
              averageavg: newdata[11],
              averageresult: newdata[12]
            })
          }
        });
        console.log(this.dataSource.data)
      }
    };
  }

}

const displayedColumns: string[] = [
  'checked',
  'idcardno',
  'fullname',
  'score1',
  'evaluate1',
  'score2',
  'evaluate2',
  'score3',
  'evaluate3',
  'score4',
  'evaluate4',
];

export const data2: any = {
  personId: '3-1020-xXXXX-XX-1',
  name: 'นางสาวกนกวรรณ คล้อยใจตาม',
  score1: '5',
  score2: '5',
  score3: '5',
  score4: '5',
  evaluate1: 'ดีมาก',
  evaluate2: 'ดีมาก',
  evaluate3: 'ดีมาก',
  evaluate4: 'ดีมาก',
};
