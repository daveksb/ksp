import { Component, Input } from '@angular/core';
import { stringToThaiDate, thaiDate } from '@ksp/shared/utility';

@Component({
  selector: 'e-service-consider-result',
  templateUrl: './consider-result.component.html',
  styleUrls: ['./consider-result.component.scss'],
})
export class ConsiderResultComponent {
  @Input() number = 1;
  @Input() isBasicValid = false;
  @Input() name = '';
  @Input() date = '';
  @Input() createby = '';

  convertDate(date: any) {
    return thaiDate(new Date(date))
  }
}
