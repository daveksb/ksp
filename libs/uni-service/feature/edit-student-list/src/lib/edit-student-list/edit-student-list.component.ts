import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

@Component({
  selector: 'ksp-edit-student-list',
  templateUrl: './edit-student-list.component.html',
  styleUrls: ['./edit-student-list.component.scss'],
})
export class EditStudentListComponent {
  displayedColumns: string[] = column;
  dataSource = new MatTableDataSource<studentList>();

  constructor(private router: Router) {}

  search() {
    this.dataSource.data = data;
  }

  clear() {
    this.dataSource.data = [];
  }

  create() {
    this.router.navigate(['/', 'edit-student-list', 'detail']);
  }
}

export const column = [
  'id',
  'licenseNumber',
  'requestDate',
  'personId',
  'name',
  'degreeLevel',
  'university',
  'degreeName',
  'major',
  'verifyStatus',
  'lastEditDate',
  'print',
  'history',
];

export interface studentList {
  id: number;
  licenseNumber: string;
  requestDate: string;
  personId: string;
  name: string;
  degreeLevel: string;
  university: string;
  degreeName: string;
  major: string;
  verifyStatus: string;
  lastEditDate: string;
}

export const data: studentList[] = [
  {
    id: 1,
    licenseNumber: '305565052100123',
    requestDate: '21 พ.ค. 2565',
    personId: '3-1020-xXXXX-XX-1',
    name: 'นางสาวมาลัย ซ่อนกลิ่น',
    degreeLevel: 'ปริญาตรีทางการศึกษาหลักสูตร 4 ปี',
    university: 'มหาวิทยาลัยราชภัฏพระนครศรีอยุธยา',
    degreeName: 'การศึกษาบัณฑิต สาขาวิชาเคมี หลักสูตรปรับปรุง พ.ศ.2562',
    major: 'วิทยาศาสตร์พื้นฐาน',
    verifyStatus: 'สร้าง',
    lastEditDate: '10 ต.ค. 2564',
  },
  {
    id: 2,
    licenseNumber: '305565052100123',
    requestDate: '21 พ.ค. 2565',
    personId: '3-1020-xXXXX-XX-1',
    name: 'นางสาวมาลัย ซ่อนกลิ่น',
    degreeLevel: 'ปริญาตรีทางการศึกษาหลักสูตร 4 ปี',
    university: 'มหาวิทยาลัยราชภัฏพระนครศรีอยุธยา',
    degreeName: 'การศึกษาบัณฑิต สาขาวิชาเคมี หลักสูตรปรับปรุง พ.ศ.2562',
    major: 'วิทยาศาสตร์พื้นฐาน',
    verifyStatus: 'สร้าง',
    lastEditDate: '10 ต.ค. 2564',
  },
];
