import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

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
  print: string;
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
    print: '',
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
    print: '',
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
    graduateStatus: 'รับข้อมูล',
    editDate: '12 ส.ค. 2564',
    print: '',
  },
];

@Component({
  selector: 'uni-service-course-search',
  templateUrl: './course-search.component.html',
  styleUrls: ['./course-search.component.scss'],
})
export class CourseSearchComponent {
  displayedColumns: string[] = [
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
  ];
  dataSource = new MatTableDataSource<StudentInfo>();

  constructor(private router: Router) {}

  nextPage() {
    this.router.navigate(['/', 'graduate-list', 'course-detail']);
  }

  search() {
    this.dataSource.data = data;
  }

  clear() {
    this.dataSource.data = [];
  }
}
