import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'school-service-staff-search',
  templateUrl: './staff-search.component.html',
  styleUrls: ['./staff-search.component.scss'],
})
export class StaffSearchComponent {
  @Output() clear = new EventEmitter<boolean>();
  @Output() search = new EventEmitter<boolean>();
}
