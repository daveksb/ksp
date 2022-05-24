import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EServiceLoginComponent } from './e-service-login/e-service-login.component';
import { RouterModule, Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    component: EServiceLoginComponent,
  },
];
@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  declarations: [EServiceLoginComponent],
  exports: [EServiceLoginComponent],
})
export class EServiceFeatureLoginModule {}
