import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { EditDegreeCertSearchComponent } from '@ksp/uni-service/dialog';

@Component({
  selector: 'ksp-edit-degree-list',
  templateUrl: './edit-degree-list.component.html',
  styleUrls: ['./edit-degree-list.component.scss'],
})
export class EditDegreeListComponent implements OnInit {
  constructor(public dialog: MatDialog) {}

  displayedColumns: string[] = displayedColumns;
  dataSource = new MatTableDataSource<DegreeCertInfo>();

  search() {
    this.dataSource.data = data;
  }

  clear() {
    this.dataSource.data = [];
  }

  searchLicense() {
    this.dialog.open(EditDegreeCertSearchComponent, {
      height: '100vh',
      width: '1000px',
      position: {
        top: '0px',
        right: '0px',
      },
    });
  }

  ngOnInit(): void {}
}

const displayedColumns: string[] = [
  'order',
  'requestId',
  'submitDate',
  'approveCode',
  'degreeCode',
  'university',
  'degreeName',
  'major',
  'branch',
  'verifyStatus',
  'approveDate',
  'edit',
  'print',
  'history',
];

export interface DegreeCertInfo {
  order: number;
  requestId: string;
  submitDate: string;
  approveCode: string;
  degreeCode: string;
  university: string;
  degreeName: string;
  major: string;
  branch: string;
  verifyStatus: string;
  approveDate: string;
}

export const data: DegreeCertInfo[] = [
  {
    order: 1,
    requestId: 'string',
    submitDate: 'string',
    approveCode: 'string',
    degreeCode: 'string',
    university: 'string',
    degreeName: 'string',
    major: 'string',
    branch: 'string',
    verifyStatus: 'string',
    approveDate: 'string',
  },
  {
    order: 2,
    requestId: 'string',
    submitDate: 'string',
    approveCode: 'string',
    degreeCode: 'string',
    university: 'string',
    degreeName: 'string',
    major: 'string',
    branch: 'string',
    verifyStatus: 'string',
    approveDate: 'string',
  },
  {
    order: 3,
    requestId: 'string',
    submitDate: 'string',
    approveCode: 'string',
    degreeCode: 'string',
    university: 'string',
    degreeName: 'string',
    major: 'string',
    branch: 'string',
    verifyStatus: 'string',
    approveDate: 'string',
  },
];
