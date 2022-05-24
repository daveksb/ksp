import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TempLicenseListComponent } from './temp-license-list/temp-license-list.component';
import { TempLicenseComponent } from './temp-license/temp-license.component';

const routes: Routes = [
  {
    path: 'license',
    component: TempLicenseListComponent,
  },
  {
    path: 'aaa',
    component: TempLicenseComponent,
  },
  {
    path: '**',
    component: TempLicenseListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EServiceFeatureDigitalLicenseRoutingModule {}
