import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'ksp-license-info',
  templateUrl: './license-info.component.html',
  styleUrls: ['./license-info.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class LicenseInfoComponent {
  @Input() isLicenseRevoked = false;

  constructor() {}
}
