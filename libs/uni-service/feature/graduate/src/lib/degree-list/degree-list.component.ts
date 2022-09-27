import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { ListData, UniserviceImportType } from '@ksp/shared/interface';
import { UniInfoService, UniRequestService } from '@ksp/shared/service';
import { getCookie, stringToThaiDate } from '@ksp/shared/utility';
import {
  HistoryRequestDialogComponent,
  PrintRequestDialogComponent,
} from '@ksp/uni-service/dialog';
import { DegreeCertInfo } from '@ksp/uni-service/feature/edit-degree-cert';
import { map } from 'rxjs';

@Component({
  templateUrl: './degree-list.component.html',
  styleUrls: ['./degree-list.component.scss'],
})
export class DegreeListComponent implements OnInit {
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
  ) {}

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
    console.log(this.form.value)
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
      if (!res?.datareturn) return;
      this.dataSource.data = res?.datareturn.map(
        (item: any, index: number) => {
          return {
            key: item?.id,
              order: ++index,
              degreeCode: item?.degreeapprovecode,
              sendDate: item?.requestdate,
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
  // 'order',
  // 'edit',
  // 'sendDate',
  // 'degreeCode',
  // 'major',
  // 'branch',
  // 'degreeName',
  // 'studentStatus',
  // 'graduateStatus',
  // 'editDate',
  // 'print',
  // 'history',
  nextPage(type: number) {
    this.router.navigate([
      '/',
      'student-list',
      'course-detail',
      (this.processType = type - 1),
    ]);
  }

  history() {
    this.dialog.open(HistoryRequestDialogComponent, {
      width: '400px',
    });
  }

  print() {
    this.dialog.open(PrintRequestDialogComponent, {
      width: '400px',
    });
  }

  clear() {
    this.dataSource.data = [];
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
