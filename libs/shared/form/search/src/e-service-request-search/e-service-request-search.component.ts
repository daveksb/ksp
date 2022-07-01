import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { InstituteType } from '@ksp/shared/interface';
import { UntilDestroy } from '@ngneat/until-destroy';
import { BasicInstituteSearchComponent } from '../basic-institute-search/basic-institute-search.component';

@UntilDestroy()
@Component({
  selector: 'ksp-request-search',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, BasicInstituteSearchComponent],
  templateUrl: './e-service-request-search.component.html',
  styleUrls: ['./e-service-request-search.component.scss'],
})
export class EServiceRequestSearchComponent {
  form = this.fb.group({
    licenseNumber: [],
    personId: [],
    professionType: [],
    process: [],
    status: [],
    submitDateFrom: [],
    submitDateTo: [],
  });

  @Input() mode: InstituteType = 'school';
  @Output() search = new EventEmitter<boolean>();
  @Output() clear = new EventEmitter<boolean>();
  constructor(private fb: FormBuilder) {}
}
