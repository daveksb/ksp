import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SelfServiceHomeComponent } from '@ksp/self-service/feature/home';
import {
  SelfServiceLicenseMainComponent,
  SelfServiceLicenseRequestComponent,
} from '@ksp/self-service/feature/license';
import { SelfServiceThaiLoginComponent } from '@ksp/self-service/feature/login';
import {
  PaymentChannelComponent,
  PaymentHistoryComponent,
} from '@ksp/self-service/ui/payment';

const routes: Routes = [
  { path: 'home', component: SelfServiceHomeComponent },
  { path: 'login', component: SelfServiceThaiLoginComponent },
  {
    path: 'license',
    component: SelfServiceLicenseMainComponent,
    children: [
      {
        path: 'request',
        component: SelfServiceLicenseRequestComponent,
      },
      {
        path: 'payment-channel',
        component: PaymentChannelComponent,
      },
      {
        path: 'payment-history',
        component: PaymentHistoryComponent,
      },
    ],
  },
  { path: '**', component: SelfServiceHomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
