import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'e-service-accusation-search',
  templateUrl: './accusation-search.component.html',
  styleUrls: ['./accusation-search.component.scss'],
})
export class AccusationSearchComponent {
  @Output() submited = new EventEmitter<boolean>();
}
