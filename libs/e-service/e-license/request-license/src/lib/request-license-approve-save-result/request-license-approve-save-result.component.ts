import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import {
  CompleteDialogComponent,
  ConfirmDialogComponent,
} from '@ksp/shared/dialog';
import { ERequestService, LoaderService } from '@ksp/shared/service';
import {
  formatDatePayload,
  getLicenseType,
  parseJson,
} from '@ksp/shared/utility';
import { Subject } from 'rxjs';

@Component({
  selector: 'ksp-request-license-approve-save-result',
  templateUrl: './request-license-approve-save-result.component.html',
  styleUrls: ['./request-license-approve-save-result.component.scss'],
})
export class RequestLicenseApproveSaveResultComponent implements OnInit {
  isLoading: Subject<boolean> = this.loaderService.isLoading;
  groupNo!: string | null;
  id!: string | null;
  listNo = '';
  licenseData: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private requestService: ERequestService,
    public dialog: MatDialog,
    private loaderService: LoaderService
  ) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params) => {
      const account = params.get('account') || '';

      if (account) {
        this.requestService.getGroupByAccount(account).subscribe((res) => {
          //console.log('group = ', res);
          if (res) {
            this.id = res.id;
            this.groupNo = res.groupno;
            const groupList = parseJson(res.grouplist);
            this.listNo = groupList.join(' | ');

            const payload = {
              groupno: this.groupNo,
              offset: '0',
              row: '500',
            };
            this.requestService
              .getRequestListByGroupNo(payload)
              .subscribe((res) => {
                //console.log('requests = ', res.datareturn);
                this.licenseData = getLicenseType(res.datareturn);
              });
          }
        });
      }
    });
  }

  cancel() {
    this.router.navigate(['/request-license', 'search-list']);
  }

  save(value: any) {
    //console.log('form value = ', value);
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
          matilevel1no: value.no,
          matilevel1date: value.date,
          matilevel1boardname: value.boardname,
          matilevel1presidentname: value.presidentname,
          matilevel1result: value.result,
          matilevel1fileinfo: null,
          matilevel1detail: value.detail,
        });

        const payload2 = formatDatePayload({
          considerdate: value.date,
          process: '6',
          status: value.result,
          matilevel1: value.no,
          listno: this.listNo.split(' | ').join(','),
        });

        this.requestService.updateApproveGroup(payload).subscribe((res) => {
          if (res?.returnmessage === 'success') {
            //console.log('payload = ', payload2);
            this.requestService
              .updateSelfApproveListMati1(payload2)
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
}
