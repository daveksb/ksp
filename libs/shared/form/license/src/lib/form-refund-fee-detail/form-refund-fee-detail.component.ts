import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { providerFactory } from '@ksp/shared/utility';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { KspFormBaseComponent } from '@ksp/shared/interface';

@Component({
  selector: 'ksp-form-refund-fee-detail',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form-refund-fee-detail.component.html',
  styleUrls: ['./form-refund-fee-detail.component.scss'],
  providers: providerFactory(FormRefundFeeDetailComponent),
})
export class FormRefundFeeDetailComponent extends KspFormBaseComponent {
  override form = this.fb.group({
    licensetype: [],
    eduoccupytype: [],
    requestno: [],
    refundreason: [],
    otherreason: [],
  });

  constructor(private fb: FormBuilder) {
    super();
    this.subscriptions.push(
      // any time the inner form changes update the parent of any change
      this.form?.valueChanges.subscribe((value: any) => {
        this.onChange(value);
        this.onTouched();
      })
    );
  }

  //ngOnInit(): void {}
}
