import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { SelfServiceRequestSubType } from '@ksp/shared/constant';
import { SelfApproveListSearch } from '@ksp/shared/interface';
import { ERequestService, LoaderService } from '@ksp/shared/service';
import { Subject } from 'rxjs';

@Component({
  selector: 'ksp-e-senior-teacher-account-list',
  templateUrl: './e-senior-teacher-account-list.component.html',
  styleUrls: ['./e-senior-teacher-account-list.component.scss'],
})
export class ESeniorTeacherAccountListComponent implements AfterViewInit {
  isLoading: Subject<boolean> = this.loaderService.isLoading;
  SelfServiceRequestSubType = SelfServiceRequestSubType;
  displayedColumns = [
    'select',
    'order',
    'accountGroup',
    // 'careerType',
    'result',
    'requestDate',
    'createDate',
    'view',
    // 'accountList',
    // 'book',
  ];
  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private router: Router,
    private requestService: ERequestService,
    private loaderService: LoaderService
  ) {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  onSelect(element: any) {
    element.select = !element.select;

    const selectedData = this.dataSource.data.filter((item) => item.select);
  }

  searchData(params: any) {
    const payload: SelfApproveListSearch = {
      groupno: params.groupno,
      process: params.process,
      status: params.status,
      careertype: params.careertype,
      createdate: params.createdate,
      offset: '0',
      row: '500',
      requesttype: '1',
    };
    this.requestService.searchSelfApproveList(payload).subscribe((res) => {
      this.dataSource.data = res.map((i) => {
        return { ...i, count: JSON.parse(i.requestlist || '').length };
      });
    });
  }

  createGroup() {
    this.router.navigate(['/teacher-council', 'create-account']);
  }
}
