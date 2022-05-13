import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'ksp-register-completed',
  templateUrl: './register-completed.component.html',
  styleUrls: ['./register-completed.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterCompletedComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
