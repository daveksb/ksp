import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'ksp-stepper-nav',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './stepper-nav.component.html',
  styleUrls: ['./stepper-nav.component.scss'],
})
export class StepperNavComponent {
  @Input() buttonColor = 'light';
  @Input() LabelFirst = 'ข้อมูลผู้ขอรหัสสำหรับเข้าใช้งานระบบ';
  @Input() LabelSecond = '';
}
