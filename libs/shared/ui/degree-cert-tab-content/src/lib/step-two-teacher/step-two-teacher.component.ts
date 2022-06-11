import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder } from '@angular/forms';

@Component({
  selector: 'ksp-step-2-teacher',
  templateUrl: './step-two-teacher.component.html',
  styleUrls: ['./step-two-teacher.component.scss'],
})
export class StepTwoTeacherComponent implements OnInit {
  teacherForm = this.fb.group({
    title: [''],
    name: [''],
    degrees: this.fb.array([
      {
        name: [''],
        year: [''],
      },
    ]),
  });

  mainForm = this.fb.group({
    teachers: this.fb.array([this.teacherForm]),
  });

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    /*     this.mainForm.valueChanges.pipe(debounceTime(750)).subscribe((res) => {
      console.log('form value = ', res);
    }); */
    console.log(' = ');
  }

  addTeacher() {
    const teacherForm = this.fb.group({
      title: [''],
      name: [''],
      degrees: this.fb.array([
        {
          name: [''],
          year: [''],
        },
      ]),
    });

    this.teachers.push(teacherForm);
  }

  deleteTeacher(index: number) {
    this.teachers.removeAt(index);
  }

  /**
   * get teacher[index] degrees
   */
  getDegrees(index: number): FormArray<any> {
    return this.mainForm.controls['teachers'].controls[index].controls[
      'degrees'
    ];
  }

  addDegree(index: number) {
    const degreeformGroup = this.fb.group({
      name: [''],
      year: [''],
    });
    this.getDegrees(index).push(degreeformGroup);
  }

  deleteDegree(teacherIndex: number, degreeIndex: number) {
    this.getDegrees(teacherIndex).removeAt(degreeIndex);
  }

  get teachers() {
    return this.mainForm.controls['teachers'];
  }
}
