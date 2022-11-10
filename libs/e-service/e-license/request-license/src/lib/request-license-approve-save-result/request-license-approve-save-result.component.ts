import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import {
  CompleteDialogComponent,
  ConfirmDialogComponent,
} from '@ksp/shared/dialog';
import { ERequestService } from '@ksp/shared/service';

@Component({
  selector: 'ksp-request-license-approve-save-result',
  templateUrl: './request-license-approve-save-result.component.html',
  styleUrls: ['./request-license-approve-save-result.component.scss'],
})
export class RequestLicenseApproveSaveResultComponent implements OnInit {
  groupNo!: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private requestService: ERequestService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params) => {
      const account = params.get('account') || '';

      if (account) {
        this.requestService.getGroupByAccount('7005').subscribe((res) => {
          console.log('group = ', res);
        });
      }
    });
  }

  cancel() {
    this.router.navigate(['/request-license', 'search-list']);
  }

  save(value: any) {
    console.log(value);
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
          matilevel1no: value.no,
          matilevel1date: value.date,
          matilevel1boardname: value.boardname,
          matilevel1presidentname: value.presidentname,
          matilevel1result: value.result,
          matilevel1fileinfo: null,
          matilevel1detail: value.detail,
        };
        this.requestService.updateApproveGroup(payload).subscribe((res) => {
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
