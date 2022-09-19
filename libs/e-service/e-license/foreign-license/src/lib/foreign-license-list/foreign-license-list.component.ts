import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { tempLicenseRequestType } from '@ksp/shared/interface';
import { ERequestService } from '@ksp/shared/service';

@Component({
  selector: 'ksp-foreign-license-list',
  templateUrl: './foreign-license-list.component.html',
  styleUrls: ['./foreign-license-list.component.scss'],
})
export class ForeignLicenseListComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  form = this.fb.group({
    foreignSearch: [],
  });

  displayedColumns: string[] = column;
  dataSource = new MatTableDataSource<any>();

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
      requestno: params.requestno,
      idcardno: params.idcardno,
      subtype: null,
      currentprocess: null,
      requeststatus: null,
      requestdatefrom: params.requestdatefrom,
      requestdateto: params.requestdateto,
      requesttype: '4',
      offset: '0',
      row: '10',
    };

    this.eRequestService.searchRequest(payload).subscribe((res: any) => {
      this.dataSource.data = res;
    });
  }

  clear() {
    this.dataSource.data = [];
  }

  nextPage(id: number) {
    this.router.navigate(['/foreign-license', 'detail', id], {
      queryParams: { type: tempLicenseRequestType.foreign },
    });
  }
}

export const column = [
  'id',
  'requestno',
  'passportno',
  'name',
  //'schoolname',
  //'provience',
  'requeststatus',
  'updatedate',
  'requestdate',
  'view',
];
