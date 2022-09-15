import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'self-service-foreign-license-step-two',
  templateUrl: './foreign-license-step-two.component.html',
  styleUrls: ['./foreign-license-step-two.component.scss'],
})
export class ForeignLicenseStepTwoComponent implements OnInit {
  academicFiles = [
    {
      name: `1. Achelor's degree`,
      fileId: '',
    },
  ];

  constructor() {}

  ngOnInit(): void {}
}
