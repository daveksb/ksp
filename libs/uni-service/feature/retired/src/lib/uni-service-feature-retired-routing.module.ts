import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RetiredAttachmentComponent } from './retired-attachment/retired-attachment.component';
import { RetiredHomeComponent } from './retired-home/retired-home.component';
import { RetiredReasonComponent } from './retired-reason/retired-reason.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'search' },
  { path: 'search', component: RetiredHomeComponent },
  { path: 'reason', component: RetiredReasonComponent },
  { path: 'attachment', component: RetiredAttachmentComponent },
  { path: '**', component: RetiredHomeComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UniServiceFeatureRetiredRoutingModule {}
