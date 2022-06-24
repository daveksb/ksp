import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormCoordinatorInfoComponent } from '../form-coordinator-info/coordinator-info.component';
import { SetGrayBackgroundDirective } from '@ksp/shared/directive';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { KspFormBaseComponent } from '@ksp/shared/interface';
import { providerFactory } from '@ksp/shared/utility';

@Component({
  selector: 'ksp-form-requester-info',
  standalone: true,
  imports: [
    CommonModule,
    FormCoordinatorInfoComponent,
    SetGrayBackgroundDirective,
    ReactiveFormsModule,
  ],
  templateUrl: './requester-info.component.html',
  styleUrls: ['./requester-info.component.scss'],
  providers: providerFactory(FormRequesterInfoComponent)
})
export class FormRequesterInfoComponent extends KspFormBaseComponent {
  override form = this.fb.group({
    personId: [],
    requesterInfo: [],
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
}
