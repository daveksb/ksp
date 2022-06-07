import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss'],
})
export class ConfirmDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      title: string;
      subTitle: string;
      isDanger: boolean;
      schoolCode: string;
      btnLabel: string;
      cancelBtnLabel: string;
    }
  ) {}

  @Output() confirmed = new EventEmitter<boolean>();
  @Output() saved = new EventEmitter<boolean>();
}
