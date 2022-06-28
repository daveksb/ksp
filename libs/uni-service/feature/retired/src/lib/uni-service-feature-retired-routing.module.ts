import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RetiredAttachmentComponent } from './retired-attachment/retired-attachment.component';
import { RetiredReasonComponent } from './retired-reason/retired-reason.component';
import { RetiredSearchComponent } from './retired-search/retired-search.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'search' },
  { path: 'search', component: RetiredSearchComponent },
  { path: 'reason', component: RetiredReasonComponent },
  { path: 'attachment', component: RetiredAttachmentComponent },
  { path: '**', component: RetiredSearchComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UniServiceFeatureRetiredRoutingModule {}
