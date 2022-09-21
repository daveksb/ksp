import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import {
  CompleteDialogComponent,
  ConfirmDialogComponent,
} from '@ksp/shared/dialog';
import { ERequestService } from '@ksp/shared/service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import localForage from 'localforage';

@UntilDestroy()
@Component({
  selector: 'e-service-temp-license-check-confirm',
  templateUrl: './temp-license-check-confirm.component.html',
  styleUrls: ['./temp-license-check-confirm.component.scss'],
})
export class TempLicenseCheckConfirmComponent implements OnInit {
  requestId!: number;
  requestDate!: string | null;
  requestNo!: string | null;

  form = this.fb.group({
    verify: [],
    returnDate: [],
    reason: [],
    forward: [],
  });

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog,
    private fb: FormBuilder,
    private eRequestService: ERequestService
  ) {}

  ngOnInit(): void {
    localForage.getItem('checkRequestData').then((res: any) => {
      console.log('request data = ', res);
      this.requestDate = res.requestDate;
      this.requestNo = res.requestNo;
    });
  }

  checkRequestId() {
    this.route.paramMap.pipe(untilDestroyed(this)).subscribe((params) => {
      this.requestId = Number(params.get('id'));
      if (this.requestId) {
        //this.loadRequestFromId(this.requestId);
      }
    });
  }

  cancel() {
    this.router.navigate(['/temp-license', 'list']);
  }

  prevPage() {
    this.router.navigate(['/temp-license', 'detail', this.requestId]);
  }

  save() {
    //console.log('payload = ', payload);
    const payload = {};
    this.eRequestService.checkRequest(payload).subscribe((res) => {
      console.log('check result = ', res);
    });
  }

  submit() {
    const confirmDialog = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: {
        title: `คุณต้องการยืนยันข้อมูล
        ใช่หรือไม่? `,
      },
    });

    confirmDialog.componentInstance.confirmed.subscribe((res) => {
      if (res) {
        //this.onCompleted();
        this.save();
      }
    });
  }

  onCompleted() {
    const completeDialog = this.dialog.open(CompleteDialogComponent, {
      width: '375px',
      data: {
        header: `บันทึกข้อมูลสำเร็จ`,
      },
    });

    completeDialog.componentInstance.completed.subscribe((res) => {
      if (res) {
        this.router.navigate(['/temp-license', 'list']);
      }
    });
  }
}
