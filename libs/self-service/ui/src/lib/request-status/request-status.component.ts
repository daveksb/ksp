import { Component, Input, OnInit } from '@angular/core';
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


  @Input() showContent1 = true;
  @Input() showContent2 = true;
  @Input() showContent3 = true;
  @Input() showContent4 = true;
  @Input() showContent5 = true;
  @Input() showContent6 = true;
  @Input() showContent7 = true;
}
