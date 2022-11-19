import { Component } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

@Component({
  templateUrl: './receive-preview.component.html',
  styleUrls: ['./receive-preview.component.scss'],
  standalone: true,
  imports: [MatIconModule, MatDialogModule],
})
export class ReceivePreviewComponent {}
