import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ListData } from '@ksp/shared/interface';
import { KspFormBaseComponent } from '@ksp/shared/interface';
import { providerFactory } from '@ksp/shared/utility';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { skip } from 'rxjs';

@Component({
  selector: 'self-service-renew-license-property-manager',
  templateUrl: './renew-license-property-manager.component.html',
  styleUrls: ['./renew-license-property-manager.component.scss'],
  providers: providerFactory(RenewLicensePropertyManagerComponent),
})
@UntilDestroy()
export class RenewLicensePropertyManagerComponent
  extends KspFormBaseComponent
  implements OnInit
{
  selectedStandardKnowledgeType1!: number;
  selectedStandardKnowledgeType2!: number;
  standardKnowledgesSch: ListData[] = [];
  standardKnowledgesEdu: ListData[] = [];
  @Input() uniqueTimestamp = '';
  @Input() workingInfo: any[] = [];
  @Input() managerType: 'sch' | 'edu' = 'sch';
  @Input() systemType = '';

  override form = this.fb.group({
    standardKnowledgeType1: [null, Validators.required],
    standardKnowledgeType2: [null, Validators.required],
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
    this.standardKnowledgesSch = standardKnowledgesSch;
    this.standardKnowledgesEdu = standardKnowledgesEdu;
    this.form.controls['standardKnowledgeType1'].valueChanges
      .pipe(skip(3), untilDestroyed(this))
      .subscribe((res) => {
        this.selectedStandardKnowledgeType1 = Number(res);
        //this.form.controls.educationLevelForm.reset();
      });
    this.form.controls['standardKnowledgeType2'].valueChanges
      .pipe(skip(3), untilDestroyed(this))
      .subscribe((res) => {
        this.selectedStandardKnowledgeType2 = Number(res);
        //this.form.controls.educationLevelForm.reset();
      });
  }

  override set value(value: any) {
    if (value.standardKnowledgeType1) {
      this.selectedStandardKnowledgeType1 = Number(
        value.standardKnowledgeType1
      );
    } else if (value.standardKnowledgeType2) {
      this.selectedStandardKnowledgeType2 = Number(
        value.standardKnowledgeType2
      );
    }
    this.form.patchValue(value);
    this.onChange(value);
    this.onTouched();
  }
}

const standardKnowledgesSch = [
  {
    value: 0,
    label: `มีวุฒิไม่ต่ำกว่าปริญญาตรีทางการบริหารสถานศึกษา หรือเทียบเท่า หรือวุฒิอื่นที่คุรุสภารับรอง`,
  },
  {
    value: 1,
    label: `มีวุฒิไม่ต่ำกว่าปริญญาตรีและมีวุฒิประกาศนียบัตรบัณฑิตทางการบริหารสถานศึกษาที่คุรุสภารับรอง`,
  },
  {
    value: 2,
    label: `มีวุฒิไม่ต่ำกว่าปริญญาตรีและอยู่ระหว่างศึกษาหลักสูตรประกาศนียบัตรบัณฑิตทางการบริหารสถานศึกษาที่คุรุสภารับรอง`,
  },
  {
    value: 3,
    label: `มีวุฒิไม่ต่ำกว่าปริญญาตรีและผ่านการรับรองความรู้ตามมาตรฐานความรู้และวิชาชีพผู้บริหารสถานศึกษาของคุรุสภา ครบ 10 มาตรฐาน`,
  },
  {
    value: 4,
    label: `มีวุฒิไม่ต่ำปริญญาตรีและอยู่ระหว่างการเสนอขอรับรองความรู้ตามมาตรฐานความรู้วิชาชีพผู้บริหารสถานศึกษาของคุรุสภา`,
  },
  {
    value: 5,
    label: `มีวุฒิไม่ต่ำกว่าปริญญาตรีและอยู่ในระหว่างการศึกษาให้มีวุฒิ ไม่ต่ำกว่าปริญญาตรีทางการบริหารสถานศึกษา`,
  },
  {
    value: 6,
    label: `มีวุฒิไม่ต่ำกว่าปริญญาตรีและมีประสบการณ์ในการบริหารสถานศึกษา`,
  },
  {
    value: 7,
    label: `มีวุฒิต่ำกว่าปริญญาตรีและมีประสบการณ์ในการบริหารสถานศึกษา`,
  },
];

const standardKnowledgesEdu = [
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
    label: `มีวุฒิไม่ต่ำกว่าปริญญาตรีและผ่านการรับรองความรู้ตามมาตรฐานความรู้และวิชาชีพผู้บริหารการศึกษาของคุรุสภา ครบ 10 มาตรฐาน`,
  },
  {
    value: 4,
    label: `มีวุฒิไม่ต่ำปริญญาตรีและอยู่ระหว่างการเสนอขอรับรองความรู้ตามมาตรฐานความรู้วิชาชีพผู้บริหารการศึกษาของคุรุสภา`,
  },
  {
    value: 5,
    label: `มีวุฒิไม่ต่ำกว่าปริญญาตรีและอยู่ในระหว่างการศึกษาให้มีวุฒิ ไม่ต่ำกว่าปริญญาตรีทางการบริหารการศึกษา`,
  },
  {
    value: 6,
    label: `มีวุฒิไม่ต่ำกว่าปริญญาตรีและมีประสบการณ์ในการบริหารการศึกษา`,
  },
  {
    value: 7,
    label: `มีวุฒิต่ำกว่าปริญญาตรีและมีประสบการณ์ในการบริหารการศึกษา`,
  },
];
