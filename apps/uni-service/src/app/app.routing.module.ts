import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UniServiceLoginComponent } from '@ksp/uni-service/feature/login';

const routes: Routes = [
  { path: 'login', component: UniServiceLoginComponent },
  /* { path: 'login', component: SelfServiceThaiLoginComponent },
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
      {
        path: 'edit',
        component: SelfServiceLicenseEditComponent,
      },
    ],
  }, */
  { path: '**', component: UniServiceLoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
