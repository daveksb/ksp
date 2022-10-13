import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { SchoolRequestSubType } from '@ksp/shared/constant';
import { SelfRequest } from '@ksp/shared/interface';
import { ERequestService } from '@ksp/shared/service';
import { checkProcess, checkStatus } from '@ksp/shared/utility';

@Component({
  selector: 'ksp-edit-license-approve-list',
  templateUrl: './edit-license-approve-list.component.html',
  styleUrls: ['./edit-license-approve-list.component.scss'],
})
export class EditLicenseApproveListComponent implements AfterViewInit {
  displayedColumns: string[] = column;
  dataSource = new MatTableDataSource<SelfRequest>();
  SchoolRequestSubType = SchoolRequestSubType;

  checkProcess = checkProcess;
  checkStatus = checkStatus;

  form = this.fb.group({
    search: [],
  });

  constructor(
    private fb: FormBuilder,
    private requestService: ERequestService,
    private router: Router
  ) {}

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  search(params: any) {
    const payload = {
      systemtype: 1, // self service
      requesttype: 3, // ใบคำขอต่อใบอนุญาต
      requestno: '',
      firstnameth: '',
      idcardno: '',
      currentprocess: '',
      requestdate: '',
      offset: '0',
      row: '1000',
    };
    this.requestService.searchSelfRequest(payload).subscribe((res) => {
      this.dataSource.data = res;
      this.dataSource.sort = this.sort;

      const sortState: Sort = { active: 'id', direction: 'desc' };
      this.sort.active = sortState.active;
      this.sort.direction = sortState.direction;
      this.sort.sortChange.emit(sortState);
    });
  }

  goToDetail(id: number) {
    this.router.navigate(['/edit-license', 'detail', id]);
  }

  clear() {
    this.dataSource.data = [];
  }
}

export const column = [
  'id',
  'edit',
  'requestno',
  'idcardno',
  'name',
  'subtype',
  'currentprocess',
  'requeststatus',
  'updatedate',
  'requestdate',
  'reqDoc',
  'approveDoc',
];
