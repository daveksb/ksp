import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SelfServiceHomeComponent } from '@ksp/self-service/feature/home';
import {
  SelfServiceContainerPageComponent,
  SelfServiceLicenseEditComponent,
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
    component: SelfServiceContainerPageComponent,
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
      {
        path: 'edit',
        component: SelfServiceLicenseEditComponent,
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
