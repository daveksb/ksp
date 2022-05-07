import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UniversitySearchComponent } from '@ksp/shared/ui/university-search';
import { UniServiceContainerPageComponent } from '@ksp/uni-service/feature/container-page';
import { UniServiceHomeComponent } from '@ksp/uni-service/feature/home';
import { UniServiceLoginComponent } from '@ksp/uni-service/feature/login';
import { UniServiceRegisterComponent } from '@ksp/uni-service/feature/register';

const routes: Routes = [
  { path: 'login', component: UniServiceLoginComponent },
  { path: 'register', component: UniServiceRegisterComponent },
  { path: 'search-uni', component: UniversitySearchComponent },
  {
    path: 'license',
    component: UniServiceContainerPageComponent,
    children: [
      {
        path: 'home',
        component: UniServiceHomeComponent,
      },
    ],
  },
  { path: '**', component: UniServiceLoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
