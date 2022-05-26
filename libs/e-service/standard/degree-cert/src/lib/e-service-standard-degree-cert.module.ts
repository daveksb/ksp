import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { DegreeCertListComponent } from './degree-cert-list/degree-cert-list.component';

export const eServiceStandardDegreeCertRoutes: Route[] = [];

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [DegreeCertListComponent],
  exports: [DegreeCertListComponent],
})
export class EServiceStandardDegreeCertModule {}
