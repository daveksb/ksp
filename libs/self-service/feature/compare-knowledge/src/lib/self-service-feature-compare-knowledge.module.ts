import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompareKnowledgeRequestComponent } from './compare-knowledge-request/compare-knowledge-request.component';
import { SelfServiceMasterPageComponent } from '@ksp/self-service/feature/master-page';
import { RouterModule, Routes } from '@angular/router';
import { TopNavComponent } from '@ksp/shared/menu';
import {
  RequestStatusComponent,
  SelfServiceLicenseInfoComponent,
} from '@ksp/self-service/ui';
import {
  FormUploadImageComponent,
  SelfServiceFormModule,
} from '@ksp/self-service/form';
import { MatTabsModule } from '@angular/material/tabs';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedFormOthersModule } from '@ksp/shared/form/others';

export const routes: Routes = [
  {
    path: '',
    component: SelfServiceMasterPageComponent,
    children: [
      {
        path: 'request',
        component: CompareKnowledgeRequestComponent,
      },
      {
        path: 'request/:id',
        component: CompareKnowledgeRequestComponent,
      },
    ],
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    TopNavComponent,
    SelfServiceLicenseInfoComponent,
    FormUploadImageComponent,
    MatTabsModule,
    ReactiveFormsModule,
    SharedFormOthersModule,
    SelfServiceFormModule,
    RequestStatusComponent,
  ],
  declarations: [CompareKnowledgeRequestComponent],
  exports: [CompareKnowledgeRequestComponent],
})
export class SelfServiceFeatureCompareKnowledgeModule {}
