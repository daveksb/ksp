import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

@Component({
  templateUrl: './complete-dialog.component.html',
  styleUrls: ['./complete-dialog.component.scss'],
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatIconModule],
})
export class CompleteDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      header: string;
      content: string;
      btnLabel: string;
      subContent: string;
      showPrintButton: boolean;
      showImg: boolean;
      isDanger: boolean;
    }
  ) {}

  @Output() completed = new EventEmitter<boolean>();

  complete() {
    this.completed.emit(true);
  }
}
