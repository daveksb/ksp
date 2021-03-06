import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { UniserviceImportType } from '@ksp/shared/interface';

@Component({
  templateUrl: './degree-list.component.html',
  styleUrls: ['./degree-list.component.scss'],
})
export class DegreeListComponent implements OnInit {
  processType!: UniserviceImportType;

  displayedColumns: string[] = columns;
  dataSource = new MatTableDataSource<StudentInfo>();

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.data.subscribe((res) => {
      this.processType = res['type'];
    });
  }

  nextPage(type: number) {
    this.router.navigate([
      '/',
      'student-list',
      'course-detail',
      (this.processType = type - 1),
    ]);
  }

  search() {
    this.dataSource.data = data;
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
    studentStatus: 'รับข้อมูล',
    graduateStatus: 'สร้าง',
    editDate: '12 ส.ค. 2564',
  },
];
