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
  SlideshowSecondComponent,
} from '@ksp/self-service/ui';
import { MatMenuModule } from '@angular/material/menu';
import { UniFormBadgeComponent } from '@ksp/shared/ui';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';

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
    ReactiveFormsModule,
    SelfServiceLicenseInfoComponent,
    MatMenuModule,
    SlideshowSecondComponent,
    UniFormBadgeComponent,
    MatSortModule,
    MatPaginatorModule,
    RouterModule.forChild(routes),
    MatDatepickerModule,
  ],
  declarations: [SelfServiceHomeComponent, SelfServiceHomePageComponent],
  exports: [SelfServiceHomePageComponent],
})
export class SelfServiceFeatureHomeModule {}
