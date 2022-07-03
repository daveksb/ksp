import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { UntilDestroy } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'ksp-degree-cert-search',
  templateUrl: './degree-cert-search.component.html',
  styleUrls: ['./degree-cert-search.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
})
export class DegreeCertSearchComponent {
  form = this.fb.group({
    licenseNumber: [],
    date: [],
    degreeName: [],
    institutionNumber: [],
    institutionName: [],
    submitDegreeLevel: [],
    courseStatus: [],
    verifyStatus: [],
    approveStatus: [],
  });

  @Output() searched = new EventEmitter<boolean>();
  @Output() cleared = new EventEmitter<boolean>();

  constructor(private fb: FormBuilder) {}
}
