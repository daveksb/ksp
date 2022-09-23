import { Component, OnInit } from '@angular/core';
import { KspFormBaseComponent } from '@ksp/shared/interface';
import { FormBuilder } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { providerFactory } from '@ksp/shared/utility';

@UntilDestroy()
@Component({
  selector: 'self-service-substitute-objective',
  templateUrl: './substitute-objective.component.html',
  styleUrls: ['./substitute-objective.component.scss'],
  providers: providerFactory(SubstituteObjectiveComponent),
})
export class SubstituteObjectiveComponent extends KspFormBaseComponent {
  override form = this.fb.group({
    replaceReason: [],
  });

  constructor(private fb: FormBuilder) {
    super();
    this.subscriptions.push(
      // any time the inner form changes update the parent of any change
      this.form?.valueChanges.pipe(untilDestroyed(this)).subscribe((value) => {
        this.onChange(value);
        this.onTouched();
      })
    );
  }
}
