import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { KspFormBaseComponent, ListData } from '@ksp/shared/interface';
import { GeneralInfoService } from '@ksp/shared/service';
import { providerFactory } from '@ksp/shared/utility';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
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
  prefixOptions: ListData[] = [];
  constructor(
    private fb: FormBuilder,
    private generalInfoService: GeneralInfoService
  ) {
    super();
    this.subscriptions.push(
      // any time the inner form changes update the parent of any change
      this.form?.valueChanges.pipe(untilDestroyed(this)).subscribe((value) => {
        this.onChange(value);
        this.onTouched();
      })
    );
    this.generalInfoService.getPrefix().subscribe((data) => {
      this.prefixOptions = data?.map(({ id, name_th }: any) => ({
        value: id,
        label: name_th,
      }));
    });
  }
}
