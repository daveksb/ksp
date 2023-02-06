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
  KspApprovePayload,
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
import { forkJoin, Subject } from 'rxjs';

interface CheckKSPRequest extends KspRequest {
  check: boolean;
}

@Component({
  selector: 'ksp-e-best-teacher-create-account',
  templateUrl: './e-best-teacher-create-account.component.html',
  styleUrls: ['./e-best-teacher-create-account.component.scss'],
})
export class EBestTeacherCreateAccountComponent
  implements OnInit, AfterViewInit
{
  isLoading: Subject<boolean> = this.loaderService.isLoading;
  displayedColumns = [
    'select',
    'order',
    'requestNo',
    'id',
    'name',
    'careerType',
    'province',
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
      console.log(this.listNo);
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  search(params: Partial<SchRequestSearchFilter>) {
    console.log(params);
    let payload: EsSearchPayload = {
      systemtype: '1',
      requesttype:
        SelfServiceRequestType.ขอรับรางวัลครูผู้สอนดีเด่นตามกลุ่มสาระการเรียนรู้,
      requestno: params.requestno,
      careertype: params.careertype,
      name: null,
      idcardno: null,
      passportno: null,
      process: '4',
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

  prev() {
    this.router.navigate(['/best-teacher', 'account-list']);
  }

  onCheck(element: CheckKSPRequest) {
    element.check = !element.check;
  }

  confirmDialog() {
    const dialog = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: `คุณต้องการยืนยันข้อมูล
        ใช่หรือไม่? `,
      },
    });

    dialog.componentInstance.confirmed.subscribe((res) => {
      //console.log('max career type = ', this.maxCareerType);
      const checkIds = this.dataSource.data
        .filter((item) => item.check)
        .map((item) => item.id);
      if (res) {
        const payload: Partial<SelfApproveList> = {
          listno: this.listNo.toString(),
          process: '5',
          careertype: '5',
          requesttype:
            SelfServiceRequestType.ขอรับรางวัลครูผู้สอนดีเด่นตามกลุ่มสาระการเรียนรู้, // ใบคำขออนุญาต
          isforeign: '0',
          status: '1',
          // forwardtolicensecreate: this.form.controls.createNumber.value
          //   ? '1'
          //   : '0',
          requestlist: JSON.stringify(checkIds),
          userid: `${getCookie('userId')}`,
        };
        this.requestService.createAprroveList(payload).subscribe((res) => {
          if (res?.returnmessage === 'success') {
            const streams = checkIds.map((id) => {
              const payload: KspApprovePayload = {
                requestid: id,
                process: '5',
                status: '1',
                userid: `${getCookie('userId')}`,
                detail: null,
                systemtype: '4', // approve by e-service staff
                paymentstatus: null,
              };
              return this.requestService.KspUpdateRequestProcess(payload);
            });
            forkJoin(streams).subscribe((res) => {
              console.log(res);
              this.completeDialog();
            });
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
        this.router.navigate(['/best-teacher', 'account-list']);
      }
    });
  }
}
