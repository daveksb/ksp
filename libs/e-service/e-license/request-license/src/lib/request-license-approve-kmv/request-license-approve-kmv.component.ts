import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { SelfServiceRequestSubType } from '@ksp/shared/constant';
import {
  CompleteDialogComponent,
  ConfirmDialogComponent,
} from '@ksp/shared/dialog';
import { ERequestService } from '@ksp/shared/service';
import { formatDatePayload, parseJson } from '@ksp/shared/utility';

const DEFAULT_REQUEST_TYPE_LIST = [
  {
    order: 1,
    licenseType: 'ครู',
    // count: 0,
    // approve: 0,
    // unApprove: 0,
    // urgent: 0,
  },
  {
    order: 2,
    licenseType: 'ครูชาวต่างชาติ',
    count: 0,
    approve: 0,
    unApprove: 0,
    urgent: 0,
  },
  {
    order: 3,
    licenseType: 'KSP Bundit',
    count: 0,
    approve: 0,
    unApprove: 0,
    urgent: 0,
  },
  {
    order: 4,
    licenseType: 'ผู้บริหารสถานศึกษา',
    // count: 0,
    // approve: 0,
    // unApprove: 0,
    // urgent: 0,
  },
  {
    order: 5,
    licenseType: 'ผู้บริหารการศึกษา',
    // count: 0,
    // approve: 0,
    // unApprove: 0,
    // urgent: 0,
  },
  {
    order: 6,
    licenseType: 'ศึกษานิเทศก์',
    // count: 0,
    // approve: 0,
    // unApprove: 0,
    // urgent: 0,
  },
];

@Component({
  selector: 'ksp-request-license-approve-kmv',
  templateUrl: './request-license-approve-kmv.component.html',
  styleUrls: ['./request-license-approve-kmv.component.scss'],
})
export class RequestLicenseApproveKmvComponent implements OnInit {
  groupNo!: string;
  listData!: any;
  id!: string;
  requestList: any[] = [];
  requestTypeList: any[] = [];

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private requestService: ERequestService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // this.requestTypeList = [...DEFAULT_REQUEST_TYPE_LIST];
    this.route.queryParamMap.subscribe((params) => {
      const group = params.get('group') || '';

      if (group) {
        this.groupNo = group;
        this.requestService.getSelfApproveGroupById(group).subscribe((res) => {
          this.id = res.id;
          this.listData = parseJson(res.grouplist)
            .toString()
            .replaceAll(',', ' | ');
        });

        this.requestService
          .getRequestListByGroupNo({
            groupno: group,
            offset: '0',
            row: '500',
          })
          .subscribe((res) => {
            if (res && res.datareturn.length > 0) {
              this.requestList = res.datareturn;

              const teacherCount = this.requestList.filter(
                (item) => +item.careertype === SelfServiceRequestSubType.ครู
              ).length;

              const schoolManagerCount = this.requestList.filter(
                (item) =>
                  +item.careertype ===
                  SelfServiceRequestSubType.ผู้บริหารสถานศึกษา
              ).length;

              const educationManagerCount = this.requestList.filter(
                (item) =>
                  +item.careertype ===
                  SelfServiceRequestSubType.ผู้บริหารการศึกษา
              ).length;

              const educationConsultantCount = this.requestList.filter(
                (item) =>
                  +item.careertype === SelfServiceRequestSubType.ศึกษานิเทศก์
              ).length;

              this.requestTypeList = DEFAULT_REQUEST_TYPE_LIST.map((item) => {
                if (item.order === 1) {
                  return {
                    ...item,
                    count: teacherCount,
                    approve: 0,
                    unApprove: 0,
                    urgent: 0,
                  };
                }

                if (item.licenseType === 'ผู้บริหารสถานศึกษา') {
                  return {
                    ...item,
                    count: schoolManagerCount,
                    approve: 0,
                    unApprove: 0,
                    urgent: 0,
                  };
                }

                if (item.licenseType === 'ผู้บริหารการศึกษา') {
                  return {
                    ...item,
                    count: educationManagerCount,
                    approve: 0,
                    unApprove: 0,
                    urgent: 0,
                  };
                }

                if (item.licenseType === 'ศึกษานิเทศก์') {
                  return {
                    ...item,
                    count: educationConsultantCount,
                    approve: 0,
                    unApprove: 0,
                    urgent: 0,
                  };
                }

                return item;
              });
            }
          });
      }
    });
  }

  cancel() {
    this.router.navigate(['/request-license', 'guarantee']);
  }

  confirmDialog() {
    const dialog = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: `คุณค้องการยืนยันข้อมูลใช่หรือไม่? `,
        btnLabel: `บันทึก`,
      },
    });

    dialog.componentInstance.confirmed.subscribe((res) => {
      if (res) {
        this.router.navigate(['/request-license', 'guarantee']);
      }
    });
  }

  save(value: any) {
    const dialog = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: `คุณต้องการยืนยันข้อมูล
        ใช่หรือไม่? `,
      },
    });

    dialog.componentInstance.confirmed.subscribe((res) => {
      if (res) {
        const payload = {
          id: this.id,
          matilevel2no: value.no,
          matilevel2date: value.date,
          matilevel2boardname: value.boardname,
          matilevel2presidentname: value.presidentname,
          matilevel2result: value.result,
          matilevel2fileinfo: null,
          matilevel2detail: value.detail,
        };
        this.requestService.updateApproveGroup2(payload).subscribe((res) => {
          if (res?.returnmessage === 'success') {
            const payload2 = formatDatePayload({
              approvedate: value.date,
              process: '2',
              status: value.result,
              matilevel2: value.no,
              listno: this.listData
                ? this.listData.split(' | ').join(',')
                : null,
            });
            this.requestService
              .updateSelfApproveListMati2(payload2)
              .subscribe((res) => {
                if (res?.returnmessage === 'success') {
                  this.completeDialog();
                }
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
        this.cancel();
      }
    });
  }

  onListOpen(order: string) {
    this.router.navigate(['/request-license', 'guarantee-confirm'], {
      queryParams: { order: order, group: this.groupNo },
    });
  }
}
