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
export class RequestRewardFormComponent extends KspFormBaseComponent {
  @Input() osoiTypes: any = [];
  @Input() personTypes: any = [];
  @Input() prefixList: any = [];
  @Input() requestNo: string | null = null;

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
    vdolink: [],
    osoimember: this.fb.array([]),
    /*     personId: [''],
    prefix: [null],
    firstName: [''],
    lastName: [''],
    phone: [''],
    email: [''],
    academicStanding: [''], */
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

  get members() {
    return this.form.controls.osoimember as FormArray;
  }

  addRow(data: MemberForm = defaultMember) {
    const rewardForm = this.fb.group({
      membertype: [data.membertype],
      idcardno: [data.idcardno],
      prefix: [data.prefix],
      firstname: [data.firstname],
      lastname: [data.lastname],
      phone: [data.phone],
      email: [data.email],
      academicstanding: [data.academicstanding],
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
