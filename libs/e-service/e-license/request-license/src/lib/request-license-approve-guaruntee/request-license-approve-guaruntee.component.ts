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
import { ERequestService } from '@ksp/shared/service';

@Component({
  selector: 'ksp-request-license-approve-guaruntee',
  templateUrl: './request-license-approve-guaruntee.component.html',
  styleUrls: ['./request-license-approve-guaruntee.component.scss'],
})
export class RequestLicenseApproveGuarunteeComponent
  implements OnInit, AfterViewInit
{
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
    private requestService: ERequestService
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
            row: '100',
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

    // this.dataSource.data = [
    //   {
    //     select: true,
    //     order: 1,
    //     idCardNo: '3-6406-00004-00-1',
    //     name: 'นายสมชาย สมบัติ',
    //     educationLevel: 'ศิลปศาสตร์บัณฑิต',
    //     experience: true,
    //     prohibitType: 'รับรอง',
    //     urgent: true,
    //     payDate: '01 มิ.ย. 2564',
    //     requestDate: '01 มิ.ย. 2564',
    //     licenseNo: 'SF_TR640600004',
    //   },
    //   {
    //     select: true,
    //     order: 2,
    //     idCardNo: '3-6406-00004-00-1',
    //     name: 'นางสาวพรทิพย์ นาคปรก',
    //     educationLevel: 'วิทยาศาสตร์บัณฑิต',
    //     experience: true,
    //     prohibitType: 'รับรอง',
    //     urgent: true,
    //     payDate: '01 มิ.ย. 2564',

    //     requestDate: '01 มิ.ย. 2564',
    //     licenseNo: 'SF_TR640600004',
    //   },
    // ];
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
}
