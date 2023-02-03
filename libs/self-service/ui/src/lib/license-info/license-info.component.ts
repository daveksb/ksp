import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'self-service-license-info',
  templateUrl: './license-info.component.html',
  styleUrls: ['./license-info.component.scss'],
  imports: [CommonModule],
  standalone: true,
})
export class SelfServiceLicenseInfoComponent {
  @Input() pay: any;
  @Input() all: any;
  @Input() approve: any;
  @Input() edit: any;
}
