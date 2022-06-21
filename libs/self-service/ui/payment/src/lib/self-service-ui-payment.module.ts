import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentChannelComponent } from './payment-channel/payment-channel.component';
import { SelfServiceUiMenuModule } from '@ksp/self-service/ui/menu';
import { SharedUiTopNavModule } from '@ksp/shared/ui/top-nav';
import { PromptpayComponent } from './promptpay/promptpay.component';
import { ViewReceiveComponent } from './view-receive/view-receive.component';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  imports: [
    CommonModule,
    SelfServiceUiMenuModule,
    SharedUiTopNavModule,
    MatIconModule,
  ],
  declarations: [
    PaymentChannelComponent,
    PromptpayComponent,
    ViewReceiveComponent,
  ],
  exports: [PaymentChannelComponent, PromptpayComponent, ViewReceiveComponent],
})
export class SelfServiceUiPaymentModule {}
