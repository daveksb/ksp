import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { KspFormBaseComponent } from '@ksp/shared/interface';
import { providerFactory } from '@ksp/shared/utility';

@Component({
  selector: 'ksp-research-researcher',
  templateUrl: './research-researcher.component.html',
  styleUrls: ['./research-researcher.component.scss'],
  providers: providerFactory(ResearchResearcherComponent),
})
export class ResearchResearcherComponent
  extends KspFormBaseComponent
  implements OnInit
{
  override form = this.fb.group({
    academicStanding: [null, Validators.required],
    experienceYear: [null, Validators.required],
    professionalType: [null, Validators.required],
    associationName: [null, Validators.required],
    phone1: [null, Validators.required],
    phone2: [null, Validators.required],
    email1: [null, Validators.required],
    email2: [null, Validators.required],
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
