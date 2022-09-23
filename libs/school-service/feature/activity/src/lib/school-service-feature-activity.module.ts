import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivityListComponent } from './activity-list/activity-list.component';
import { ActivityDetailComponent } from './activity-detail/activity-detail.component';
import { RouterModule, Routes } from '@angular/router';
import { SchoolContainerPageComponent } from '@ksp/school-service/feature/container-page';

import { SchoolServiceUiStaffSearchModule } from '@ksp/school-service/ui/staff-search';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { BottomNavComponent } from '@ksp/shared/menu';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { EServiceUiAccusationInfoModule } from '@ksp/e-service/ui/accusation-info';
import { DynamicComponentDirective } from '@ksp/shared/directive';
import {
  LicenseInfoComponent,
  RequestHeaderInfoComponent,
} from '@ksp/shared/ui';
import { TopNavComponent } from '@ksp/shared/menu';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedFormOthersModule } from '@ksp/shared/form/others';
import { MatPaginatorModule } from '@angular/material/paginator';
import { SchoolServiceFormActivityModule } from '@ksp/school-service/form/activity';

export const routes: Routes = [
  {
    path: '',
    component: SchoolContainerPageComponent,
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      { path: 'list', component: ActivityListComponent },
      { path: 'detail', component: ActivityDetailComponent },
      { path: 'detail/:pageType/:staffid', component: ActivityDetailComponent },
    ],
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    TopNavComponent,
    SharedFormOthersModule,
    SchoolServiceUiStaffSearchModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    BottomNavComponent,
    MatTableModule,
    MatIconModule,
    EServiceUiAccusationInfoModule,
    DynamicComponentDirective,
    RequestHeaderInfoComponent,
    LicenseInfoComponent,
    MatPaginatorModule,
    SchoolServiceFormActivityModule,
  ],
  declarations: [ActivityListComponent, ActivityDetailComponent],
})
export class SchoolServiceFeatureActivityModule {}
