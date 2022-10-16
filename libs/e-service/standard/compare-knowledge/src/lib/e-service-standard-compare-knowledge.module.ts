import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ECompareKnowledgeListComponent } from './e-compare-knowledge-list/e-compare-knowledge-list.component';
import { ECompareKnowledgeDetailComponent } from './e-compare-knowledge-detail/e-compare-knowledge-detail.component';
import { RouterModule, Routes } from '@angular/router';
import { EServiceContainerPageComponent } from '@ksp/e-service/feature/container-page';
import { ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { LicenseCheckComponent } from '@ksp/e-service/ui/license-check';
import {
  SelfServiceFormModule,
  FormUploadImageComponent,
} from '@ksp/self-service/form';
import { SharedFormOthersModule } from '@ksp/shared/form/others';
import { TopNavComponent, BottomNavComponent } from '@ksp/shared/menu';
import { ThaiDatePipe } from '@ksp/shared/pipe';
import {
  EServiceRequestSearchComponent,
  RequestSearchComponent,
  EServiceLicenseSearchComponent,
} from '@ksp/shared/search';
import { RequestHeaderInfoComponent } from '@ksp/shared/ui';

export const routes: Routes = [
  {
    path: '',
    component: EServiceContainerPageComponent,
    children: [
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full',
      },
      {
        path: 'list',
        component: ECompareKnowledgeListComponent,
      },
      {
        path: 'detail',
        component: ECompareKnowledgeDetailComponent,
      },
      {
        path: 'detail/:id',
        component: ECompareKnowledgeDetailComponent,
      },
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    TopNavComponent,
    SelfServiceFormModule,
    SharedFormOthersModule,
    MatTabsModule,
    FormUploadImageComponent,
    ReactiveFormsModule,
    BottomNavComponent,
    LicenseCheckComponent,
    RequestHeaderInfoComponent,
    EServiceRequestSearchComponent,
    MatTableModule,
    RequestSearchComponent,
    MatPaginatorModule,
    ThaiDatePipe,
    EServiceLicenseSearchComponent,
  ],
  declarations: [
    ECompareKnowledgeListComponent,
    ECompareKnowledgeDetailComponent,
  ],
  exports: [ECompareKnowledgeListComponent, ECompareKnowledgeDetailComponent],
})
export class EServiceStandardCompareKnowledgeModule {}