import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { KspFormBaseComponent } from '@ksp/shared/interface';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { providerFactory } from '@ksp/shared/utility';

@UntilDestroy()
@Component({
  selector: 'ksp-basic-institute-search',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './basic-institute-search.component.html',
  styleUrls: ['./basic-institute-search.component.scss'],
  providers: providerFactory(BasicInstituteSearchComponent),
})
export class BasicInstituteSearchComponent extends KspFormBaseComponent implements OnInit {
  override form = this.fb.group({
    bureauid: [],
    schoolid: [],
    schoolname: [],
  });

  @Input() bureaus: any;
  @Input() universityType: any;
  @Input() searchType = '';
  @Input() subSearchType = '';

  constructor(private fb: FormBuilder) {
    super();
    this.subscriptions.push(
      this.form?.valueChanges.pipe(untilDestroyed(this)).subscribe((value) => {
        this.onChange(value);
        this.onTouched();
      })
    );
  }

  ngOnInit(): void {
    if (this.subSearchType == 'uni_searchstatus' || this.subSearchType == 'uni_searchretire') {
      this.form.controls.bureauid.setValidators([Validators.required]);
      this.form.controls.schoolname.setValidators([Validators.required]);
      this.form.updateValueAndValidity();
    }
  }
}
