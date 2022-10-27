import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EResearchRewardListComponent } from './e-research-reward-list/e-research-reward-list.component';
import { EResearchRewardDetailComponent } from './e-research-reward-detail/e-research-reward-detail.component';
import { RouterModule, Routes } from '@angular/router';
import { EServiceContainerPageComponent } from '@ksp/e-service/feature/container-page';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { SharedFormOthersModule } from '@ksp/shared/form/others';
import { SharedFormSelfRewardFormModule } from '@ksp/shared/form/self-reward-form';
import { TopNavComponent, BottomNavComponent } from '@ksp/shared/menu';
import { RequestHeaderInfoComponent } from '@ksp/shared/ui';
import { SelfServiceFormModule } from '@ksp/self-service/form';
import { EServiceRewardSearchComponent } from '@ksp/shared/search';
import { ThaiDatePipe } from '@ksp/shared/pipe';

const routes: Routes = [
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
        component: EResearchRewardListComponent,
      },
      {
        path: 'detail/:id',
        component: EResearchRewardDetailComponent,
      },
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    TopNavComponent,
    MatTableModule,
    MatTabsModule,
    SharedFormOthersModule,
    ReactiveFormsModule,
    SharedFormSelfRewardFormModule,
    MatDialogModule,
    BottomNavComponent,
    RequestHeaderInfoComponent,
    SelfServiceFormModule,
    EServiceRewardSearchComponent,
    ThaiDatePipe,
  ],
  declarations: [EResearchRewardListComponent, EResearchRewardDetailComponent],
  exports: [EResearchRewardListComponent, EResearchRewardDetailComponent],
})
export class EServiceProfessionalResearchRewardModule {}
