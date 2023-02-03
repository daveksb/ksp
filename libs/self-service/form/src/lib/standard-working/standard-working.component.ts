import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { KspFormBaseComponent, ListData } from '@ksp/shared/interface';
import { providerFactory } from '@ksp/shared/utility';
import { skip } from 'rxjs';

@Component({
  selector: 'self-service-standard-working',
  templateUrl: './standard-working.component.html',
  styleUrls: ['./standard-working.component.scss'],
  providers: providerFactory(StandardWorkingComponent),
})
export class StandardWorkingComponent
  extends KspFormBaseComponent
  implements OnInit
{
  @Input() educationType:
    | 'ครู'
    | 'ผู้บริหารสถานศึกษา'
    | 'ผู้บริหารการศึกษา'
    | 'ศึกษานิเทศก์' = 'ครู';
  @Input() uniqueTimestamp = '';
  @Input() defaultEducationType = '0';
  @Input() workingInfo: any[] = [];
  @Input() workingInfo2: any[] = [];
  selectedEducationType!: number;
  educationTypes: ListData[] = educationTypes;
  override form = this.fb.group({
    educationType: [null, Validators.required],
    educationLevelForm: [null, Validators.required],
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
    this.form.controls['educationType'].valueChanges
      .pipe(skip(1))
      .subscribe((res) => {
        this.selectedEducationType = Number(res);
        //this.form.controls.educationLevelForm.reset();
      });
  }
}

const educationTypes = [
  {
    value: 0,
    label: `ผู้ประกอบวิชาชีพ`,
  },
  {
    value: 1,
    label: `ผู้มิได้ประกอบวิชาชีพ`,
  },
];
