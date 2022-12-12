import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import {
  CompleteDialogComponent,
  ConfirmDialogComponent,
} from '@ksp/shared/dialog';
import { KspApprovePayload, KspRequest } from '@ksp/shared/interface';
import { ERequestService } from '@ksp/shared/service';
import { getCookie } from '@ksp/shared/utility';

@Component({
  selector: 'ksp-e-research-reward-reject',
  templateUrl: './e-research-reward-reject.component.html',
  styleUrls: ['./e-research-reward-reject.component.scss'],
})
export class EResearchRewardRejectComponent implements OnInit {
  requestData = new KspRequest();
  requestId!: number;
  userId = `${getCookie('userId')}`;

  form = this.fb.group({
    rewardRejectInfo: [null],
  });

  constructor(
    private route: ActivatedRoute,
    private requestService: ERequestService,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.requestId = Number(params.get('id'));
      if (this.requestId) {
        this.requestService
          .getKspRequestById(this.requestId)
          .subscribe((res) => {
            if (res) {
              this.requestData = res;
            }
          });
      }
    });
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
        const payload: KspApprovePayload = {
          requestid: this.requestData.id,
          process: `1`,
          status: `2`,
          detail: JSON.stringify(this.form.value.rewardRejectInfo),
          systemtype: '4', // approve by e-service staff
          userid: this.userId,
          paymentstatus: null,
        };
        this.requestService.KspUpdateRequestProcess(payload).subscribe(() => {
          this.completeDialog();
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
        this.router.navigate(['/research-reward', 'list']);
      }
    });
  }
}
