import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { KspFormBaseComponent } from '@ksp/shared/interface';
import { providerFactory } from '@ksp/shared/utility';
import _ from 'lodash';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'ksp-step-2-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.scss'],
  providers: providerFactory(TeacherComponent),
})
export class TeacherComponent extends KspFormBaseComponent implements OnInit {
  teacherForm = this.fb.group({
    generalInfo: [],
    hasMoreCourses: [],
    courses: this.fb.array([
      this.fb.group({
        courseName: [''],
      }),
    ]),
  });

  override form = this.fb.group({
    teachers: this.fb.array([this.teacherForm]),
  });
  override writeValue(value: any) {
    if (value) {
      _.forEach(value?.teachers, (teacher, rootIndex: any) => {
        if (this.form?.controls?.teachers?.controls[rootIndex]) {
          this.form.controls.teachers.controls[rootIndex].patchValue(teacher);
        } else {
          this.addTeacher();
        }
        _.forEach(teacher?.courses, (course, pIndex: any) => {
          if (
            this.form.controls?.teachers?.controls[rootIndex]?.controls?.courses
              ?.controls[pIndex]
          ) {
            this.teachers.controls[rootIndex].controls.courses.controls[
              pIndex
            ].patchValue(course);
          } else {
            this.addCourse(rootIndex);
          }
        });
      });

      this.value = value;
    }

    if (value === null) {
      this.form.reset();
    }
  }

  constructor(private fb: FormBuilder) {
    super();
    this.subscriptions.push(
      // any time the inner form changes update the parent of any change
      this.form?.valueChanges.subscribe((value) => {
        this.onChange(value);
        this.onTouched();
      })
    );
  }

  ngOnInit(): void {
    this.form.valueChanges.pipe(debounceTime(750)).subscribe((res) => {
      //console.log('form value = ', res);
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

  deleteCourse(teacherIndex: number, courseIndex: number) {
    this.getCourses(teacherIndex).removeAt(courseIndex);
  }

  get teachers() {
    return this.form.controls.teachers;
  }

  getCourses(index: number) {
    return this.teachers.controls[index].controls.courses;
  }

  getHasMoreCourses(index: number) {
    return this.teachers.controls[index].controls.hasMoreCourses.value;
  }
}
