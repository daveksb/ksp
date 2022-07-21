import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'ksp-test-performance-detail',
  templateUrl: './test-performance-detail.component.html',
  styleUrls: ['./test-performance-detail.component.scss'],
})
export class TestPerformanceDetailComponent implements OnInit {
  data: importTest[] = [data2];
  dataSource = new MatTableDataSource<importTest>();
  displayedColumns: string[] = displayedColumns;

  constructor() {}

  ngOnInit(): void {}

  search() {
    for (let index = 0; index < 3; index++) {
      this.data = [...this.data, data2];
    }
    this.dataSource.data = this.data;
  }
}

const displayedColumns: string[] = [
  'select',
  'personId',
  'name',
  'score1',
  'evaluate1',
  'score2',
  'evaluate2',
  'score3',
  'evaluate3',
  'score4',
  'evaluate4',
];
export interface importTest {
  personId: string;
  name: string;
  score1: string;
  score2: string;
  score3: string;
  score4: string;
  evaluate1: string;
  evaluate2: string;
  evaluate3: string;
  evaluate4: string;
}

export const data2: importTest = {
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
