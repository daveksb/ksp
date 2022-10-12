import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'ksp-edit-license-approve-detail',
  templateUrl: './edit-license-approve-detail.component.html',
  styleUrls: ['./edit-license-approve-detail.component.scss'],
})
export class EditLicenseApproveDetailComponent implements OnInit {
  choices = [
    {
      name: 'ครบถ้วน และถูกต้อง',
      value: 2,
    },
    {
      name: 'ไม่ครบถ้วน และถูกต้อง',
      value: 3,
    },
  ];

  form = this.fb.group({
    licenseInfo: [],
  });

  form2 = this.fb.group({
    verifyResult: [null, Validators.required],
  });

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {}
}
