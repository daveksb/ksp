import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  templateUrl: './forbidden-property.component.html',
  styleUrls: ['./forbidden-property.component.scss'],
})
export class ForbiddenPropertyComponent {
  @Input()
  title = `ขอรับรองว่าไม่เป็นผู้มีลักษณะต้องห้ามตามที่กำหนดไว้ในมาตรา 44
  แห่งพระราชบัญญัติสภาครูและบุคลากรทางการศึกษา พ.ศ.2546`;
  @Output() confirmed = new EventEmitter<boolean>();

  save() {
    this.confirmed.emit(true);
  }
}
