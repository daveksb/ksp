import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'ksp-status-check-detail',
  templateUrl: './status-check-detail.component.html',
  styleUrls: ['./status-check-detail.component.scss'],
})
export class StatusCheckDetailComponent implements OnInit {
  form = this.fb.group({
    agencyInfo: this.fb.array([]),
  });

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.addRow(this.agencyInfo);
  }

  get agencyInfo() {
    return this.form.controls['agencyInfo'] as FormArray;
  }

  deleteFormArray(form: FormArray<any>, index: number) {
    form.removeAt(index);
  }

  cancel() {
    this.router.navigate(['/', 'document-delivery', 'check-list']);
  }

  addRow(form: FormArray<any>) {
    const data = this.fb.group({
      licenseNumber: [],
      ssn: [],
      prefix: [],
      firstname: [],
      lastname: [],
    });
    form.push(data);
  }
}
