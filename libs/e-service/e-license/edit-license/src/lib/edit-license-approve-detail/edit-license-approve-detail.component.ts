import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  ESelfFormBaseComponent,
  VERIFY_CHOICES,
} from '@ksp/shared/form/others';
import {
  FileGroup,
  KspRequest,
  Prefix,
  SelfRequest,
} from '@ksp/shared/interface';
import { ERequestService, GeneralInfoService } from '@ksp/shared/service';
import { parseJson } from '@ksp/shared/utility';
import { Observable } from 'rxjs';

const FORM_TAB_COUNT = 1;

@Component({
  selector: 'ksp-edit-license-approve-detail',
  templateUrl: './edit-license-approve-detail.component.html',
  styleUrls: ['./edit-license-approve-detail.component.scss'],
})
export class EditLicenseApproveDetailComponent implements OnInit {
  prefixList$!: Observable<Prefix[]>;
  requestId!: number;
  requestData = new KspRequest();
  verifyChoice: any[] = VERIFY_CHOICES;
  uploadFileList: FileGroup[] = [];
  form = this.fb.group({
    userInfo: [],
    checkResult: this.fb.array([]),
  });
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

  get checkResultFormArray() {
    return this.form.controls.checkResult as FormArray;
  }

  constructor(
    private fb: FormBuilder,
    private generalInfoService: GeneralInfoService,
    private route: ActivatedRoute,
    private requestService: ERequestService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getListData();
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
              this.requestData = res;
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

    if (data.fileinfo) {
      const fileInfo = parseJson(data.fileinfo);
      const { attachfiles } = fileInfo;
      this.uploadFileList = attachfiles;
    }
  }

  next() {
    ESelfFormBaseComponent.persistData(
      this.form.controls.checkResult.value,
      this.requestData
    );
    this.router.navigate(['/edit-license', 'confirm', this.requestId]);
  }

  cancel() {
    this.router.navigate(['/edit-license', 'list']);
  }
}
