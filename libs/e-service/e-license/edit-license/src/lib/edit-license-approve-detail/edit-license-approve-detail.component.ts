import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { SelfRequest } from '@ksp/shared/interface';
import { ERequestService, GeneralInfoService } from '@ksp/shared/service';
import { parseJson } from '@ksp/shared/utility';
import { Observable } from 'rxjs';

@Component({
  selector: 'ksp-edit-license-approve-detail',
  templateUrl: './edit-license-approve-detail.component.html',
  styleUrls: ['./edit-license-approve-detail.component.scss'],
})
export class EditLicenseApproveDetailComponent implements OnInit {
  prefixList$!: Observable<any>;
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

  form = this.fb.group({
    userInfo: [],
  });

  form2 = this.fb.group({
    verifyResult: [null, Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private generalInfoService: GeneralInfoService,
    private route: ActivatedRoute,
    private requestService: ERequestService
  ) {}

  ngOnInit(): void {
    this.getListData();
    this.checkRequestId();
  }

  getListData() {
    this.prefixList$ = this.generalInfoService.getPrefix();
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
            }
          });
      }
    });
  }

  patchData(data: SelfRequest) {
    console.log(data);
    if (data.replacereasoninfo) {
      const replaceReasonInfo = parseJson(data.replacereasoninfo);
      console.log(replaceReasonInfo);
      this.form.controls.userInfo.patchValue(replaceReasonInfo);
    }

    // if (data.fileinfo) {
    //   const fileInfo = parseJson(data.fileinfo);
    //   console.log(fileInfo);
    //   const { attachfiles } = fileInfo;
    //   this.uploadFileList = attachfiles;
    // }
  }
}
