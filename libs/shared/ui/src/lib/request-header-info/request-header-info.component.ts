import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RequestNoPipe, ThaiDatePipe } from '@ksp/shared/pipe';

@Component({
  selector: 'ksp-request-header-info',
  templateUrl: './request-header-info.component.html',
  styleUrls: ['./request-header-info.component.scss'],
  standalone: true,
  imports: [CommonModule, ThaiDatePipe, RequestNoPipe],
})
export class RequestHeaderInfoComponent {
  @Input() requestLabel1 = 'วันที่ทำรายการ';
  @Input() requestLabel2 = 'เลขแบบคำขอ';

  @Input() requestNumber: string | null = '';
  @Input() requestDate: string | null = '';

  @Input() showCurrentDate = false;

  today = `${new Date()}`;
}
