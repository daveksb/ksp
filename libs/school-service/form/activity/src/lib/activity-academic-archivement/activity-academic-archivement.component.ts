import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { KspFormBaseComponent } from '@ksp/shared/interface';
import { providerFactory } from '@ksp/shared/utility';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { pairwise } from 'rxjs';

function checkboxValidator(): any {
  return (form: FormGroup) => {
    const isAcademicChecked: boolean = form.get('isAcademicChecked')?.value;

    const isPendingAcademicChecked: boolean = form.get(
      'isPendingAcademicChecked'
    )?.value;

    if (!isAcademicChecked && !isPendingAcademicChecked) {
      return { checkbox: true };
    }

    return null;
  };
}

@UntilDestroy()
@Component({
  selector: 'ksp-activity-academic-archivement',
  templateUrl: './activity-academic-archivement.component.html',
  styleUrls: ['./activity-academic-archivement.component.scss'],
  providers: providerFactory(ActivityAcademicArchivementComponent),
})
export class ActivityAcademicArchivementComponent
  extends KspFormBaseComponent
  implements OnInit, OnDestroy
{
  @Input() data: any;
  @Input() isForeignForm = false;

  override form = this.fb.group({
    isAcademicChecked: [false],
    oldAcademic: [],
    newAcademic: [],
    orderName: [],
    orderNumber: [],
    orderDate: [],
    isPendingAcademicChecked: [false],
    oldPendingAcademic: [],
    newPendingAcademic: [],
  });

  constructor(private fb: FormBuilder) {
    super();
    this.subscriptions.push(
      this.form?.valueChanges.subscribe((value) => {
        this.onChange(value);
        this.onTouched();
      })
    );
  }

  ngOnInit() {
    this.form.setValidators(checkboxValidator());
    this.form.valueChanges
      .pipe(untilDestroyed(this), pairwise())
      .subscribe(([prev, next]) => {
        if (prev.isAcademicChecked !== next.isAcademicChecked) {
          if (next.isAcademicChecked) {
            this.form.controls.oldAcademic.addValidators(Validators.required);
            this.form.controls.newAcademic.addValidators(Validators.required);
            this.form.controls.orderName.addValidators(Validators.required);
            this.form.controls.orderNumber.addValidators(Validators.required);
            this.form.controls.orderDate.addValidators(Validators.required);
          } else {
            this.form.controls.oldAcademic.clearValidators();
            this.form.controls.newAcademic.clearValidators();
            this.form.controls.orderName.clearValidators();
            this.form.controls.orderNumber.clearValidators();
            this.form.controls.orderDate.clearValidators();
          }
          this.form.controls.oldAcademic.updateValueAndValidity();
          this.form.controls.newAcademic.updateValueAndValidity();
          this.form.controls.orderName.updateValueAndValidity();
          this.form.controls.orderNumber.updateValueAndValidity();
          this.form.controls.orderDate.updateValueAndValidity();
        }

        if (prev.isPendingAcademicChecked !== next.isPendingAcademicChecked) {
          if (next.isPendingAcademicChecked) {
            this.form.controls['oldPendingAcademic'].addValidators(
              Validators.required
            );
            this.form.controls['newPendingAcademic'].addValidators(
              Validators.required
            );
          } else {
            this.form.controls['oldPendingAcademic'].clearValidators();
            this.form.controls['newPendingAcademic'].clearValidators();
          }
          this.form.controls['oldPendingAcademic'].updateValueAndValidity();
          this.form.controls['newPendingAcademic'].updateValueAndValidity();
        }
        //console.log('xxx = ', this.form.controls.isAcademicChecked.value);
      });
  }

  override ngOnDestroy(): void {
    this.onChange(null);
    this.onTouched();
  }

  get checkbox1() {
    return this.form.controls.isAcademicChecked.value;
  }

  get checkbox2() {
    return this.form.controls.isPendingAcademicChecked.value;
  }
}
