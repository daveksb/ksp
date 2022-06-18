import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { Router } from '@angular/router';

@Component({
  selector: 'ksp-degree-cert-step-two',
  templateUrl: './step-two.component.html',
  styleUrls: ['./step-two.component.css'],
  //encapsulation: ViewEncapsulation.None,
})
export class DegreeCertStepTwoComponent {
  @Output() tabIndexChanged = new EventEmitter<number>();
  @Input() formType = 'a';

  constructor(private router: Router) {}

  tabChanged($event: MatTabChangeEvent) {
    //console.log('tab index = ', $event.index);
    this.tabIndexChanged.emit($event.index);
  }
}
