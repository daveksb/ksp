import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import {
  CompleteDialogComponent,
  ConfirmDialogComponent,
} from '@ksp/shared/dialog';
import { ERequestService } from '@ksp/shared/service';
import { getCookie, parseJson } from '@ksp/shared/utility';

@Component({
  selector: 'ksp-request-license-approve-print',
  templateUrl: './request-license-approve-print.component.html',
  styleUrls: ['./request-license-approve-print.component.scss'],
})
export class RequestLicenseApprovePrintComponent implements OnInit {
  groupNo!: number;
  accounts!: string;

  constructor(
    private router: Router,
    private requestService: ERequestService,
    private route: ActivatedRoute,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.requestService.getLastApproveGroup().subscribe((res) => {
      this.groupNo = +res.groupno + 1;
      console.log('group = ', parseJson(res.grouplist));
    });

    this.route.queryParamMap.subscribe((params) => {
      const accounts = params.get('accounts') || '';

      if (accounts) {
        this.accounts = accounts.split(',').join(' | ');
      }
    });
  }

  cancel() {
    this.router.navigate(['/request-license', 'search-list']);
  }

  save() {
    const dialog = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: `คุณต้องการยืนยันข้อมูล
        ใช่หรือไม่? `,
      },
    });

    dialog.componentInstance.confirmed.subscribe((res) => {
      if (res) {
        const payload = {
          userid: `${getCookie('userId')}`,
          groupno: this.groupNo.toString(),
          grouplist: JSON.stringify(this.accounts.split(' | ')),
        };
        this.requestService.createAprroveGroup(payload).subscribe((res) => {
          if (res?.returnmessage === 'success') {
            const payload2 = {
              groupno: this.groupNo.toString(),
              listno: this.accounts.split(' | ').join(','),
            };
            this.requestService.updateMultiList(payload2).subscribe((res) => {
              if (res?.returnmessage === 'success') {
                this.router.navigate(['/request-license', 'search-list']);
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
