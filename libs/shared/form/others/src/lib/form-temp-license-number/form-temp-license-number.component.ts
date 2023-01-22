import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SchTempLicense } from '@ksp/shared/interface';
import { ThaiDatePipe } from '@ksp/shared/pipe';

@Component({
  selector: 'ksp-form-temp-license-number',
  standalone: true,
  imports: [CommonModule, ThaiDatePipe],
  templateUrl: './form-temp-license-number.component.html',
  styleUrls: ['./form-temp-license-number.component.scss'],
})
export class FormTempLicenseNumberComponent {
  viewHistory = false;
  @Input() tempLicenseHistory: SchTempLicense[] | null = [];
}
