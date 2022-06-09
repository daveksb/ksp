import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'ksp-step-2-tab-2',
  templateUrl: './step-two-tab-two.component.html',
  styleUrls: ['./step-two-tab-two.component.scss'],
})
export class StepTwoTabTwoComponent implements OnInit {
  teacherForm = this.fb.group({
    title: [''],
    name: [''],
    degrees: this.fb.array([]),
  });

  formGroup = this.fb.group({
    teachers: this.fb.array([this.teacherForm]),
  });

  degreeformGroup = this.fb.group({
    name: [''],
    year: [''],
  });

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.formGroup.valueChanges.pipe(debounceTime(750)).subscribe((res) => {
      console.log('form value = ', res);
    });

    console.log('this.getDegree(0) = ', this.getDegree(0));
  }

  addTeacher() {
    const teacherForm = this.fb.group({
      title: [''],
      name: [''],
      degrees: this.fb.array([]),
    });

    this.teachers.push(teacherForm);
  }

  deleteTeacher(index: number) {
    this.teachers.removeAt(index);
  }

  getDegree(index: number): FormArray<any> {
    return this.formGroup.controls['teachers'].controls[index].controls[
      'degrees'
    ];
  }

  addDegree(index: number) {
    const degreeformGroup = this.fb.group({
      name: [''],
      year: [''],
    });
    this.getDegree(index).push(degreeformGroup);
  }

  get teachers() {
    return this.formGroup.controls['teachers'];
  }
}
