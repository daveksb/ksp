import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { SelfServiceRequestType } from '@ksp/shared/constant';
import {
  EsSearchPayload,
  SchRequestSearchFilter,
  SelfRequest,
} from '@ksp/shared/interface';
import { ERequestService, LoaderService } from '@ksp/shared/service';
import { eSelfCheckStatus, replaceEmptyWithNull } from '@ksp/shared/utility';
import { Subject } from 'rxjs';

@Component({
  selector: 'ksp-e-best-teacher-list',
  templateUrl: './e-best-teacher-list.component.html',
  styleUrls: ['./e-best-teacher-list.component.scss'],
})
export class EBestTeacherListComponent implements OnInit, AfterViewInit {
  isLoading: Subject<boolean> = this.loaderService.isLoading;
  displayedColumns: string[] = column;
  dataSource = new MatTableDataSource<SelfRequest>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  checkStatus = eSelfCheckStatus;

  constructor(
    private router: Router,
    private requestService: ERequestService,
    private loaderService: LoaderService
  ) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  search(params: Partial<SchRequestSearchFilter>) {
    let payload: EsSearchPayload = {
      systemtype: '1',
      requesttype:
        SelfServiceRequestType.ขอรับรางวัลครูผู้สอนดีเด่นตามกลุ่มสาระการเรียนรู้,
      requestno: params.requestno,
      careertype: null,
      name: params.name,
      idcardno: params.idcardno,
      passportno: null,
      process: null,
      status: params.status,
      schoolid: null,
      schoolname: null,
      bureauid: null,
      requestdatefrom: params.requestdatefrom,
      requestdateto: params.requestdateto,
      offset: '0',
      row: '1000',
    };

    payload = replaceEmptyWithNull(payload);

    this.requestService.KspSearchRequest(payload).subscribe((res) => {
      this.dataSource.data = res;
      // this.dataSource.sort = this.sort;

      // const sortState: Sort = { active: 'id', direction: 'desc' };
      // this.sort.active = sortState.active;
      // this.sort.direction = sortState.direction;
      // this.sort.sortChange.emit(sortState);
    });
  }

  clear() {
    this.dataSource.data = [];
  }

  view(id: number) {
    this.router.navigate(['/best-teacher', 'detail', id]);
  }

  reject(id: number) {
    this.router.navigate(['/best-teacher', 'reject', id]);
  }
}

export const column = [
  'order',
  'requestno',
  'idcardno',
  'name',
  'process',
  'status',
  'processupdatedate',
  'submitDate',
  'objection',
  'verify',
  'request',
  'edit',
];
