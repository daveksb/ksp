import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ListData } from '@ksp/shared/interface';

@Component({
  selector: 'self-service-renew-license-property-supervision',
  templateUrl: './renew-license-property-supervision.component.html',
  styleUrls: ['./renew-license-property-supervision.component.scss'],
})
export class RenewLicensePropertySupervisionComponent implements OnInit {
  standardKnowledges: ListData[] = [];
  selectedstandardKnowledgeType!: number;

  form = this.fb.group({
    standardKnowledgeType: [],
  });

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.standardKnowledges = standardKnowledges;

    this.form.controls['standardKnowledgeType'].valueChanges.subscribe(
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