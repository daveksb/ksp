import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'ksp-enable-reward-request-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule],
  templateUrl: './enable-reward-request-dialog.component.html',
  styleUrls: ['./enable-reward-request-dialog.component.scss'],
})
export class EnableRewardRequestDialogComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
