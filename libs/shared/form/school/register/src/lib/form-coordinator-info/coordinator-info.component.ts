import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SetGrayBackgroundDirective } from '@ksp/shared/directive';

@Component({
  selector: 'ksp-form-coordinator-info',
  standalone: true,
  imports: [CommonModule, SetGrayBackgroundDirective],
  templateUrl: './coordinator-info.component.html',
  styleUrls: ['./coordinator-info.component.scss'],
})
export class FormCoordinatorInfoComponent {
  @Input() isGreyMode = true;
}
