import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

@Component({
  selector: 'ksp-test-data-list',
  templateUrl: './test-data-list.component.html',
  styleUrls: ['./test-data-list.component.scss'],
})
export class TestDataListComponent implements OnInit {
  displayedColumns: string[] = column;
  dataSource = new MatTableDataSource<testResult>();

  constructor(private router: Router) {}

  search() {
    this.dataSource.data = data;
  }

  clear() {
    this.dataSource.data = [];
  }

  import() {
    this.router.navigate(['/', 'test-data-result', 'detail']);
  }

  ngOnInit(): void {}
}

export const column = [
  'id',
  'year',
  'subjectCode',
  'personId',
  'name',
  'score',
  'testResult',
  'testStatus',
  'importDate',
  'announceDate',
];

export interface testResult {
  id: number;
  year: string;
  subjectCode: string;
  personId: string;
  name: string;
  score: string;
  testResult: string;
  testStatus: string;
  importDate: string;
  announceDate: string;
}

export const data: testResult[] = [
  {
    id: 1,
    year: '2564',
    subjectCode: '101',
    personId: '3-1020-xXXXX-XX-1',
    name: 'นางสาวมาลัย ซ่อนกลิ่น',
    score: '80',
    testResult: 'ผ่าน',
    testStatus: 'มาสอบ',
    importDate: '10 ต.ค. 2564',
    announceDate: '10 ต.ค. 2564',
  },
  {
    id: 2,
    year: '2564',
    subjectCode: '101',
    personId: '3-1020-xXXXX-XX-1',
    name: 'นางสาวมาลัย ซ่อนกลิ่น',
    score: '80',
    testResult: 'ผ่าน',
    testStatus: 'มาสอบ',
    importDate: '10 ต.ค. 2564',
    announceDate: '10 ต.ค. 2564',
  },
];
