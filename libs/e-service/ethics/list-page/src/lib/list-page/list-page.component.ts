import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { EthicsMode } from '@ksp/shared/interface';

/**
 * Ethics List page, shared between all ethics mode
 */
@Component({
  templateUrl: './list-page.component.html',
  styleUrls: ['./list-page.component.scss'],
})
export class ListPageComponent implements OnInit {
  mode!: EthicsMode;
  dataSource = new MatTableDataSource<AccusationList>();
  displayedColumns: string[] = columns;

  form = this.fb.group({
    ethicSearch: [],
  });

  constructor(
    public router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.route.data.subscribe((res) => {
      this.mode = res['ethicsMode'];
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
    this.router.navigate(['accusation', 'detail']);
  }

  next() {
    this.router.navigate([this.mode, 'detail']);
  }
}

export const columns = [
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
