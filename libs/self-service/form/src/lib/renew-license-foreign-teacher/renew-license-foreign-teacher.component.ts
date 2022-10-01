import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
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
  option1 = this.fb.control(false);
  option2 = this.fb.control(false);
  option3 = this.fb.control(false);
  option4 = this.fb.control(false);
  option5 = this.fb.control(false);
  option6 = this.fb.control(false);
  option7 = this.fb.control(false);
  option8 = this.fb.control(false);
  option9 = this.fb.control(false);
  option10 = this.fb.control(false);
  option11 = this.fb.control(false);
  option12 = this.fb.control(false);

  override form = this.fb.group({
    activity1: [],
    activity2: [],
    activity3: [],
    activity4: [],
    activity5: [],
    activity6: [],
    activity7: [],
    activity8: [],
    activity9: [],
    activity10: [],
    activity11: [],
    activity12: [],
  });

  /* override form = this.fb.group({
    foreigns: this.fb.array([this.foreignForm]),
  }); */

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

  get Option1$() {
    return this.option1.valueChanges;
  }
  get Option2$() {
    return this.option2.valueChanges;
  }
  get Option3$() {
    return this.option3.valueChanges;
  }
  get Option4$() {
    return this.option4.valueChanges;
  }
  get Option5$() {
    return this.option5.valueChanges;
  }
  get Option6$() {
    return this.option6.valueChanges;
  }
  get Option7$() {
    return this.option7.valueChanges;
  }
  get Option8$() {
    return this.option8.valueChanges;
  }
  get Option9$() {
    return this.option9.valueChanges;
  }
  get Option10$() {
    return this.option10.valueChanges;
  }
  get Option11$() {
    return this.option11.valueChanges;
  }
  get Option12$() {
    return this.option12.valueChanges;
  }

  ngOnInit(): void {}
}
