import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

@Component({
  selector: 'ksp-qualification-approve-list',
  templateUrl: './qualification-approve-list.component.html',
  styleUrls: ['./qualification-approve-list.component.scss'],
})
export class QualificationApproveListComponent implements OnInit {
  form = this.fb.group({
    foreignSearch: [],
  });

  displayedColumns: string[] = column;
  dataSource = new MatTableDataSource<any>();

  constructor(private router: Router, private fb: FormBuilder) {}

  ngOnInit(): void {}

  search() {
    this.dataSource.data = data;
  }

  clear() {
    this.dataSource.data = [];
  }

  next() {
    this.router.navigate(['/qualification', 'detail']);
  }
}

export const data = [
  {
    id: 1,
    view: 'xxx',
    requestno: 'xxx',
    idcardno: 'xxx',
    name: 'xxx',
    profession: 'xxx',
    artification: 'xxx',
    schoolname: 'xxx',
    requeststatus: 'xxx',
    status: 'xxx',
    updatedate: 'xxx',
    requestdate: 'xxx',
  },
];

export const column = [
  'id',
  'view',
  'requestno',
  'idcardno',
  'name',
  'profession',
  'artification',
  'schoolname',
  'requeststatus',
  'status',
  'updatedate',
  'requestdate',
];
