import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { thaiDate } from '@ksp/shared/utility';

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

  @Input() requestDate: string | null = thaiDate(new Date());
  @Input() requestNo: string | null = 'ไม่มีข้อมูล';
  @Input() licenseNo: string | null = 'ไม่มีข้อมูล';
  @Input() kurusapaNo: string | null = 'ไม่มีข้อมูล';
  @Input() idcardNo: string | null = 'ไม่มีข้อมูล';
  @Input() licenseStartDate: string | null = 'ไม่มีข้อมูล';
  @Input() licenseEndDate: string | null = 'ไม่มีข้อมูล';
}
