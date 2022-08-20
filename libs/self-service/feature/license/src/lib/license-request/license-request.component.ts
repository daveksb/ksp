import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ConfirmDialogComponent } from '@ksp/shared/dialog';
import { ForbiddenPropertyFormComponent } from '@ksp/shared/form/others';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { debounceTime } from 'rxjs';
import { LicenseRequestService } from './license-request.service';

@UntilDestroy()
@Component({
  templateUrl: './license-request.component.html',
  styleUrls: ['./license-request.component.scss'],
})
export class LicenseRequestComponent implements OnInit {
  form = this.fb.group({
    address1: [],
    address2: [],
    workplace: [],
    education: [],
    experience: [],
  });

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private fb: FormBuilder,
    public service: LicenseRequestService
  ) {}

  ngOnInit(): void {
    this.form.valueChanges
      .pipe(debounceTime(300), untilDestroyed(this))
      .subscribe((res) => {
        console.log('res = ', this.form);
      });
  }

  useSameAddress(evt: any) {
    const checked = evt.target.checked;
    if (checked) {
      this.form.controls.address2.patchValue(this.form.controls.address1.value);
    }
  }

  save() {
    const confirmDialog = this.dialog.open(ForbiddenPropertyFormComponent, {
      width: '900px',
    });

    confirmDialog.componentInstance.confirmed.subscribe((res) => {
      if (res) {
        this.onCompleted();
      }
    });
  }

  onCompleted() {
    const completeDialog = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: {
        title: `คุณต้องการบันทึกข้อมูล
        ใช่หรือไม่?`,
        btnLabel: 'ยื่นแบบคำขอ',
        cancelBtnLabel: 'บันทึก',
      },
    });

    completeDialog.componentInstance.saved.subscribe((res) => {
      if (res) {
        this.router.navigate(['/license', 'request']);
      }
    });

    completeDialog.componentInstance.confirmed.subscribe((res) => {
      if (res) {
        this.router.navigate(['/license', 'payment-channel']);
      }
    });
  }
}
