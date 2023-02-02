import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { SelfServiceRequestType } from '@ksp/shared/constant';
import {
  EsSearchPayload,
  SchRequestSearchFilter,
  SelfRequest,
} from '@ksp/shared/interface';
import { ERequestService, LoaderService } from '@ksp/shared/service';
import {
  eSelfCheckStatus,
  processFilter,
  replaceEmptyWithNull,
} from '@ksp/shared/utility';
import { Subject } from 'rxjs';

@Component({
  selector: 'ksp-e-research-reward-list',
  templateUrl: './e-research-reward-list.component.html',
  styleUrls: ['./e-research-reward-list.component.scss'],
})
export class EResearchRewardListComponent implements OnInit, AfterViewInit {
  isLoading: Subject<boolean> = this.loaderService.isLoading;
  displayedColumns: string[] = column;
  dataSource = new MatTableDataSource<SelfRequest>();
  checkStatus = eSelfCheckStatus;
  checkMode = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private router: Router,
    private requestService: ERequestService,
    private loaderService: LoaderService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.url.subscribe((url) => {
      if (url[0].path === 'check-list') {
        this.checkMode = true;
      }
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  search(params: Partial<SchRequestSearchFilter>) {
    let payload: EsSearchPayload = {
      systemtype: '1',
      requesttype: SelfServiceRequestType.ขอรับรางวัลผลงานวิจัยของคุรุสภา,
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
      this.dataSource.data = processFilter(res);
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
    if (this.checkMode) {
      this.router.navigate(['/research-reward', 'check', id]);
    } else {
      this.router.navigate(['/research-reward', 'detail', id]);
    }
  }

  reject(id: number) {
    this.router.navigate(['/research-reward', 'reject', id]);
  }
}

export const column = [
  'order',
  'requestno',
  'idcardno',
  'name',
  'status',
  'process',
  'processupdatedate',
  'submitDate',
  // 'objection',
  'verify',
  'request',
  // 'edit',
];
