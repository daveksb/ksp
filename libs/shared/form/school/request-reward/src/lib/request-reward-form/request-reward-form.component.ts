import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AddRowButtonComponent,
  RequestHeaderInfoComponent,
} from '@ksp/shared/ui';
import { SharedFormOthersModule } from '@ksp/shared/form/others';

import { MatDialog } from '@angular/material/dialog';
import {
  FormArray,
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { KspFormBaseComponent } from '@ksp/shared/interface';
import { providerFactory, thaiDate } from '@ksp/shared/utility';

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
  @Input() osoiTypes: any = [];
  @Input() personTypes: any = [];
  @Input() prefixList: any = [];
  @Input() requestNo = '';

  override form = this.fb.group({
    rewardname: [null, Validators.required],
    rewardtype: [null, Validators.required],
    submitbefore: [null, Validators.required],
    vdolink: [],
    /*     personId: [''],
    prefix: [null],
    firstName: [''],
    lastName: [''],
    phone: [''],
    email: [''],
    academicStanding: [''], */
    osoimember: this.fb.array([]),
  });

  rewardFiles = [
    { name: 'แบบ นร. 1', fileId: '' },
    { name: 'แบบ นร.2', fileId: '' },
    { name: 'เอกสารอื่นๆ', fileId: '' },
    { name: 'บันทึกนำส่งจากสถานศึกษา', fileId: '' },
  ];

  rewards = rewards;
  today = thaiDate(new Date());

  constructor(
    //private router: Router,
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

  get members() {
    return this.form.controls.osoimember as FormArray;
  }

  addRow() {
    const rewardForm = this.fb.group({
      membertype: [null],
      idcardno: [null],
      prefix: [null],
      firstName: [''],
      lastName: [''],
      phone: [''],
      email: [''],
      academicStanding: [''],
    });

    this.members.push(rewardForm);
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
