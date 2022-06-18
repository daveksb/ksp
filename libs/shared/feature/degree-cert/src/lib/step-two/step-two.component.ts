import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { FormMode } from '@ksp/shared/interface';

@Component({
  selector: 'ksp-degree-cert-step-two',
  templateUrl: './step-two.component.html',
  styleUrls: ['./step-two.component.css'],
})
export class DegreeCertStepTwoComponent {
  @Output() tabIndexChanged = new EventEmitter<number>();
  @Input() formType = 'a';
  @Input() mode: FormMode = 'edit';

  tabChanged($event: MatTabChangeEvent) {
    //console.log('tab index = ', $event.index);
    this.tabIndexChanged.emit($event.index);
  }
}
