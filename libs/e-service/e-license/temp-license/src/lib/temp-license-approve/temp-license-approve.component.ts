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

@Component({
  selector: 'e-service-temp-license-approve',
  templateUrl: './temp-license-approve.component.html',
  styleUrls: ['./temp-license-approve.component.scss'],
})
export class TempLicenseApproveComponent implements OnInit {
  kspRequest = new KspRequest();
  form = this.fb.group({
    result: [],
    licenseNumber: [],
    licenseDate: [],
  });

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private requestService: ERequestService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = Number(params.get('id'));
      if (id) {
        this.requestService.getKspRequestById(id).subscribe((res) => {
          this.kspRequest = res;
        });
      }
    });
  }

  cancel() {
    this.router.navigate(['/temp-license', 'list']);
  }

  save() {
    const confirmDialog = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: `คุณต้องการยืนยันข้อมูล
        ใช่หรือไม่? `,
      },
    });

    confirmDialog.componentInstance.confirmed.subscribe((res) => {
      if (res) {
        //this.onCompleted();
        this.submitApi();
      }
    });
  }

  submitApi() {
    const payload: KspApprovePayload = {
      requestid: this.kspRequest.id,
      process: `5`,
      status: `2`,
      detail: null,
      systemtype: '4', // e-service
      userid: null,
      paymentstatus: null,
    };

    //console.log('payload = ', payload);
    this.requestService.KspUpdateRequestProcess(payload).subscribe(() => {
      this.onCompleted();
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
