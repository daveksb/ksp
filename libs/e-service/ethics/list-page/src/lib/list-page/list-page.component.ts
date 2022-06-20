import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';

type Mode = 'accusation' | 'investigation' | 'inquiry' | 'publish' | null;

export interface AccusationList {
  order: number;
  id: string;
  receiveDate: string;
  blackNumber: string;
  redNumber: string;
  personId: string;
  name: string;
  process: string;
  status: string;
  lastUpdate: string;
  edit: string;
  view: string;
}

export const data: AccusationList[] = [
  {
    order: 1,
    id: '641000001',
    receiveDate: '15 มิ.ย. 2654',
    blackNumber: 'xx/2564',
    redNumber: 'xx/2564',
    personId: 'x-xxxx-xxxx-xx-x',
    name: 'นายประหยัด จันทร์อังคาร',
    process: 'บันทึกข้อมูลกล่าวหา/กล่าวโทษ',
    status: 'อยู่รหว่างดำเนินการ',
    lastUpdate: '15 มิ.ย. 2569',
    edit: '',
    view: '',
  },
  {
    order: 2,
    id: '641000001',
    receiveDate: '15 มิ.ย. 2654',
    blackNumber: 'xx/2564',
    redNumber: 'xx/2564',
    personId: 'x-xxxx-xxxx-xx-x',
    name: 'นายประหยัด จันทร์อังคาร',
    process: 'บันทึกข้อมูลกล่าวหา/กล่าวโทษ',
    status: 'อยู่รหว่างดำเนินการ',
    lastUpdate: '15 มิ.ย. 2569',
    edit: '',
    view: '',
  },
  {
    order: 3,
    id: '641000001',
    receiveDate: '15 มิ.ย. 2654',
    blackNumber: 'xx/2564',
    redNumber: 'xx/2564',
    personId: 'x-xxxx-xxxx-xx-x',
    name: 'นายประหยัด จันทร์อังคาร',
    process: 'บันทึกข้อมูลกล่าวหา/กล่าวโทษ',
    status: 'อยู่รหว่างดำเนินการ',
    lastUpdate: '15 มิ.ย. 2569',
    edit: '',
    view: '',
  },
];

@Component({
  selector: 'ksp-list-page',
  templateUrl: './list-page.component.html',
  styleUrls: ['./list-page.component.scss'],
})
export class ListPageComponent implements OnInit {
  mode: Mode = null;
  dataSource = new MatTableDataSource<AccusationList>();
  displayedColumns: string[] = [
    'order',
    'id',
    'receiveDate',
    'blackNumber',
    'redNumber',
    'personId',
    'name',
    'process',
    'status',
    'lastUpdate',
    'edit',
    'view',
  ];

  constructor(public router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    /* this.route.data.subscribe((data) => {
      this.mode = data['type'];
      console.log('mode = ', data);
    }); */
    this.route.data.subscribe((res) => {
      this.mode = res['type'];
      //console.log('res = ', res);
    });
  }

  onSubmit(submitType: boolean) {
    if (submitType) {
      this.dataSource.data = data;
    } else {
      this.dataSource.data = [];
    }
  }

  add() {
    this.router.navigate(['/', 'accusation', 'detail']);
  }

  next() {
    this.router.navigate(['/', this.mode, 'detail']);
  }
}
