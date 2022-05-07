import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UniversitySearchComponent } from '@ksp/shared/ui/university-search';
import { UniServiceHomeComponent } from '@ksp/uni-service/feature/home';
import { UniServiceLoginComponent } from '@ksp/uni-service/feature/login';
import { UniServiceRegisterComponent } from '@ksp/uni-service/feature/register';

const routes: Routes = [
  { path: 'login', component: UniServiceLoginComponent },
  { path: 'home', component: UniServiceHomeComponent },
  { path: 'register', component: UniServiceRegisterComponent },
  { path: 'search-uni', component: UniversitySearchComponent },
  /*
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
