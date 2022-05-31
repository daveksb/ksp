import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';

type Mode = 'accusation' | 'investigation' | 'inquiry' | 'publish' | null;

export interface AccusationList {
  id: string;
  receiveDate: string;
  blackNumber: string;
  redNumber: string;
  personId: string;
  name: string;
  process: string;
  status: string;
  lastUpdate: string;
}

export const data: AccusationList[] = [
  {
    id: '641000001',
    receiveDate: '15 มิ.ย. 2654',
    blackNumber: 'xx/2564',
    redNumber: 'xx/2564',
    personId: 'x-xxxx-xxxx-xx-x',
    name: 'นายประหยัด จันทร์อังคาร',
    process: 'บันทึกข้อมูลกล่าวหา/กล่าวโทษ',
    status: 'อยู่รหว่างดำเนินการ',
    lastUpdate: '15 มิ.ย. 2569',
  },
  {
    id: '641000001',
    receiveDate: '15 มิ.ย. 2654',
    blackNumber: 'xx/2564',
    redNumber: 'xx/2564',
    personId: 'x-xxxx-xxxx-xx-x',
    name: 'นายประหยัด จันทร์อังคาร',
    process: 'บันทึกข้อมูลกล่าวหา/กล่าวโทษ',
    status: 'อยู่รหว่างดำเนินการ',
    lastUpdate: '15 มิ.ย. 2569',
  },
  {
    id: '641000001',
    receiveDate: '15 มิ.ย. 2654',
    blackNumber: 'xx/2564',
    redNumber: 'xx/2564',
    personId: 'x-xxxx-xxxx-xx-x',
    name: 'นายประหยัด จันทร์อังคาร',
    process: 'บันทึกข้อมูลกล่าวหา/กล่าวโทษ',
    status: 'อยู่รหว่างดำเนินการ',
    lastUpdate: '15 มิ.ย. 2569',
  },
];

@Component({
  selector: 'e-service-ethic-accusation-list',
  templateUrl: './accusation-list.component.html',
  styleUrls: ['./accusation-list.component.scss'],
})
export class AccusationListComponent implements OnInit {
  mode: Mode = null;
  dataSource = new MatTableDataSource<AccusationList>();
  displayedColumns: string[] = [
    'id',
    'receiveDate',
    'personId',
    'name',
    'view',
  ];

  constructor(public router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route?.parent?.url.subscribe((urlPath) => {
      this.mode = urlPath[urlPath.length - 1].path as Mode;
    });

    this.dataSource.data = [];
  }

  onSearch(submitType: boolean) {
    if (submitType) this.dataSource.data = data;
    else {
      this.dataSource.data = [];
    }
  }

  add() {
    this.router.navigate(['/', 'ethics', 'accusation', 'detail']);
  }

  next() {
    if (this.mode === 'accusation') {
      this.router.navigate(['/', 'ethics', 'accusation', 'detail']);
    } else if (this.mode === 'investigation') {
      this.router.navigate(['/', 'ethics', 'investigation', 'detail']);
    } else if (this.mode === 'inquiry') {
      this.router.navigate(['/', 'ethics', 'inquiry', 'detail']);
    } else this.router.navigate(['/', 'publish', 'detail']);
  }
}
