import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { UniInfoService, UniRequestService } from '@ksp/shared/service';
import { getCookie, stringToThaiDate } from '@ksp/shared/utility';
import { UniserviceImportType, KspPaginationComponent, ListData } from '@ksp/shared/interface';

import {
  HistoryRequestDialogComponent,
  PrintRequestDialogComponent,
} from '@ksp/uni-service/dialog';
import { DegreeCertInfo } from '@ksp/uni-service/feature/edit-degree-cert';

@Component({
  templateUrl: './degree-list.component.html',
  styleUrls: ['./degree-list.component.scss'],
})
export class DegreeListComponent extends KspPaginationComponent implements OnInit {
  processType!: UniserviceImportType;

  displayedColumns: string[] = columns;
  // dataSource = new MatTableDataSource<StudentInfo>();
  dataSource = new MatTableDataSource<DegreeCertInfo>();
  form = this.fb.group({
    search: [{}],
  });
  uniUniversityOption: ListData[] = [];
  uniUniversityTypeOption: ListData[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    public uniRequestService: UniRequestService,
    private uniInfoService: UniInfoService
  ) {
    super();
  }

  ngOnInit(): void {
    this.route.data.subscribe((res) => {
      this.processType = res['type'];
    });
    this.form.setValue({
      search: {
        institution: getCookie('uniId'),
        affiliation: getCookie('uniType'),
      },
    });
    this.getOptions();
    this.getDegreeCertList();
  }

  getOptions() {
    this.getUniversity();
    this.getUniversityType();
  }

  getUniversity() {
    const { affiliation } = this.form.controls.search.value as any;
    this.uniInfoService.getUniversity(affiliation).subscribe(response=>{
      if (response) {
        this.uniUniversityOption = response;
      }
    })
  }

  getUniversityType() {
    this.uniInfoService.getUniversityType().subscribe(response=>{
      if (response) {
        this.uniUniversityTypeOption = response;
      }
    })
  }

  getRequest() {
    const form = this.form.controls.search.value as any;
    return {
      uniid: form.institution,
      unitype: form.affiliation,
      degreeapprovecode: form.degreeCode,
      fulldegreenameth: form.degreeName,
      degreelevel: form.degreeLevel,
      courseacademicyear: form.openYear,
      requestno: form.requestNumber,
      requestdate: form.requestsubmitDate,
      row: 10,
      offset: 0
    };
  }

  getDegreeCertList() {
    this.uniRequestService.searchUniDegreeCert(this.getRequest())
    .subscribe((res) => {
      if (!res?.datareturn) {
        this.dataSource.data = [];
        return;
      };
      this.pageEvent.length = res.countrow;
      this.dataSource.data = res?.datareturn.map(
        (item: any, index: number) => {
          return {
              id: item?.id,
              key: item?.id,
              order: this.pageEvent.pageIndex * this.pageEvent.pageSize + ++index,
              degreeCode: item?.degreeapprovecode,
              sendDate: stringToThaiDate(item?.requestdate),
              major: item?.coursename,
              branch: item?.coursefieldofstudy,
              degreeName: item?.fulldegreenameth,
              approveStatus: 'พิจารณา',
              approveDate: '30 ส.ค. 2564',
              editDate: item?.updatedate ? stringToThaiDate(item?.updatedate) : '',
              verify: 'แก้ไข',
              consider: 'แก้ไข',
          };
        }
      );
    });
  }

  nextPage(id: number) {
    this.router.navigate([
      '/',
      'student-list',
      'course-detail',
      id,
    ]);
  }

  history(row: any) {
    const payload = {
      unidegreecertid: row.id
    };
    this.uniInfoService.uniDegreeHistory(payload).subscribe((response => {
      if (response.datareturn) {
        this.opendialogHistory(response.datareturn);
      }
    }));
  }

  opendialogHistory(data: any) {
    this.dialog.open(HistoryRequestDialogComponent, {
      width: '600px',
      data: data
    });
  }

  print(data: any) {
    const payload = {
      unidegreecertid: data.id
    };
    this.uniInfoService.uniDegreeHistory(payload).subscribe((response => {
      if (response.datareturn) {
        this.dialog.open(PrintRequestDialogComponent, {
          width: '600px',
          data: response.datareturn
        });
      }
    }));
  }

  clear() {
    this.form.reset();
    this.getDegreeCertList();
  }
}
const columns = [
  'order',
  'edit',
  'sendDate',
  'degreeCode',
  'major',
  'branch',
  'degreeName',
  'studentStatus',
  'graduateStatus',
  'editDate',
  'print',
  'history',
];
export interface StudentInfo {
  order: number;
  edit: string;
  sendDate: string;
  degreeCode: string;
  major: string;
  branch: string;
  degreeName: string;
  studentStatus: string;
  graduateStatus: string;
  editDate: string;
}

export const data: StudentInfo[] = [
  {
    order: 1,
    edit: '',
    sendDate: '12 ส.ค. 2564',
    degreeCode: '069784',
    major: 'การศึกษาบัณฑิต สาขาวิชาเคมี หลักสูตรปรับปรุง พ.ศ.2562',
    branch: 'วิทยาศาสตร์',
    degreeName: 'วิทยาศาสตร์บัณฑิต',
    studentStatus: 'สร้าง',
    graduateStatus: '-',
    editDate: '12 ส.ค. 2564',
  },
  {
    order: 2,
    edit: '',
    sendDate: '12 ส.ค. 2564',
    degreeCode: '069784',
    major: 'การศึกษาบัณฑิต สาขาวิชาเคมี หลักสูตรปรับปรุง พ.ศ.2562',
    branch: 'วิทยาศาสตร์',
    degreeName: 'วิทยาศาสตร์บัณฑิต',
    studentStatus: 'ยื่นเรียบร้อย',
    graduateStatus: '-',
    editDate: '12 ส.ค. 2564',
  },
  {
    order: 3,
    edit: '',
    sendDate: '12 ส.ค. 2564',
    degreeCode: '069784',
    major: 'การศึกษาบัณฑิต สาขาวิชาเคมี หลักสูตรปรับปรุง พ.ศ.2562',
    branch: 'วิทยาศาสตร์',
    degreeName: 'วิทยาศาสตร์บัณฑิต',
    studentStatus: 'รับข้อมูล',
    graduateStatus: 'สร้าง',
    editDate: '12 ส.ค. 2564',
  },
  {
    order: 4,
    edit: '',
    sendDate: '12 ส.ค. 2564',
    degreeCode: '069784',
    major: 'การศึกษาบัณฑิต สาขาวิชาเคมี หลักสูตรปรับปรุง พ.ศ.2562',
    branch: 'วิทยาศาสตร์',
    degreeName: 'วิทยาศาสตร์บัณฑิต',
    studentStatus: 'รับข้อมูล',
    graduateStatus: 'ยื่นเรียบร้อย',
    editDate: '12 ส.ค. 2564',
  },
];
