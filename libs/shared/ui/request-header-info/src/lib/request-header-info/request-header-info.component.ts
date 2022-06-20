import { Component, Input } from '@angular/core';

@Component({
  selector: 'ksp-request-header-info',
  templateUrl: './request-header-info.component.html',
  styleUrls: ['./request-header-info.component.scss'],
  standalone: true,
})
export class RequestHeaderInfoComponent {
  @Input() requestDate = '';
  @Input() requestNumber = '';
}
