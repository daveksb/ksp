import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import {
  SelfServiceRequestSubType,
  SelfServiceRequestType,
} from '@ksp/shared/constant';
import {
  EsSearchPayload,
  SchRequestSearchFilter,
  SelfApproveListSearch,
  SelfRequest,
} from '@ksp/shared/interface';
import { ERequestService, LoaderService } from '@ksp/shared/service';
import {
  replaceEmptyWithNull,
  SelfCheckProcess,
  eSelfCheckStatus,
} from '@ksp/shared/utility';
import { Subject } from 'rxjs';

@Component({
  selector: 'ksp-e-praise-teacher-declare',
  templateUrl: './e-praise-teacher-declare.component.html',
  styleUrls: ['./e-praise-teacher-declare.component.scss'],
})
export class EPraiseTeacherDeclareComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = column;
  dataSource = new MatTableDataSource<any>();
  checkProcess = SelfCheckProcess;
  checkStatus = eSelfCheckStatus;
  SelfServiceRequestSubType = SelfServiceRequestSubType;
  isLoading: Subject<boolean> = this.loaderService.isLoading;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private router: Router,
    private requestService: ERequestService,
    private loaderService: LoaderService
  ) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  search(params: any) {
    const payload: SelfApproveListSearch = {
      groupno: params.groupno,
      process: '6',
      status: '2',
      careertype: params.careertype,
      createdate: params.createdate,
      offset: '0',
      row: '500',
      requesttype: SelfServiceRequestType.ขอรับรางวัลคุรุสดุดี,
    };
    this.requestService.searchSelfApproveList(payload).subscribe((res) => {
      this.dataSource.data = res.map((i) => {
        return { ...i, count: JSON.parse(i.requestlist || '').length };
      });
    });
  }

  clear() {
    this.dataSource.data = [];
  }

  create() {
    this.router.navigate(['/praise-teacher', 'create-declare']);
  }
}

export const column = [
  'order',
  'group',
  'careertype',
  'declaredate',
  'view',
  'print',
];
