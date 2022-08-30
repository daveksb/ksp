import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'self-service-performance-result',
  templateUrl: './performance-result.component.html',
  styleUrls: ['./performance-result.component.scss'],
})
export class PerformanceResultComponent implements OnInit {
  constructor() {}

  displayedColumns: string[] = [
    'id',
    'subject',
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
  subject: string;
  score: string;
  result: string;
  announceDate: string;
  endDate: string;
}

export const data: performanceInfo[] = [
  {
    id: 1,
    subject: 'วิชาชีพครู',
    score: '89',
    result: 'ผ่าน',
    announceDate: '12/มกราคม/2565',
    endDate: '31/มกราคม/2565',
  },
  {
    id: 2,
    subject: 'วิชาชีพครู',
    score: '96',
    result: 'ผ่าน',
    announceDate: '12/มกราคม/2565',
    endDate: '31/มกราคม/2565',
  },
  {
    id: 3,
    subject: 'วิชาชีพครู',
    score: '96',
    result: 'ไม่ผ่าน',
    announceDate: '12/มกราคม/2565',
    endDate: '31/มกราคม/2565',
  },
];
