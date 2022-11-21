import { SelectionModel } from '@angular/cdk/collections';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { SelfServiceRequestSubType } from '@ksp/shared/constant';
import {
  CompleteDialogComponent,
  ConfirmDialogComponent,
} from '@ksp/shared/dialog';
import { ERequestService, LoaderService } from '@ksp/shared/service';
import { Location } from '@angular/common';
import { Subject } from 'rxjs';

@Component({
  selector: 'ksp-request-license-approve-guaruntee',
  templateUrl: './request-license-approve-guaruntee.component.html',
  styleUrls: ['./request-license-approve-guaruntee.component.scss'],
})
export class RequestLicenseApproveGuarunteeComponent
  implements OnInit, AfterViewInit
{
  isLoading: Subject<boolean> = this.loaderService.isLoading;
  displayedColumns = [
    'select',
    'order',
    'idCardNo',
    'name',
    'educationLevel',
    'experience',
    'prohibitType',
    'urgent',
    'payDate',
    'requestDate',
    'licenseNo',
  ];
  dataSource = new MatTableDataSource<any>();
  selection = new SelectionModel<any>(true, []);
  order!: string;
  groupNo!: string;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private requestService: ERequestService,
    private location: Location,
    private loaderService: LoaderService
  ) {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params) => {
      const order = params.get('order') || '';
      const group = params.get('group') || '';
      if (order) {
        this.order = order;
      }

      if (group) {
        this.groupNo = group;
        this.requestService
          .getRequestListByGroupNo({
            groupno: this.groupNo,
            offset: '0',
            row: '500',
          })
          .subscribe((res) => {
            console.log(res);
            this.dataSource.data = res.datareturn
              .map((item: any) => ({
                ...item,
                select: false,
              }))
              .filter((item: any) => {
                switch (this.order) {
                  case '1':
                    return +item.careertype === SelfServiceRequestSubType.ครู;
                  case '4':
                    return (
                      +item.careertype ===
                      SelfServiceRequestSubType.ผู้บริหารสถานศึกษา
                    );
                  case '5':
                    return (
                      +item.careertype ===
                      SelfServiceRequestSubType.ผู้บริหารการศึกษา
                    );
                  case '6':
                    return (
                      +item.careertype ===
                      SelfServiceRequestSubType.ศึกษานิเทศก์
                    );
                  default:
                    return true;
                }
              });
          });
      }
    });
  }

  confirmDialog() {
    const dialog = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: `คุณยืนยันบัญชีรายชื่อเพื่อออกใบอนุญาตประกอบวิชาชีพใช่หรือไม่? `,
        btnLabel: `ยืนยัน`,
        // cancelBtnLabel: 'ไม่ใช่',
      },
    });

    dialog.componentInstance.confirmed.subscribe((res) => {
      if (res) {
        this.router.navigate(['/request-license', 'kmv']);
      }
    });
  }

  back() {
    this.location.back();
  }

  approve() {
    const dialog = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: `คุณต้องการยืนยันข้อมูล
        ใช่หรือไม่? `,
      },
    });

    dialog.componentInstance.confirmed.subscribe((res) => {
      if (res) {
        const data = this.selection.selected.map((item: any) => ({
          requestid: item.id,
          process: '5',
          status: '3',
          // detail: '',
          // systemtype: '4',
          // userid: '123',
        }));
        if (data.length > 0) {
          const payload = {
            data,
          };
          this.requestService
            .updateMultipleLicenseStatus(payload)
            .subscribe((res) => {
              // if (res?.)
              console.log(res);
              this.completeDialog();
            });
        }
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
        this.back();
      }
    });
  }
}
