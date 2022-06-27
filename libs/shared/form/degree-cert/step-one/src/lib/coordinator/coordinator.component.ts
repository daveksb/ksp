import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { KspFormBaseComponent } from '@ksp/shared/interface';
import { providerFactory } from '@ksp/shared/utility';

@Component({
  selector: 'ksp-degree-cert-coordinator',
  templateUrl: './coordinator.component.html',
  styleUrls: ['./coordinator.component.scss'],
  providers: providerFactory(DegreeCertCoordinatorComponent),
})
export class DegreeCertCoordinatorComponent extends KspFormBaseComponent {
  override form = this.fb.group({
    prefixTh: [],
    nameTh: [],
    lastNameTh: [],
    post: [],
    contactPhone: [],
    workplacePhone: [],
    fax: [],
    email: [],
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
