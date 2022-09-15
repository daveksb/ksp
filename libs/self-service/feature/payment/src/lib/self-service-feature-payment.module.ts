import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentChannelComponent } from './payment-channel/payment-channel.component';
import { PromptpayComponent } from './promptpay/promptpay.component';
import { MatIconModule } from '@angular/material/icon';
import { SelfServiceLicenseInfoComponent } from '@ksp/self-service/ui';
import { TopNavComponent } from '@ksp/shared/menu';
import { RequestHeaderInfoComponent } from '@ksp/shared/ui';

@NgModule({
  imports: [
    CommonModule,
    TopNavComponent,
    MatIconModule,
    SelfServiceLicenseInfoComponent,
    RequestHeaderInfoComponent
  ],
  declarations: [PaymentChannelComponent, PromptpayComponent],
  exports: [PaymentChannelComponent, PromptpayComponent],
})
export class SelfServiceFeaturePaymentModule {}
