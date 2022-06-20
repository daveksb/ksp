import { Component, forwardRef, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { KspFormBaseComponent } from '@ksp/shared/interface';
import { providerFactory } from '@ksp/shared/utility';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'ksp-step-2-advisor',
  templateUrl: './advisor.component.html',
  styleUrls: ['./advisor.component.scss'],
  //providers: providerFactory(AdvisorComponent),
  providers: [
    {
      provide: KspFormBaseComponent,
      useExisting: forwardRef(() => AdvisorComponent),
    },
  ],
})
export class AdvisorComponent extends KspFormBaseComponent implements OnInit {
  advisorForm = this.fb.group({
    generalInfo: [],
    hasMoreCourses: [],
    mainAdvisorInfo: [],
    courses: this.fb.array([
      this.fb.group({
        courseName: [],
        advisorInfos: [],
      }),
    ]),
  });

  override form = this.fb.group({
    advisors: this.fb.array([this.advisorForm]),
  });

  constructor(private fb: FormBuilder) {
    super();
  }

  ngOnInit(): void {
    this.form.valueChanges.pipe(debounceTime(750)).subscribe((res) => {
      //console.log('form value = ', res);
    });
  }

  addCourse(index: number) {
    const form = this.fb.group({
      courseName: [],
      advisorInfos: [],
    });
    this.getCourses(index).push(form);
  }

  addAdvisor() {
    const advisorForm = this.fb.group({
      generalInfo: [],
      hasMoreCourses: [],
      mainAdvisorInfo: [],

      courses: this.fb.array([
        this.fb.group({
          courseName: [],
          advisorInfos: [],
        }),
      ]),
    });

    this.advisors.push(advisorForm);
  }

  deleteAdvisor(index: number) {
    this.advisors.removeAt(index);
  }

  deleteCourse(advisorIndex: number, courseIndex: number) {
    this.getCourses(advisorIndex).removeAt(courseIndex);
  }

  getCourses(index: number) {
    return this.form.controls['advisors'].controls[index].controls['courses'];
  }

  getHasMoreCourses(index: number) {
    return this.form.controls['advisors'].controls[index].controls[
      'hasMoreCourses'
    ].value;
  }

  get advisors() {
    return this.form.controls.advisors;
  }
}
