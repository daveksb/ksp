import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { tempLicenseRequestType } from '@ksp/shared/interface';
import { RequestLicenseService, SchoolInfoService } from '@ksp/shared/service';
import { thaiDate } from '@ksp/shared/utility';
import { Observable } from 'rxjs';

@Component({
  selector: 'e-service-temp-license-list',
  templateUrl: './e-temp-license-list.component.html',
  styleUrls: ['./e-temp-license-list.component.scss'],
})
export class ETempLicenseListComponent implements AfterViewInit, OnInit {
  eduOccupyList$!: Observable<any>;

  form = this.fb.group({
    licenseSearch: [],
    offset: '0',
    row: '25',
    requesttype: '3',
  });

  displayedColumns: string[] = column;
  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private requestService: RequestLicenseService,
    private schoolInfoService: SchoolInfoService
  ) {}

  ngOnInit(): void {
    this.eduOccupyList$ = this.schoolInfoService.getSchoolEduOccupy();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  search(params: any) {
    console.log('params = ', params);

    const data = this.form.getRawValue() as any;
    const { offset, row, requesttype } = data;
    const payload = {
      requestno: params.requestno,
      idcardno: params.idcardno,
      subtype: params.requesttype,
      currentprocess: null,
      requeststatus: null,
      requestdatefrom: params.requestdatefrom,
      requestdateto: params.requestdateto,
      requesttype,
      offset,
      row,
    };

    this.requestService.searchLicenseRequest(payload).subscribe((res: any) => {
      this.dataSource.data = res;
    });
  }

  clear() {
    this.dataSource.data = [];
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
