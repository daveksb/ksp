import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { changeToEnglishMonth, thaiDate } from '@ksp/shared/utility';
import { ThaiDatePipe } from '@ksp/shared/pipe';

@Component({
  selector: 'self-service-request-status',
  standalone: true,
  imports: [CommonModule, ThaiDatePipe],
  templateUrl: './request-status.component.html',
  styleUrls: ['./request-status.component.scss'],
})
export class RequestStatusComponent {
  changeToEnglishMonth = changeToEnglishMonth;
  today = `${new Date()}`;
  @Input() title = 'รายละเอียดแบบคำขอ';
  @Input() headerLabel1 = 'วันที่ทำรายการ';
  @Input() headerLabel2 = 'เลขแบบคำขอ';

  @Input() requestDate: string | null = '';
  @Input() requestNo: string | null = '';
  @Input() licenseNo: string | null = '';
  @Input() kurusapaNo: string | null = '';
  @Input() idcardNo: string | null = '';
  @Input() licenseStartDate: string | null = '';
  @Input() licenseEndDate: string | null = '';
  @Input() isForeign = false;
}
