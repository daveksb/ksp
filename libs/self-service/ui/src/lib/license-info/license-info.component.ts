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
  @Input() date = '';
  @Input() requestNo = '';
  @Input() KuruspaId = '';
  @Input() personId = '';

  @Input() header = '';
  @Input() subheader1 = '';
  @Input() subheader2 = '';
  @Input() subheader3 = '';
  @Input() subheader4 = '';
}
