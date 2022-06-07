import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentChannelComponent } from './payment-channel/payment-channel.component';
import { SelfServiceUiMenuModule } from '@ksp/self-service/ui/menu';
import { SharedUiTopNavModule } from '@ksp/shared/ui/top-nav';
import { PromptpayComponent } from './promptpay/promptpay.component';

@NgModule({
  imports: [CommonModule, SelfServiceUiMenuModule, SharedUiTopNavModule],
  declarations: [PaymentChannelComponent, PromptpayComponent],
  exports: [PaymentChannelComponent, PromptpayComponent],
})
export class SelfServiceUiPaymentModule {}
