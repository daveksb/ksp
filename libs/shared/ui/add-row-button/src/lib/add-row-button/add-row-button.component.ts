import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'ksp-add-row-button',
  templateUrl: './add-row-button.component.html',
  styleUrls: ['./add-row-button.component.scss'],
})
export class AddRowButtonComponent {
  @Output() addClick = new EventEmitter<boolean>();

  onClick() {
    this.addClick.emit(true);
  }
}
