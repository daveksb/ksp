import { Component, Input } from '@angular/core';

@Component({
  selector: 'e-service-verify-result',
  templateUrl: './verify-result.component.html',
  styleUrls: ['./verify-result.component.scss'],
})
export class VerifyResultComponent {
  @Input() number = 1;
  @Input() isBasicValid = false;
  @Input() isCourseValid = false;
  @Input() isProcessValid = false;
  @Input() isAttachmentValid = false;
}
