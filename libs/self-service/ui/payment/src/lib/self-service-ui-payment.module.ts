import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentHistoryComponent } from './payment-history/payment-history.component';
import { PaymentChannelComponent } from './payment-channel/payment-channel.component';

@NgModule({
  imports: [CommonModule],
  declarations: [PaymentHistoryComponent, PaymentChannelComponent],
  exports: [PaymentHistoryComponent, PaymentChannelComponent],
})
export class SelfServiceUiPaymentModule {}
