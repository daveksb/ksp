import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'self-service-form-user-education',
  templateUrl: './form-user-education.component.html',
  styleUrls: ['./form-user-education.component.css'],
})
export class FormUserEducationComponent implements OnInit {
  educationForm = this.fb.group({
    educationType: [''],
  });

  educationTypes = [
    {
      label: `วุฒิปริญญาทางการศึกษา หรือเทียบเท่า หรือคุณวุฒิอื่นที่คุรุสภาให้การรับรอง`,
      value: 1,
    },
    {
      label: `วุฒิประกาศนียบัตรบัณฑิตวิชาชีพครูที่คุรุสภาให้การรับรอง`,
      value: 2,
    },
    {
      label: `วุฒิไม่ต่ำกว่าปริญญาตรี`,
      value: 3,
    },
    {
      label: `วุฒิปริญญาทางการศึกษาหลักสูตร 4 ปี`,
      value: 4,
    },
    {
      label: `รับรองคุณวุฒิการศึกษา`,
      value: 5,
    },
    {
      label: `วุฒิปริญญาทางการศึกษาจากต่างประเทศ`,
      value: 6,
    },
  ];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.educationForm.valueChanges.subscribe((res) => {
      console.log('form = ', res);
    });
  }
}
