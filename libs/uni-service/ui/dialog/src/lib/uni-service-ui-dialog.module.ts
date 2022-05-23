import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForgotPasswordPersonIdComponent } from './forgot-password-person-id/forgot-password-person-id.component';
import { ForgotPasswordSetNewPasswordComponent } from './forgot-password-set-new-password/forgot-password-set-new-password.component';
import { ForgotPasswordNotFoundComponent } from './forgot-password-not-found/forgot-password-not-found.component';

@NgModule({
  imports: [CommonModule],
  declarations: [
    ForgotPasswordPersonIdComponent,
    ForgotPasswordSetNewPasswordComponent,
    ForgotPasswordNotFoundComponent,
  ],
  exports: [
    ForgotPasswordPersonIdComponent,
    ForgotPasswordSetNewPasswordComponent,
    ForgotPasswordNotFoundComponent,
  ],
})
export class UniServiceUiDialogModule {}
