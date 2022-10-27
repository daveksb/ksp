import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SelfRequest } from '@ksp/shared/interface';
import { ERequestService, GeneralInfoService } from '@ksp/shared/service';
import { parseJson } from '@ksp/shared/utility';
import { Observable } from 'rxjs';

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
  });

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private requestService: ERequestService,
    private generalInfoService: GeneralInfoService,
    private fb: FormBuilder
  ) {}

  nextPage() {
    this.router.navigate(['/', 'refund', 'approve']);
  }

  cancel() {
    this.router.navigate(['/', 'refund', 'list']);
  }

  ngOnInit(): void {
    this.prefixList$ = this.generalInfoService.getPrefix();
    this.checkRequestId();
  }

  checkRequestId() {
    this.route.paramMap.subscribe((params) => {
      this.requestId = Number(params.get('id'));
      if (this.requestId) {
        this.requestService
          .getKspRequestById(this.requestId)
          .subscribe((res) => {
            if (res) {
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

    // if (fileinfo) {
    //   const fileInfo = parseJson(data.fileinfo);
    //   console.log(fileInfo);
    //   const { attachfiles } = fileInfo;
    //   this.files = attachfiles;
    // }
  }
}
