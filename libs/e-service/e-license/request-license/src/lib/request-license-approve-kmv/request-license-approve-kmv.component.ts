import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import {
  CompleteDialogComponent,
  ConfirmDialogComponent,
} from '@ksp/shared/dialog';
import { ERequestService } from '@ksp/shared/service';

@Component({
  selector: 'ksp-request-license-approve-kmv',
  templateUrl: './request-license-approve-kmv.component.html',
  styleUrls: ['./request-license-approve-kmv.component.scss'],
})
export class RequestLicenseApproveKmvComponent implements OnInit {
  groupNo!: string;
  constructor(
    private dialog: MatDialog,
    private router: Router,
    private requestService: ERequestService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params) => {
      const group = params.get('group') || '';

      if (group) {
        this.groupNo = group;
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
          id: '44',
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
        this.cancel();
      }
    });
  }
}
