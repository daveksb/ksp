import { Component, Input, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

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
      result: 'อนุมัติออกหนังสืออนุญาต',
      count: 0,
    },
    {
      result: 'ไม่อนุมัติออกหนังสืออนุญาต',
      count: 0,
    },
    {
      result: 'กรณีเร่งด่วนออกหนังสืออนุญาตแล้ว',
      count: 0,
    },
  ];
  displayedColumns: string[] = ['result', 'count'];
  dataSource = new MatTableDataSource<any>();

  //constructor(private router: Router) {}

  ngOnInit(): void {
    this.dataSource.data = this.data;
  }
}
