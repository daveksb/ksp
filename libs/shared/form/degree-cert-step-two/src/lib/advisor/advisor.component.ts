import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'ksp-step-2-advisor',
  templateUrl: './advisor.component.html',
  styleUrls: ['./advisor.component.scss'],
})
export class AdvisorComponent implements OnInit {
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

  mainForm = this.fb.group({
    advisors: this.fb.array([this.advisorForm]),
  });

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.mainForm.valueChanges.pipe(debounceTime(750)).subscribe((res) => {
      console.log('form value = ', res);
    });
  }

  addCourse(index: number) {
    /*     const form = this.fb.group({
      //courseName: [''],
      studentNumber: [''],
      advisorStatus: [''],
      advisorType: [''],
    });
    this.getCourses(index).push(form); */
  }

  addAdvisor() {
    /*     const advisorForm = this.fb.group({
      generalInfo: [],
      hasMoreCourses: [],
      courses: this.fb.array([
        this.fb.group({
          //courseName: [''],
          studentNumber: [''],
          advisorStatus: [''],
          advisorType: [''],
        }),
      ]),
    });

    this.advisors.push(advisorForm); */
  }

  getCourses(index: number) {
    return this.mainForm.controls['advisors'].controls[index].controls[
      'courses'
    ];
  }

  getHasMoreCourses(index: number) {
    return this.mainForm.controls['advisors'].controls[index].controls[
      'hasMoreCourses'
    ].value;
  }

  get advisors() {
    return this.mainForm.controls['advisors'];
  }
}
