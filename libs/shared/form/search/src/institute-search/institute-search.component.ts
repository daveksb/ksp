import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { InstituteType } from '@ksp/shared/interface';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'ksp-institute-search',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './institute-search.component.html',
  styleUrls: ['./institute-search.component.scss'],
})
export class InstituteSearchComponent {
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
