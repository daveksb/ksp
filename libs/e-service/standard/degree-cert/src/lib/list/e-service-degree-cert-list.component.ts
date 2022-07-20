import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { DegreeCertProcessType } from '@ksp/shared/interface';

@Component({
  selector: 'e-service-degree-cert-list',
  templateUrl: './e-service-degree-cert-list.component.html',
  styleUrls: ['./e-service-degree-cert-list.component.scss'],
})
export class EServiceDegreeCertListComponent implements OnInit {
  showActionButtons = false;
  data: DegreeCertInfo[] = [data];
  dataSource = new MatTableDataSource<DegreeCertInfo>();
  selection = new SelectionModel<DegreeCertInfo>(true, []);
  displayedColumns: string[] = displayedColumns;
  pageType = 0;

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.paramMap.subscribe((res) => {
      if (res) {
        /**
         * show action buttons if process = consider || approve
         */
        this.showActionButtons = [
          DegreeCertProcessType.consider,
          DegreeCertProcessType.approve,
        ].includes(Number(res.get('type')));
      }
      this.pageType = Number(res.get('type'));

      console.log('page type = ', this.pageType);
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
    for (let index = 0; index < 10; index++) {
      this.data = [...this.data, data];
    }
    this.dataSource.data = this.data;
  }

  onClear() {
    this.dataSource.data = [];
  }

  consider() {
    this.router.navigate([
      '/degree-cert',
      'verify',
      DegreeCertProcessType.consider,
    ]);
  }

  approve() {
    this.router.navigate([
      '/degree-cert',
      'verify',
      DegreeCertProcessType.approve,
    ]);
  }

  goToDetailPage() {
    if (this.pageType === 0) {
      this.router.navigate(['/degree-cert', 'check']);
    } else if (this.pageType === 1) {
      this.router.navigate(['/', 'degree-cert', 'consider']);
    } else if (this.pageType === 2) {
      this.router.navigate(['/', 'degree-cert', 'approve']);
    }
  }

  lastStep() {
    this.router.navigate(['/', 'degree-cert', 'final-result']);
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
