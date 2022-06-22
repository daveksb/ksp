import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

export type ColorMode = 'green' | 'blue';

@Component({
  selector: 'ksp-bottom-nav',
  templateUrl: './bottom-nav.component.html',
  styleUrls: ['./bottom-nav.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class BottomNavComponent {
  @Output() prevClicked = new EventEmitter<boolean>();
  @Output() nextClicked = new EventEmitter<boolean>();
  @Output() saveClicked = new EventEmitter<boolean>();
  @Output() cancelClicked = new EventEmitter<boolean>();
  @Output() tempSaveClicked = new EventEmitter<boolean>();

  @Input() isLastPage = false;
  @Input() isFirstPage = false;
  @Input() saveButtonLabel = 'บันทึก';
  @Input() showCenterButtons = false;
  @Input() showCancelButton = true;
  @Input() showTempSaveButton = false;
  @Input() showSaveButton = false;
  @Input() colorMode: ColorMode = 'blue';
}
