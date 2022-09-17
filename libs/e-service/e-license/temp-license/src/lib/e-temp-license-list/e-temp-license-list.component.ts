import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { tempLicenseRequestType } from '@ksp/shared/interface';
import { RequestLicenseService, SchoolInfoService } from '@ksp/shared/service';
import { Observable } from 'rxjs';

@Component({
  selector: 'e-service-temp-license-list',
  templateUrl: './e-temp-license-list.component.html',
  styleUrls: ['./e-temp-license-list.component.scss'],
})
export class ETempLicenseListComponent implements OnInit {
  eduOccupyList$!: Observable<any>;

  form = this.fb.group({
    licenseSearch: [],
  });

  displayedColumns: string[] = column;
  dataSource = new MatTableDataSource<any>();

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private requestService: RequestLicenseService,
    private schoolInfoService: SchoolInfoService
  ) {}

  ngOnInit(): void {
    this.eduOccupyList$ = this.schoolInfoService.getSchoolEduOccupy();
  }

  search(params: any) {
    console.log('params = ', params);

    const payload = {
      requestno: params.requestno,
      idcardno: params.idcardno,
      subtype: null,
      currentprocess: null,
      requeststatus: null,
      requestdatefrom: params.requestdatefrom,
      requestdateto: params.requestdateto,
      requesttype: '3',
      offset: '0',
      row: '10',
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
