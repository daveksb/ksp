import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForgotPasswordPersonIdComponent } from './forgot-password-person-id/forgot-password-person-id.component';
import { ForgotPasswordSetNewPasswordComponent } from './forgot-password-set-new-password/forgot-password-set-new-password.component';
import { ForgotPasswordNotFoundComponent } from './forgot-password-not-found/forgot-password-not-found.component';
import { TrainingAddressComponent } from './training-address/training-address.component';
import { MatDialogModule } from '@angular/material/dialog';
import { SharedUiAddRowButtonModule } from '@ksp/shared/ui/add-row-button';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  imports: [
    CommonModule,
    MatDialogModule,
    SharedUiAddRowButtonModule,
    ReactiveFormsModule,
    MatIconModule,
    MatTooltipModule,
  ],
  declarations: [
    ForgotPasswordPersonIdComponent,
    ForgotPasswordSetNewPasswordComponent,
    ForgotPasswordNotFoundComponent,
    TrainingAddressComponent,
  ],
  exports: [
    ForgotPasswordPersonIdComponent,
    ForgotPasswordSetNewPasswordComponent,
    ForgotPasswordNotFoundComponent,
    TrainingAddressComponent,
  ],
})
export class UniServiceUiDialogModule {}
