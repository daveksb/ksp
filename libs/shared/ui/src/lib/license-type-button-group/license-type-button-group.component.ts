import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
@Component({
  selector: 'ksp-license-type-button-group',
  templateUrl: './license-type-button-group.component.html',
  styleUrls: ['./license-type-button-group.component.scss'],
  standalone: true,
  imports: [CommonModule, MatButtonToggleModule],
})
export class LicenseTypeButtonGroupComponent {
  licenseButtons = [
    'ใบอนุญาตประกอบวิชาชีพ - ครู',
    'ใบอนุญาตประกอบวิชาชีพ - ผู้บริหารสถานศึกษา',
    'ใบอนุญาตประกอบวิชาชีพ - ผู้บริหารการศึกษา',
    'ใบอนุญาตประกอบวิชาชีพ - ศึกษานิเทศก์',
  ];
}
