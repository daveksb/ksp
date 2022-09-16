import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ListData } from '@ksp/shared/interface';

@Component({
  selector: 'self-service-renew-license-foreign-non-teacher',
  templateUrl: './renew-license-foreign-non-teacher.component.html',
  styleUrls: ['./renew-license-foreign-non-teacher.component.scss'],
})
export class RenewLicenseForeignNonTeacherComponent implements OnInit {
  selectedActivityType2!: number;
  activityTypes2: ListData[] = [];

  form = this.fb.group({
    activityType2: [],
    nonTeacherInfo: this.fb.array([]),
  });

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activityTypes2 = activityTypes2;

    this.form.controls['activityType2'].valueChanges.subscribe((res) => {
      this.selectedActivityType2 = Number(res);
      //this.form.controls.educationLevelForm.reset();
    });
  }
}

const activityTypes2 = [
  {
    value: 0,
    label: `Having taken a training course in knowledge of professional standard and code of ethics as stipulated by the Teachers' Council of Thailand Board`,
  },
  {
    value: 1,
    label: `Having passed the test of knowledge on professional standard and code of ethics as stipulated by the Teachers' Council of Thailand Board`,
  },
  {
    value: 2,
    label: `Being in the process of training or testing knowledge of professional standard and code of ethics as stipulated by the Teachers' Council of Thailand Board
    (must be finished within six months)`,
  },
];
