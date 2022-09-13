import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ksp-renew-license-property-degree-form',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './renew-license-property-degree-form.component.html',
  styleUrls: ['./renew-license-property-degree-form.component.scss'],
})
export class RenewLicensePropertyDegreeFormComponent implements OnInit {
  @Input() hasGraduateDate = true;
  @Input() hasExperience = false;
  @Input() degreeLabel = 'วุฒิการศึกษา';

  constructor() {}

  ngOnInit(): void {}
}
