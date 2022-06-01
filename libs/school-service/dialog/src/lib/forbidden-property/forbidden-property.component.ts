import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  templateUrl: './forbidden-property.component.html',
  styleUrls: ['./forbidden-property.component.scss'],
})
export class ForbiddenPropertyComponent {
  @Output() confirmed = new EventEmitter<boolean>();

  save() {
    this.confirmed.emit(true);
  }
}
