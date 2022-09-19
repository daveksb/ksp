import { Component, OnInit } from '@angular/core';
import { KspFormBaseComponent } from '@ksp/shared/interface';
import { FormBuilder } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { debounceTime } from 'rxjs';
import { providerFactory } from '@ksp/shared/utility';

@UntilDestroy()
@Component({
  selector: 'self-service-education-manager-experience',
  templateUrl: './education-manager-experience.component.html',
  styleUrls: ['./education-manager-experience.component.scss'],
  providers: providerFactory(EducationManagerExperienceComponent),
})
export class EducationManagerExperienceComponent
  extends KspFormBaseComponent
  implements OnInit
{
  override form = this.fb.group({
    hasTeachingExperience: [],
    teachingExperienceYear: [],
    hasManagingExperience: [],
    managingExperienceYear: [],
    hasEducationExperience: [],
    educationExperienceYear: [],
    hasEducationManagingExperience: [],
    educationManagingExperienceYear: [],
    hasLongManagingExperience: [],
    longManagingExperienceYear: [],
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

  ngOnInit(): void {
    this.form.valueChanges
      .pipe(debounceTime(300), untilDestroyed(this))
      .subscribe((res) => {
        //console.log('exp form = ', res);
      });
  }
}
