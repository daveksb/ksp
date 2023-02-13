import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThaiDatePipe } from '@ksp/shared/pipe';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'ksp-check-history',
  standalone: true,
  imports: [CommonModule, ThaiDatePipe],
  templateUrl: './check-history.component.html',
  styleUrls: ['./check-history.component.scss'],
})
export class CheckHistoryComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: any
  ) {}

  mapCheckResult(data: string) {
    if (!data) return '';
    const parseData = JSON.parse(data);
    const result = parseData.checkresult || '';
    //console.log('data xx = ', result);

    if (result === '1') return 'ครบถ้วน และถูกต้อง';
    if (result === '2') return 'ขอแก้ไข / เพิ่มเติม';
    if (result === '3') return 'ขาดคุณสมบัติ';
    else return '';
  }
}
