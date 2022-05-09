import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SchoolServiceLoginComponent } from '@ksp/school-service/feature/login';

const routes: Routes = [
  { path: 'login', component: SchoolServiceLoginComponent },
  /*
  { path: 'register', component: UniServiceRegisterComponent },
  { path: 'search-uni', component: UniversitySearchComponent }, // temp
  {
    path: 'request',
    component: UniServiceContainerPageComponent,
    children: [
      {
        path: 'home',
        component: UniServiceHomeComponent,
      },
    ],
  },
  { path: '**', component: UniServiceLoginComponent }, */
  { path: '**', component: SchoolServiceLoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
