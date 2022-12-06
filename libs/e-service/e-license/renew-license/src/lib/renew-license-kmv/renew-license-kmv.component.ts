import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import {
  CompleteDialogComponent,
  ConfirmDialogComponent,
} from '@ksp/shared/dialog';
import { KspRequest } from '@ksp/shared/interface';
import { ERequestService, LoaderService } from '@ksp/shared/service';
import {
  formatDatePayload,
  getLicenseType,
  parseJson,
} from '@ksp/shared/utility';
import { Subject } from 'rxjs';

@Component({
  selector: 'ksp-renew-license-kmv',
  templateUrl: './renew-license-kmv.component.html',
  styleUrls: ['./renew-license-kmv.component.scss'],
})
export class RenewLicenseKmvComponent implements OnInit {
  isLoading: Subject<boolean> = this.loaderService.isLoading;
  groupNo!: string;
  listData!: any;
  id!: string;
  requestList: KspRequest[] = [];
  requestTypeList: any[] = [];

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private requestService: ERequestService,
    private route: ActivatedRoute,
    private loaderService: LoaderService
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
              this.requestTypeList = getLicenseType(this.requestList);
              console.log('type list = ', this.requestTypeList);
            }
          });
      }
    });
  }

  cancel() {
    this.router.navigate(['/renew-license', 'guarantee']);
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
        this.router.navigate(['/renew-license', 'guarantee']);
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
        const payload = formatDatePayload({
          id: this.id,
          matilevel2no: value.no,
          matilevel2date: value.date,
          matilevel2boardname: value.boardname,
          matilevel2presidentname: value.presidentname,
          matilevel2result: value.result,
          matilevel2fileinfo: null,
          matilevel2detail: value.detail,
        });

        this.requestService.updateApproveGroup2(payload).subscribe((res) => {
          if (res?.returnmessage === 'success') {
            const payload2 = formatDatePayload({
              approvedate: value.date,
              process: '7',
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
    this.router.navigate(['/renew-license', 'guarantee-confirm'], {
      queryParams: { order: order, group: this.groupNo },
    });
  }
}
