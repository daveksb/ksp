import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  standalone: true,
  selector: 'ksp-add-row-button',
  templateUrl: './add-row-button.component.html',
  styleUrls: ['./add-row-button.component.scss'],
  imports: [CommonModule, MatIconModule],
})
export class AddRowButtonComponent {
  @Output() addClick = new EventEmitter<boolean>();
  @Input() mode = 'default';

  onClick() {
    this.addClick.emit(true);
  }
}
