import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { BasicInstituteSearchComponent } from '../basic-institute-search/basic-institute-search.component';
import { KspFormBaseComponent } from '@ksp/shared/interface';
import { providerFactory } from '@ksp/shared/utility';
import { MatDatepickerModule } from '@angular/material/datepicker';

@UntilDestroy()
@Component({
  selector: 'ksp-request-search',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    BasicInstituteSearchComponent,
    MatDatepickerModule,
  ],
  templateUrl: './e-service-request-search.component.html',
  styleUrls: ['./e-service-request-search.component.scss'],
  providers: providerFactory(EServiceRequestSearchComponent),
})
export class EServiceRequestSearchComponent extends KspFormBaseComponent {
  override form = this.fb.group({
    schoolinfo: [null],
    requestno: [''],
    name: [''],
    requestdatefrom: [''],
    requeststatus: [''],
  });

  @Input() searchType = '';
  @Input() statusList: any[] | undefined = [];
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

  onClear() {
    this.form.reset();
    this.clear.emit(true);
  }
}
