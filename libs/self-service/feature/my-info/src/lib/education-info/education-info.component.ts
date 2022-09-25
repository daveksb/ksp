import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { SelfMyInfo } from '@ksp/shared/interface';
import { AddressService, MyInfoService } from '@ksp/shared/service';
import { Observable } from 'rxjs';
import { replaceEmptyWithNull } from '@ksp/shared/utility';
import { TransferKnowledgeEducationComponent } from '@ksp/self-service/form';
@Component({
  selector: 'self-service-education-info',
  templateUrl: './education-info.component.html',
  styleUrls: ['./education-info.component.scss'],
})
export class EducationInfoComponent implements OnInit {
  constructor(
    private addressService: AddressService,
    private fb: FormBuilder,
    private myInfoService: MyInfoService
  ) {}
  countries$!: Observable<any>;
  form = this.fb.group({
    eduinfo: [],
  });
  @ViewChild(TransferKnowledgeEducationComponent)
  formComponent!: TransferKnowledgeEducationComponent;
  baseForm = this.fb.group(new SelfMyInfo());
  ngOnInit(): void {
    this.countries$ = this.addressService.getCountry();
    this.myInfoService.getMyInfo().subscribe((res) => {
      res = this.myInfoService.formatMyInfo(res);
      this.baseForm.patchValue(res);
      const eduinfo = JSON.parse(res.eduinfo as string);
      let start = 1;
      for (const key in eduinfo) {
        for (let i = 0; i < eduinfo[key].length; i++) {
          this.formComponent.addFormArray(start);
        }
        start++;
      }
      eduinfo.licenseInfo1;
      this.form.patchValue({ eduinfo });
    });
  }

  onClickSave() {
    const { eduinfo } = this.form.value;
    this.baseForm.patchValue({ eduinfo: JSON.stringify(eduinfo) });
    const payload: SelfMyInfo = replaceEmptyWithNull(this.baseForm.value);
    console.log(payload);
    this.myInfoService
      .updateMyInfo(payload)
      .subscribe((res) => console.log(res));
  }
}
