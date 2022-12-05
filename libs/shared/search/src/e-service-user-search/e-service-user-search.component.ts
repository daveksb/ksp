import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { BasicInstituteSearchComponent } from '../basic-institute-search/basic-institute-search.component';
import { KspFormBaseComponent } from '@ksp/shared/interface';
import { providerFactory } from '@ksp/shared/utility';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
@UntilDestroy()
@Component({
  selector: 'ksp-e-service-user-search',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, BasicInstituteSearchComponent],
  templateUrl: './e-service-user-search.component.html',
  styleUrls: ['./e-service-user-search.component.scss'],
  providers: providerFactory(EServiceUserSearchComponent),
})
export class EServiceUserSearchComponent extends KspFormBaseComponent {
  override form = this.fb.group({
    institution: [],
    personId: [],
    name: [],
    status: [],
  });

  @Input() bureaus: any;
  @Input() showInstitution = true;
  @Input() activeStatusList: any[] = [];
  @Output() search = new EventEmitter<any>();
  @Output() clear = new EventEmitter<boolean>();

  constructor(private fb: FormBuilder) {
    super();
    this.subscriptions.push(
      this.form?.valueChanges.pipe(untilDestroyed(this)).subscribe((value) => {
        this.onChange(value);
        this.onTouched();
      })
    );
  }
}
