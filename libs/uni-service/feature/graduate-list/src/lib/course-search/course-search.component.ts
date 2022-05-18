import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

export interface StudentInfo {
  order: number;
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
    order: 3,
    sendDate: '12 ส.ค. 2564',
    degreeCode: '069784',
    major: 'การศึกษาบัณฑิต สาขาวิชาเคมี หลักสูตรปรับปรุง พ.ศ.2562',
    branch: 'วิทยาศาสตร์',
    degreeName: 'วิทยาศาสตร์บัณฑิต',
    studentStatus: 'รับข้อมูล',
    graduateStatus: 'รับข้อมูล',
    editDate: '12 ส.ค. 2564',
  },
];

@Component({
  selector: 'uni-service-course-search',
  templateUrl: './course-search.component.html',
  styleUrls: ['./course-search.component.scss'],
})
export class CourseSearchComponent {
  data: StudentInfo[] = [];

  constructor(private router: Router) {}

  nextPage() {
    this.router.navigate(['/', 'graduate-list', 'course-detail']);
  }

  search() {
    this.data = data;
  }

  clear() {
    this.data = [];
  }
}
