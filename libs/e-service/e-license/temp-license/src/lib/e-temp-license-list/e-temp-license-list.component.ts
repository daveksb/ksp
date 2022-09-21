import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { SchoolRequestSubType } from '@ksp/shared/constant';
import { tempLicenseRequestType } from '@ksp/shared/interface';
import { ERequestService } from '@ksp/shared/service';
import {
  applyClientFilter,
  checkProcess,
  checkRequestType,
  checkStatus,
} from '@ksp/shared/utility';

@Component({
  selector: 'e-service-temp-license-list',
  templateUrl: './e-temp-license-list.component.html',
  styleUrls: ['./e-temp-license-list.component.scss'],
})
export class ETempLicenseListComponent implements AfterViewInit {
  form = this.fb.group({
    search: [{ requesttype: '3' }],
  });

  displayedColumns: string[] = column;
  dataSource = new MatTableDataSource<any>();
  SchoolRequestSubType = SchoolRequestSubType;
  checkProcess = checkProcess;
  checkRequestType = checkRequestType;
  checkStatus = checkStatus;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private eRequestService: ERequestService
  ) {}

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  search(params: any) {
    console.log('params = ', params);

    const payload = {
      systemtype: '2',
      requesttype: '3',
      schoolid: null,
      bureauid: null,
    };

    this.eRequestService.searchRequest(payload).subscribe((res) => {
      if (res) {
        const result = applyClientFilter(res, params);
        this.dataSource.data = result;
      } else {
        this.clearData();
      }
    });
  }

  clearData() {
    this.dataSource.data = [];
    this.form.reset();
    this.form.controls.search.patchValue({ requesttype: '3' });
  }

  goToDetail(id: number) {
    this.router.navigate(['/temp-license', 'detail', id], {
      queryParams: { type: tempLicenseRequestType.thai },
    });
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
