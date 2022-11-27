import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  ESelfFormBaseComponent,
  VERIFY_CHOICES,
} from '@ksp/shared/form/others';
import { KspRequest, SelfRequest } from '@ksp/shared/interface';
import { ERequestService, GeneralInfoService } from '@ksp/shared/service';
import { parseJson } from '@ksp/shared/utility';
import { Observable } from 'rxjs';

const FORM_TAB_COUNT = 1;

@Component({
  selector: 'ksp-refund-detail',
  templateUrl: './refund-detail.component.html',
  styleUrls: ['./refund-detail.component.scss'],
})
export class RefundDetailComponent implements OnInit {
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
    this.router.navigate(['/', 'refund', 'approve']);
  }

  cancel() {
    this.router.navigate(['/', 'refund', 'list']);
  }

  ngOnInit(): void {
    this.prefixList$ = this.generalInfoService.getPrefix();
    this.checkRequestId();
    this.addCheckResultArray();
  }

  addCheckResultArray() {
    for (let i = 0; i < FORM_TAB_COUNT; i++) {
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
              console.log(res);
            }
          });
      }
    });
  }

  patchData(data: SelfRequest) {
    console.log(data);
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
