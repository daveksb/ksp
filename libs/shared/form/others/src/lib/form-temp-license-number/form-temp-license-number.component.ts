import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ksp-form-temp-license-number',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './form-temp-license-number.component.html',
  styleUrls: ['./form-temp-license-number.component.scss'],
})
export class FormTempLicenseNumberComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
