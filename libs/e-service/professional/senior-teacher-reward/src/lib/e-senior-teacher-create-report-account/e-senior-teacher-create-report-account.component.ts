import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import {
  SelfServiceRequestSubType,
  SelfServiceRequestType,
} from '@ksp/shared/constant';
import {
  CompleteDialogComponent,
  ConfirmDialogComponent,
} from '@ksp/shared/dialog';
import {
  EsSearchPayload,
  KspRequest,
  SchRequestSearchFilter,
  SelfApproveList,
} from '@ksp/shared/interface';
import { ERequestService, LoaderService } from '@ksp/shared/service';
import {
  eSelfCheckStatus,
  getCookie,
  replaceEmptyWithNull,
} from '@ksp/shared/utility';
import { Subject } from 'rxjs';

interface CheckKSPRequest extends KspRequest {
  check: boolean;
}

@Component({
  selector: 'ksp-e-senior-teacher-create-report-account',
  templateUrl: './e-senior-teacher-create-report-account.component.html',
  styleUrls: ['./e-senior-teacher-create-report-account.component.scss'],
})
export class ESeniorTeacherCreateReportAccountComponent
  implements OnInit, AfterViewInit
{
  isLoading: Subject<boolean> = this.loaderService.isLoading;
  displayedColumns = [
    'select',
    'order',
    'requestNo',
    'id',
    'name',
    // 'careerType',
    // 'province',
    'result',
    'createDate',
    'requestDate',
    'view',
  ];
  dataSource = new MatTableDataSource<any>();
  SelfServiceRequestSubType = SelfServiceRequestSubType;
  checkStatus = eSelfCheckStatus;
  listNo!: number;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private loaderService: LoaderService,
    private requestService: ERequestService,
    private router: Router,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.requestService.getLastApproveList().subscribe((res) => {
      this.listNo = +res.listno + 1;
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  search(params: Partial<SchRequestSearchFilter>) {
    console.log(params);
    let payload: EsSearchPayload = {
      systemtype: '1',
      requesttype: SelfServiceRequestType.ขอรับรางวัลคุรุสภา,
      requestno: params.requestno,
      careertype: params.careertype,
      name: null,
      idcardno: null,
      passportno: null,
      process: '6',
      status: null,
      schoolid: null,
      schoolname: null,
      bureauid: null,
      requestdatefrom: params.requestdatefrom,
      requestdateto: params.requestdateto,
      provinceid: params.provinceid,
      offset: '0',
      row: '1000',
    };

    payload = replaceEmptyWithNull(payload);

    this.requestService.KspSearchRequest(payload).subscribe((res) => {
      console.log(res);
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

  onCheck(element: CheckKSPRequest) {
    element.check = !element.check;
  }

  prev() {
    this.router.navigate(['/senior-teacher', 'report-account-list']);
  }

  confirmDialog() {
    const checkIds = this.dataSource.data
      .filter((item) => item.check)
      .map((item) => item.id);
    const dialog = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: `คุณต้องการยืนยันข้อมูล
        ใช่หรือไม่? `,
      },
    });

    dialog.componentInstance.confirmed.subscribe((res) => {
      //console.log('max career type = ', this.maxCareerType);

      if (res) {
        const payload: Partial<SelfApproveList> = {
          listno: this.listNo.toString(),
          process: '6',
          careertype: '5',
          requesttype: SelfServiceRequestType.ขอรับรางวัลครูอาวุโส, // ใบคำขออนุญาต
          isforeign: '0',
          status: '2',
          requestlist: JSON.stringify(checkIds),
          userid: `${getCookie('userId')}`,
        };
        this.requestService.createAprroveList(payload).subscribe((res) => {
          if (res?.returnmessage === 'success') {
            this.completeDialog();
          }
        });
      }
    });
  }

  completeDialog() {
    const dialog = this.dialog.open(CompleteDialogComponent, {
      data: {
        header: `บันทึกข้อมูลสำเร็จ`,
      },
    });

    dialog.componentInstance.completed.subscribe((res) => {
      if (res) {
        this.router.navigate(['/senior-teacher', 'report-account-list']);
      }
    });
  }
}
