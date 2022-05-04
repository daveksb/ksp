import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'; // CLI imports router
import { SelfServiceHomeComponent } from '@ksp/self-service/feature/home';
import { SelfServiceThaiLoginComponent } from '@ksp/self-service/feature/login';

const routes: Routes = [
  { path: 'home', component: SelfServiceHomeComponent },
  { path: 'login', component: SelfServiceThaiLoginComponent },
  { path: '**', component: SelfServiceHomeComponent },
  /*
  { path: 'home', component: SelfServiceHomeComponent },
  { path: 'register', component: SelfServiceRegisterComponent },
  {
    path: 'license',
    component: LicenseRequestMainComponent,
    children: [
      {
        path: 'home',
        component: LicenseRequestFormComponent,
      },
      {
        path: 'request',
        component: LicenseRequestFormComponent,
      },
      {
        path: 'bank-payment',
        component: BankPaymentComponent,
      },
      {
        path: 'payment-history',
        component: PaymentHistoryComponent,
      },
    ],
  },
  */
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
