import { Component, Input } from '@angular/core';

@Component({
  selector: 'ksp-license-type-button-group',
  templateUrl: './license-type-button-group.component.html',
  styleUrls: ['./license-type-button-group.component.scss'],
  standalone: true,
})
export class LicenseTypeButtonGroupComponent {
  @Input() groups: string[] = [];
}
