import {
  Component,
  EventEmitter,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { Router } from '@angular/router';

@Component({
  selector: 'ksp-degree-cert-step-two',
  templateUrl: './degree-cert-step-two.component.html',
  styleUrls: ['./degree-cert-step-two.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class DegreeCertStepTwoComponent {
  @Output() tabIndexChanged = new EventEmitter<number>();

  constructor(private router: Router) {}

  goToStep1() {
    this.router.navigate(['/', 'degree-cert', 'step-1']);
  }

  goToStep3() {
    this.router.navigate(['/', 'degree-cert', 'step-3']);
  }

  tabChanged($event: MatTabChangeEvent) {
    console.log('tab index = ', $event.index);
    this.tabIndexChanged.emit($event.index);
  }
}
