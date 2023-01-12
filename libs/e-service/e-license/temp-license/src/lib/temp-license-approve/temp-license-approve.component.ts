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
  selector: 'e-service-temp-license-approve',
  templateUrl: './temp-license-approve.component.html',
  styleUrls: ['./temp-license-approve.component.scss'],
})
export class TempLicenseApproveComponent implements OnInit {
  kspRequest = new KspRequest();
  approveHistory: any[] = [];
  form = this.fb.group({
    //result: [],
    //licenseNumber: [],
    //licenseDate: [],
    approvement: [],
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
        this.getApproveHistory(`${id}`);
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

  getApproveHistory(requestid: string) {
    this.requestService.getApproveHistory(requestid).subscribe((res) => {
      this.approveHistory = res;
      if (res && res.length) {
        this.approveHistory = this.approveHistory.map((h: any) => {
          return { ...h, ...{ detail: JSON.parse(h.detail) } };
        });
      }
    });
  }

  mapCheckResult(result: string) {
    //console.log('result = ', result);
    if (result === '1') return 'ครบถ้วน และถูกต้อง';
    if (result === '2') return 'ขอแก้ไข / เพิ่มเติม';
    if (result === '3') return 'ขาดคุณสมบัติ';
    else return '';
  }

  submitApi() {
    const form: any = this.form.controls.approvement.value;
    console.log('form  check= ', form);
    const detail = {
      checkresult: form.result,
      checkdetail: {
        approveNo: form.approveNo,
        approveDate: form.approveDate,
      },
    };

    const payload: KspApprovePayload = {
      requestid: this.kspRequest.id,
      process: `5`,
      status: `2`,
      detail: JSON.stringify(detail),
      systemtype: '4', // e-service
      userid: getCookie('userId'),
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
