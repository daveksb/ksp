import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'ksp-step-2-tab-2',
  templateUrl: './step-two-tab-two.component.html',
  styleUrls: ['./step-two-tab-two.component.scss'],
})
export class StepTwoTabTwoComponent implements OnInit {
  formGroup = this.fb.group({
    teachers: this.fb.array([]),
  });

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.formGroup.valueChanges.pipe(debounceTime(750)).subscribe((res) => {
      console.log('form value = ', res);
    });

    this.addTeacher();
  }

  addTeacher() {
    const teacherForm = this.fb.group({ title: [''] });
    this.teachers.push(teacherForm);
  }

  deleteTeacher(index: number) {
    this.teachers.removeAt(index);
  }

  get teachers() {
    return this.formGroup.controls['teachers'] as FormArray;
  }
}
