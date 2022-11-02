import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { EUniService } from '@ksp/shared/service';
import { KspPaginationComponent } from '@ksp/shared/interface';
import { thaiDate } from '@ksp/shared/utility';

@Component({
  selector: 'e-service-degree-cert-list-approved',
  templateUrl: './e-service-degree-cert-list-approved.component.html',
  styleUrls: ['./e-service-degree-cert-list-approved.component.scss'],
})
export class EServiceDegreeCertApprovedListComponent extends KspPaginationComponent implements OnInit {
  showActionButtons = false;
  data: DegreeCertInfo[] = [data];
  dataSource = new MatTableDataSource<DegreeCertInfo>();
  selection = new SelectionModel<DegreeCertInfo>(true, []);
  displayedColumns: string[] = displayedColumns;
  pageType = 0;

  constructor(
    private router: Router, 
    private route: ActivatedRoute,
    private requestService: EUniService) {
      super();
    }

  ngOnInit() {
    this.route.paramMap.subscribe((res) => {
      if (res) {
        /**
         * show action buttons if process = consider || approve
         */
        this.showActionButtons = [1, 2].includes(Number(res.get('type')));
      }
      this.pageType = Number(res.get('processId'));

      console.log('page type = ', this.pageType);
    });
    this.onSearch();
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
    this.requestService.getDegreeCertList({
      uniid: '',
      unitype: '',
      degreeapprovecode: '',
      fulldegreenameth: '',
      degreelevel: '',
      courseacademicyear: '',
      requestno: '',
      requestdate: '',
      uniprovince: '',
      coursemajor: '',
      coursefieldofstudy: '',
      coursesubjects: '',
      offset: '0',
      row: '10'
    }).subscribe((response: any) => {
      this.pageEvent.length = response.countrow;
      this.dataSource.data = response.datareturn.map((item: any, index: any) => {
        item.requestdate = thaiDate(new Date(item?.requestdate));
        item.updatedate = item?.updatedate ? thaiDate(new Date(item?.updatedate)) : '';
        return item
      });
    });
  }

  onClear() {
    this.dataSource.data = [];
  }

  consider() {
    this.router.navigate(['/degree-cert', 'verify', 1]);
  }

  approve() {
    this.router.navigate(['/degree-cert', 'verify', 2]);
  }

  goToDetailPage(requestid: any) {
    this.router.navigate(['/degree-cert', 'course-detail', requestid]);
  }

  lastStep() {
    this.router.navigate(['/degree-cert', 'final-result']);
  }
}

const displayedColumns: string[] = [
  'requestno',
  'unicode',
  'degreeapprovecode',
  'uniname',
  'degreelevel',
  'degreename',
  'admissionstatus',
  'graduatestatus',
  'updatedate',
  'requestdate',
  'history',
  'print'
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