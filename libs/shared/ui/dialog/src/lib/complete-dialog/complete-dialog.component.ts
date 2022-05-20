import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  templateUrl: './complete-dialog.component.html',
  styleUrls: ['./complete-dialog.component.scss'],
})
export class CompleteDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { content: string; buttonLabel: string }
  ) {}


}
