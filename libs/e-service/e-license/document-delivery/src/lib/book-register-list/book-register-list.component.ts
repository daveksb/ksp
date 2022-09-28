import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { BookRegisterDetailDialogComponent } from '../book-register-detail-dialog/book-register-detail-dialog.component';

@Component({
  selector: 'ksp-book-register-list',
  templateUrl: './book-register-list.component.html',
  styleUrls: ['./book-register-list.component.scss'],
})
export class BookRegisterListComponent implements OnInit {
  displayedColumns: string[] = column;
  dataSource = new MatTableDataSource<bookList>();

  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {}

  search() {
    this.dataSource.data = data;
  }

  clear() {
    this.dataSource.data = [];
  }

  receive(type: any) {
    this.dialog.open(BookRegisterDetailDialogComponent, {
      width: '1200px',
      height: '100vh',
      position: {
        top: '0px',
        right: '0px',
      },
      data: {
        bookType: type,
      },
    });
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
