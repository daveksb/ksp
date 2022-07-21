import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'ksp-login-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent {
  eyeIconClicked = false;

  @Input() showRetired = false;
  @Input() hideRegister = false;
  @Output() login = new EventEmitter<boolean>();
  @Output() register = new EventEmitter<boolean>();
  @Output() forgetPassword = new EventEmitter<boolean>();
  @Output() retired = new EventEmitter<boolean>();
}
