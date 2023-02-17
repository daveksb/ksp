import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { KspFormBaseComponent, ListData } from '@ksp/shared/interface';
import { GeneralInfoService } from '@ksp/shared/service';
import { nameThPattern, phonePattern, providerFactory, validatorMessages } from '@ksp/shared/utility';
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
    nameTh: ['', Validators.pattern(nameThPattern)],
    lastNameTh: ['', Validators.pattern(nameThPattern)],
    post: [],
    contactPhone: ['', Validators.pattern(phonePattern)],
    workplacePhone: ['', Validators.pattern(phonePattern)],
    fax: [],
    email: ['', Validators.email],
  });
  validatorMessages = validatorMessages;
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

  get email() {
    return this.form.controls.email;
  }

  get nameTh() {
    return this.form.controls.nameTh;
  }

  get lastnameTh() {
    return this.form.controls.lastNameTh;
  }

  get contactphone () {
    return this.form.controls.contactPhone;
  }

  get workphone () {
    return this.form.controls.workplacePhone;
  }
}
