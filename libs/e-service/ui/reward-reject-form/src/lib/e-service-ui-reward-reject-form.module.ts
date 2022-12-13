import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RewardInfoFormComponent } from './reward-info-form/reward-info-form.component';
import { RejectInfoFormComponent } from './reject-info-form/reject-info-form.component';
import { RevokeInfoFormComponent } from './revoke-info-form/revoke-info-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { RewardRejectFormComponent } from './reward-reject-form/reward-reject-form.component';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, MatDatepickerModule],
  declarations: [
    RewardInfoFormComponent,
    RejectInfoFormComponent,
    RevokeInfoFormComponent,
    RewardRejectFormComponent,
  ],
  exports: [
    RejectInfoFormComponent,
    RevokeInfoFormComponent,
    RewardInfoFormComponent,
    RewardRejectFormComponent,
  ],
})
export class EServiceUiRewardRejectFormModule {}
