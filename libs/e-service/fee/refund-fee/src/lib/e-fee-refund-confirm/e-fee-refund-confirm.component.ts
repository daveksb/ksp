import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ApproveResult } from '@ksp/e-service/e-license/approve-ksp-request';
import { ESelfConfirmFormBaseComponent } from '@ksp/self-service/form';
import { ERequestService } from '@ksp/shared/service';
import { Location } from '@angular/common';

@Component({
  selector: 'ksp-e-fee-refund-confirm',
  templateUrl: './e-fee-refund-confirm.component.html',
  styleUrls: ['./e-fee-refund-confirm.component.scss'],
})
export class EFeeRefundConfirmComponent
  extends ESelfConfirmFormBaseComponent
  implements OnInit
{
  constructor(
    fb: FormBuilder,
    route: ActivatedRoute,
    private router: Router,
    dialog: MatDialog,
    eRequestService: ERequestService,
    private location: Location
  ) {
    super(fb, route, dialog, eRequestService);
  }

  prevPage() {
    this.location.back();
  }

  navigateBack() {
    this.router.navigate(['/refund-fee', 'list']);
  }

  override checkApproveResult(input: ApproveResult) {
    //console.log('check aa = ');
    const req = this.saveData.requestData;
    if (input.result === '1') {
      //ครบถ้วน และถูกต้อง
      if (input.shouldForward === '1') {
        //ไม่ส่งตรวจสอบลำดับต่อไป
        if (req.process === '1') {
          this.targetProcess = Number(req.process) + 1;
        } else {
          this.targetProcess = Number(req.process);
        }
        this.targetStatus = 3;
      } else if (input.shouldForward === '2') {
        //ส่งตรวจสอบลำดับต่อไป
        //console.log('//ส่งตรวจสอบลำดับต่อไป ');
        if (req.process === '1') {
          this.targetProcess = 3;
          this.targetStatus = 1;
        } else if (req.process === '2') {
          this.targetProcess = 3;
          this.targetStatus = 1;
        } else if (req.process === '3') {
          this.targetProcess = 3;
          this.targetStatus = 3;
        }
      } else if (input.shouldForward === '4') {
        //ส่งเรื่องพิจารณา
        this.targetProcess = 3;
        this.targetStatus = 3;
      }
    } else if (input.result === '2') {
      //ขอแก้ไข / เพิ่มเติม
      this.targetProcess = Number(req.process) + 1;
      this.targetStatus = 2;
    } else if (input.result === '3') {
      if (req.process === '1') {
        this.targetProcess = Number(req.process) + 1;
      } else {
        this.targetProcess = Number(req.process);
      }
      if (input.shouldForward === '3') {
        //ไม่ผ่านการตรวจสอบ เนื่องจากไม่ครบถ้วน / ไม่ถูกต้อง
        this.targetStatus = 4;
      } else if (input.shouldForward === '5') {
        //ยกเลิก
        this.targetStatus = 5;
      }
    }
  }
}
