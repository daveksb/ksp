import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AddRowButtonComponent,
  RequestHeaderInfoComponent,
} from '@ksp/shared/ui';
import { SharedFormOthersModule } from '@ksp/shared/form/others';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { FormArray, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { KspFormBaseComponent } from '@ksp/shared/interface';
import { providerFactory } from '@ksp/shared/utility';

@Component({
  selector: 'ksp-request-reward-form',
  standalone: true,
  imports: [
    CommonModule,
    RequestHeaderInfoComponent,
    SharedFormOthersModule,
    AddRowButtonComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './request-reward-form.component.html',
  styleUrls: ['./request-reward-form.component.scss'],
  providers: providerFactory(RequestRewardFormComponent),
})
export class RequestRewardFormComponent
  extends KspFormBaseComponent
  implements OnInit
{
  override form = this.fb.group({
    workName: [],
    workType: [],
    workSubmit: [],
    rewardLink: [],
    personId: [''],
    prefix: [null],
    firstName: [''],
    lastName: [''],
    phone: [''],
    email: [''],
    academicStanding: [''],
    rows: this.fb.array([]),
  });

  rewardFiles = [
    'แบบ นร. 1',
    'แบบ นร.2',
    'เอกสารอื่นๆ',
    'บันทึกนำส่งจากสถานศึกษา',
  ];

  rewards = rewards;

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private fb: FormBuilder
  ) {
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
    this.addRow();
  }

  get rows() {
    return this.form.controls['rows'] as FormArray;
  }

  addRow() {
    const rewardForm = this.fb.group({
      developerType: [null],
      personId: [''],
      prefix: [null],
      firstName: [''],
      lastName: [''],
      phone: [''],
      email: [''],
      academicStanding: [''],
    });

    this.rows.push(rewardForm);
  }
}

export const rewards = [
  { label: 'ไม่เคยส่งเข้ารับการคัดสรรกับคุรุสภา', value: 1 },
  {
    label: 'เคยส่งเข้ารับการคัดสรรกับคุรุสภา แต่ไม่ได้รับรางวัลของคุรุสภา',
    value: 2,
  },
  {
    label: 'ได้รับรางวัลของคุรุสภา แต่มีการพัฒนาต่อยอดนวัตกรรม',
    value: 3,
  },
];
