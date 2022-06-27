import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'ksp-temp-license-search',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './temp-license-search.component.html',
  styleUrls: ['./temp-license-search.component.scss'],
})
export class TempLicenseSearchComponent {
  @Output() clear = new EventEmitter<boolean>(false);
  @Output() search = new EventEmitter<boolean>(false);
}
