import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder } from '@angular/forms';
import { KspFormBaseComponent, ListData } from '@ksp/shared/interface';
import { providerFactory } from '@ksp/shared/utility';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'self-service-renew-license-foreign-teacher',
  templateUrl: './renew-license-foreign-teacher.component.html',
  styleUrls: ['./renew-license-foreign-teacher.component.scss'],
  providers: providerFactory(RenewLicenseForeignTeacherComponent),
})
export class RenewLicenseForeignTeacherComponent
  extends KspFormBaseComponent
  implements OnInit
{
  selectedActivityType1!: number;
  activityTypes1: ListData[] = [];

  foreignForm = this.fb.group({
    activityType1: [],
  });

  override form = this.fb.group({
    foreignInfo: this.fb.array([this.foreignForm]),
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
    this.activityTypes1 = activityTypes1;

    this.foreignForm.controls.activityType1.valueChanges
      .pipe(debounceTime(750))
      .subscribe((res) => {
        this.selectedActivityType1 = Number(res);
        //this.form.controls.educationLevelForm.reset();
      });
  }

  addForm() {
    const foreignForm = this.fb.group({
      activityType1: [],
    });
    this.foreignInfo.push(foreignForm);
  }

  get foreignInfo() {
    return this.form.controls.foreignInfo;
  }

  deleteForm(index: number) {
    this.foreignInfo.removeAt(index);
  }
}

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