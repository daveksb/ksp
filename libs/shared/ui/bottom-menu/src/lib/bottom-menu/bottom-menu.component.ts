import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'ksp-bottom-menu',
  templateUrl: './bottom-menu.component.html',
  styleUrls: ['./bottom-menu.component.scss'],
})
export class BottomMenuComponent {
  @Output() prevClicked = new EventEmitter<boolean>();
  @Output() nextClicked = new EventEmitter<boolean>();
  @Output() saveClicked = new EventEmitter<boolean>();
  @Output() cancelClicked = new EventEmitter<boolean>();
  @Output() tempSaveClicked = new EventEmitter<boolean>();

  @Input() isLastPage = false;
  @Input() isFirstPage = false;
  @Input() showCenterButtons = false;
  @Input() showTempSaveButton = false;
  @Input() showSaveButton = false;
  @Input() changeColorButtons = false;
}
