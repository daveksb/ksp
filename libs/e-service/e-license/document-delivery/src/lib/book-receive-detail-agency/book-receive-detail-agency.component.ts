import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArray, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { AddRowButtonComponent } from '@ksp/shared/ui';
import { BookReceiveDetailInfoComponent } from '../book-receive-detail-info/book-receive-detail-info.component';

@Component({
  selector: 'ksp-book-receive-detail-agency',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AddRowButtonComponent,
    BookReceiveDetailInfoComponent,
  ],
  templateUrl: './book-receive-detail-agency.component.html',
  styleUrls: ['./book-receive-detail-agency.component.scss'],
})
export class BookReceiveDetailAgencyComponent implements OnInit {
  form = this.fb.group({
    agencyInfo: this.fb.array([]),
  });

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.addRow(this.agencyInfo);
  }

  get agencyInfo() {
    return this.form.controls['agencyInfo'] as FormArray;
  }

  deleteFormArray(form: FormArray<any>, index: number) {
    form.removeAt(index);
  }

  addRow(form: FormArray<any>) {
    const data = this.fb.group({
      licenseNumber: [''],
      idCard: [''],
      prefix: [''],
      firstname: [''],
      lastname: [''],
    });
    form.push(data);
  }
}
