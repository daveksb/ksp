import { Component, Input, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';

@Component({
  selector: 'e-service-request-license-approve-summary-table',
  standalone: true,
  templateUrl: './request-license-approve-summary-table.component.html',
  styleUrls: ['./request-license-approve-summary-table.component.scss'],
  imports: [MatTableModule],
})
export class RequestLicenseApproveSummaryTableComponent implements OnInit {
  @Input() data = [
    {
      result: 'อนุมัติออกใบอนุญาต',
      count: 100,
    },
    {
      result: 'ไม่อนุมัติออกใบอนุญาต',
      count: 1,
    },
    {
      result: 'กรณีเร่งด่วนออกใบอนุญาตแล้ว',
      count: 2,
    },
  ];
  displayedColumns: string[] = ['result', 'count'];
  dataSource = new MatTableDataSource<any>();

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.dataSource.data = this.data;
  }
}
