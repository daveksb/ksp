import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

@Component({
  selector: 'ksp-status-check-list',
  templateUrl: './status-check-list.component.html',
  styleUrls: ['./status-check-list.component.scss'],
})
export class StatusCheckListComponent {
  displayedColumns: string[] = column;
  dataSource = new MatTableDataSource<bookList>();

  constructor(private router: Router) {}

  search() {
    this.dataSource.data = data;
  }

  clear() {
    this.dataSource.data = [];
  }

  addInfo() {
    this.router.navigate(['/document-delivery', 'check-detail']);
  }
}

const column = [
  'year',
  'id',
  'bookId',
  'date',
  'sendName',
  'dearName',
  'type',
  'name',
  'receiveName',
  'view',
];

interface bookList {
  year: number;
  id: string;
  bookId: string;
  date: string;
  sendName: string;
  dearName: string;
  type: string;
  name: string;
  receiveName: string;
}

const data: bookList[] = [
  {
    year: 1,
    id: 'string',
    bookId: 'string',
    date: 'string',
    sendName: 'string',
    dearName: 'string',
    type: 'string',
    name: 'string',
    receiveName: 'string',
  },
  {
    year: 2,
    id: 'string',
    bookId: 'string',
    date: 'string',
    sendName: 'string',
    dearName: 'string',
    type: 'string',
    name: 'string',
    receiveName: 'string',
  },
];
