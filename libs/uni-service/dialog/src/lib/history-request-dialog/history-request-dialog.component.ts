import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'uni-service-history-request-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule],
  templateUrl: './history-request-dialog.component.html',
  styleUrls: ['./history-request-dialog.component.scss'],
})
export class HistoryRequestDialogComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
