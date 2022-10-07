import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

@Component({
  selector: 'ksp-all-user-list',
  templateUrl: './all-user-list.component.html',
  styleUrls: ['./all-user-list.component.scss'],
})
export class AllUserListComponent implements OnInit {
  constructor(private router: Router) {}

  displayedColumns: string[] = column;
  dataSource = new MatTableDataSource<any>(data);

  ngOnInit(): void {}

  back() {
    this.router.navigate(['/school-user', 'user-detail']);
  }
}

export const data = [
  {
    id: 1,
    idcardno: '123',
    firstnameth: 'xxx',
    lastnameth: 'xxx',
    requeststatus: 'yyy',
    requestdate: '1/1/2565',
    updatedate: '1/1/2565',
  },
];

export const column = [
  'id',
  'idcardno',
  'name',
  'requeststatus',
  'requestdate',
  'updatedate',
  'view',
];
