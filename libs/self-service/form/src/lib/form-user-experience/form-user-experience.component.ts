import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'self-service-form-user-experience',
  templateUrl: './form-user-experience.component.html',
  styleUrls: ['./form-user-experience.component.css'],
})
export class FormUserExperienceComponent implements OnInit {
  form = this.fb.group({
    TrainingAddressOne: [],
    TrainingAddressTwo: [],
    teachingAddress: [],
    selectValue: [''],
  });

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form.controls['selectValue'].valueChanges.subscribe((res) => {
      //console.log('res', res);
    });
  }
}
