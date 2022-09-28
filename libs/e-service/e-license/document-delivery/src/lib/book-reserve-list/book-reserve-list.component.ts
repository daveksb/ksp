import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

@Component({
  selector: 'ksp-book-reserve-list',
  templateUrl: './book-reserve-list.component.html',
  styleUrls: ['./book-reserve-list.component.scss'],
})
export class BookReserveListComponent implements OnInit {
  displayedColumns: string[] = column;
  dataSource = new MatTableDataSource<bookList>();

  constructor(private router: Router) {}

  ngOnInit(): void {}

  search() {
    this.dataSource.data = data;
  }

  clear() {
    this.dataSource.data = [];
  }

  receiveBook() {
    this.router.navigate(['/document-delivery', 'register-list']);
  }

  reserveBook() {
    this.router.navigate(['/document-delivery', 'reserve-detail']);
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
