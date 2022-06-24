import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'ksp-license-type-button-group',
  templateUrl: './license-type-button-group.component.html',
  styleUrls: ['./license-type-button-group.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class LicenseTypeButtonGroupComponent {
  @Input() groups: string[] = [];
}
