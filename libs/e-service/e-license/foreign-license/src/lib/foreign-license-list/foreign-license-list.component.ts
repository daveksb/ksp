import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { SelfRequest } from '@ksp/shared/interface';
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
  dataSource = new MatTableDataSource<SelfRequest>();

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private requestService: ERequestService
  ) {}

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  search(params: any) {
    const payload = {
      systemtype: '2',
      requesttype: '4',
    };
    this.requestService.searchRequest(payload).subscribe((res) => {
      this.dataSource.data = res;
    });
  }

  clear() {
    this.dataSource.data = [];
  }

  nextPage(id: number) {
    this.router.navigate(['/foreign-license', 'detail', id], {
      queryParams: { type: 0 },
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
