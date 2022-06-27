import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { FormMode, KspFormBaseComponent } from '@ksp/shared/interface';
import { providerFactory } from '@ksp/shared/utility';

@Component({
  selector: 'ksp-degree-cert-step-two',
  templateUrl: './step-two.component.html',
  styleUrls: ['./step-two.component.css'],
  providers: providerFactory(DegreeCertStepTwoComponent),
})
export class DegreeCertStepTwoComponent extends KspFormBaseComponent {
  @Output() tabIndexChanged = new EventEmitter<number>();
  @Input() formType = 'a';

  override form = this.fb.group({
    plan1: [],
    plan2: [],
    teacher: [],
    nitet: [],
    advisor: [],
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

  tabChanged($event: MatTabChangeEvent) {
    //console.log('tab index = ', $event.index);
    this.tabIndexChanged.emit($event.index);
  }
}
