import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { EnableRewardRequestDialogComponent } from '../enable-reward-request-dialog/enable-reward-request-dialog.component';

@Component({
  selector: 'ksp-enable-reward-request-list',
  templateUrl: './enable-reward-request-list.component.html',
  styleUrls: ['./enable-reward-request-list.component.scss'],
})
export class EnableRewardRequestListComponent implements OnInit {
  displayedColumns: string[] = column;
  dataSource = new MatTableDataSource<userList>();

  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {}

  search() {
    this.dataSource.data = data;
  }

  clear() {
    this.dataSource.data = [];
  }

  addSchedule() {
    this.dialog.open(EnableRewardRequestDialogComponent, {
      width: '50vw',
      height: '100vh',
      position: {
        top: '0px',
        right: '0px',
      },
    });
  }
}

export interface userList {
  order: number;
  year: string;
  openRequest: string;
  closeRequest: string;
  lastEditDate: string;
  saveDate: string;
}

export const column = [
  'order',
  'year',
  'openRequest',
  'closeRequest',
  'lastEditDate',
  'saveDate',
  'edit',
];

export const data: userList[] = [
  {
    order: 1,
    year: '2565',
    openRequest: '10/10/2565',
    closeRequest: '10/10/2565',
    lastEditDate: '10/10/2565',
    saveDate: '10/10/2565',
  },
  {
    order: 2,
    year: '2565',
    openRequest: '10/10/2565',
    closeRequest: '10/10/2565',
    lastEditDate: '10/10/2565',
    saveDate: '10/10/2565',
  },
];
