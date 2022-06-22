import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  templateUrl: './complete-dialog.component.html',
  styleUrls: ['./complete-dialog.component.scss'],
})
export class CompleteDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      header: string;
      content: string;
      btnLabel: string;
      subContent: string;
      //printButton: string;
      showPrintButton: boolean;
    }
  ) {}

  @Output() completed = new EventEmitter<boolean>();

  complete() {
    this.completed.emit(true);
  }
}
