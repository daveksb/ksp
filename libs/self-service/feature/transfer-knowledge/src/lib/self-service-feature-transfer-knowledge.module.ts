import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransferKnowledgeRequestComponent } from './transfer-knowledge-request/transfer-knowledge-request.component';
import { RouterModule, Routes } from '@angular/router';
import { SelfServiceMasterPageComponent } from '@ksp/self-service/feature/master-page';
import { TopNavComponent } from '@ksp/shared/menu';
import {
  FormUploadImageComponent,
  SelfServiceFormModule,
} from '@ksp/self-service/form';
import { MatTabsModule } from '@angular/material/tabs';
import { ReactiveFormsModule } from '@angular/forms';
import {
  RequestStatusComponent,
  SelfServiceLicenseInfoComponent,
} from '@ksp/self-service/ui';
import { SharedFormOthersModule } from '@ksp/shared/form/others';

export const routes: Routes = [
  {
    path: '',
    component: SelfServiceMasterPageComponent,
    children: [
      {
        path: 'request',
        component: TransferKnowledgeRequestComponent,
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
  declarations: [TransferKnowledgeRequestComponent],
  exports: [TransferKnowledgeRequestComponent],
})
export class SelfServiceFeatureTransferKnowledgeModule {}
