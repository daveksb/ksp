import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

@Component({
  selector: 'self-service-test-result-table',
  standalone: true,
  imports: [CommonModule, MatTableModule],
  templateUrl: './test-result-table.component.html',
  styleUrls: ['./test-result-table.component.scss'],
})
export class TestResultTableComponent implements OnInit {
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
    score: '89/100',
    result: 'ผ่าน',
    announceDate: '12/มกราคม/2565',
    endDate: '31/มกราคม/2565',
  },
  {
    id: 2,
    score: '96/100',
    result: 'ผ่าน',
    announceDate: '12/มกราคม/2565',
    endDate: '31/มกราคม/2565',
  },
  {
    id: 3,
    score: '100/100',
    result: 'ไม่ผ่าน',
    announceDate: '12/มกราคม/2565',
    endDate: '31/มกราคม/2565',
  },
];
