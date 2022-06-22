import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'self-service-form-user-performance',
  templateUrl: './form-user-performance.component.html',
  styleUrls: ['./form-user-performance.component.css'],
})
export class FormUserPerformanceComponent implements OnInit {
  typesOfSubject: string[] = [
    'วิชาชีพครู',
    'วิชาภาษาไทยเพื่อการสื่อสาร',
    'วิชาภาษาอังกฤษเพื่อการสื่อสาร',
    'วิชาการใช้เทคโนโลยีเพื่อการศึกษา',
  ];
  personSelected = false;
  displayedColumns: string[] = [
    'id',
    'score',
    'result',
    'announceDate',
    'endDate',
  ];
  dataSource = new MatTableDataSource<performanceInfo>();

  ngOnInit(): void {
    this.dataSource.data = data;
  }
}

export interface performanceInfo {
  id: number;
  score: string;
  result: string;
  announceDate: string;
  endDate: string;
}

export const data: performanceInfo[] = [
  {
    id: 1,
    score: '89',
    result: 'ผ่าน',
    announceDate: '12/มกราคม/2565',
    endDate: '31/มกราคม/2565',
  },
  {
    id: 2,
    score: '96',
    result: 'ผ่าน',
    announceDate: '12/มกราคม/2565',
    endDate: '31/มกราคม/2565',
  },
  {
    id: 3,
    score: '96',
    result: 'ไม่ผ่าน',
    announceDate: '12/มกราคม/2565',
    endDate: '31/มกราคม/2565',
  },
];
