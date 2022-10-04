import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ListData } from '@ksp/shared/interface';
import { KspFormBaseComponent } from '@ksp/shared/interface';
import { providerFactory } from '@ksp/shared/utility';
import { skip } from 'rxjs';

@Component({
  selector: 'self-service-renew-license-property-supervision',
  templateUrl: './renew-license-property-supervision.component.html',
  styleUrls: ['./renew-license-property-supervision.component.scss'],
  providers: providerFactory(RenewLicensePropertySupervisionComponent),
})
export class RenewLicensePropertySupervisionComponent
  extends KspFormBaseComponent
  implements OnInit
{
  standardKnowledges: ListData[] = [];
  selectedstandardKnowledgeType!: number;
  @Input() uniqueTimestamp = '';
  @Input() workingInfo: any[] = [];


  override form = this.fb.group({
    standardKnowledgeType: [],
    educationDetails: [],
  });

  /* const WORKING_INFO_FILES = [
  {
    name: '1.รางวัลอื่นและประกาศเกียรติคุณ',
    fileId: '',
    fileName: '',
  },
]; */

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

    this.form.controls['standardKnowledgeType'].valueChanges.pipe(skip(3)).subscribe(
      (res) => {
        this.selectedstandardKnowledgeType = Number(res);
        //this.form.controls.educationLevelForm.reset();
      }
    );
  }
}

const standardKnowledges = [
  {
    value: 0,
    label: `มีวุฒิไม่ต่ำกว่าปริญญาโททางการศึกษา หรือเทียบเท่า หรือวุฒิอื่นที่คุรุสภารับรอง`,
  },
  {
    value: 1,
    label: `มีวุฒิไม่ต่ำกว่าปริญญาโทและผ่านการรับรองความรู้ตามมาตรฐานความรู้และวิชาชีพศึกษานิเทศก์ของคุรุสภา ครบ 9 มาตรฐาน`,
  },
  {
    value: 2,
    label: `มีวุฒิไม่ต่ำปริญญาโทและอยู่ระหว่างการเสนอขอรับรองความรู้ตามมาตรฐานความรู้วิชาชีพศึกษานิเทศก์ของคุรุสภา`,
  },
  {
    value: 3,
    label: `มีวุฒิไม่ต่ำกว่าปริญญาโทและอยู่ระหว่างศึกษาให้มีวุฒิไม่ต่ำกว่าปริญญาโททางการศึกษา`,
  },
  {
    value: 4,
    label: `มีวุฒิไม่ต่ำกว่าปริญญาโทและมีประสบการณ์ในการนิเทศการศึกษา`,
  },
  {
    value: 5,
    label: `มีวุฒิต่ำกว่าปริญญาโทและมีประสบการณ์ในการนิเทศการศึกษา`,
  },
];
