import { Component, OnInit } from '@angular/core';
import { KspFormBaseComponent } from '@ksp/shared/interface';
import { providerFactory } from '@ksp/shared/utility';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'ksp-praise-teacher-punished',
  templateUrl: './praise-teacher-punished.component.html',
  styleUrls: ['./praise-teacher-punished.component.scss'],
  providers: providerFactory(PraiseTeacherPunishedComponent),
})
export class PraiseTeacherPunishedComponent
  extends KspFormBaseComponent
  implements OnInit
{
  override form = this.fb.group({
    hasDisciplinaryAction: [],
    noDisciplinaryAction: [],
    pendingDisciplinaryAction: [],
    hasDisciplinaryActionAndCleansed: [],
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

  ngOnInit(): void {}
}
