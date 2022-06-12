import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'e-service-degree-cert-list',
  templateUrl: './degree-cert-list.component.html',
  styleUrls: ['./degree-cert-list.component.scss'],
})
export class DegreeCertListComponent implements OnInit {
  processType = 1;
  data: DegreeCertInfo[] = [data];
  dataSource = new MatTableDataSource<DegreeCertInfo>();
  selection = new SelectionModel<DegreeCertInfo>(true, []);

  displayedColumns: string[] = displayedColumns;

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.paramMap.subscribe((res) => {
      this.processType = Number(res.get('type'));
      //console.log('process type = ', this.processType);
    });
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  onSearch() {
    for (let index = 0; index < 30; index++) {
      this.data = [...this.data, data];
    }
    this.dataSource.data = this.data;
  }

  onSelect() {
    this.router.navigate(['/', 'degree-cert', 'step-1']);
  }

  onClear() {
    this.dataSource.data = [];
  }

  consider() {
    this.router.navigate(['./', 'degree-cert', 'verify', '2']);
  }
  approve() {
    this.router.navigate(['./', 'degree-cert', 'verify', '3']);
  }
}

const displayedColumns: string[] = [
  'select',
  'degreeId',
  'date',
  'uni',
  'major',
  'verifyStatus',
  'considerStatus',
  'approveStatus',
  'editDate',
  'verify',
  'consider',
  'print',
];
export interface DegreeCertInfo {
  degreeId: string;
  date: string;
  uni: string;
  major: string;
  verifyStatus: string;
  considerStatus: string;
  approveStatus: string;
  approveDate: string;
  editDate: string;
  verify: string;
  consider: string;
}

export const data: DegreeCertInfo = {
  degreeId: 'UNI_VC_64120009',
  date: '10 ธ.ค. 2564',
  uni: 'มหาวิทยาลัยภูเก็ต',
  major: 'คุรุศาสตร์',
  verifyStatus: 'รับข้อมูล',
  considerStatus: 'พิจารณา',
  approveStatus: 'พิจารณา',
  approveDate: '30 ส.ค. 2564',
  editDate: '30 ส.ค. 2564',
  verify: 'ตรวจสอบแล้ว',
  consider: 'ตรวจสอบแล้ว',
};
