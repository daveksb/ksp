import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ListData } from '@ksp/shared/interface';

@Component({
  selector: 'self-service-renew-license-foreign-non-teacher',
  templateUrl: './renew-license-foreign-non-teacher.component.html',
  styleUrls: ['./renew-license-foreign-non-teacher.component.scss'],
})
export class RenewLicenseForeignNonTeacherComponent implements OnInit {
  option1 = this.fb.control(false);
  option2 = this.fb.control(false);
  option3 = this.fb.control(false);

  selectedActivityType2!: number;
  activityTypes2: ListData[] = [];

  form = this.fb.group({
    activity1: [],
    activity2: [],
  });

  constructor(private fb: FormBuilder) {}

  get Option1$() {
    return this.option1.valueChanges;
  }
  get Option2$() {
    return this.option2.valueChanges;
  }
  get Option3$() {
    return this.option3.valueChanges;
  }

  ngOnInit(): void {}
}
