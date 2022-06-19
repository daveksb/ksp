import { Component, Input } from '@angular/core';
import { FormMode } from '@ksp/shared/interface';

@Component({
  selector: 'ksp-degree-cert-step-3',
  templateUrl: './step-three.component.html',
  styleUrls: ['./step-three.component.css'],
})
export class DegreeCertStepThreeComponent {
  @Input() mode: FormMode = 'edit';
}
