import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { KspFormBaseComponent } from '@ksp/shared/interface';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { providerFactory } from '@ksp/shared/utility';

@UntilDestroy()
@Component({
  selector: 'ksp-basic-institute-search',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './basic-institute-search.component.html',
  styleUrls: ['./basic-institute-search.component.scss'],
  providers: providerFactory(BasicInstituteSearchComponent),
})
export class BasicInstituteSearchComponent extends KspFormBaseComponent {
  override form = this.fb.group({
    organization: [],
    instituteId: [],
    instituteName: [],
  });

  @Input() searchType = '';

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
