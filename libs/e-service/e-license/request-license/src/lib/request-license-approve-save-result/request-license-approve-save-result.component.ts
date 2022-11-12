import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import {
  CompleteDialogComponent,
  ConfirmDialogComponent,
} from '@ksp/shared/dialog';
import { ERequestService } from '@ksp/shared/service';
import { formatDatePayload, parseJson } from '@ksp/shared/utility';

@Component({
  selector: 'ksp-request-license-approve-save-result',
  templateUrl: './request-license-approve-save-result.component.html',
  styleUrls: ['./request-license-approve-save-result.component.scss'],
})
export class RequestLicenseApproveSaveResultComponent implements OnInit {
  groupNo!: string;
  id!: string;
  listNo = '';
  licenseData = [
    {
      order: 1,
      licenseType: 'ครู',
      count: 0,
    },
    {
      order: 2,
      licenseType: 'ครูชาวต่างชาติ',
      count: 0,
    },
    {
      order: 3,
      licenseType: 'ผู้บริหารสถานศึกษา',
      count: 0,
    },
    {
      order: 4,
      licenseType: 'ผู้บริหารการศึกษา',
      count: 0,
    },
    {
      order: 5,
      licenseType: 'ศึกษานิเทศก์',
      count: 0,
    },
  ];

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
        this.requestService.getGroupByAccount(account).subscribe((res) => {
          console.log('group = ', res);
          if (res) {
            this.id = res.id;
            this.groupNo = res.groupno;
            const groupList = parseJson(res.grouplist);
            this.listNo = groupList.join(' | ');
          }
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
          id: this.id,
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
            const payload2 = formatDatePayload({
              considerdate: value.date,
              matilevel1: value.no,
              listno: this.listNo.split(' | ').join(','),
            });
            this.requestService
              .updateDateForMati1(payload2)
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
