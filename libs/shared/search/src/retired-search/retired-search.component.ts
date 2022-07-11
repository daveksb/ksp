import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { KspFormBaseComponent } from '@ksp/shared/interface';
import { providerFactory } from '@ksp/shared/utility';
import { BasicInstituteSearchComponent } from '../basic-institute-search/basic-institute-search.component';

@Component({
  selector: 'ksp-retired-search',
  templateUrl: './retired-search.component.html',
  styleUrls: ['./retired-search.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, BasicInstituteSearchComponent],
  providers: providerFactory(RetiredSearchComponent),
})
export class RetiredSearchComponent extends KspFormBaseComponent {
  override form = this.fb.group({
    grant: [],
    affiliation: [],
    universityCode: [],
    universityName: [],
    requestNumber: [],
    name: [],
    phone: [],
  });

  @Output() clear = new EventEmitter();
  @Output() search = new EventEmitter();

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
