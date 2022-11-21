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
import { FileGroup, KspFormBaseComponent } from '@ksp/shared/interface';
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
export class RequestRewardFormComponent extends KspFormBaseComponent {
  @Input() osoiTypes: any = [];
  @Input() personTypes: any = [];
  @Input() prefixList: any = [];
  @Input() uniqueTimeStamp = '';

  @Input()
  set memberList(members: MemberForm[]) {
    //console.log('get members =', members);
    if (members && members.length) {
      members.map((member) => {
        this.addRow(member);
      });
    }
  }

  override form = this.fb.group({
    rewardname: [null, Validators.required],
    rewardtype: [null, Validators.required],
    submitbefore: [null, Validators.required],
    vdolink: [''],
    osoimember: this.fb.array([]),
    personId: [null, Validators.required],
    prefix: [null, Validators.required],
    firstName: [null, Validators.required],
    lastName: [null, Validators.required],
    phone: [null, Validators.required],
    email: [null, Validators.required],
    academicStanding: [null, Validators.required],
  });

  rewardFiles: FileGroup[] = [
    { name: 'แบบ นร. 1', files: [] },
    { name: 'แบบ นร.2', files: [] },
    { name: 'เอกสารอื่นๆ', files: [] },
    { name: 'บันทึกนำส่งจากสถานศึกษา', files: [] },
  ];

  rewards = rewards;

  constructor(public dialog: MatDialog, private fb: FormBuilder) {
    super();
    this.subscriptions.push(
      this.form?.valueChanges.subscribe((value) => {
        this.onChange(value);
        this.onTouched();
      })
    );
  }

  get members() {
    return this.form.controls.osoimember as FormArray;
  }

  addRow(data: MemberForm = defaultMember) {
    const rewardForm = this.fb.group({
      membertype: [data.membertype, Validators.required],
      idcardno: [data.idcardno, Validators.required],
      prefix: [data.prefix, Validators.required],
      firstname: [data.firstname, Validators.required],
      lastname: [data.lastname, Validators.required],
      phone: [data.phone, Validators.required],
      email: [data.email, Validators.required],
      academicstanding: [data.academicstanding, Validators.required],
    });

    //console.log('reward form = ', rewardForm);
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

const defaultMember: MemberForm = {
  membertype: null,
  idcardno: null,
  prefix: null,
  firstname: null,
  lastname: null,
  phone: null,
  email: null,
  academicstanding: null,
};

export interface MemberForm {
  membertype: string | null;
  idcardno: string | null;
  prefix: number | null;
  firstname: string | null;
  lastname: string | null;
  phone: string | null;
  email: string | null;
  academicstanding: string | null;
}
