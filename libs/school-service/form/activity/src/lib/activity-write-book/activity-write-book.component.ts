import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ksp-activity-write-book',
  templateUrl: './activity-write-book.component.html',
  styleUrls: ['./activity-write-book.component.scss'],
})
export class ActivityWriteBookComponent {
  @Input() data: any;
}
