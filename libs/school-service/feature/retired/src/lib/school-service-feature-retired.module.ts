import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SchoolRetiredSearchComponent } from './school-retired-search/school-retired-search.component';
import { SchoolRetiredRequesterComponent } from './school-retired-requester/school-retired-requester.component';
import { SchoolRetiredCoordinatorComponent } from './school-retired-coordinator/school-retired-coordinator.component';
import { BottomNavComponent, TopNavSecondComponent } from '@ksp/shared/menu';
import { RetiredSearchComponent } from '@ksp/shared/search';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { RequestHeaderInfoComponent } from '@ksp/shared/ui';
import { SharedFormOthersModule } from '@ksp/shared/form/others';
import { UniServiceFormModule } from '@ksp/uni-service/form';
import { FormCoordinatorInfoComponent } from '@ksp/shared/form/school/register';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'search', component: SchoolRetiredSearchComponent },
  { path: 'requester', component: SchoolRetiredRequesterComponent },
  { path: 'coordinator', component: SchoolRetiredCoordinatorComponent },
];

@NgModule({
  imports: [
    CommonModule,
    TopNavSecondComponent,
    RetiredSearchComponent,
    ReactiveFormsModule,
    BottomNavComponent,
    RequestHeaderInfoComponent,
    SharedFormOthersModule,
    UniServiceFormModule,
    RouterModule.forChild(routes),
    FormCoordinatorInfoComponent,
  ],
  declarations: [
    SchoolRetiredSearchComponent,
    SchoolRetiredRequesterComponent,
    SchoolRetiredCoordinatorComponent,
  ],
  exports: [
    SchoolRetiredSearchComponent,
    SchoolRetiredRequesterComponent,
    SchoolRetiredCoordinatorComponent,
  ],
})
export class SchoolServiceFeatureRetiredModule {}
