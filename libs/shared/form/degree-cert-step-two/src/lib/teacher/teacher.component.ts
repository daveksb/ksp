import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder } from '@angular/forms';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'ksp-step-2-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.scss'],
})
export class TeacherComponent implements OnInit {
  teacherForm = this.fb.group({
    generalInfo: [],
    hasMoreCourses: [],
    courses: this.fb.array([
      this.fb.group({
        courseName: [''],
      }),
    ]),
  });

  mainForm = this.fb.group({
    teachers: this.fb.array([this.teacherForm]),
  });

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.mainForm.valueChanges.pipe(debounceTime(750)).subscribe((res) => {
      console.log('form value = ', res);
    });
  }

  addCourse(index: number) {
    const form = this.fb.group({
      courseName: [''],
    });
    this.getCourses(index).push(form);
  }

  addTeacher() {
    const teacherForm = this.fb.group({
      generalInfo: [],
      hasMoreCourses: [],
      courses: this.fb.array([
        this.fb.group({
          courseName: [''],
        }),
      ]),
    });

    this.teachers.push(teacherForm);
  }

  deleteTeacher(index: number) {
    this.teachers.removeAt(index);
  }

  get teachers() {
    return this.mainForm.controls['teachers'];
  }

  getCourses(index: number) {
    return this.mainForm.controls['teachers'].controls[index].controls[
      'courses'
    ];
  }

  getHasMoreCourses(index: number) {
    return this.mainForm.controls['teachers'].controls[index].controls[
      'hasMoreCourses'
    ].value;
  }
}
