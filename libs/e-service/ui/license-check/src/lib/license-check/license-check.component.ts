import { Component, Input } from '@angular/core';

@Component({
  selector: 'e-service-license-check',
  templateUrl: './license-check.component.html',
  styleUrls: ['./license-check.component.scss'],
})
export class LicenseCheckComponent {
  @Input() reasons: string[] = [];
}
