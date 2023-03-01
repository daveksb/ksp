import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { KspFormBaseComponent } from '@ksp/shared/interface';
import { providerFactory } from '@ksp/shared/utility';
import _ from 'lodash';

@Component({
  selector: 'ksp-degree-cert-step-two',
  templateUrl: './step-two.component.html',
  styleUrls: ['./step-two.component.css'],
  providers: providerFactory(DegreeCertStepTwoComponent),
})
export class DegreeCertStepTwoComponent extends KspFormBaseComponent {
  @Output() tabIndexChanged = new EventEmitter<number>();
  @Input() formType = 'a';
  @Input() showEditCheckbox = false;
  @Input() step2Incorrect = [];

  override form = this.fb.group({
    plan1: [{ plans: [], subjects: [] }],
    plan2: [{ plans: [], subjects: [] }],
    teacher: [],
    nitet: [
      {
        nittetAmount: [0],
      },
    ],
    advisor: [],
    section1: [false],
    section2: [false],
    section3: [false],
    section4: [false],
    section5: [false],
  });
  // step2Incorrect = ['ไม่ครบถ้วน และไม่ถูกต้อง', 'หมายเหตุ XXXXXXXXX'];

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
  get minAmount() {
    let studentMax: any;
    if (this.formType == 'a') {
      studentMax = _.maxBy(
        this.form.controls.plan1.value?.plans as any,
        (data: any) => _.parseInt(data?.student) || 0
      );
      return ~~(~~studentMax?.student / 10);
    } else {
      studentMax = _.maxBy(
        this.form.controls.plan2.value?.plans as any,
        (data: any) => (_.parseInt(data?.student1) + _.parseInt(data?.student2) + _.parseInt(data?.student3)) || 0
      );
      return ~~(~~(_.parseInt(studentMax?.student1) + _.parseInt(studentMax?.student2) + _.parseInt(studentMax?.student3)) / 10);
    }
  }
  tabChanged($event: MatTabChangeEvent) {
    //console.log('tab index = ', $event.index);
    if ($event.index === 2)
      this.form.controls.nitet.setValue({
        nittetAmount: this.minAmount as any,
      });
    this.tabIndexChanged.emit($event.index);
  }

  get section1() {
    return (
      !!(!this.form.controls?.section1?.value && this.showEditCheckbox) ||
      this.mode === 'view'
    );
  }
  get section2() {
    return (
      !!(!this.form.controls?.section2?.value && this.showEditCheckbox) ||
      this.mode === 'view'
    );
  }
  get section3() {
    return (
      !!(!this.form.controls?.section3?.value && this.showEditCheckbox) ||
      this.mode === 'view'
    );
  }
  get section4() {
    return (
      !!(!this.form.controls?.section4?.value && this.showEditCheckbox) ||
      this.mode === 'view'
    );
  }
  get section5() {
    return (
      !!(!this.form.controls?.section5?.value && this.showEditCheckbox) ||
      this.mode === 'view'
    );
  }
}
