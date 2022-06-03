import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentChannelComponent } from './payment-channel/payment-channel.component';

@NgModule({
  imports: [CommonModule],
  declarations: [PaymentChannelComponent],
  exports: [PaymentChannelComponent],
})
export class SelfServiceUiPaymentModule {}
