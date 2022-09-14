import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ListData } from '@ksp/shared/interface';

@Component({
  selector: 'self-service-renew-license-property-manager',
  templateUrl: './renew-license-property-manager.component.html',
  styleUrls: ['./renew-license-property-manager.component.scss'],
})
export class RenewLicensePropertyManagerComponent implements OnInit {
  selectedstandardKnowledgeType!: number;
  standardKnowledges: ListData[] = [];

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
