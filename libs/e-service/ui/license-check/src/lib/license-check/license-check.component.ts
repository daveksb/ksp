import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'e-service-license-check',
  templateUrl: './license-check.component.html',
  styleUrls: ['./license-check.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class LicenseCheckComponent {
  @Input() reasons: string[] = [];
  @Input() choices: string[] = [
    'ครบถ้วน และถูกต้อง',
    'ไม่ครบถ้วน และไม่ถูกต้อง',
  ];
  @Input() headerTitle = 'ผลการตรวจสอบ';
  @Input() isHasReason = true;
}
