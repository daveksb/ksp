import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentChannelComponent } from './payment-channel/payment-channel.component';
import { SharedUiTopNavModule } from '@ksp/shared/ui/top-nav';
import { PromptpayComponent } from './promptpay/promptpay.component';
import { MatIconModule } from '@angular/material/icon';
import { LicenseInfoComponent } from '@ksp/self-service/ui';

@NgModule({
  imports: [
    CommonModule,
    SharedUiTopNavModule,
    MatIconModule,
    LicenseInfoComponent,
  ],
  declarations: [PaymentChannelComponent, PromptpayComponent],
  exports: [PaymentChannelComponent, PromptpayComponent],
})
export class SelfServiceFeaturePaymentModule {}
