import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ksp-uni-form-badge',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './uni-form-badge.component.html',
  styleUrls: ['./uni-form-badge.component.scss'],
})
export class UniFormBadgeComponent {
  @Input() mainTitle = '';
  @Input() subTitle = '';
}
