import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

@Component({
  selector: 'ksp-test-performance-list',
  templateUrl: './test-performance-list.component.html',
  styleUrls: ['./test-performance-list.component.scss'],
})
export class TestPerformanceListComponent implements OnInit {
  /* data: importTest[] = [data2];
  dataSource = new MatTableDataSource<importTest>();
  displayedColumns: string[] = displayedColumns; */

  constructor(private router: Router) {}

  ngOnInit(): void {}

  save() {
    this.router.navigate(['/', 'performance-data-result', 'detail']);
  }
}

/* const displayedColumns: string[] = [
  'select',
  'year',
  'subjectCode',
  'subjectName',
  'personId',
  'name',
  'fullScore',
  'score',
  'testResult',
  'testStatus',
  'annouceDate',
  'validDate',
];
export interface importTest {
  year: string;
  subjectCode: string;
  subjectName: string;
  personId: string;
  name: string;
  fullScore: string;
  score: string;
  testResult: string;
  testStatus: string;
  annouceDate: string;
  validDate: string;
}

export const data2: importTest = {
  year: '2564',
  subjectCode: '101',
  subjectName: 'วิชาชีพครู',
  personId: '3-1020-xXXXX-XX-1',
  name: 'นางสาวมาลัย ซ่อนกลิ่น',
  fullScore: '70',
  score: '70',
  testResult: 'ผ่าน',
  testStatus: 'มาสอบ',
  annouceDate: '01/02/2564',
  validDate: '01/02/2568',
};

 */
