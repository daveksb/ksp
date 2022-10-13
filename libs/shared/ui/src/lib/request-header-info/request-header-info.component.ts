import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ThaiDatePipe } from '@ksp/shared/pipe';

@Component({
  selector: 'ksp-request-header-info',
  templateUrl: './request-header-info.component.html',
  styleUrls: ['./request-header-info.component.scss'],
  standalone: true,
  imports: [CommonModule, ThaiDatePipe],
})
export class RequestHeaderInfoComponent {
  @Input() requestLabel1 = 'วันที่ทำรายการ';
  @Input() requestLabel2 = 'เลขใบคำขอ';

  //@Input() requestDate!: string;
  @Input() requestNumber!: any;
  @Input() set requestDate(value: any) {
    console.log('request date = ', value);
  }
}
