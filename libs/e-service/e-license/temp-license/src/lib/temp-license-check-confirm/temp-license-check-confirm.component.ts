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
  previousForm: any;

  form = this.fb.group({
    approveResult: [],
    returnDate: [],
    rejectReason: [],
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
      this.requestDate = res.requestDate;
      this.requestNo = res.requestNo;
      this.previousForm = res;
    });
    this.checkRequestId();
  }

  save() {
    //console.log('payload = ', this.form.value);

    const { requestNo, requestDate, ...res } = this.previousForm;

    const payload = {
      ...res,
      ...{
        checksubresult: JSON.stringify({
          ...res.checksubresult,
          ...{ approveResult: this.form.value },
        }),
      },
    };

    console.log('payload = ', payload);

    this.eRequestService.checkRequest(payload).subscribe((res) => {
      console.log('check result = ', res);
    });
  }

  checkRequestId() {
    this.route.paramMap.pipe(untilDestroyed(this)).subscribe((params) => {
      this.requestId = Number(params.get('id'));
    });
  }

  cancel() {
    this.router.navigate(['/temp-license', 'list']);
  }

  prevPage() {
    this.router.navigate(['/temp-license', 'detail', this.requestId]);
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
