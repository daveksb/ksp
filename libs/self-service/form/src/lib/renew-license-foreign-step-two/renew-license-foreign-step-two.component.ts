import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder } from '@angular/forms';
import { KspFormBaseComponent, ListData } from '@ksp/shared/interface';
import { providerFactory } from '@ksp/shared/utility';

@Component({
  selector: 'self-service-renew-license-foreign-step-two',
  templateUrl: './renew-license-foreign-step-two.component.html',
  styleUrls: ['./renew-license-foreign-step-two.component.scss'],
  providers: providerFactory(RenewLicenseForeignStepTwoComponent),
})
export class RenewLicenseForeignStepTwoComponent
  extends KspFormBaseComponent
  implements OnInit
{
  educationTypes: ListData[] = [];
  activityTypes1: ListData[] = [];
  activityTypes2: ListData[] = [];

  selectedEducationType!: number;
  selectedActivityType1!: number;
  selectedActivityType2!: number;

  override form = this.fb.group({
    educationType: [],

    activityType1: [],
    activityType2: [],

    teacherInfo: this.fb.array([]),
    nonTeacherInfo: this.fb.array([]),
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
    this.educationTypes = educationTypes;
    this.activityTypes1 = activityTypes1;
    this.activityTypes2 = activityTypes2;

    this.form.controls['educationType'].valueChanges.subscribe((res) => {
      this.selectedEducationType = Number(res);
      //this.form.controls.educationLevelForm.reset();
    });

    this.form.controls['activityType1'].valueChanges.subscribe((res) => {
      this.selectedActivityType1 = Number(res);
      //this.form.controls.educationLevelForm.reset();
    });

    this.form.controls['activityType2'].valueChanges.subscribe((res) => {
      this.selectedActivityType2 = Number(res);
      //this.form.controls.educationLevelForm.reset();
    });

    this.setDefaulFormValue();
  }

  setDefaulFormValue() {
    this.addFormArray(this.teacherInfo);
    this.addFormArray(this.nonTeacherInfo);
  }

  deleteFormArray(form: FormArray<any>, index: number) {
    form.removeAt(index);
  }

  addFormArray(form: FormArray<any>) {
    const data = this.fb.group({ title: [''] });
    form.push(data);
  }

  get teacherInfo() {
    return this.form.controls['teacherInfo'] as FormArray;
  }

  get nonTeacherInfo() {
    return this.form.controls['nonTeacherInfo'] as FormArray;
  }
}

const educationTypes = [
  {
    value: 0,
    label: `Individuals Being In-Service Teacher`,
  },
  {
    value: 1,
    label: `Not Being Teacher`,
  },
];

const activityTypes1 = [
  {
    value: 0,
    label: `Attending an educational profession course to obtain an additional qualification`,
  },
  {
    value: 1,
    label: `Having participated in a training course and received certificate that accrediting expertise in professional practice from the Teachers' Council of Thailand`,
  },
  {
    value: 2,
    label: `Having taken training course relevant to the performance of duty`,
  },
  {
    value: 3,
    label: `Having obtained an academic standing promotion`,
  },
  {
    value: 4,
    label: ` Being a resource training person on a useful topics about learning management or educational management`,
  },
  {
    value: 5,
    label: `Writing the textbooks, articles or academic reports which are beneficial to learning management or educational management`,
  },
  {
    value: 6,
    label: `Creating innovation used in learning management or educational management`,
  },
  {
    value: 7,
    label: `Doing research studies on useful issues for learning management or educational management
    `,
  },
  {
    value: 8,
    label: `Having been awarded by the Teachers' Council of Thailand or other educational agency
    `,
  },
  {
    value: 9,
    label: `Having attended the lecture, discussion, conference, workshop, seminar or any meeting which the registration of attendance can be shown`,
  },
  {
    value: 10,
    label: `Having completed a study tour or training course on the topics of the professional practices`,
  },
  {
    value: 11,
    label: `Completing academic works or other activities which are beneficial to learning management or educational management`,
  },
];

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
