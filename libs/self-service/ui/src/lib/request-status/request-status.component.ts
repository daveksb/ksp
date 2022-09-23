import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'self-service-request-status',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './request-status.component.html',
  styleUrls: ['./request-status.component.scss'],
})
export class RequestStatusComponent {
  @Input() title = 'รายละเอียดใบคำขอ';
  @Input() headerLabel1 = 'วันที่ทำรายการ';
  @Input() headerLabel2 = 'เลขใบคำขอ';

  @Input() requestDate!: string | null;
  @Input() requestNo!: string | null;
  @Input() licenseNo!: string | null;
  @Input() kurusapaNo!: string | null;
  @Input() idcardNo!: string | null;
  @Input() licenseStartDate!: string | null;
  @Input() licenseEndDate!: string | null;
}
