import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { SharedFormOthersModule } from '../shared-form-others.module';
import { KspFormBaseComponent } from '@ksp/shared/interface';
import { providerFactory } from '@ksp/shared/utility';

@Component({
  selector: 'ksp-form-education-info-manager',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, SharedFormOthersModule],
  templateUrl: './form-education-info-manager.component.html',
  styleUrls: ['./form-education-info-manager.component.scss'],
  providers: providerFactory(FormEducationInfoManagerComponent),
})
export class FormEducationInfoManagerComponent
  extends KspFormBaseComponent
  implements OnInit
{
  @Input() requestType: any;
  override form = this.fb.group({
    licenseCountry: [],
    releaseBy: [],
    licenseType: [],
    licenseNo: [],
    releaseDate: [],
    expiredDate: [],
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
