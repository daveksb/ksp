import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

@Component({
  selector: 'ksp-test-performance-list',
  templateUrl: './test-performance-list.component.html',
  styleUrls: ['./test-performance-list.component.scss'],
})
export class TestPerformanceListComponent implements OnInit {
  displayedColumns1: string[] = column1;
  dataSource1 = new MatTableDataSource<course>();

  displayedColumns2: string[] = column2;
  dataSource2 = new MatTableDataSource<student>();

  constructor(private router: Router) {}

  ngOnInit(): void {}

  save() {
    this.router.navigate(['/', 'performance-data-result', 'detail']);
  }

  search() {
    this.dataSource1.data = courseData;
    this.dataSource2.data = studentData;
  }

  clear() {
    this.dataSource1.data = [];
    this.dataSource2.data = [];
  }
}

export const column1 = [
  'university',
  'faculty',
  'degreeCode',
  'degreeName',
  'branch',
  'year',
  'importDate',
  'status',
];

export const column2 = [
  'personId',
  'name',
  'faculty',
  'branch',
  'year',
  'importDate',
  'status',
];

export interface course {
  university: string;
  faculty: string;
  degreeCode: string;
  degreeName: string;
  branch: string;
  year: string;
  importDate: string;
  status: string;
}

export interface student {
  personId: string;
  name: string;
  faculty: string;
  branch: string;
  year: string;
  importDate: string;
  status: string;
}

export const courseData: course[] = [
  {
    university: 'มหาวิทยาลัยราชภัฏพระนครศรีอยุธยา',
    faculty: 'วิทยาศาสตร์',
    degreeCode: '069784',
    degreeName: 'การศึกษาบัณฑิต สาขาวิชาเคมี หลักสูตรปรับปรุง พ.ศ.2562',
    branch: 'วิทยาศาสตร์พื้นฐาน',
    year: '2564',
    importDate: '12 ส.ค. 2564 (ครั้งที่ 1)',
    status: 'สำเร็จ',
  },
];

export const studentData: student[] = [
  {
    personId: '3-1020-xXXXX-XX-1',
    name: 'นางสาวมาลัย ซ่อนกลิ่น',
    faculty: 'ครุศาสตร์',
    branch: 'สาขาวิชาภาษาอังกฤษ',
    year: '2564',
    importDate: '10 มิ.ย. 2566',
    status: 'สำเร็จ',
  },
];
