import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import {
  VERIFY_CHOICES,
  ESelfFormBaseComponent,
} from '@ksp/shared/form/others';
import { KspRequest, SelfRequest } from '@ksp/shared/interface';
import { ERequestService, GeneralInfoService } from '@ksp/shared/service';
import { parseJson } from '@ksp/shared/utility';
import { Observable } from 'rxjs';

@Component({
  selector: 'ksp-e-fee-refund-detail',
  templateUrl: './e-fee-refund-detail.component.html',
  styleUrls: ['./e-fee-refund-detail.component.scss'],
})
export class EFeeRefundDetailComponent implements OnInit {
  refundInfo = ['1.สำเนาวุฒิการศึกษา'];
  choices = [
    {
      name: 'ครบถ้วน และถูกต้อง',
      value: 2,
    },
    {
      name: 'ไม่ครบถ้วน และถูกต้อง',
      value: 3,
    },
  ];
  requestId!: number;
  prefixList$!: Observable<any>;
  form = this.fb.group({
    userInfo: [],
    refundInfo: [],
    checkResult: this.fb.array([]),
  });

  requestData = new KspRequest();
  verifyChoice: any[] = VERIFY_CHOICES;
  files: any[] = [];

  get checkResultFormArray() {
    return this.form.controls.checkResult as FormArray;
  }

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private requestService: ERequestService,
    private generalInfoService: GeneralInfoService,
    private fb: FormBuilder
  ) {}

  nextPage() {
    ESelfFormBaseComponent.persistData(
      this.form.controls.checkResult.value,
      this.requestData
    );
    this.router.navigate(['/', 'refund-fee', 'confirm']);
  }

  cancel() {
    this.router.navigate(['/', 'refund-fee', 'list']);
  }

  ngOnInit(): void {
    this.prefixList$ = this.generalInfoService.getPrefix();
    this.checkRequestId();
    this.addCheckResultArray();
  }

  addCheckResultArray() {
    for (let i = 0; i < 1; i++) {
      this.checkResultFormArray.push(this.fb.control(null));
    }
    this.checkResultFormArray.setValidators(
      ESelfFormBaseComponent.allFilledValidator()
    );
  }

  checkRequestId() {
    this.route.paramMap.subscribe((params) => {
      this.requestId = Number(params.get('id'));
      if (this.requestId) {
        this.requestService
          .getKspRequestById(this.requestId)
          .subscribe((res) => {
            if (res) {
              this.requestData = res;
              this.patchData(res);
              //console.log(res);
            }
          });
      }
    });
  }

  patchData(data: SelfRequest) {
    //console.log(data);
    const { fileinfo, feerefundinfo, ...resData } = data;
    this.form.controls.userInfo.patchValue(<any>resData);

    if (feerefundinfo) {
      const feeRefundInfo = parseJson(feerefundinfo);
      this.form.controls.refundInfo.patchValue({ ...feeRefundInfo });
    }

    if (fileinfo) {
      const fileInfo = parseJson(data.fileinfo);
      const { attachfiles } = fileInfo;
      this.files = attachfiles;
    }
  }
}
