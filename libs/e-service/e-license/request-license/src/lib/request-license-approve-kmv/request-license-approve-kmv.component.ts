import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
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
  getSummaryData,
  parseJson,
} from '@ksp/shared/utility';
import { Subject } from 'rxjs';

@Component({
  selector: 'ksp-request-license-approve-kmv',
  templateUrl: './request-license-approve-kmv.component.html',
  styleUrls: ['./request-license-approve-kmv.component.scss'],
})
export class RequestLicenseApproveKmvComponent implements OnInit {
  isLoading: Subject<boolean> = this.loaderService.isLoading;
  groupNo!: string;
  listData!: any;
  id!: string | null;
  requestList: KspRequest[] = [];
  requestTypeList: any[] = [];
  disableForm = false;
  form = this.fb.group({
    matiDetail: [''],
  });
  summaryData: any[] = [
    {
      result: 'อนุมัติออกหนังสืออนุญาต',
      count: 0,
    },
    {
      result: 'ไม่อนุมัติออกหนังสืออนุญาต',
      count: 0,
    },
    {
      result: 'กรณีเร่งด่วนออกหนังสืออนุญาตแล้ว',
      count: 0,
    },
  ];

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private requestService: ERequestService,
    private route: ActivatedRoute,
    private loaderService: LoaderService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    // this.requestTypeList = [...DEFAULT_REQUEST_TYPE_LIST];
    this.route.queryParamMap.subscribe((params) => {
      const group = params.get('group') || '';

      if (group) {
        this.groupNo = group;
        this.requestService.getSelfApproveGroupById(group).subscribe((res) => {
          //console.log('res = ', res);

          const formData: any = {
            no: res.matilevel2no,
            date: res.matilevel2date,
            boardname: res.matilevel2boardname,
            presidentname: res.matilevel2presidentname,
            result: res.matilevel2result,
            detail: res.matilevel2detail,
          };
          this.form.controls.matiDetail.patchValue(formData);

          if (res && res.matilevel2no) {
            this.disableForm = true;
          }

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
              //console.log('type list = ', this.requestTypeList);
              this.summaryData = getSummaryData(this.requestTypeList);
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
    this.router.navigate(['/request-license', 'guarantee-confirm'], {
      queryParams: { order: order, group: this.groupNo },
    });
  }
}
