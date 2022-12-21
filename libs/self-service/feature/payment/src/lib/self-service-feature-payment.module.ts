import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentChannelComponent } from './payment-channel/payment-channel.component';
import { PromptpayComponent } from './promptpay/promptpay.component';
import { MatIconModule } from '@angular/material/icon';
import {
  RequestStatusComponent,
  SelfServiceLicenseInfoComponent,
} from '@ksp/self-service/ui';
import { TopNavComponent } from '@ksp/shared/menu';
import { RequestHeaderInfoComponent } from '@ksp/shared/ui';
import { RouterModule, Routes } from '@angular/router';
import { SelfServiceMasterPageComponent } from '@ksp/self-service/feature/master-page';
import { QRCodeModule } from 'angularx-qrcode';
import { NgxBarcodeModule } from 'ngx-barcode';
import { ThaiDatePipe } from '@ksp/shared/pipe';
import { PaymentKtbComponent } from './payment-ktb/payment-ktb.component';

/* export const routes: Routes = [
  {
    path: '',
    component: SelfServiceMasterPageComponent,
    children: [
      {
        path: 'payment-channel/:id',
        component: PaymentChannelComponent,
      },
      {
        path: 'payment-ktb/:id',
        component: PaymentKtbComponent,
      },
      {
        path: 'payment-promptpay/:type',
        component: PromptpayComponent,
      },
    ],
  },
]; */

@NgModule({
  imports: [
    CommonModule,
    TopNavComponent,
    MatIconModule,
    SelfServiceLicenseInfoComponent,
    RequestHeaderInfoComponent,
    RequestStatusComponent,
    QRCodeModule,
    NgxBarcodeModule,
    ThaiDatePipe,
    //RouterModule.forChild(routes),
  ],
  declarations: [
    PaymentChannelComponent,
    PromptpayComponent,
    PaymentKtbComponent,
  ],
  //exports: [PaymentChannelComponent, PromptpayComponent],
})
export class SelfServiceFeaturePaymentModule {}
