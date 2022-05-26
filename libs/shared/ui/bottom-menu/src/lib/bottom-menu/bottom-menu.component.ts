import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'ksp-bottom-menu',
  templateUrl: './bottom-menu.component.html',
  styleUrls: ['./bottom-menu.component.scss'],
})
export class BottomMenuComponent {
  @Output() prevClicked = new EventEmitter<boolean>();
  @Output() nextClicked = new EventEmitter<boolean>();
}
