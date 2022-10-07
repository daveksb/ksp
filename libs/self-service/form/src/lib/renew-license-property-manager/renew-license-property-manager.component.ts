import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ListData } from '@ksp/shared/interface';
import { KspFormBaseComponent } from '@ksp/shared/interface';
import { providerFactory } from '@ksp/shared/utility';
import { skip } from 'rxjs';

@Component({
  selector: 'self-service-renew-license-property-manager',
  templateUrl: './renew-license-property-manager.component.html',
  styleUrls: ['./renew-license-property-manager.component.scss'],
  providers: providerFactory(RenewLicensePropertyManagerComponent),
})
export class RenewLicensePropertyManagerComponent
  extends KspFormBaseComponent
  implements OnInit
{
  selectedstandardKnowledgeType!: number;
  standardKnowledges: ListData[] = [];
  @Input() uniqueTimestamp = '';
  @Input() workingInfo: any[] = [];

  override form = this.fb.group({
    standardKnowledgeType: [null, Validators.required],
    educationDetails: [null, Validators.required],
  });

  constructor(private fb: FormBuilder) {
    super();
    this.subscriptions.push(
      // any time the inner form changes update the parent of any change
      this.form?.valueChanges.subscribe((value) => {
        this.onChange(value);
        this.onTouched();
      })
    );
  }

  ngOnInit(): void {
    this.standardKnowledges = standardKnowledges;

    this.form.controls['standardKnowledgeType'].valueChanges
      .pipe(skip(3))
      .subscribe((res) => {
        this.selectedstandardKnowledgeType = Number(res);
        //this.form.controls.educationLevelForm.reset();
      });
  }

  override set value(value: any) {
    if (value.standardKnowledgeType) {
      this.selectedstandardKnowledgeType = Number(value.standardKnowledgeType);
    }
    this.form.patchValue(value);
    this.onChange(value);
    this.onTouched();
  }
}

const standardKnowledges = [
  {
    value: 0,
    label: `มีวุฒิไม่ต่ำกว่าปริญญาตรีทางการบริหารการศึกษา หรือเทียบเท่า หรือวุฒิอื่นที่คุรุสภารับรอง`,
  },
  {
    value: 1,
    label: `มีวุฒิไม่ต่ำกว่าปริญญาตรีและมีวุฒิประกาศนียบัตรบัณฑิตทางการบริหารการศึกษาที่คุรุสภารับรอง`,
  },
  {
    value: 2,
    label: `มีวุฒิไม่ต่ำกว่าปริญญาตรีและอยู่ระหว่างศึกษาหลักสูตรประกาศนียบัตรบัณฑิตทางการบริหารการศึกษาที่คุรุสภารับรอง`,
  },
  {
    value: 3,
    label: `มีวุฒิไม่ต่ำกว่าปริญญาตรีและผ่านการรับรองความรู้ตามมาตรฐานความรู้และวิชาชีพผู้บริหารสถานศึกษาของคุรุสภา ครบ 10 มาตรฐาน (เลือกได้มากกว่า 1 รายการ)`,
  },
  {
    value: 4,
    label: `มีวุฒิไม่ต่ำปริญญาตรีและอยู่ระหว่างการเสนอขอรับรองความรู้ตามมาตรฐานความรู้วิชาชีพผู้บริหารสถานศึกษาของคุรุสภา (เลือกได้มากว่า 1 รายการ)`,
  },
  {
    value: 5,
    label: `มีวุฒิไม่ต่ำกว่าปริญญาตรีและอยู่ในระหว่างการศึกษาให้มีวุฒิ ไม่ต่ำกว่าปริญญาตรีทางการบริหารการศึกษา`,
  },
  {
    value: 6,
    label: `มีวุฒิไม่ต่ำกว่าปริญญาตรีและมีวุฒิประกาศนียบัตรบัณฑิตทางการบริหารการศึกษาที่คุรุสภารับรอง`,
  },
  {
    value: 7,
    label: `มีวุฒิต่ำกว่าปริญญาตรีและมีประสบการณ์ในบริหารสถานศึกษา`,
  },
];
