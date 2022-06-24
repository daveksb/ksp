import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ksp-form-coordinator-info',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './coordinator-info.component.html',
  styleUrls: ['./coordinator-info.component.scss'],
})
export class FormCoordinatorInfoComponent {
  @Input() isGreyMode = true;
}
