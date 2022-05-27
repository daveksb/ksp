import { Component, Input } from '@angular/core';

@Component({
  selector: 'e-service-consider-result',
  templateUrl: './consider-result.component.html',
  styleUrls: ['./consider-result.component.scss'],
})
export class ConsiderResultComponent {
  @Input() number = 1;
  @Input() isBasicValid = false;
  @Input() name = '';
}
