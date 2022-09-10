import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompareKnowledgeRequestComponent } from './compare-knowledge-request/compare-knowledge-request.component';
import { SelfServiceMasterPageComponent } from '@ksp/self-service/feature/master-page';
import { RouterModule, Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    component: SelfServiceMasterPageComponent,
    children: [
      {
        path: 'request',
        component: CompareKnowledgeRequestComponent,
      },
    ],
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  declarations: [CompareKnowledgeRequestComponent],
  exports: [CompareKnowledgeRequestComponent],
})
export class SelfServiceFeatureCompareKnowledgeModule {}
