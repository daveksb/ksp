import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

@Component({
  selector: 'ksp-book-send-list',
  templateUrl: './book-send-list.component.html',
  styleUrls: ['./book-send-list.component.scss'],
})
export class BookSendListComponent implements OnInit {
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

  check() {
    this.router.navigate(['/document-delivery', 'check-list']);
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
