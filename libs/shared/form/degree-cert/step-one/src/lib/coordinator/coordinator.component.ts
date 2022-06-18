import { Component, Input, OnInit } from '@angular/core';
import { FormMode } from '@ksp/shared/interface';

@Component({
  selector: 'ksp-degree-cert-coordinator',
  templateUrl: './coordinator.component.html',
  styleUrls: ['./coordinator.component.scss'],
})
export class DegreeCertCoordinatorComponent implements OnInit {
  @Input() mode: FormMode = 'edit';

  constructor() {}

  ngOnInit(): void {}
}
