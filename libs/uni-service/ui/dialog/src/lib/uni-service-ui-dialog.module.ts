import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForgotPasswordPersonIdComponent } from './forgot-password-person-id/forgot-password-person-id.component';
import { ForgotPasswordSetNewPasswordComponent } from './forgot-password-set-new-password/forgot-password-set-new-password.component';
import { ForgotPasswordNotFoundComponent } from './forgot-password-not-found/forgot-password-not-found.component';
import { RegisterConfirmComponent } from './register-confirm/register-confirm.component';
import { RegisterCompletedComponent } from './register-completed/register-completed.component';

@NgModule({
  imports: [CommonModule],
  declarations: [
    ForgotPasswordPersonIdComponent,
    ForgotPasswordSetNewPasswordComponent,
    ForgotPasswordNotFoundComponent,
    RegisterConfirmComponent,
    RegisterCompletedComponent,
  ],
  exports: [
    ForgotPasswordPersonIdComponent,
    ForgotPasswordSetNewPasswordComponent,
    ForgotPasswordNotFoundComponent,
    RegisterConfirmComponent,
    RegisterCompletedComponent,
  ],
})
export class UniServiceUiDialogModule {}
