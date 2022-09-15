import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { SchoolServiceFormActivityModule } from '@ksp/school-service/form/activity';

@Component({
  selector: 'self-service-standard-working-non-teacher',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, SchoolServiceFormActivityModule],
  templateUrl: './standard-working-non-teacher.component.html',
  styleUrls: ['./standard-working-non-teacher.component.scss'],
})
export class StandardWorkingNonTeacherComponent implements OnInit {
  form = this.fb.group({
    activity1: [],
    activity2: [],
    activity3: [],
    trainInfo: [],
    testInfo: [],
  });

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form.valueChanges.subscribe((res) => {
      //console.log('exp form = ', res);
    });
  }

  get activity1() {
    return this.form.controls.activity1.value;
  }

  get activity2() {
    return this.form.controls.activity2.value;
  }

  get activity3() {
    return this.form.controls.activity3.value;
  }
}
