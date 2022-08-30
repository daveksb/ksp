import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelfServiceHomeComponent } from './self-service-home/self-service-home.component';
import { SelfServiceHomePageComponent } from './self-service-home-page/self-service-home-page.component';
import { RouterModule, Routes } from '@angular/router';
import { SelfServiceMasterPageComponent } from '@ksp/self-service/feature/master-page';
import { TopNavComponent } from '@ksp/shared/menu';
import { MatTableModule } from '@angular/material/table';
import {
  SelfServiceLicenseInfoComponent,
  SlideshowComponent,
} from '@ksp/self-service/ui';
import { MatMenuModule } from '@angular/material/menu';

export const routes: Routes = [
  {
    path: '',
    component: SelfServiceMasterPageComponent,
    children: [
      {
        path: '',
        component: SelfServiceHomePageComponent,
      },
    ],
  },
];

@NgModule({
  imports: [
    CommonModule,
    TopNavComponent,
    MatTableModule,
    SlideshowComponent,
    SelfServiceLicenseInfoComponent,
    MatMenuModule,
    RouterModule.forChild(routes),
  ],
  declarations: [SelfServiceHomeComponent, SelfServiceHomePageComponent],
  exports: [SelfServiceHomePageComponent],
})
export class SelfServiceFeatureHomeModule {}
