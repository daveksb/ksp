import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { ForgotPasswordSetNewPasswordComponent } from '../forgot-password-set-new-password/forgot-password-set-new-password.component';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  idCardPattern,
  phonePattern,
  validatorMessages,
} from '@ksp/shared/utility';
import { UniFormBadgeComponent } from '@ksp/shared/ui';

@Component({
  selector: 'ksp-forgot-password-search-person',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, UniFormBadgeComponent],
  templateUrl: './forgot-password-search-person.component.html',
  styleUrls: ['./forgot-password-search-person.component.scss'],
})
export class ForgotPasswordSearchPersonComponent {
  @Output() confirmed = new EventEmitter<any>();
  validatorMessages = validatorMessages;

  form = this.fb.group({
    idcardno: ['', [Validators.required, Validators.pattern(idCardPattern)]],
    phone: ['', [Validators.required, Validators.pattern(phonePattern)]],
  });

  constructor(public dialog: MatDialog, private fb: FormBuilder) {}

  cancel() {
    this.dialog.closeAll();
  }

  get formValid() {
    return !this.form.get('idcardno')?.valid || !this.form.get('phone')?.valid;
  }

  nextStep() {
    this.dialog.closeAll();
    this.confirmed.emit({ ...this.form.value });
  }

  get idcardno() {
    return this.form.controls.idcardno;
  }

  get phone() {
    return this.form.controls.phone;
  }
}
