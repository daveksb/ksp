import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  standalone: true,
  selector: 'ksp-add-row-button',
  templateUrl: './add-row-button.component.html',
  styleUrls: ['./add-row-button.component.scss'],
  imports: [CommonModule, MatIconModule],
})

/**
 * use class="blue" for make blue color and bigger font
 */
export class AddRowButtonComponent {
  @Output() addRowClick = new EventEmitter<boolean>();
}
