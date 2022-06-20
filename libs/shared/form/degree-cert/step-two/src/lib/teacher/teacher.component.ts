import { Component, forwardRef, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { KspFormBaseComponent } from '@ksp/shared/interface';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'ksp-step-2-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.scss'],
  providers: [
    {
      provide: KspFormBaseComponent,
      useExisting: forwardRef(() => TeacherComponent),
    },
  ],
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

  constructor(private fb: FormBuilder) {
    super();
  }

  ngOnInit(): void {
    if (this.mode === 'view') {
      this.form.disable();
    }

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
    return this.form.controls['teachers'];
  }

  getCourses(index: number) {
    return this.form.controls['teachers'].controls[index].controls['courses'];
  }

  getHasMoreCourses(index: number) {
    return this.form.controls['teachers'].controls[index].controls[
      'hasMoreCourses'
    ].value;
  }
}
