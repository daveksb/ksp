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
  selector: 'ksp-e-best-teacher-declare',
  templateUrl: './e-best-teacher-declare.component.html',
  styleUrls: ['./e-best-teacher-declare.component.scss'],
})
export class EBestTeacherDeclareComponent implements OnInit {
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
      requesttype:
        SelfServiceRequestType.ขอรับรางวัลครูผู้สอนดีเด่นตามกลุ่มสาระการเรียนรู้,
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
    this.router.navigate(['/best-teacher', 'create-declare']);
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
