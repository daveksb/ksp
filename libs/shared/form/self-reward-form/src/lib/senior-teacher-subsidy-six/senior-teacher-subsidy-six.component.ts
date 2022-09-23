import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'ksp-senior-teacher-subsidy-six',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './senior-teacher-subsidy-six.component.html',
  styleUrls: ['./senior-teacher-subsidy-six.component.scss'],
})
export class SeniorTeacherSubsidySixComponent implements OnInit {
  form = this.fb.group({
    haveAsset: [],
  });

  isHasAsset: any;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form.valueChanges.subscribe((res) => {
      console.log('res = ', res);
      this.isHasAsset = Number(res['haveAsset']);
      console.log('res2 = ', this.isHasAsset);
    });
  }
}
