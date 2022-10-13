import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

@Component({
  selector: 'ksp-book-receive-list',
  templateUrl: './book-receive-list.component.html',
  styleUrls: ['./book-receive-list.component.scss'],
})
export class BookReceiveListComponent {
  displayedColumns: string[] = column;
  dataSource = new MatTableDataSource<bookList>();

  constructor(private router: Router) {}

  search() {
    this.dataSource.data = data;
  }

  clear() {
    this.dataSource.data = [];
  }

  add() {
    this.router.navigate(['/document-delivery', 'receive-detail']);
  }

  reserve() {
    this.router.navigate(['/document-delivery', 'reserve-list']);
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
