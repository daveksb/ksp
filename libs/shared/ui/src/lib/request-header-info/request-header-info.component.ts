import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'ksp-request-header-info',
  templateUrl: './request-header-info.component.html',
  styleUrls: ['./request-header-info.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class RequestHeaderInfoComponent {
  @Input() requestDate = '';
  @Input() requestNumber: string | null = '';
  @Input() requestLabel1 = 'วันที่ทำรายการ';
  @Input() requestLabel2 = 'เลขใบคำขอ';
}
