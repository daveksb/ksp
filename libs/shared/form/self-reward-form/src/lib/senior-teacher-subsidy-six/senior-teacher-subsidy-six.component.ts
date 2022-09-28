import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { KspFormBaseComponent } from '@ksp/shared/interface';
import { providerFactory } from '@ksp/shared/utility';

@Component({
  selector: 'ksp-senior-teacher-subsidy-six',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './senior-teacher-subsidy-six.component.html',
  styleUrls: ['./senior-teacher-subsidy-six.component.scss'],
  providers: providerFactory(SeniorTeacherSubsidySixComponent),
})
export class SeniorTeacherSubsidySixComponent
  extends KspFormBaseComponent
  implements OnInit
{
  override form = this.fb.group({
    haveAsset: [],
    homeSpace: [],
    homeSpaceUnit: [],
    homeSpacePrice: [],
    landSpace: [],
    landSpaceUnit: [],
    landSpacePrice: [],
    cultivate: [],
    cultivateUnit: [],
    cultivatePrice: [],
    rental: [],
    rentalUnit: [],
    rentalPrice: [],
    carCount: [],
    others: [],
    ownPension: [],
    spouseIncome: [],
    specialIncome: [],
    otherIncome: [],
    totalIncome: [],
    providentFund: [],
    selectionReason: [],
  });

  isHasAsset: any;

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

  ngOnInit(): void {
    this.form.valueChanges.subscribe((res) => {
      //console.log('res = ', res);
      this.isHasAsset = Number(res['haveAsset']);
      //console.log('res2 = ', this.isHasAsset);
    });
  }
}
