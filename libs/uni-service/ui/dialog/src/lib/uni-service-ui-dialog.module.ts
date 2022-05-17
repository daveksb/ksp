import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForgotPasswordPersonIdComponent } from './forgot-password-person-id/forgot-password-person-id.component';
import { ForgotPasswordSetNewPasswordComponent } from './forgot-password-set-new-password/forgot-password-set-new-password.component';
import { ForgotPasswordNotFoundComponent } from './forgot-password-not-found/forgot-password-not-found.component';
import { RegisterConfirmComponent } from './register-confirm/register-confirm.component';
import { RegisterCompletedComponent } from './register-completed/register-completed.component';
import { ReqDegreeCertConfirmComponent } from './req-degree-cert-confirm/req-degree-cert-confirm.component';
import { ReqDegreeCertCompleteComponent } from './req-degree-cert-complete/req-degree-cert-complete.component';
import { ReqForeignIdConfirmComponent } from './req-foreign-id-confirm/req-foreign-id-confirm.component';
import { ReqForeignIdCompleteComponent } from './req-foreign-id-complete/req-foreign-id-complete.component';

@NgModule({
  imports: [CommonModule],
  declarations: [
    ForgotPasswordPersonIdComponent,
    ForgotPasswordSetNewPasswordComponent,
    ForgotPasswordNotFoundComponent,
    RegisterConfirmComponent,
    RegisterCompletedComponent,
    ReqDegreeCertConfirmComponent,
    ReqDegreeCertCompleteComponent,
    ReqForeignIdConfirmComponent,
    ReqForeignIdCompleteComponent,
  ],
  exports: [
    ForgotPasswordPersonIdComponent,
    ForgotPasswordSetNewPasswordComponent,
    ForgotPasswordNotFoundComponent,
    RegisterConfirmComponent,
    RegisterCompletedComponent,
    ReqDegreeCertConfirmComponent,
    ReqDegreeCertCompleteComponent,
    ReqForeignIdConfirmComponent,
    ReqForeignIdCompleteComponent,
  ],
})
export class UniServiceUiDialogModule {}
