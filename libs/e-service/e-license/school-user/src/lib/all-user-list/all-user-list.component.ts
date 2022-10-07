import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { SchoolUserDetailComponent } from '@ksp/e-service/dialog/school-user-detail';

@Component({
  selector: 'ksp-all-user-list',
  templateUrl: './all-user-list.component.html',
  styleUrls: ['./all-user-list.component.scss'],
})
export class AllUserListComponent implements OnInit {
  constructor(private router: Router, private dialog: MatDialog) {}

  displayedColumns: string[] = column;
  dataSource = new MatTableDataSource<any>(data);

  ngOnInit(): void {}

  back() {
    this.router.navigate(['/school-user', 'user-detail']);
  }

  viewDetail() {
    this.dialog.open(SchoolUserDetailComponent, {
      width: '1200px',
      height: '100vh',
      position: {
        top: '0px',
        right: '0px',
      },
    });
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
