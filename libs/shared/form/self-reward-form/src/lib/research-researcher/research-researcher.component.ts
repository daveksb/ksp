import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
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
    academicStanding: [],
    experienceYear: [],
    professionalType: [],
    associationName: [],
    phone1: [],
    phone2: [],
    email1: [],
    email2: [],
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
